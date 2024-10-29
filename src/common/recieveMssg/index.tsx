import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {UserDummyAvatar} from '@assets';
import {COLORS, hp, wp} from '@enums';
import Icons from 'react-native-vector-icons/FontAwesome';

type Props = {
  mssgeText: string;
  userdata: any;
  time: any;
};

export const ReciveMssg = (props: Props) => {
  const {mssgeText, userdata, time} = props || {};
  return (
    <View>
      <View style={styles.user}>
        {userdata?.profileImg ? (
          <Image
            source={{uri: userdata?.profileImg}}
            style={{width: wp(12), height: hp(6), borderRadius: wp(8)}}
          />
        ) : (
          <UserDummyAvatar width={wp(16)} height={hp(8)} />
        )}
        <View style={styles.userStatus}>
          <Icons name="circle" color="#0FE16D" />
        </View>
        <View>
          <Text style={styles.userName}>{userdata?.fullName}</Text>
        </View>
      </View>
      <View style={styles.message}>
        <Text style={styles.mssgText}>{mssgeText}</Text>
      </View>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    gap: wp(3),
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkBlack,
    marginTop: 3,
  },
  userStatus: {
    position: 'absolute',
    bottom: 0,
    left: 35,
  },
  message: {
    left: wp(14),
    top: hp(-1),
    backgroundColor: COLORS.lightestGray,
    padding: hp(2),
    width: wp(70),
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  mssgText: {
    color: COLORS.black,
    fontWeight: '500',
    letterSpacing: 0.4,
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlign: 'center',
    marginLeft: wp(15),
    fontWeight: '700',
  },
});
