import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {UserDummyAvatar} from '@assets';
import {COLORS, hp, wp} from '@enums';
import Icons from 'react-native-vector-icons/FontAwesome';
import {Swipeable} from 'react-native-gesture-handler';

export const UserMessages = ({user}: any) => {
  const renderRightActions = () => {
    return (
      <View style={styles.rightActionContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Icons name="bell" size={20} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Icons name="trash" size={20} color={'red'} />
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.mssgContainer}>
        <View style={styles.user}>
        {user?.profileImg ? (
            <Image
              source={{uri: user?.profileImg}}
              style={{width: wp(16), height: hp(8), borderRadius: wp(8)}}
            />
          ) : (
            <UserDummyAvatar width={wp(16)} height={hp(8)} />
          )}
          <View style={styles.userStatus}>
            <Icons name="circle" color="#0FE16D" />
          </View>
          <View>
            <Text style={styles.userName}>
              {user?.fullName ? user?.fullName : 'Unknow user'}
            </Text>
            <Text>Latest message?</Text>
          </View>
        </View>

        <View>
          <Text>2 min ago</Text>
          <Text style={styles.notification}>3</Text>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
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
  userStatus: {
    position: 'absolute',
    bottom: 4,
    left: 49,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.darkBlack,
  },
  notification: {
    backgroundColor: '#F04A4C',
    textAlign: 'center',
    borderRadius: 50,
    width: wp(6),
    height: hp(3),
    alignItems: 'center',
    padding: hp(0.2),
    color: COLORS.white,
    fontWeight: '900',
    flexDirection: 'row',
    margin: 'auto',
  },
  rightActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: wp(2),
  },
  iconContainer: {
    marginHorizontal: wp(2),
  },
});
