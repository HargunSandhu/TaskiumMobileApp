import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Dashboard from '../pages/Dashboard';
import Calender from '../pages/Calender';
import Intro from '../pages/Intro';
import AddTask from '../pages/AddTask';
import EditTask from '../pages/EditTask';
import DailyTaskDetails from '../pages/Details/DailyTaskDetails';
import PriorityTaskDetails from '../pages/Details/PriorityTaskDetails';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import ForgotPassword from '../pages/Authentication/ForgotPassword';
import ResetPassword from '../pages/Authentication/ResetPassword';
import AccountCreated from '../pages/Success/AccountCreated';
import AddedTask from '../pages/Success/AddedTask';
import EditedTask from '../pages/Success/EditedTask';
import LoggedOut from '../pages/Success/LoggedOut';
import TaskDeleted from '../pages/Success/TaskDeleted';
import UpdatedPassword from '../pages/Success/UpdatedPassword';
import VerifiedEmail from '../pages/Success/VerifiedEmail';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Calender" component={Calender} />
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{headerShown: false}}
        />
        <Stack.Screen name="AddTask" component={AddTask} />
        <Stack.Screen name="EditTask" component={EditTask} />
        <Stack.Screen name="DailyTaskDetails" component={DailyTaskDetails} />
        <Stack.Screen
          name="PriorityTaskDetails"
          component={PriorityTaskDetails}
        />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="AccountCreated" component={AccountCreated} />
        <Stack.Screen name="AddedTask" component={AddedTask} />
        <Stack.Screen name="EditedTask" component={EditedTask} />
        <Stack.Screen name="LoggedOut" component={LoggedOut} />
        <Stack.Screen name="TaskDeleted" component={TaskDeleted} />
        <Stack.Screen name="UpdatedPassword" component={UpdatedPassword} />
        <Stack.Screen name="VerifiedEmail" component={VerifiedEmail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
