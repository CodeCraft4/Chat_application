import {COLORS, hp, wp} from '@enums';
import {StyleSheet} from 'react-native';

export const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.white,
      height: hp(100),
      padding: hp(2),
    },
    insideContainer: {
      width: wp(90),
      alignItems: 'center',
      textAlign: 'center',
    },
    title: {
      fontWeight: '700',
      color: COLORS.black,
      fontSize: 25,
      textAlign: 'center',
    },
    desc: {
      fontSize: 18,
      textAlign: 'center',
      width: wp(80),
    },
    or: {
      color: COLORS.black,
      fontWeight: '700',
    },
    forget: {
      color: COLORS.primary,
      fontWeight: '700',
      fontSize: 16,
    },
  });
