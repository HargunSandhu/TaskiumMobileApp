import React from 'react';
import AppNavigator from './src/Navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';

import ResetPassword from './src/pages/Authentication/ResetPassword';

const App = () => {
  return (
    <NavigationContainer>
     
        <AppNavigator />
        {/* <ResetPassword /> */}
    </NavigationContainer>
  );
};

export default App;
