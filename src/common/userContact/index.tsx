import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, getRandomColor, hp, wp} from '@enums';
import EditModals from '../editModal';

export const UserContact = (props: any) => {
  const {contact, index} = props || {};
  const [editModal, setEditModal] = useState(false);
  const avatarColor = getRandomColor();

  return (
    <View key={index}>
      <TouchableOpacity
        style={styles.mssgContainer}
        onPress={() => setEditModal(!editModal)}>
        <View style={styles.user}>
          <Text style={[styles.avatar, {backgroundColor: avatarColor}]}>
            {contact?.displayName[0].toUpperCase()}
          </Text>
          <View>
            <Text style={styles.userName}>{contact.displayName}</Text>
            <Text>{contact.phoneNumbers[0]?.number}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {editModal && (
        <EditModals
          visible={editModal}
          closeModal={() => setEditModal(!editModal)}
          index={index}
          user={contact}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mssgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(3),
    backgroundColor: COLORS.white,
  },
  user: {
    position: 'relative',
    flexDirection: 'row',
    gap: wp(2),
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.darkBlack,
  },
  avatar: {
    padding: hp(1),
    borderRadius: 50,
    width: wp(12),
    height: hp(6),
    textAlign: 'center',
    alignItems: 'center',
    fontSize: wp(6),
    color: COLORS.white,
  },
});
