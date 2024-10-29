import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {COLORS, hp, SCREEN, wp} from '@enums';
import VideoIcons from 'react-native-vector-icons/Feather';
import CallIcon from 'react-native-vector-icons/Ionicons';
import UserEditIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditIcon from 'react-native-vector-icons/AntDesign';
import {Spacer} from '../spacer';
import {fetchUserInfo, openGallery} from '@appServices';
import {useNavigation} from '@react-navigation/native';
import User from 'react-native-vector-icons/EvilIcons';

type Props = {
  edit?: boolean;
};

export const SeenAccount = (props: Props) => {
  const {edit} = props || {};
  const navigation: any = useNavigation();
  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [address, setAddress] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [bio, setbio] = useState<string | null>(null);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);

  const userAccount = [
    <VideoIcons name="message-circle" size={25} color={COLORS.white} />,
    <VideoIcons name="video" size={25} color={COLORS.white} />,
    <CallIcon name="call-outline" size={30} color={COLORS.white} />,
    <UserEditIcon name="account-edit-outline" size={30} color={COLORS.white} />,
  ];

  useEffect(() => {
    fetchUserInfo(
      setEmail,
      setFullName,
      setAddress,
      setPhoneNumber,
      setbio,
      setProfileImageUri,
    );
  }, []);

  const handlePageControl = (index: number) => {
    index === 0 && navigation.navigate(SCREEN.CHAT_SCREEN);
    index === 1 && navigation.navigate(SCREEN.RECIVED_CALL_SCREEN);
    index === 2 &&
      navigation.navigate('Bottom_tab', {screen: SCREEN.CALL_SCREEN});
    index === 3 && navigation.navigate(SCREEN.EDITS_ACCOUNT);
  };

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        {edit ? (
          <TouchableOpacity style={styles.eidtProfile}>
            {profileImageUri ? (
              <Image source={{uri: profileImageUri}} style={styles.uploadImg} />
            ) : (
              <View style={styles.uploadImg}>
                <User name="user" width={wp(25)} height={hp(15)} />
              </View>
            )}
            <TouchableOpacity
              onPress={() => openGallery(setProfileImageUri)}
              style={styles.editIcn}>
              <EditIcon name="edit" size={25} color={COLORS.lightGray} />
            </TouchableOpacity>
          </TouchableOpacity>
        ) : profileImageUri ? (
          <Image source={{uri: profileImageUri}} style={styles.uploadImg} />
        ) : (
          <View style={styles.uploadImg}>
            <User name="user" width={wp(25)} height={hp(5)} />
          </View>
        )}

        <Spacer />
        <Text style={styles.userName}>{fullName ? fullName : ''}</Text>
        <Text style={styles.email}>{email ? email : ''}</Text>
      </View>
      <Spacer height={hp(30)} />
      {edit ? null : (
        <View style={styles.endAttach}>
          {userAccount.map((item, index) => (
            <TouchableOpacity
              style={styles.icons}
              key={index}
              onPress={() => handlePageControl(index)}>
              {item}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 'auto',
    textAlign: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
  },
  user: {
    alignItems: 'center',
  },
  email: {
    fontSize: 15,
    color: COLORS.gray,
  },
  endAttach: {
    position: 'absolute',
    bottom: 0,
    padding: hp(3),
    backgroundColor: COLORS.darkBlack,
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(100),
    justifyContent: 'space-around',
  },
  icons: {
    padding: hp(1),
    backgroundColor: '#051D13',
    height: hp(7),
    width: wp(14),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eidtProfile: {
    width: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(10),
  },
  editIcn: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
    width: wp(25),
    textAlign: 'center',
    flex: 1,
    padding: hp(4),
  },
  uploadImg: {
    width: wp(20),
    height: hp(10),
    borderRadius: 40,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
});
