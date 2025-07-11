import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/types';
import Header from '../../components/Header';
import {Button1} from '../../components/Button';
import AuthenticationStyles from './AuthenticationStyles';
import {supabase} from '../../lib/supaBaseClient';

const SignUp = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const {error} = await supabase.auth.signUp({email, password});
    if (error) Alert.alert(error.message);
    else Alert.alert('Check your email for confirmation!');
  };

  return (
    <SafeAreaView style={AuthenticationStyles.main}>
      <Header />
      <Text style={AuthenticationStyles.heading}>Sign Up</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#6E6E7A"
        style={AuthenticationStyles.input}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#6E6E7A"
        style={[AuthenticationStyles.input, {marginBottom: 40}]}
        onChangeText={setPassword}
      />

      <Button1 text="Sign Up" onPress={handleSignUp} />

      <View>
        <View style={AuthenticationStyles.row}>
          <Text style={AuthenticationStyles.text}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            <Text style={AuthenticationStyles.linkText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SignUp;
