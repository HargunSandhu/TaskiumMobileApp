import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
    <Stack.Navigator initialRouteName="Intro" >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Calender"
        component={Calender}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTask}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditTask"
        component={EditTask}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DailyTaskDetails"
        component={DailyTaskDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PriorityTaskDetails"
        component={PriorityTaskDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AccountCreated"
        component={AccountCreated}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddedTask"
        component={AddedTask}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditedTask"
        component={EditedTask}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoggedOut"
        component={LoggedOut}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TaskDeleted"
        component={TaskDeleted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdatedPassword"
        component={UpdatedPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VerifiedEmail"
        component={VerifiedEmail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
