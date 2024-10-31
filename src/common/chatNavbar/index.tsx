import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {BackArrow, UserDummyAvatar} from '@assets';
import {COLORS, hp, SCREEN, wp} from '@enums';
import Icon from 'react-native-vector-icons/Ionicons';
import VideoIcons from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import ClearChat from '../clearChatModal';

export const NavbarChat = ({userData}: any) => {
  const navigation: any = useNavigation();
  const [isModal, setIsModal] = useState(false);

  return (
    <View style={styles.navbar}>
      <View style={styles.leftSide}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.user}
          onPress={() => setIsModal(!isModal)}>
          {userData?.profileImg ? (
            <Image
              source={{uri: userData?.profileImg}}
              style={{width: wp(16), height: hp(8), borderRadius: wp(8)}}
            />
          ) : (
            <UserDummyAvatar width={wp(16)} height={hp(8)} />
          )}
          <View>
            <Text style={styles.userName}>{userData?.fullName}</Text>
            <Text>Active Now</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rightSide}>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN.SENDING_CALL)}>
          <Icon name="call-outline" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(SCREEN.RECIVED_CALL_SCREEN, {userData})
          }>
          <VideoIcons name="video" size={30} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      {isModal && (
        <ClearChat open={isModal} onClose={() => setIsModal(false)} users={userData} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    padding: hp(1),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    elevation: 10,
    shadowColor: COLORS.lightGray,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.darkBlack,
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },
});
