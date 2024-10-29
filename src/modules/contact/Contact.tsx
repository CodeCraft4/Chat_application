import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';
import {SearchBar, Spacer, UserContact} from '@common';
import {hp} from '@enums';
import {FlatList} from 'react-native-gesture-handler';
import {ReadContactFn} from '@appServices';

interface ContactType {
  displayName: string;
  phoneNumbers: {number: string}[];
}
const Contact = () => {
  const [contact, setContact] = useState<ContactType[]>([]);

  useEffect(() => {
    ReadContactFn(setContact);
  }, []);

  const renderContactItem = ({item, index}) => {
    const firstLetter = item.displayName[0]?.toUpperCase();
    const prevLetter =
      index > 0 ? contact[index - 1].displayName[0]?.toUpperCase() : '';

    return (
      <View key={index}>
        {firstLetter !== prevLetter && (
          <Text style={[styles().title, {left: 20}]}>{firstLetter}</Text>
        )}
        <Spacer />
        <UserContact contact={item} index={index} />
      </View>
    );
  };

  return (
    <View style={styles().container}>
      <SearchBar page="Contact" />
      <Spacer height={hp(12)} />
      <View style={styles().insideContianer}>
        <Text style={styles().title}>My Contact</Text>
        <Spacer height={hp(3)} />
        <FlatList
          data={contact}
          renderItem={renderContactItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <Spacer height={hp(6)} />
      </View>
    </View>
  );
};

export default Contact;
