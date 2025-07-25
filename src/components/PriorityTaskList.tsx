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
  subtasks: SubTask[]; // ✅ Include subtasks in the task
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

    // Step 1: Fetch priority tasks
    const {data: taskData, error: taskError} = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .eq('type', 'priority')
      .order('id', {ascending: true});

    if (taskError || !taskData) {
      console.error('Error fetching tasks:', taskError?.message);
      setLoading(false);
      return;
    }

    // Step 2: Fetch subtasks for each task
    const tasksWithSubtasks = await Promise.all(
      taskData.map(async task => {
        const {data: subtasks, error: subError} = await supabase
          .from('subtasks')
          .select('*')
          .eq('task_id', task.id);

        if (subError) {
          console.error(
            `Error fetching subtasks for task ${task.id}:`,
            subError.message,
          );
        }

        return {
          ...task,
          subtasks: subtasks || [],
        } as Task;
      }),
    );

    setTasks(tasksWithSubtasks);
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
            priority={task.priority}
            due_date={task.due_date}
            subtasks={task.subtasks}
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
