// DailyTasksList.tsx
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import DailyTasksComponent from './DailyTasksComponent';
import {supabase} from '../lib/supaBaseClient';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types';
import SuccessModal from './SuccessModal';
import ConfirmationModal from './ConfirmationModal';

type Task = {
  id: string;
  task_name: string;
  is_completed: boolean;
  type: 'daily' | 'priority';
};

interface DailyTasksListProps {
  searchQuery: string;
}

const DailyTasksList: React.FC<DailyTasksListProps> = ({searchQuery}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'MainScreen'>
    >();

  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const fetchTasks = async () => {
    const {
      data: {user},
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error('Error fetching user:', userError.message);
      setLoading(false);
      return;
    }

    if (!user) {
      console.warn('No user is currently signed in.');
      setTasks([]);
      setLoading(false);
      return;
    }

    let query = supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .eq('type', 'daily')
      .order('id', {ascending: true});

    if (searchQuery.trim() !== '') {
      query = query.ilike('task_name', `%${searchQuery}%`);
    }

    const {data, error} = await query;

    if (error) {
      console.error('Error fetching tasks:', error.message);
    } else {
      setTasks(data as Task[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [searchQuery]); // refetch when searchQuery changes

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#9B7CF9" style={{marginTop: 50}} />
    );
  }

  const requestDeleteTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setConfirmModalVisible(true);
  };

  const handleEditTask = (taskId: string, taskType: 'daily' | 'priority') => {
    navigation.navigate('EditTask', {taskId, taskType});
  };

  const handleDeleteTask = async () => {
    if (!selectedTaskId) return;
    const {error} = await supabase
      .from('tasks')
      .delete()
      .eq('id', selectedTaskId);
    if (error) {
      console.log(error);
    } else {
      setSuccessModalVisible(true);
      await fetchTasks();
    }
    setConfirmModalVisible(false);
    setSelectedTaskId(null);
  };

  const handleDailyTaskDetails = (taskId: string) => {
    navigation.navigate('DailyTaskDetails', {taskId});
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <DailyTasksComponent
            key={task.id}
            task_name={task.task_name}
            task_id={task.id}
            is_completed={task.is_completed}
            editFunction={() => handleEditTask(task.id, task.type)}
            deleteFunction={() => requestDeleteTask(task.id)}
            dailyTaskDetails={() => handleDailyTaskDetails(task.id)}
          />
        ))
      ) : (
        <Text style={styles.noTasks}>No tasks found.</Text>
      )}
      <SuccessModal
        visible={successModalVisible}
        title="Task Deleted"
        message="The task has been deleted."
        onClose={() => {
          setSuccessModalVisible(false);
          navigation.navigate('MainScreen');
        }}
      />

      <ConfirmationModal
        visible={confirmModalVisible}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        onCancel={() => setConfirmModalVisible(false)}
        onConfirm={handleDeleteTask}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingBottom: 40,
  },
  noTasks: {
    textAlign: 'center',
    marginTop: 40,
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default DailyTasksList;
