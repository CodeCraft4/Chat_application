import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {SeenAccount, Spacer, UserShareMedia} from '@common';
import {hp} from '@enums';
import {BackArrow} from '@assets';
import {useNavigation} from '@react-navigation/native';
import {fetchUserInfo} from '@appServices';

const Account = () => {
  const nav: any = useNavigation();
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
    <View style={styles().container}>
      <Spacer height={hp(4)} />
      <TouchableOpacity
        style={styles().backArrow}
        onPress={() =>
          nav.goBack()
        }>
        <BackArrow />
      </TouchableOpacity>
      <SeenAccount />
      <View style={styles().insideContainer}>
        <View>
          <Text style={styles().displayName}>Display Name</Text>
          <Text style={styles().userName}>{fullName ? fullName : ''}</Text>
        </View>
        <Spacer height={hp(2)} />
        <View>
          <Text style={styles().displayName}>Email Adress</Text>
          <Text style={styles().userName}>{email ? email : ''}</Text>
        </View>
        <Spacer height={hp(2)} />
        <View>
          <Text style={styles().displayName}>Adress</Text>
          <Text style={styles().userName}>{address ? address : ''}</Text>
        </View>
        <Spacer height={hp(2)} />
        <View>
          <Text style={styles().displayName}>Phone Nubmer</Text>
          <Text style={styles().userName}>
            {phoneNumber ? phoneNumber : ''}
          </Text>
        </View>
        <Spacer height={hp(2)} />
        <UserShareMedia />
      </View>
    </View>
  );
};

export default Account;
