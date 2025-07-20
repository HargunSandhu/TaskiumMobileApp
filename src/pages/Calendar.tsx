import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';

const Calendar = () => {
  return (
    <View style={styles.main}>
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center', paddingBottom: 100}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.logo}>
          <Header />
        </View>
        <Text style={styles.heading}>Calendar</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#0B0B0F',
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    marginTop: 10,
    marginBottom: 10,
  },
  heading: {
    fontFamily: 'Poppins',
    fontSize: 42,
    color: '#ffffff',
    fontWeight: '800',
    marginBottom: 40,
  },
});

export default Calendar;
