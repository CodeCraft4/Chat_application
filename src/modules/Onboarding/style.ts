import {COLORS, hp, wp} from '@enums';
import {StyleSheet} from 'react-native';

export const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.black,
      width: wp(100),
      height: hp(100),
      alignItems: 'center',
      position: 'relative',
    },
    insideContainer: {
      position: 'absolute',
      top: 60,
      alignItems: 'center',
    },
    title: {
      fontSize: 65,
      color: COLORS.white,
      width: wp(65),
      textAlign: 'left',
      fontWeight: '300',
    },
    insideTitle: {
      fontWeight: '600',
    },
    desc: {
      color: COLORS.gray,
      fontSize: 20,
      width: wp(75),
      letterSpacing: 1,
      lineHeight: 30,
    },
    exist: {
      color: COLORS.gray,
      fontSize: 16,
      letterSpacing: 0.5,
    },
    logIn: {
      color: COLORS.white,
      fontWeight: '500',
    },
  });
