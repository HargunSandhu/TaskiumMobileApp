import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const Intro = () => {
    console.log('Intro Screen Loaded');
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Intro</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fills the screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#f00', // White background
  },
  text: {
    color: 'black',
    fontSize: 24,
  },
});

export default Intro;
