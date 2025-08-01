import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../types/types';
import {supabase} from '../../lib/supaBaseClient';
import {Button1, Button2} from '../../components/Button';
import Header from '../../components/Header';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import SubtaskItem from '../../components/SubtasksItem';

type PriorityTaskDetailsRouteProp = RouteProp<
  RootStackParamList,
  'PriorityTaskDetails'
>;

type SubTask = {
  id: string;
  task_id: string;
  subtask_name: string;
  is_completed: boolean;
};

const PriorityTaskDetails = () => {
  const route = useRoute<PriorityTaskDetailsRouteProp>();
  const {taskId} = route.params;

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'PriorityTaskDetails'>
    >();

  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [subtasks, setSubtasks] = useState<SubTask[]>([]); // ✅ Added subtasks state

  const taskType = 'priority';

  useEffect(() => {
    const fetchTask = async () => {
      const {data, error} = await supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId)
        .single();

      if (error || !data) {
        console.error('Error fetching task:', error?.message);
        return;
      }

      setTaskName(data.task_name);
      setDescription(data.description || '');
      setPriority(data.priority);
      setDueDate(data.due_date ? new Date(data.due_date) : null);
      setIsCompleted(data.is_completed);

      // ✅ Fetch subtasks
      const {data: fetchedSubtasks, error: subError} = await supabase
        .from('subtasks')
        .select('*')
        .eq('task_id', taskId);

      if (subError) {
        console.error('Error fetching subtasks:', subError.message);
        return;
      }

      setSubtasks(fetchedSubtasks || []);
    };

    fetchTask();
  }, [taskId]);

  const PriorityTag = () => {
    let color = '#999';
    let label = 'No Priority';

    if (priority === 'low') {
      color = '#32D74B';
      label = 'Low Priority';
    } else if (priority === 'medium') {
      color = '#FFD60A';
      label = 'Medium Priority';
    } else if (priority === 'high') {
      color = '#FF3B30';
      label = 'High Priority';
    }

    return (
      <View style={[styles.priorityTag, {borderColor: color}]}>
        <Text style={[styles.priorityText, {color}]}>{label}</Text>
      </View>
    );
  };

  const completedCount = subtasks.filter(s => s.is_completed).length;
  const total = subtasks.length;
  const progress = total > 0 ? (completedCount / total) * 100 : 0;

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView
        style={styles.upperScreen}
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
          {taskName}
        </Text>

        <PriorityTag />

        <Text style={styles.subheading}>Due Date:</Text>
        <Text style={styles.dueDate}>
          {dueDate
            ? dueDate.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : 'No due date'}
        </Text>

        <Text style={styles.subheading}>Progress:</Text>
        {total > 0 ? (
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>{Math.round(progress)}%</Text>
            <View style={styles.progressBarBackground}>
              <LinearGradient
                colors={['#5282FF', '#A26BFE']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[styles.progressBarFill, {width: `${progress}%`}]}
              />
            </View>
          </View>
        ) : (
          <Text style={styles.noSubtasks}>No subtasks</Text>
        )}

        <Text style={styles.subheading}>Description:</Text>
        <Text style={styles.description}>
          {description || 'No Description'}
        </Text>
        <View style={styles.subtaskHeading}>
          <Text style={styles.subheading}>Subtasks:</Text>
        </View>
        {subtasks.length > 0 ? (
          subtasks.map(subtask => (
            <SubtaskItem
              key={subtask.id}
              id={subtask.id}
              name={subtask.subtask_name}
              completed={subtask.is_completed}
              onChange={async (id, updates) => {
                if (typeof updates.completed === 'boolean') {
                  setSubtasks(prev =>
                    prev.map(s =>
                      s.id === id
                        ? {...s, is_completed: !!updates.completed}
                        : s,
                    ),
                  );
                  await supabase
                    .from('subtasks')
                    .update({is_completed: updates.completed})
                    .eq('id', id);
                }
              }}
              onRemove={() => {}}
              readOnly={true}
            />
          ))
        ) : (
          <Text style={styles.noSubtasks}>No subtasks</Text>
        )}
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
    marginBottom: 20,
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
    marginTop: 10,
  },
  description: {
    color: '#fff',
    alignSelf: 'flex-start',
    paddingLeft: '15%',
    paddingRight: '5%',
    fontSize: 22,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  dueDate: {
    color: '#fff',
    alignSelf: 'flex-start',
    paddingLeft: '15%',
    fontSize: 22,
  },
  priorityTag: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginTop: 4,
    marginBottom: 4,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginVertical: 10,
    gap: 10,
  },
  progressText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  progressBarBackground: {
    flex: 1,
    height: 12,
    backgroundColor: '#2D2D3A',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    backgroundColor: '#0B0B0F',
    alignItems: 'center', // ✅ A
  },
  subtaskHeading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '10%',
  },

  noSubtasks: {
    color: '#AAA',
    fontSize: 18,
    fontStyle: 'italic',
    alignSelf: 'flex-start',
    paddingLeft: '5%',
    marginBottom: 10,
  },
  upperScreen: {
    width: '100%',
    marginBottom: 120,
  },
});

export default PriorityTaskDetails;
