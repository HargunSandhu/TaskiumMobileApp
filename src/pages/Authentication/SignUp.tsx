import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/types';
import Header from '../../components/Header';
import {Button1, Button2} from '../../components/Button';
import Images from '../../assets/Images';
import AuthenticationStyles from './AuthenticationStyles';

const SignUp = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={AuthenticationStyles.main}>
      <Header />
      <Text style={AuthenticationStyles.heading}>Sign Up</Text>

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

      <Button1 text="Sign Up" />

      <View>
        <View style={AuthenticationStyles.row}>
          <Text style={AuthenticationStyles.text}>Already have an account? </Text>
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

const styles = StyleSheet.create({



});

export default SignUp;
