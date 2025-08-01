import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../types/types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {supabase} from '../../lib/supaBaseClient';
import Header from '../../components/Header';
import {Button1, Button2} from '../../components/Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type DailyTaskDetailsRouteProp = RouteProp<
  RootStackParamList,
  'DailyTaskDetails'
>;

const DailyTaskDetails = () => {
  const route = useRoute<DailyTaskDetailsRouteProp>();
  const {taskId} = route.params;

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'DailyTaskDetails'>
    >();

  const [task, setTask] = useState('');
  const [priority, setPriority] = useState(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const taskType = 'daily';

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
        setIsCompleted(data.is_completed);
      }
    };

    fetchTask();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center', paddingBottom: 120}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.logo}>
          <Header />
        </View>
        <Text
          style={[styles.heading, isCompleted && styles.strikeThroughText]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {task}
        </Text>
        <Text style={styles.subheading}>Description: </Text>
        <Text style={styles.description}>
          {description || 'No Description'}
        </Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button1
          text="Edit Task"
          onPress={() => navigation.navigate('EditTask', {taskId, taskType})}
        />
        <Button2
          text="Close"
          onPress={() => navigation.navigate('MainScreen')}
          width={'95%'}
        />
      </View>
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
    alignSelf: 'flex-start',
    paddingLeft: '5%',
  },
  strikeThroughText: {
    textDecorationLine: 'line-through',
    color: '#808080',
  },
  subheading: {
    color: '#fff',
    alignSelf: 'flex-start',
    paddingLeft: '5%',
    fontSize: 24,
    fontWeight: '600',
  },
  description: {
    color: '#fff',
    alignSelf: 'flex-start',
    paddingLeft: '15%',
    fontSize: 22,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    backgroundColor: '#0B0B0F',
    alignItems: 'center',
  },
});

export default DailyTaskDetails;
