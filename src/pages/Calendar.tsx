import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import Images from '../assets/Images';
import CalendarSlider, {CalendarSliderRef} from '../components/CalendarSlider';
import LinearGradient from 'react-native-linear-gradient';
import {supabase} from '../lib/supaBaseClient';
import PriorityTaskCard from '../components/PriorityTasksCard';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types';
import DatePicker from 'react-native-date-picker';

type Task = {
  id: string;
  task_name: string;
  is_completed: boolean;
  priority: string;
  due_date: string;
  subtasks: {
    id: string;
    task_id: string;
    name: string;
    is_completed: boolean;
  }[];
};

const Calendar = () => {
  const [currentMonthYear, setCurrentMonthYear] = useState(
    new Date().toLocaleDateString('en-GB', {month: 'long', year: 'numeric'}),
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [datePickerModalState, setDatePickerModalState] = useState(false);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'MainScreen'>
    >();

  const sliderRef = useRef<CalendarSliderRef | null>(null);

  const fetchTask = async () => {
    setLoading(true);

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

    // Fetch tasks and subtasks in one query
    const {data, error} = await supabase
      .from('tasks')
      .select('*, subtasks(*)')
      .eq('user_id', user.id)
      .eq('type', 'priority')
      .gte('due_date', startOfDay.toISOString())
      .lte('due_date', endOfDay.toISOString())
      .order('id', {ascending: true});

    if (error || !data) {
      console.error('Error fetching tasks:', error?.message);
      setTasks([]);
      setLoading(false);
      return;
    }

    setTasks(data as Task[]);
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

        <TouchableOpacity
          style={styles.row}
          onPress={() => setDatePickerModalState(true)}>
          <Image
            source={{uri: Images.calendar2}}
            height={40}
            width={40}
            tintColor={'#fff'}
            style={styles.icon}
          />
          <Text style={styles.text}>{currentMonthYear}</Text>
        </TouchableOpacity>

        <CalendarSlider
          ref={sliderRef}
          onMonthChange={m => setCurrentMonthYear(m)}
          onDateChange={d => setSelectedDate(d)}
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

        <DatePicker
          modal
          open={datePickerModalState}
          date={selectedDate}
          onConfirm={date => {
            setDatePickerModalState(false);
            setSelectedDate(date);
            // ensure slider scrolls to this date
            sliderRef.current?.scrollToDate(date);
          }}
          onCancel={() => setDatePickerModalState(false)}
          mode="date"
          buttonColor="#9B7CF9"
          dividerColor="#9B7CF9"
          theme="dark"
        />

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
