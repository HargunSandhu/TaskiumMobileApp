import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './src/Navigation/AppNavigator';
import Navbar from './src/components/Navbar';
import {NavigationContainer} from '@react-navigation/native';
import {Button1, Button2} from './src/components/Button';
import mainStyles from './src/mainStyles';
import TasksList from './src/components/TasksList';
import Header from './src/components/Header';

const App = () => {
  // return <AppNavigator />
  return (
    <NavigationContainer>
      <SafeAreaView style={mainStyles.main}>
        <Header />
        {/* <TasksList /> */}
        {/* <Button1 text="Button1" /> */}
        {/* <Button2 text="Button2" /> */}
        {/* <Navbar /> */}
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
