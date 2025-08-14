import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Modal from 'react-native-modal';
import Images from '../assets/Images';
import {Button1} from './Button';

interface StatusModalProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  iconUri?: string;
}

const SuccessModal: React.FC<StatusModalProps> = ({
  visible,
  title,
  message,
  onClose,
  iconUri,
}) => {
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.5}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackdropPress={onClose}
      useNativeDriver>
      <View style={styles.container}>
        <Image
          source={{uri: iconUri || Images.gradientTick}}
          style={styles.icon}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        <Button1 text="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1B1B23',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  message: {
    fontSize: 24,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default SuccessModal;
