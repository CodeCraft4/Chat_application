import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, hp, SCREEN, wp} from '@enums';
import {CallAvatar} from '@assets';
import {Spacer} from '@common';
import EndCall from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const SendingCall = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View>
          <CallAvatar />
          <Spacer height={hp(1.5)} />
          <Text style={styles.title}>John Dev</Text>
          <Spacer height={hp(0.5)} />
          <Text style={styles.call}>Sending call</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.icons}
        onPress={() => navigation.navigate(SCREEN.CHAT_SCREEN)}>
        <EndCall name="close" size={25} color={COLORS.white} />
      </TouchableOpacity>
      <Spacer height={hp(3)} />
    </View>
  );
};

export default SendingCall;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    height: hp(100),
  },
  container2: {
    backgroundColor: COLORS.black,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: COLORS.white,
    fontWeight: '800',
  },
  call: {
    color: COLORS.lightGray,
    textAlign: 'center',
  },
  icons: {
    padding: hp(2),
    width: wp(24),
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'red',
    margin: 'auto',
    textAlign: 'center',
  },
});
