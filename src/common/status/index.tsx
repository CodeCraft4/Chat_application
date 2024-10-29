import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {PlusIcon, UserProfile} from '@assets';
import {COLORS, getRandomColor, hp, SCREEN, wp} from '@enums';
import {Spacer} from '../spacer';
import {useNavigation} from '@react-navigation/native';

export const UserStatus = () => {
  const navigation: any = useNavigation();

  return (
    <ScrollView horizontal={true}>
      <View style={styles.status}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
          const borderColor = getRandomColor();
          return (
            <View key={index} style={styles.user}>
              <TouchableOpacity
                style={[styles.userOutline, {borderColor}]}
                onPress={() => navigation.navigate(SCREEN.USER_STATUS)}>
                <UserProfile width={wp(16)} height={hp(8)} />
                {index === 0 && (
                  <View style={styles.plus}>
                    <PlusIcon width={wp(5)} height={hp(2.5)} />
                  </View>
                )}
              </TouchableOpacity>
              <Spacer />
              <Text style={styles.userName}>
                {index === 0 ? 'My status' : 'Users'}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  status: {
    flexDirection: 'row',
    gap: wp(4),
    padding: hp(1),
  },
  userOutline: {
    borderWidth: 2,
    borderRadius: 50,
    padding: 4,
  },
  user: {
    textAlign: 'center',
    height: hp(10),
    alignItems: 'center',
  },
  userName: {
    color: COLORS.white,
    fontWeight: '600',
  },
  plus: {
    position: 'absolute',
    bottom: 5,
    right: 0,
  },
});
