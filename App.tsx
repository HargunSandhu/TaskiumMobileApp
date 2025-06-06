import React from 'react';
import AppNavigator from './src/Navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';

import ResetPassword from './src/pages/Authentication/ResetPassword';
import AuthRedirectHandler from './src/Navigation/AuthRedirectHandler';
import linking from './src/Navigation/Linking';

const App = () => {
  return (
    <NavigationContainer linking={linking}>
     
      <AuthRedirectHandler />
      <AppNavigator />
        {/* <ResetPassword /> */}
    </NavigationContainer>
  );
};

export default App;
