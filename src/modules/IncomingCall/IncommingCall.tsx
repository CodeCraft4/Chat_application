import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, hp, SCREEN, wp} from '@enums';
import {CallAvatar} from '@assets';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Spacer} from '@common';
import Icon from 'react-native-vector-icons/Ionicons';
import MessageIcons from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const IncomingCall = () => {
  const navigation: any = useNavigation();

  const handleAnswerCall = () => {
    setTimeout(() => {
      navigation.navigate(SCREEN.RECIVED_CALL_SCREEN);
    }, 1000);
  };

  const renderLeftActions = () => (
    <View style={styles.answerAction}>
      <View style={styles.toSlide}>
        <TouchableOpacity style={styles.slideToAnswer}>
          <Icon name="call" size={30} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.call}>Waiting...</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View>
          <CallAvatar />
          <Spacer height={hp(1.5)} />
          <Text style={styles.title}>John Dev</Text>
          <Spacer height={hp(0.5)} />
          <Text style={styles.call}>Incoming call</Text>
        </View>
      </View>
      <View style={styles.option}>
        <TouchableOpacity style={styles.icons}>
          <Icon name="alarm-outline" size={30} color={COLORS.white} />
          <Spacer />
          <Text style={styles.call}>Remind me</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icons}
          onPress={() => navigation.navigate(SCREEN.CHAT_SCREEN)}>
          <MessageIcons name="message1" size={30} color={COLORS.white} />
          <Spacer />
          <Text style={styles.call}>Message</Text>
        </TouchableOpacity>
      </View>
      <Spacer height={hp(7)} />

      {/* Swipeable Slide to Answer */}
      <View style={styles.slide}>
        <Swipeable
          renderLeftActions={renderLeftActions}
          onSwipeableLeftOpen={handleAnswerCall}>
          <View style={styles.toSlide}>
            <TouchableOpacity style={styles.slideToAnswer}>
              <Icon name="call" size={30} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.call}>Slide to answer</Text>
          </View>
        </Swipeable>
      </View>

      <Spacer height={hp(3)} />
    </View>
  );
};

export default IncomingCall;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    height: hp(100),
  },
  container2: {
    backgroundColor: COLORS.black,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: COLORS.white,
    fontWeight: '800',
  },
  call: {
    color: COLORS.lightGray,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icons: {
    alignItems: 'center',
  },
  toSlide: {
    padding: hp(1),
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: wp(80),
    flexDirection: 'row',
    margin: 'auto',
    borderRadius: 50,
    alignItems: 'center',
    gap: wp(4),
  },
  slide: {
    padding: hp(1),
    width: wp(80),
    flexDirection: 'row',
    margin: 'auto',
    borderRadius: 50,
    alignItems: 'center',
    gap: wp(4),
  },
  slideToAnswer: {
    padding: hp(1),
    backgroundColor: COLORS.black,
    borderRadius: 50,
  },
  answerAction: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(80),
    borderRadius: 50,
  },
  answerText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
