import React from 'react';
import { Text } from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';

const PriorityList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Priority List Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default PriorityList;
