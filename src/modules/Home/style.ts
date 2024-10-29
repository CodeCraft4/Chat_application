import {COLORS, hp} from '@enums';
import {StyleSheet} from 'react-native';

export const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.darkBlack,
      height: hp(100),
    },
    insideContainer: {
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: COLORS.white,
      height: hp(70),
      padding: hp(0.5),
    },
    messages: {
      padding: hp(1),
      flex: 1,
    },
  });
