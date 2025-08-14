import React, {useState} from 'react';
import {Image, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Images from '../assets/Images';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types';
import {supabase} from '../lib/supaBaseClient';
import SuccessModal from './SuccessModal';

type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainScreen'
>;

const AppMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<MainScreenNavigationProp>();
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleRefresh = () => {
    setMenuVisible(false);
    navigation.replace('MainScreen');
  };

  const handleSignOut = async () => {
    setMenuVisible(false);
    const {error} = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      setSuccessModalVisible(true);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Image source={{uri: Images.hamburger}} style={styles.hamburgerIcon} />
      </TouchableOpacity>

      <Modal
        isVisible={menuVisible}
        onBackdropPress={() => setMenuVisible(false)}
        backdropOpacity={0.3}
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={styles.modal}>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={handleRefresh}>
            <Image source={{uri: Images.refreshIcon}} style={styles.menuIcon} />
            <Text style={styles.menuText}>Refresh</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
            <Image source={{uri: Images.logOutIcon}} style={styles.menuIcon} />
            <Text style={styles.menuText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <SuccessModal
        visible={successModalVisible}
        title="Signed Out"
        message="You have been signed out."
        onClose={() => {
          setSuccessModalVisible(false);
          navigation.navigate('Intro');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  hamburgerIcon: {
    width: 30,
    height: 30,
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  modal: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    margin: 0,
    paddingTop: 50,
    paddingRight: 10,
  },
  menuContainer: {
    backgroundColor: '#111114',
    borderRadius: 8,
    paddingVertical: 5,
    minWidth: 170,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default AppMenu;
