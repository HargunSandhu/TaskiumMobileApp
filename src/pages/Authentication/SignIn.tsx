import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import {Button1, Button2} from '../../components/Button';
import Images from '../../assets/Images';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/types';
import AuthenticationStyles from './AuthenticationStyles';

const SignIn = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={AuthenticationStyles.main}>
      <Header />
      <Text style={AuthenticationStyles.heading}>Sign In</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#6E6E7A"
        style={AuthenticationStyles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#6E6E7A"
        style={[AuthenticationStyles.input, {marginBottom: 40}]}
      />

      <Button1 text="Sign In" />
      <Button2 text="Sign in with Google" imagePath={Images.googleIcon} />

      <View>
        <TouchableOpacity onPress={() => {navigation.navigate("ForgotPassword")}}>
          <Text style={AuthenticationStyles.text}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={AuthenticationStyles.row}>
          <Text style={AuthenticationStyles.text}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={AuthenticationStyles.linkText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});
export default SignIn;
