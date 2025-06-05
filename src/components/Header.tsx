import React from 'react';
import {Image, SafeAreaView, View, StyleSheet} from 'react-native';
import Images from '../assets/Images';

const Header = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={{uri: Images.logo}} style={styles.logo} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 302,
    height: 93,
    resizeMode: 'contain',
  },
});

export default Header;
