import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {SearchBar, Spacer, UserMessages, UserStatus} from '@common';
import {hp, SCREEN} from '@enums';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {fetchAllUsers, fetchMessage} from '@appServices';
import {useAuth} from '@contexts';

const Home = () => {
  const navigation: any = useNavigation();
  const {user} = useAuth();
  const myId = user;
  const [users, setUsers] = useState<any>([]);
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    fetchAllUsers(setUsers);
    fetchMessage(setMessages, myId);
  }, [user, myId]);

  return (
    <View style={styles().container}>
      <SearchBar page="Home" />
      <Spacer height={hp(4)} />
      <UserStatus />
      <View style={styles().insideContainer}>
        <ScrollView style={styles().messages}>
          {users.map((userData, i) => {
            const latestMssg =
              messages.find(
                m => m.senderId === userData.id || m.receiverId === userData.id,
              ) || {};

            const unreadCount = messages.filter(
              m =>
                m.receiverId === userData.id && !m.read && m.senderId !== myId,
            ).length;

            return (
              <GestureHandlerRootView key={i}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(SCREEN.CHAT_SCREEN, {
                      mssgUser: userData,
                      index: i,
                      myId: user,
                    })
                  }>
                  <UserMessages
                    user={userData}
                    latestMssg={latestMssg}
                    unreadCount={unreadCount}
                  />
                </TouchableOpacity>
              </GestureHandlerRootView>
            );
          })}
        </ScrollView>
        <Spacer height={hp(4)} />
      </View>
    </View>
  );
};

export default Home;
