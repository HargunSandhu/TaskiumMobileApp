import React from 'react';
import AppNavigator from './src/Navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';

import ResetPassword from './src/pages/Authentication/ResetPassword';
import AuthRedirectHandler from './src/Navigation/AuthRedirectHandler';
import linking from './src/Navigation/Linking';
import Dashboard from './src/pages/Dashboard';
import TasksComponent from './src/components/DailyTasksComponent';
// import MainNavigator from './src/Navigation/MainNavigator';
import Navbar from './src/components/Navbar';

const App = () => {
  return (
    <NavigationContainer linking={linking}>
      {/* <AuthRedirectHandler /> */}
      {/* <AppNavigator /> */}
      {/* <MainNavigator /> */}
      <Navbar />
      
      {/* <TasksComponent taskStatus={true} task='task' /> */}
    </NavigationContainer>
  );
};

export default App;
