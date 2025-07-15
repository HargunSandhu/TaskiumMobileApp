import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import TaskSelector from '../components/TaskSelector';
import {Button1, Button2} from '../components/Button';
import {Dropdown} from 'react-native-element-dropdown';
import Images from '../assets/Images';
import SubtaskItem, {SubtaskType} from '../components/SubtasksItem';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../types/types';
import {supabase} from '../lib/supaBaseClient';
import DatePicker from 'react-native-date-picker';

const AddTask = () => {
  const priorityData = [
    {label: 'High', value: 'high'},
    {label: 'Medium', value: 'medium'},
    {label: 'Low', value: 'low'},
  ];
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'AddTask'>>();

  const [datePickerModalState, setDatePickerModalState] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(new Date());

  const [subtasks, setSubtasks] = useState<SubtaskType[]>([]);

  const [task, setTask] = useState('');
  const [taskType, setTaskType] = useState<'daily' | 'priority'>('daily');
  const [priority, setPriority] = useState(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const [description, setDescription] = useState('');

  const handleSubtaskChange = (id: number, updates: Partial<SubtaskType>) => {
    setSubtasks(prev =>
      prev.map(sub => (sub.id === id ? {...sub, ...updates} : sub)),
    );
  };

  const handleSubtaskRemove = (id: number) => {
    setSubtasks(prev => prev.filter(sub => sub.id !== id));
  };

  const handleAddSubtask = () => {
    const newId = subtasks.length + 1;
    setSubtasks(prev => [
      ...prev,
      {id: newId, name: `Task ${newId}`, completed: false},
    ]);
  };

  const handleToggleDateModal = () => {
    setDatePickerModalState(true);
  };

  const handleAddTask = () => {};

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
        <Text style={styles.heading}>Add Task</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Task"
          placeholderTextColor="#6E6E7A"
          onChangeText={setTask}
        />
        <TaskSelector selected={taskType} setSelected={setTaskType} />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholder}
          selectedTextStyle={styles.selectedText}
          itemTextStyle={styles.itemText}
          itemContainerStyle={styles.itemContainer}
          data={priorityData}
          labelField="label"
          valueField="value"
          placeholder="Priority"
          value={priority}
          onChange={item => setPriority(item.value)}
          renderRightIcon={() => (
            <Image source={{uri: Images.expandArrow}} style={styles.icon} />
          )}
          renderItem={(item, selected) => (
            <View style={[styles.itemWrapper, selected && styles.itemSelected]}>
              <Text style={styles.itemText}>{item.label}</Text>
            </View>
          )}
        />

        {taskType === 'priority' && (
          <View style={styles.dateContainer}>
            <TouchableOpacity
              onPress={handleToggleDateModal}
              style={[styles.input, styles.dateInput]}>
              <View style={styles.dateContent}>
                <Text
                  style={dueDate ? styles.selectedText : styles.placeholder}>
                  {dueDate
                    ? dueDate.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'Due Date'}
                </Text>
                <Image source={{uri: Images.calendar2}} style={styles.icon} />
              </View>
            </TouchableOpacity>

            <DatePicker
              modal
              open={datePickerModalState}
              date={dueDate || new Date()}
              onConfirm={date => {
                setDatePickerModalState(false);
                setDueDate(date);
              }}
              onCancel={() => setDatePickerModalState(false)}
              mode="date"
              buttonColor="#9B7CF9"
              dividerColor="#9B7CF9"
              theme="dark"
              minimumDate={new Date()}
            />
          </View>
        )}

        <TextInput
          style={[styles.input, styles.description]}
          placeholder="Description"
          placeholderTextColor="#6E6E7A"
          onChangeText={setDescription}
        />

        {taskType === 'priority' && (
          <View>
            <View style={styles.row}>
              <Text style={styles.subheading}>Subtasks</Text>
              <View style={{flex: 0}}>
                <Button1
                  text="Add"
                  width={100}
                  height={42}
                  onPress={handleAddSubtask}
                />
              </View>
            </View>

            {subtasks.map(subtask => (
              <SubtaskItem
                key={subtask.id}
                id={subtask.id}
                name={subtask.name}
                completed={subtask.completed}
                onChange={handleSubtaskChange}
                onRemove={handleSubtaskRemove}
              />
            ))}
          </View>
        )}

        <Button1 text="Add Task" onPress={handleAddTask} />
        <Button2
          text="Close"
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
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
  selectedText: {
    fontSize: 18,
    color: '#FFFFFF',
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
});

export default AddTask;
