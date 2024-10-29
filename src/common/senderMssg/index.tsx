import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, hp, wp} from '@enums';
import {Spacer} from '../spacer';

type SenderMessageProps = {
  mssgeText: string;
  time: string;
};

export const SenderMessge: React.FC<SenderMessageProps> = ({
  mssgeText,
  time,
}) => {
  return (
    <View style={styles.mssgContainer}>
      <View>
        <View style={styles.message}>
          <Text style={styles.mssgText}>{mssgeText}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
        <Spacer height={hp(2)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mssgContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  message: {
    backgroundColor: COLORS.primary,
    padding: hp(2),
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    width: wp(60),
  },
  mssgText: {
    color: COLORS.white,
    fontWeight: '500',
    letterSpacing: 0.4,
  },
  time: {
    textAlign: 'right',
    marginRight: wp(5),
    fontWeight: '700',
  },
});
