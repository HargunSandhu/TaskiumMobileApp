import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Button2} from './Button';
import Images from '../assets/Images';
import {supabase} from '../lib/supaBaseClient';

type DailyTasksComponentProps = {
  is_completed: boolean;
  task_name: string;
  task_id: string;
  editFunction: (id: string) => void;
  deleteFunction: (id: string) => void;
  dailyTaskDetails: (id: string) => void;
};

const DailyTasksComponent = ({
  is_completed,
  task_name,
  task_id,
  editFunction,
  deleteFunction,
  dailyTaskDetails,
}: DailyTasksComponentProps) => {
  const [isChecked, setIsChecked] = useState(is_completed);
  const [loading, setLoading] = useState(false);

  const handleCheck = async (newValue: boolean) => {
    setIsChecked(newValue);
    setLoading(true);
    const {error} = await supabase
      .from('tasks')
      .update({is_completed: newValue})
      .eq('id', task_id);

    setLoading(false);

    if (error) {
      Alert.alert('Error', 'Failed to update task completion status.');
      setIsChecked(!newValue);
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.leftSection}>
        <CheckBox
          value={isChecked}
          onValueChange={handleCheck}
          tintColors={{true: '#9B7CF9', false: '#4C4B50'}}
          disabled={loading}
        />
        <TouchableOpacity onPress={() => dailyTaskDetails(task_id)}>
          <Text
            style={[styles.taskText, isChecked && styles.strikeThroughText]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {task_name}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rightSection}>
        <Button2
          imagePath={Images.edit}
          width={45}
          height={42}
          onPress={() => editFunction(task_id)}
        />
        <View style={{width: 8}} />
        <Button2
          imagePath={Images.bin}
          width={45}
          height={42}
          onPress={() => deleteFunction(task_id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#1C1C26',
    padding: 12,
    width: '95%',
    borderRadius: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskText: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 12,
    maxWidth: 180,
  },
  strikeThroughText: {
    textDecorationLine: 'line-through',
    color: '#808080',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DailyTasksComponent;
