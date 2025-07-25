import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../types/types';
import {RouteProp, useRoute} from '@react-navigation/native';
import {supabase} from '../../lib/supaBaseClient';
import Header from '../../components/Header';
import {Button1, Button2} from '../../components/Button';

type DailyTaskDetailsRouteProp = RouteProp<
  RootStackParamList,
  'DailyTaskDetails'
>;

const DailyTaskDetails = () => {
  const route = useRoute<DailyTaskDetailsRouteProp>();
  const {taskId} = route.params;

  const [task, setTask] = useState('');
  // const [task_Type, setTask_Type] = useState<'daily' | 'priority'>('daily');
  const [priority, setPriority] = useState(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
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
      }
    };

    fetchTask();
  }, []);
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center', paddingBottom: 100}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.heading}>
          <Header />
        </View>
        <Text style={styles.heading}>{task}</Text>
        <Button1 text="Edit Task" />
        <Button2 text="Close" />
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
    //   alignItems: 'flex-start',
    textAlign: 'left',
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
});

export default DailyTaskDetails;
