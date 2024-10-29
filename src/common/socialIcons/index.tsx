import {StyleSheet, View} from 'react-native';
import React from 'react';
import {FacebookIcon, GoogleIcon} from '@assets';
import {COLORS, hp, wp} from '@enums';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
  login?: boolean;
};
export const SocialIcons = (prop: Props) => {
  const {login} = prop || {};
  const social = [
    <FacebookIcon />,
    <GoogleIcon />,
    login ? (
      <Icon name="apple1" color={COLORS.black} size={30} />
    ) : (
      <Icon name="apple1" color={COLORS.white} size={30} />
    ),
  ];
  return (
    <View style={styles.container}>
      {social.map((item, index) => (
        <View
          key={index}
          style={[
            styles.social,
            {borderColor: login ? COLORS.black : COLORS.white},
          ]}>
          {item
            ? React.cloneElement(item, {width: wp(8), height: hp(4)})
            : null}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(80),
    gap: wp(5),
  },
  social: {
    padding: hp(2),
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 50,
  },
});
