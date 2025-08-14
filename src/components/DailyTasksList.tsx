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

  const handleEditTask = (taskId: string, taskType: 'daily' | 'priority') => {
    navigation.navigate('EditTask', {taskId, taskType});
  };

  const handleDeleteTask = async (taskId: string) => {
    const {error} = await supabase.from('tasks').delete().eq('id', taskId);
    if (error) {
      console.log(error);
    }
    setSuccessModalVisible(true);
    await fetchTasks();
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
            deleteFunction={() => handleDeleteTask(task.id)}
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
