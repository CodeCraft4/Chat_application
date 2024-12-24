import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {UserDummyAvatar} from '@assets';
import {COLORS, hp, wp} from '@enums';
import Icons from 'react-native-vector-icons/FontAwesome';
import {Swipeable} from 'react-native-gesture-handler';
import {useAuth} from '@contexts';

export const UserMessages = ({user, latestMssg, unreadCount}: any) => {
  const {uid: myId}:any = useAuth() || {};

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
              {user?.fullName ? user?.fullName : 'Unknown user'}
            </Text>
            <Text>
              {latestMssg.text ? latestMssg.text : 'No messages yet'}
            </Text>
          </View>
        </View>

        {/* Display the count of unread messages */}
        {unreadCount > 0 && (
          <View style={styles.notificationContainer}>
            <Text style={styles.notification}>{unreadCount}</Text>
              <Text>{myId === latestMssg.senderId ? '' : 'you'}</Text>
          </View>
        )}
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
  notificationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification: {
    backgroundColor: '#F04A4C',
    textAlign: 'center',
    borderRadius: 50,
    width: wp(6),
    height: hp(3),
    color: COLORS.white,
    fontWeight: '900',
    paddingVertical: hp(0.2),
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
