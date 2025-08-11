import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import Images from '../assets/Images';
import CalendarSlider from '../components/CalendarSlider';
import LinearGradient from 'react-native-linear-gradient';
import {supabase} from '../lib/supaBaseClient';
import PriorityTaskCard from '../components/PriorityTasksCard'; // Import card component
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types';

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

const Calendar = () => {
  const [currentMonthYear, setCurrentMonthYear] = useState(
    new Date().toLocaleDateString('en-GB', {month: 'long', year: 'numeric'}),
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'MainScreen'>
    >();

  const fetchTask = async () => {
    setLoading(true);

    // Start and end of selected day
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const {
      data: {user},
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Error fetching user:', userError?.message);
      setTasks([]);
      setLoading(false);
      return;
    }

    // Fetch tasks for selected date
    const {data: taskData, error: taskError} = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .eq('type', 'priority')
      .gte('due_date', startOfDay.toISOString())
      .lte('due_date', endOfDay.toISOString())
      .order('id', {ascending: true});

    if (taskError || !taskData) {
      console.error('Error fetching tasks:', taskError?.message);
      setTasks([]);
      setLoading(false);
      return;
    }

    // Fetch subtasks for each task
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

        return {...task, subtasks: subtasks || []} as Task;
      }),
    );

    setTasks(tasksWithSubtasks);
    setLoading(false);
  };

  useEffect(() => {
    fetchTask();
  }, [selectedDate]);

  return (
    <View style={styles.main}>
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center', paddingBottom: 100}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Header />

        <Text style={styles.heading}>Calendar</Text>

        <View style={styles.row}>
          <Image
            source={{uri: Images.calendar2}}
            height={40}
            width={40}
            tintColor={'#fff'}
            style={styles.icon}
          />
          <Text style={styles.text}>{currentMonthYear}</Text>
        </View>

        <CalendarSlider
          onMonthChange={setCurrentMonthYear}
          onDateChange={setSelectedDate}
        />

        <View style={styles.priorityHeadingContainer}>
          <Text style={[styles.textPriority]}>Priority Tasks</Text>
          <LinearGradient
            colors={['#667EEA', '#764BA2']}
            style={styles.gradientLine}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          />
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#9B7CF9"
            style={{marginTop: 20}}
          />
        ) : tasks.length > 0 ? (
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
            />
          ))
        ) : (
          <Text style={styles.noTasks}>No tasks found for this date.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#0B0B0F',
    alignItems: 'center',
    paddingTop: 20,
  },
  heading: {
    fontFamily: 'Poppins',
    fontSize: 42,
    color: '#ffffff',
    fontWeight: '800',
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    color: '#ffffff',
    fontSize: 24,
  },
  priorityHeadingContainer: {
    marginTop: 4,
    marginBottom: 8,
    alignItems: 'center',
  },
  gradientLine: {
    height: 8,
    width: 84,
    borderRadius: 18,
    marginTop: 4,
  },
  textPriority: {color: '#ffffff', fontSize: 26, fontWeight: 'bold'},
  noTasks: {
    textAlign: 'center',
    marginTop: 20,
    color: '#fff',
    fontSize: 18,
  },
});

export default Calendar;
