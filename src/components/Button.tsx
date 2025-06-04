import React from 'react';
import {
  View,
  TouchableOpacity,
  GestureResponderEvent,
  Text,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type ButtonProps = {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const Button1 = ({text, onPress}: ButtonProps) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667EEA', '#764BA2']}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const Button2 = ({text, onPress}: ButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.buttonPlain}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  gradient: {
    borderRadius: 8,
    width: '90%',
  },
  button: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPlain: {
    width: '90%',
    height: 64,
    backgroundColor: 'transparent',
    borderColor: '#9B7CF9',
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 24,
    fontFamily: 'Inter_18pt-Black',
  },
});

export {Button1, Button2};
