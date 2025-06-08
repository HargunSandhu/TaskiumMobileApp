import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';

import PrioritytTaskCard from '../components/PriorityTasksCard';
import TasksComponent from '../components/TasksComponent';

const Dashboard = () => {
  const date = new Date();
  const currentDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <SafeAreaView style={styles.main}>
      <View>
        <Header />
      </View>
      <View>
        <Text>Hello User</Text>
        <Text style={{color: 'white'}}>{currentDate}</Text>
          </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#0B0B0F',
    height: '100%',
    
  },
});

export default Dashboard;
