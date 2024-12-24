import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, hp, wp} from '@enums';
import {UserDummyAvatar} from '@assets';
import Icons from 'react-native-vector-icons/AntDesign';
import CommonBtn from '../commonButton';
import {SuccessModal} from '../AlertModal';

type Props = {
  open: boolean;
  onClose: () => void;
  users: any;
};
const ClearChat = (props: Props) => {
  const {open, onClose, users} = props || {};
  const [successModal, setSuccessModal] = useState<boolean>(false);

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
              onPress={() => setSuccessModal(!successModal)}
            />
          </View>
        </View>
      </View>

      {successModal && (
        <SuccessModal
          open={successModal}
          onClose={() => setSuccessModal(false)}
        />
      )}
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
