import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BackArrow, RecieveCallAvatar, UserAvatar} from '@assets';
import {COLORS, hp, SCREEN, wp} from '@enums';
import RecordIcon from 'react-native-vector-icons/MaterialIcons';
import VolumeIcon from 'react-native-vector-icons/Ionicons';
import VideoIcons from 'react-native-vector-icons/Feather';
import EndCall from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const RecievedCall = () => {
  const navigation: any = useNavigation();
  const [activeIcons, setActiveIcons] = useState([false, false, false]);

  const callAttachment = [
    <RecordIcon name="keyboard-voice" size={25} color={COLORS.white} />,
    <VolumeIcon name="volume-high-outline" size={25} color={COLORS.white} />,
    <VideoIcons name="video" size={25} color={COLORS.white} />,
    <VideoIcons name="message-circle" size={25} color={COLORS.white} />,
    <EndCall name="close" size={25} color={COLORS.white} />,
  ];

  const handleCallAttach = (index: number) => {
    if (index < 3) {
      // Toggle active state for first three icons
      const updatedActiveIcons = [...activeIcons];
      updatedActiveIcons[index] = !updatedActiveIcons[index];
      setActiveIcons(updatedActiveIcons);
    } else if (index === 3) {
      navigation.navigate(SCREEN.CHAT_SCREEN);
    } else if (index === 4) {
      navigation.navigate(SCREEN.CHAT_SCREEN);
    }
  };

  return (
    <View>
      <RecieveCallAvatar width={wp(100.7)} height={hp(106)} />
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate(SCREEN.CHAT_SCREEN)}>
        <BackArrow />
      </TouchableOpacity>
      <View style={styles.currentUser}>
        <UserAvatar width={wp(30)} height={wp(30)} />
      </View>
      <View style={styles.endAttach}>
        {callAttachment.map((item, index) => (
          <TouchableOpacity
            onPress={() => handleCallAttach(index)}
            style={[
              styles.icons,
              {
                backgroundColor:
                  index < 3 && activeIcons[index]
                    ? 'white'
                    : index === 3
                    ? COLORS.primary
                    : index === 4
                    ? 'red'
                    : COLORS.gray,
              },
            ]}
            key={index}>
            {React.cloneElement(item, {
              color:
                index < 3 && activeIcons[index]
                  ? 'black'
                  : index === 3 || index === 4
                  ? 'white'
                  : COLORS.white,
            })}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RecievedCall;

const styles = StyleSheet.create({
  back: {
    position: 'absolute',
    top: 20,
  },
  currentUser: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  endAttach: {
    position: 'absolute',
    bottom: 50,
    padding: hp(3),
    backgroundColor: COLORS.darkBlack,
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(100),
    justifyContent: 'space-around',
  },
  icons: {
    padding: hp(1),
    height: hp(7),
    width: wp(14),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
