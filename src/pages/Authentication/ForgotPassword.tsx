import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet, TextInput, Alert} from 'react-native';
import Header from '../../components/Header';
import AuthenticationStyles from './AuthenticationStyles';
import {Button1, Button2} from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/types';
import {supabase} from '../../lib/supaBaseClient';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleForgotPassword = async () => {
    const {error} = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:
        'com.googleusercontent.apps.300286376607-vjdsv941mns4e04jlqpp8o18jt65clm8:/reset-password',
    });
    if (error) {
      console.log(error);
    } else {
      Alert.alert('Success');
    }
  };
  return (
    <SafeAreaView style={AuthenticationStyles.main}>
      <Header />
      <Text style={AuthenticationStyles.heading}>Forgot Password</Text>
      <TextInput
        placeholder="Email"
        style={AuthenticationStyles.input}
        placeholderTextColor="#6E6E7A"
        onChangeText={setEmail}
      />
      <Button1 text="Send Mail" onPress={handleForgotPassword} />
      <Button2
        text="Back"
        onPress={() => {
          navigation.navigate('SignIn');
        }}
        width={'95%'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ForgotPassword;
