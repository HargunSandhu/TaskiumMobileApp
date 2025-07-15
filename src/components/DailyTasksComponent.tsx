import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Button2} from './Button';
import Images from '../assets/Images';

type DailyTasksComponentProps = {
  taskStatus: boolean;
  task: string;
};

const DailyTasksComponent = ({taskStatus, task}: DailyTasksComponentProps) => {
  const [isChecked, setIsChecked] = useState(taskStatus);

  return (
    <View style={styles.main}>

      <View style={styles.leftSection}>
        <CheckBox
          value={isChecked}
          onValueChange={setIsChecked}
          tintColors={{true: '#9B7CF9', false: '#4C4B50'}}
        />
        <Text style={styles.taskText}>{task}</Text>
      </View>

 
      <View style={styles.rightSection}>
        <Button2 imagePath={Images.edit} width={45} height={42} />
        <View style={{width: 8}} /> 
        <Button2 imagePath={Images.bin} width={45} height={42} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#1C1C26',
    padding: 12,
    width: '90%',
    borderRadius: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 12,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DailyTasksComponent;
