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
    },
    title: {
      fontSize: 22,
      fontWeight: '600',
      color: COLORS.black,
    },
    media: {
      flexDirection: 'row',
      marginVertical: hp(2),
      alignItems: 'center',
    },
    poster: {
      padding: hp(1.5),
      backgroundColor: COLORS.lightGray,
      borderRadius: 30,
    },
  });
