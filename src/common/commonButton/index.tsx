import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, hp, wp} from '@enums';

type Props = {
  bgcolor?: string;
  title: string;
  onPress?: () => void | boolean;
  disabled?: boolean;
};
export const CommonBtn = (props: Props) => {
  const {bgcolor, title, onPress, disabled} = props || {};
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btn,
        {backgroundColor: bgcolor ? bgcolor : COLORS.white},
        disabled && styles.disabledBtn,
      ]}>
      <Text style={[styles.btnText, {color: bgcolor ? COLORS.white : COLORS.gray}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CommonBtn;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.white,
    padding: hp(2),
    borderRadius: 25,
    alignItems: 'center',
    width: wp(75),
  },
  btnText: {
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: '600',
  },
  disabledBtn: {
    cursor: 'auto',
  },
});
