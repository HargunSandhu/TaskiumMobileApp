import React, {use, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';

import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {RootStackParamList} from '../types/types';
import {supabase} from '../lib/supaBaseClient';
import {Button1, Button2} from '../components/Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type EditTaskRouteProp = RouteProp<RootStackParamList, 'EditTask'>;

const EditTask = () => {
  const route = useRoute<EditTaskRouteProp>();
  const {taskId, taskType} = route.params;

  const [task, setTask] = useState('');
  // const [task_Type, setTask_Type] = useState<'daily' | 'priority'>('daily');
  const [priority, setPriority] = useState(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'daily' | 'priority'>(taskType);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'EditTask'>>();

  useEffect(() => {
    const fetchTask = async () => {
      const {data, error} = await supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId)
        .single();

      if (error) {
        console.error('Error fetching task:', error.message);
      } else if (data) {
        setTask(data.task_name);
        setDescription(data.description || '');
        setPriority(data.priority || null);
        setDueDate(data.due_date ? new Date(data.due_date) : null);
        setType(data.type);
      }
    };

    fetchTask();
  }, []);

  const handleEditTask = async () => {
    const taskData = {
      task_name: task,
      type: taskType,
      priority: taskType === 'priority' ? priority : null,
      due_date:
        taskType === 'priority' && dueDate ? dueDate.toISOString() : null,
      description,
    };
    const {error} = await supabase
      .from('tasks')
      .update(taskData)
      .eq('id', taskId);
    if (error) {
      console.log('Task update failed; ', error);
    }
  };
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center', paddingBottom: 100}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.logo}>
          <Header />
        </View>
        <Text style={styles.heading}>Edit Task</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Task"
          placeholderTextColor="#6E6E7A"
          onChangeText={setTask}
          value={task}
        />
        {taskType === 'daily' && (
          <View style={styles.option}>
            <Text style={[styles.text]}>Daily Tasks</Text>
            <LinearGradient
              colors={['#667EEA', '#764BA2']}
              style={styles.gradientLine}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
            />
          </View>
        )}

        {taskType === 'priority' && (
          <View style={styles.option}>
            <Text style={[styles.text]}>Priority Tasks</Text>
            <LinearGradient
              colors={['#667EEA', '#764BA2']}
              style={styles.gradientLine}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
            />
          </View>
        )}

        <TextInput
          style={[styles.input, styles.description]}
          placeholder="Description"
          placeholderTextColor="#6E6E7A"
          onChangeText={setDescription}
          value={description}
        />
        <Button1 text="Save" onPress={handleEditTask} />
        <Button2
          text="Close"
          onPress={() => navigation.navigate('Dashboard')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#0B0B0F',
    alignItems: 'center',
    paddingTop: 20,
    height: '100%',
  },
  logo: {
    marginTop: 10,
    marginBottom: 10,
  },
  heading: {
    fontFamily: 'Poppins',
    fontSize: 42,
    color: '#ffffff',
    fontWeight: '800',
    marginBottom: 40,
  },
  input: {
    width: '90%',
    height: 52,
    backgroundColor: '#16161D',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2A2A35',
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 18,
  },
  dropdown: {
    width: '90%',
    height: 52,
    backgroundColor: '#16161D',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2A2A35',
    paddingHorizontal: 16,
    marginBottom: 18,
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 18,
    color: '#6E6E7A',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#6E6E7A',
    marginRight: 12,
  },
  itemContainerStyle: {
    backgroundColor: '#16161D',
    borderBottomWidth: 0.5,
    borderBottomColor: '#2E2E2E',
    paddingHorizontal: 16,
  },

  selectedStyle: {
    backgroundColor: '#24242F',
    borderRadius: 8,
  },

  itemText: {
    fontSize: 18,
    color: '#FFFFFF',
  },

  itemContainer: {
    backgroundColor: '#16161D',
  },

  itemWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  itemSelected: {
    backgroundColor: '#24242F',
  },
  description: {
    height: 100,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 18,
  },
  subheading: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '700',
  },
  dateContainer: {
    width: '100%',
    alignItems: 'center',
  },
  dateInput: {
    justifyContent: 'center',
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  // calendarIcon: {
  //   width: 30,
  //   height: 30,
  //   tintColor: '#6E6E7A',
  //   marginRight: 10,
  // },
  option: {
    alignItems: 'center',
    marginBottom: '5%',
  },
  gradientLine: {
    height: 8,
    width: 84,
    borderRadius: 18,
    marginTop: 4,
  },
});

export default EditTask;
