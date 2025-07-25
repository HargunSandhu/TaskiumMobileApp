import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import Dashboard from '../pages/Dashboard';

import Calender from '../pages/Calendar';
import Images from '../assets/Images';
import AddTask from '../pages/AddTask';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const Navbar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#4C4B50',

        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#111114',
          height: '8%',
          borderTopWidth: 1,
          borderTopColor: '#FFFFFF',
        },

        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({color}) => (
            // <Icon name="home-outline" size={30} color={color} />
            <Image
              source={{uri: Images.home}}
              style={styles.Icons}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddTask"
        component={AddTask}
        options={{
          title: 'Add Task',
          tabBarStyle: {display: 'none'},
          tabBarIcon: ({color, size, focused}) => (
            <LinearGradient
              colors={['#667EEA', '#764BA2']}
              style={styles.gradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Image source={{uri: Images.plus}} style={styles.addIcon} />
            </LinearGradient>
          ),
        }}
      />
      <Tab.Screen
        name="Calender"
        component={Calender}
        options={{
          title: 'Calender',
          tabBarIcon: ({color, size}) => (
            // <Icon name="calendar-outline" size={size} color={color} />
            <Image
              source={{uri: Images.calendar}}
              style={styles.Icons}
              tintColor={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: 55,
    borderRadius: 99,
  },

  addIcon: {
    width: 40,
    height: 40,

    tintColor: '#fff',
  },

  Icons: {
    width: 40,
    height: 40,
    marginTop: '65%',
    resizeMode: 'contain',
    // marginBottom: 0, // or marginBottom: 2
  },
});

export default Navbar;
