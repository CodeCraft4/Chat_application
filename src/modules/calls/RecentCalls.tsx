import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SearchBar, Spacer, UserRecentCall} from '@common';
import {styles} from './style';
import {hp} from '@enums';
import { ScrollView } from 'react-native-gesture-handler';

const RecentCalls = () => {
  return (
    <View style={styles().container}>
      <SearchBar page="Call" />
      <Spacer height={hp(12)} />
      <ScrollView style={styles().insideContianer}>
        <Text style={styles().title}>Recent</Text>
        <Spacer height={hp(3)} />
        {[1, 2, 3, 4, 5, 6, 7].map((_,index) => (
          <TouchableOpacity key={index}>
          <UserRecentCall index={index} />
          </TouchableOpacity>
        ))}
      <Spacer height={hp(6)}/>
      </ScrollView>
    </View>
  );
};

export default RecentCalls;
