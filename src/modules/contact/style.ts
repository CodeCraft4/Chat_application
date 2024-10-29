import {COLORS, hp} from '@enums';
import {StyleSheet} from 'react-native';

export const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.darkBlack,
      height: hp(100),
    },
    insideContianer: {
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: COLORS.white,
      height: hp(100),
      padding: hp(2),
      flex: 1,
    },
    title: {
      fontSize: 22,
      fontWeight: '600',
      color: COLORS.darkBlack,
    },
  });
