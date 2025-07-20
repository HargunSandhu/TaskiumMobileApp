import React, {useState} from 'react';
import {
  Alert,
  Linking,
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
import {supabase} from '../../lib/supaBaseClient';
import linking from '../../Navigation/Linking';

const SignIn = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const {error} = await supabase.auth.signInWithPassword({email, password});
    if (error) Alert.alert(error.message);
    else {
      Alert.alert('Signed In Successfully!');
      navigation.navigate('MainScreen');
    }
  };

  const handleSignInGoogle = async () => {
    console.log('Pressed Google Sign-In');

    const redirectTo =
      'com.googleusercontent.apps.300286376607-vjdsv941mns4e04jlqpp8o18jt65clm8:/login-callback';

    try {
      const {error, data} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {redirectTo},
      });

      console.log('Supabase OAuth response:', {error, data});

      if (error) {
        Alert.alert('OAuth Error', error.message);
      } else if (data?.url) {
        console.log('OAuth URL:', data.url);
        Linking.openURL(data.url);
      } else {
        Alert.alert('No URL returned from Supabase.');
      }
    } catch (err) {
      console.error('OAuth Sign-in error:', err);
      Alert.alert('OAuth Error', String(err));
    }
  };

  return (
    <SafeAreaView style={AuthenticationStyles.main}>
      <Header />
      <Text style={AuthenticationStyles.heading}>Sign In</Text>

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

      <Button1 text="Sign In" onPress={handleSignIn} />
      <Button2
        text="Sign in with Google"
        imagePath={Images.googleIcon}
        onPress={handleSignInGoogle}
      />

      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
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

const styles = StyleSheet.create({});
export default SignIn;
