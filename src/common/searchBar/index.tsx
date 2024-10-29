import {fetchUserInfo} from '@appServices';
import {BackArrow} from '@assets';
import {COLORS, hp, SCREEN, wp} from '@enums';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import User from 'react-native-vector-icons/EvilIcons';

type Props = {
  page: string;
  setting?: boolean;
};
export const SearchBar = (props: Props) => {
  const {page, setting} = props || {};
  const navigation: any = useNavigation();
  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [bio, setbio] = useState<string | null>(null);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  console.log(profileImageUri);
  console.log(bio);

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
  return (
    <View style={styles.searchBox}>
      {setting ? (
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.search}
          onPress={() => navigation.goBack()}>
          <Icon name="search1" size={30} color={COLORS.white} />
        </TouchableOpacity>
      )}

      <Text style={styles.page}>{page}</Text>
      {setting ? (
        <Text>jl</Text>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN.ACCOUNT_SCREEN)}>
          <View>
            {profileImageUri ? (
              <Image source={{uri: profileImageUri}} style={styles.uploadImg} />
            ) : (
              <User name="user" />
            )}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    padding: hp(1),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  search: {
    padding: hp(1),
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 30,
  },
  page: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 25,
  },
  backArrow: {
    padding: hp(1),
    backgroundColor: COLORS.white,
    borderRadius: 10,
    top: 5,
  },
  uploadImg: {
    width: wp(12),
    height: hp(6),
    borderRadius: 40,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
});
