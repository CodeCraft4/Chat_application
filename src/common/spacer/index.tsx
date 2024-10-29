import {View} from 'react-native';
import React from 'react';
import {hp, wp} from '@enums';

export const Spacer = ({height = hp(1), width = wp(2), style}: any) => {
  return <View style={[{height, width}, style]} />;
};
