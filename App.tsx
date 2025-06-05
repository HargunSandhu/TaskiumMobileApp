import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './src/Navigation/AppNavigator';

import {NavigationContainer} from '@react-navigation/native';

import mainStyles from './src/mainStyles';

const App = () => {
  return (
    <NavigationContainer>
     
        <AppNavigator />
      
    </NavigationContainer>
  );
};

export default App;
