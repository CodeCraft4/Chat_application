import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, hp, wp} from '@enums';
import {UserDummyAvatar} from '@assets';
import Icons from 'react-native-vector-icons/AntDesign';
import CommonBtn from '../commonButton';
import {clearMssgeChat} from '@appServices';
import {useAuth} from '@contexts';

type Props = {
  open: boolean;
  onClose: () => void;
  users: any;
};
const ClearChat = (props: Props) => {
  const {open, onClose, users} = props || {};
  const {user} = useAuth();

  const handleClearChat = () => {
    clearMssgeChat(user);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <Modal
      visible={open}
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}>
      <View style={styles.modal}>
        <View style={styles.inSideModal}>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Icons name="close" size={30} color={COLORS.white} />
          </TouchableOpacity>
          {users?.profileImg ? (
            <Image source={{uri: users?.profileImg}} style={styles.profile} />
          ) : (
            <UserDummyAvatar width={wp(16)} height={hp(8)} />
          )}

          <View style={styles.BtnBox}>
            <CommonBtn
              title="Clear Chat"
              bgcolor={'red'}
              onPress={handleClearChat}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ClearChat;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  inSideModal: {
    backgroundColor: COLORS.white,
    height: hp(50),
    marginTop: hp(50),
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  profile: {
    width: wp(100),
    height: hp(32),
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 99,
  },
  BtnBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 'auto',
  },
});
