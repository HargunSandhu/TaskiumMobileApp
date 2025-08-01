import React, {useState, useEffect} from 'react';
import {Alert, SafeAreaView, Text, TextInput} from 'react-native';
import AuthenticationStyles from './AuthenticationStyles';
import Header from '../../components/Header';
import {Button1} from '../../components/Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/types';
import {useNavigation} from '@react-navigation/native';
import {supabase} from '../../lib/supaBaseClient';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const sessionCheck = async () => {
      const {data, error} = await supabase.auth.getSession();
      if (!data.session) {
        Alert.alert(
          'Error',
          'No active session found. Open the reset link from email.',
        );
        navigation.replace('SignIn');
      }
    };
    sessionCheck();
  }, []);

  const handleResetPassword = async () => {
    if (password === confirmPassword) {
      const {error} = await supabase.auth.updateUser({password: password});
      if (error) {
        Alert.alert(error.message);
      } else {
        Alert.alert('Success');
      }
    } else {
      Alert.alert('Password not matched!');
    }
  };

  return (
    <SafeAreaView style={AuthenticationStyles.main}>
      <Header />
      <Text style={AuthenticationStyles.heading}>Reset Password</Text>
      <TextInput
        placeholder="New Password"
        style={AuthenticationStyles.input}
        placeholderTextColor="#6E6E7A"
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirm Password"
        style={AuthenticationStyles.input}
        placeholderTextColor="#6E6E7A"
        onChangeText={setConfirmPassword}
      />
      <Button1 text="Confirm" onPress={handleResetPassword} />
    </SafeAreaView>
  );
};

export default ResetPassword;
