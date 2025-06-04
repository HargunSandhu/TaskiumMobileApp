import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './src/Navigation/AppNavigator';
import Navbar from './src/components/Navbar';
import { NavigationContainer } from '@react-navigation/native';
import { Button1, Button2 } from './src/components/Button';
import mainStyles from './src/mainStyles';

const App = () => {
  // return <AppNavigator />
  return (
    <NavigationContainer >
      <SafeAreaView style={mainStyles.main}>

      <Navbar />
      {/* <Button1 text="Button1" /> */}
      {/* <Button2 text="Button2" /> */}
      </SafeAreaView>
    </NavigationContainer>
  );
};



export default App;
