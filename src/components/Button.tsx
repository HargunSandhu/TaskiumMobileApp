import React from 'react';
import {
  View,
  TouchableOpacity,
  GestureResponderEvent,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type {DimensionValue, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type ButtonProps = {
  text: string;
  width?: DimensionValue;
  height?: DimensionValue;
  onPress?: (event: GestureResponderEvent) => void;
  justifyContent?: ViewStyle['justifyContent'];
  imagePath?: string; 
  imageSize?: number,
};

const Button1 = ({
  text,
  onPress,
  width = '90%',
  height = 64,
  justifyContent = 'center',
}: ButtonProps) => {
  return (
    <View style={[styles.container, {justifyContent}]}>
      <LinearGradient
        colors={['#667EEA', '#764BA2']}
        style={[styles.gradient, {width, height}]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const Button2 = ({
  text,
  onPress,
  imagePath,
imageSize=30,
}: ButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.buttonPlain}>
        <View style={styles.row}>
          {imagePath && <Image source={{uri: imagePath}} style={{marginRight: 12}} width={imageSize} height={imageSize} />}
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    // marginHorizontal: 6,
    width: '100%',
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {Button1, Button2};
