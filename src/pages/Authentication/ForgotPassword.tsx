import React from 'react';
import {SafeAreaView, Text, StyleSheet, TextInput} from 'react-native';
import Header from '../../components/Header';
import AuthenticationStyles from './AuthenticationStyles';
import { Button1, Button2 } from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/types';

const ForgotPassword = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={AuthenticationStyles.main}>
      <Header />
      <Text style={AuthenticationStyles.heading}>Forgot Password</Text>
      <TextInput
        placeholder="Email"
        style={AuthenticationStyles.input}
        placeholderTextColor="#6E6E7A"
          />
          <Button1 text="Send Mail" />
          <Button2 text="Back" onPress={() => {navigation.navigate("SignIn")}}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ForgotPassword;
