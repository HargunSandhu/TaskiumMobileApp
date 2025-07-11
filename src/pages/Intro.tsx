import React from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import Header from '../components/Header';
import { Button1 } from '../components/Button';
import { useNavigation } from '@react-navigation/native'; 
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types';

const Intro = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <Header />
        <Text style={styles.tagline}>Turn plans into progress.</Text>
      </View>

      <Text style={styles.description}>
        Stay organized, focused, and in control — all in one simple app.
      </Text>

      <Button1 text="Get Started" width="100%" height={64} onPress={() => navigation.navigate('SignIn')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0f',
    paddingTop: 180,
    paddingBottom: 40,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  topSection: {
    alignItems: 'center',
  },
  tagline: {
    marginTop: 12,
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  description: {
    color: 'white',
    fontSize: 24,
    marginBottom: 60,
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: 600,
    fontFamily: "Poppins",
  },
});

export default Intro;
