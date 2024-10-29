import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SearchBar, Spacer, UserAccount} from '@common';
import {COLORS, hp, SCREEN, wp} from '@enums';
import {styles} from './style';
import KeyIcon from 'react-native-vector-icons/Ionicons';
import MessageIcons from 'react-native-vector-icons/AntDesign';
import HelpIcon from 'react-native-vector-icons/Feather';
import NotificationIcons from 'react-native-vector-icons/MaterialIcons';
import StorageIcon from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const navigation:any = useNavigation();
  const settingAcc = [
    {
      poster: <KeyIcon name="key-outline" size={30} color={COLORS.gray} />,
      title: 'Account',
      description: 'aldkjfalkjfd;;',
    },
    {
      poster: <MessageIcons name="message1" size={30} color={COLORS.gray} />,
      title: 'Messages',
      description: 'lajfklajdf;alkdfjghjkhhhhhhhhh',
    },
    {
      poster: (
        <NotificationIcons
          name="notifications-none"
          size={30}
          color={COLORS.black}
        />
      ),
      title: 'Notifications',
      description: 'lajfklajdf;alkdfj',
    },
    {
      poster: <HelpIcon name="help-circle" size={30} color={COLORS.gray} />,
      title: 'Helps',
      description: 'lajfklajdf;alkdfjadfadf',
    },
    {
      poster: (
        <StorageIcon name="window-restore" size={30} color={COLORS.gray} />
      ),
      title: 'Contact',
      description: 'lajfklajdf;alkdfjadadddd',
    },
    {
      poster: <HelpIcon name="users" size={30} color={COLORS.gray} />,
      title: 'Location',
      description: 'lajfklajdf;alkdfj',
    },
  ];
  return (
    <View style={styles().container}>
      <SearchBar page="Setting" setting={true}/>
      <Spacer height={hp(5)} />
      <View style={styles().insideContianer}>
        <Text style={styles().title}>Setting</Text>
        <Spacer height={hp(3)} />
        <UserAccount />
        <Spacer height={hp(2)} />
        {settingAcc.map((item, index) => (
          <TouchableOpacity
            style={styles().media}
            key={index}
            onPress={() => navigation.navigate(SCREEN.ACCOUNT_SCREEN)}>
            <View style={styles().poster}>{item.poster}</View>
            <Spacer width={wp(6)} />
            <View>
              <Text style={styles().title}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Settings;
