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

const SignIn = () => {
  return (
    <SafeAreaView style={styles.main}>
      <Header />
      <Text style={styles.heading}>Sign In</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#6E6E7A"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#6E6E7A"
        style={[styles.input, {marginBottom: 40}]}
      />

      <Button1 text="Sign In" />
      <Button2 text="Sign in with Google" imagePath={Images.googleIcon} />

      <View>
        <TouchableOpacity>
          <Text style={styles.text}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.text}>Already have an account? </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Poppins',
    fontSize: 48,
    color: '#fff',
    fontWeight: '800',
    marginBottom: 30,
  },
  main: {
    backgroundColor: '#0b0b0f',
    height: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#16161D',
    borderColor: '#23232B',
    borderRadius: 8,
    borderWidth: 1,
    width: '85%',
    height: 50,
    color: '#fff',
    marginBottom: 20,
    fontSize: 20,
    paddingLeft: 14,
  },
  text: {
    color: '#9A9A9F',
    textAlign: 'center',
    fontSize: 20,
  },
  signUpText: {
    color: '#9B7CF9',
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

});
export default SignIn;
