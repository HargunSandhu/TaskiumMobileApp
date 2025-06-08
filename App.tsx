import React from 'react';
import AppNavigator from './src/Navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';

import ResetPassword from './src/pages/Authentication/ResetPassword';
import AuthRedirectHandler from './src/Navigation/AuthRedirectHandler';
import linking from './src/Navigation/Linking';
import Dashboard from './src/pages/Dashboard';

const App = () => {
  return (
    <NavigationContainer linking={linking}>
     
      {/* <AuthRedirectHandler /> */}
      {/* <AppNavigator /> */}

      <Dashboard />
    </NavigationContainer>
  );
};

export default App;
