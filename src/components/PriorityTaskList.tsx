import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import PriorityTaskCard from './PriorityTasksCard';
import {supabase} from '../lib/supaBaseClient';

type Task = {
  id: string;
  task_name: string;
  is_completed: boolean;
  priority: string;
  due_date: string;
};

const PriorityTasksList = () => {
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
      setTasks([]);
      setLoading(false);
      return;
    }

    const {data, error} = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .eq('type', 'priority')
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
          <PriorityTaskCard
            key={task.id}
            task_name={task.task_name}
            // is_completed={task.is_completed}
            priority={task.priority}
            due_date={task.due_date}
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

export default PriorityTasksList;
