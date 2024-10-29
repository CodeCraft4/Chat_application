import {COLORS, hp, wp} from '@enums';
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
      padding: hp(2),
    },
    messages: {
      padding: hp(1),
      flex: 1,
    },
    displayName: {
      fontSize: 16,
      fontWeight: '400',
    },
    edits: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    editIcons: {
      position: 'absolute',
      bottom: 10,
      right: 0,
    },
    userName: {
      padding: hp(1),
      fontWeight: '600',
      color: COLORS.darkBlack,
      fontSize: 20,
    },
    editUser: {
      padding: hp(1),
      fontWeight: '600',
      color: COLORS.primary,
      fontSize: 16,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.primary,
      width: wp(92),
    },
    backArrow: {
      padding: hp(1),
      backgroundColor: COLORS.white,
      borderRadius: 10,
      width: wp(10),
    },
    updateBtn: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: wp(90),
      alignItems: 'center',
    },
  });
