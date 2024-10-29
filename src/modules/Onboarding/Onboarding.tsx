import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';
import {BgGradient, Logo1, OrTextLine} from '@assets';
import {hp, SCREEN, wp} from '@enums';
import {CommonBtn, SocialIcons, Spacer} from '@common';
import {useNavigation} from '@react-navigation/native';

const Onboarding = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles().container}>
      <BgGradient widtth={wp(250)} height={hp(100)} />
      <View style={styles().insideContainer}>
        <Logo1 />
        <Spacer height={hp(5)} />
        <Text style={styles().title}>
          Connect friends{' '}
          <Text style={styles().insideTitle}>easily & quickly </Text>
        </Text>
        <Spacer height={hp(3)} />
        <Text style={styles().desc}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </Text>
        <Spacer height={hp(3)} />
        <SocialIcons />
        <Spacer height={hp(3)} />
        <OrTextLine />
        <Spacer height={hp(3)} />
        <CommonBtn
          title="sign up with email"
          onPress={() => navigation.navigate(SCREEN.SIGNUP_SCREEN)}
        />
        <Spacer height={hp(3)} />
        <Text style={styles().exist}>
          Existing account?
          <Text
            style={styles().logIn}
            onPress={() => navigation.navigate(SCREEN.LOGIN_SCREEN)}>
            {' '}
            Log in{' '}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Onboarding;
