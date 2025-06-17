import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const TaskSelector = () => {
  const [selected, setSelected] = useState<'daily' | 'prioirty'>('daily');
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setSelected('daily')}>
        <Text>Daily Tasks</Text>
        {selected == 'daily' && <View></View>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setSelected('prioirty')}>
        <Text>Priority Tasks</Text>
        {selected == 'prioirty' && <View></View>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  gradientLine: {},
});

export default TaskSelector;
