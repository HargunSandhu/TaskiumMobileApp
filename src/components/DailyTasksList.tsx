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

type Task = {
  id: string;
  task: string;
  taskStatus: boolean;
};

const DailyTasksList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
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
      setTasks([]); // Clear any tasks
      setLoading(false);
      return;
    }

    const {data, error} = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('id', {ascending: true});

    if (error) {
      console.error('Error fetching tasks:', error.message);
    } else {
      console.log('Fetched tasks:', data);
      setTasks(data as Task[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#9B7CF9" style={{marginTop: 50}} />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <DailyTasksComponent
            key={task.id}
            task_name={task.task}
            is_completed={task.taskStatus}
          />
        ))
      ) : (
        <Text style={styles.noTasks}>No tasks found.</Text>
      )}
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
