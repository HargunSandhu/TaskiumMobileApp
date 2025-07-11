import React from 'react';
import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import Images from '../assets/Images';
import {Button1} from './Button';

type SuccessPopupProps = {
  visible: boolean;
  heading: string;
  message: string;
  btnText: string;
  onClose: () => void;
};

const SuccessPopUp: React.FC<SuccessPopupProps> = ({
  visible,
  message,
  heading,
  btnText,
  onClose,
}) => {
  return (
    <Modal animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Image
            source={{uri: Images.successTick}}
            style={{width: 130, height: 130}}
          />
          <Text style={styles.title}>{heading}</Text>
          <Text style={styles.message}>{message}</Text>
          <Button1 text={btnText} onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000DD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#141416',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '40%',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
  },
  message: {
    color: '#D0D0D0',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 12,
  },
});

export default SuccessPopUp;
