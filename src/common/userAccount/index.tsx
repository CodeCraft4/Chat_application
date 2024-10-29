import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {QRCode} from '@assets';
import {COLORS, hp, SCREEN, wp} from '@enums';
import {fetchUserInfo} from '@appServices';
import {useNavigation} from '@react-navigation/native';

export const UserAccount = () => {
  const navigation: any = useNavigation();
  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [address, setAddress] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);

  const [bio, setbio] = useState<string | null>(null);
  console.log(email, address, phoneNumber, bio);

  useEffect(() => {
    fetchUserInfo(
      setEmail,
      setFullName,
      setPhoneNumber,
      setAddress,
      setbio,
      setProfileImageUri,
    );
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN.ACCOUNT_SCREEN)}>
          {profileImageUri ? (
            <Image source={{uri: profileImageUri}} style={styles.uploadImg} />
          ) : (
            <Text style={styles.avatar}>?</Text>
          )}
        </TouchableOpacity>
        <View>
          <Text style={styles.userName}>{fullName ? fullName : ''}</Text>
          <Text>{bio ? bio : ''}</Text>
        </View>
      </View>
      <QRCode />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mssgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(3),
  },
  user: {
    position: 'relative',
    flexDirection: 'row',
    gap: wp(2),
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.darkBlack,
  },
  uploadImg: {
    width: wp(16),
    height: hp(8),
    borderRadius: 40,
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
});
