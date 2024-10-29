import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BackArrow, RecieveCallAvatar} from '@assets';
import {COLORS, hp, SCREEN, wp} from '@enums';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import SendIocn from 'react-native-vector-icons/FontAwesome';

const UserStatuses = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <RecieveCallAvatar width={wp(100.5)} height={hp(106)} />
      <View style={styles.commentSec}>
        <View style={styles.inputFeilds}>
          <TextInput placeholder="comment on status" style={styles.input} />
          <TouchableOpacity style={styles.submitBtn}>
            <SendIocn name="send-o" size={25} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.back}
        onPress={() =>
          navigation.navigate('Bottom_tab', {screen: SCREEN.HOME_SCREEN})
        }>
        <BackArrow width={wp(8)} height={hp(8)} />
      </TouchableOpacity>
    </View>
  );
};

export default UserStatuses;

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    flex: 1,
  },
  commentSec: {
    position: 'absolute',
    bottom: 0,
    width: wp(100),
  },
  inputFeilds: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    backgroundColor: 'rgba(0,0,0,.8)',
    padding: hp(1),
  },
  input: {
    width: wp(85),
    backgroundColor: COLORS.lightGray,
    borderRadius: 30,
    padding: hp(1.5),
  },
  submitBtn: {
    padding: hp(1),
    backgroundColor: COLORS.primary,
    borderRadius: 30,
  },
  back: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
