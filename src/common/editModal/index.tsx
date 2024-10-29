import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, getRandomColor, hp, wp} from '@enums';
import {Spacer} from '../spacer';
import CopyIcon from 'react-native-vector-icons/Feather';

type Props = {
  visible: boolean;
  closeModal: any;
  index: number;
  user: any;
};
const EditModals = (props: Props) => {
  const {closeModal, visible, index, user} = props || {};
  console.log(user, 'user.');
  const avatarColor = getRandomColor();

  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      animationType="slide"
      transparent={true}
      key={index}>
      <View style={styles.modalContainer}>
        <View style={styles.insideContainer}>
          <TouchableOpacity style={styles.close} onPress={closeModal}>
            <CopyIcon name="x" size={30} color={COLORS.darkBlack} />
          </TouchableOpacity>
          <View >
            <Text style={[styles.avatar, {backgroundColor: avatarColor}]}>
              {user?.displayName[0].toUpperCase()}
            </Text>
            <Text style={styles.userName}>{user.displayName}</Text>
          </View>
          <Spacer height={hp(5)} />
        </View>
      </View>
    </Modal>
  );
};

export default EditModals;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.4)',
    height: hp(100),
  },
  insideContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: COLORS.white,
    top: hp(10),
    height: hp(90),
    width: wp(100),
    padding: wp(3),
  },
  avatar: {
    padding: hp(1),
    borderRadius: 50,
    width: wp(12),
    height: hp(6),
    textAlign: 'center',
    alignItems: 'center',
    fontSize: wp(6),
    color: COLORS.white,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.darkBlack,
  },
  close: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
