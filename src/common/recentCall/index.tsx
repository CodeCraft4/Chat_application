import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {UserProfile} from '@assets';
import {COLORS, hp, wp} from '@enums';
import MissedCall from 'react-native-vector-icons/SimpleLineIcons';
import PhoneCall from 'react-native-vector-icons/Feather';

export const UserRecentCall = (props: any) => {
  const {index, item} = props;
  console.log(item, '---');
  return (
    <View>
      <TouchableOpacity style={styles.mssgContainer}>
        <View style={styles.user}>
          <UserProfile width={wp(16)} height={hp(8)} />
          <View>
            <Text style={styles.userName}>Alex Andrison</Text>
            <Text>
              <MissedCall
                name="call-in"
                size={15}
                color={index === 3 || index === 5 ? 'red' : COLORS.primary}
              />{' '}
              Today 9:20 AM
            </Text>
          </View>
        </View>

        <View style={styles.call}>
          <PhoneCall name="phone-call" size={25} />
          <PhoneCall name="video" size={25} />
        </View>
      </TouchableOpacity>
    </View>
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
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.darkBlack,
  },
  call: {
    flexDirection: 'row',
    gap: wp(4),
    alignItems: 'center',
  },
});
