import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, hp, wp} from '@enums';
import {useAuth} from '@contexts';
import {clearMssgeChat} from '@appServices';
import {Spacer} from '../spacer';

type Props = {
  open: boolean;
  onClose: () => void;
};
export const SuccessModal = (props: Props) => {
  const {open, onClose} = props || {};
  const {user} = useAuth();

  const handleClearChat = () => {
    clearMssgeChat(user);
    onClose();
  };

  return (
    <Modal visible={open} onRequestClose={onClose} transparent={true}>
      <View style={styles.modal}>
        <View style={styles.modalDev}>
          <Text style={styles.text}>Are you sure to clear chart?</Text>
          <View style={styles.BtnDev}>
            <TouchableOpacity style={styles.Btn} onPress={handleClearChat}>
              <Text style={styles.BtnText}>Clear Chat</Text>
            </TouchableOpacity>
            <Spacer />
            <TouchableOpacity
              style={[styles.Btn, {backgroundColor: COLORS.gray}]}
              onPress={onClose}>
              <Text style={styles.BtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    height: hp(100),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDev: {
    width: wp(90),
    height: hp(20),
    borderRadius: 6,
    backgroundColor: COLORS.white,
    padding: hp(2),
    textAlign: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: wp(6),
    top: hp(2),
    color: COLORS.black,
    fontWeight: '600',
  },
  BtnDev: {
    flexDirection: 'row',
    top: hp(6),
  },
  Btn: {
    backgroundColor: 'red',
    padding: hp(2),
    borderRadius: 30,
    width: wp(30),
    alignItems: 'center',
  },
  BtnText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
});
