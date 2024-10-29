import {StyleSheet, View} from 'react-native';
import React from 'react';
import {StartLogo} from '@assets';
import {hp} from '@enums';

const StartScreen = () => {
  return (
    <View style={styles.container}>
      <StartLogo />
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(100),
  },
});
