import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, ActivityIndicator, Text} from 'react-native';
import PriorityTaskCard from './PriorityTasksCard';
import {supabase} from '../lib/supaBaseClient';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types';
import ConfirmationModal from './ConfirmationModal';
import SuccessModal from './SuccessModal';

type SubTask = {
  id: string;
  task_id: string;
  name: string;
  is_completed: boolean;
};

type Task = {
  id: string;
  task_name: string;
  is_completed: boolean;
  priority: string;
  due_date: string;
  subtasks: SubTask[];
};

interface PriorityTasksListProps {
  searchQuery: string;
}

const PriorityTasksList: React.FC<PriorityTasksListProps> = ({searchQuery}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'MainScreen'>
    >();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    const {
      data: {user},
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error(userError?.message || 'No user signed in');
      setTasks([]);
      setLoading(false);
      return;
    }

    let query = supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .eq('type', 'priority')
      .order('id', {ascending: true});

    if (searchQuery.trim()) {
      query = query.ilike('task_name', `%${searchQuery}%`);
    }

    const {data: taskData, error: taskError} = await query;
    if (taskError || !taskData) {
      console.error(taskError?.message);
      setLoading(false);
      return;
    }

    const tasksWithSubtasks = await Promise.all(
      taskData.map(async task => {
        const {data: subtasks} = await supabase
          .from('subtasks')
          .select('*')
          .eq('task_id', task.id);

        return {...task, subtasks: subtasks || []} as Task;
      }),
    );

    setTasks(tasksWithSubtasks);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [searchQuery]);

  const confirmDelete = (taskId: string) => {
    setSelectedTaskId(taskId);
    setConfirmationModalVisible(true);
  };

  const handleDeleteTask = async () => {
    if (!selectedTaskId) return;
    const {error} = await supabase
      .from('tasks')
      .delete()
      .eq('id', selectedTaskId);
    if (error) {
      console.error('Error deleting task:', error.message);
    }
    setConfirmationModalVisible(false);
    setSelectedTaskId(null);
    setSuccessModalVisible(true);
    fetchTasks();
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#9B7CF9" style={{marginTop: 50}} />
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      {tasks.length > 0 ? (
        tasks.map(task => (
          <PriorityTaskCard
            key={task.id}
            task_name={task.task_name}
            priority={task.priority}
            due_date={task.due_date}
            subtasks={task.subtasks}
            task_id={task.id}
            priorityTaskDetails={() =>
              navigation.navigate('PriorityTaskDetails', {taskId: task.id})
            }
            onDelete={() => confirmDelete(task.id)}
          />
        ))
      ) : (
        <Text style={styles.noTasks}>No tasks found.</Text>
      )}

      <ConfirmationModal
        visible={confirmationModalVisible}
        onCancel={() => setConfirmationModalVisible(false)}
        onConfirm={handleDeleteTask}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
      />

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

export default PriorityTasksList;
