import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type TaskType = 'daily' | 'priority';

interface TaskSelectorProps {
  selected: TaskType;
  setSelected: (value: TaskType) => void;
}

const TaskSelector = ({selected, setSelected}: TaskSelectorProps) => {
  // const [selected, setSelected] = useState<'daily' | 'priority'>('daily');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setSelected('daily')}>
        <View style={styles.option}>
          <Text
            style={[styles.text, selected === 'daily' && styles.selectedText]}>
            Daily Tasks
          </Text>
          {selected === 'daily' && (
            <LinearGradient
              colors={['#667EEA', '#764BA2']}
              style={styles.gradientLine}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
            />
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setSelected('priority')}>
        <View style={styles.option}>
          <Text
            style={[
              styles.text,
              selected === 'priority' && styles.selectedText,
            ]}>
            Priority Tasks
          </Text>
          {selected === 'priority' && (
            <LinearGradient
              colors={['#667EEA', '#764BA2']}
              style={styles.gradientLine}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
    width: '95%',
    marginBottom: 25,
  },
  option: {
    alignItems: 'center',
  },
  gradientLine: {
    height: 8,
    width: 84,
    borderRadius: 18,
    marginTop: 4,
  },
  text: {
    color: '#4C4B50',
    fontSize: 26,
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#FFF',
  },
});

export default TaskSelector;
