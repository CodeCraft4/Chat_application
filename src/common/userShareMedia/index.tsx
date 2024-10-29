import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {MediaShare} from '@assets';
import {COLORS, hp, wp} from '@enums';
import {Spacer} from '../spacer';
import { ScrollView } from 'react-native-gesture-handler';

export const UserShareMedia = () => {
  return (
    <ScrollView>
      <View style={styles.top}>
        <Text>Media shared</Text>
        <TouchableOpacity>
          <Text style={styles.all}>View All</Text>
        </TouchableOpacity>
      </View>
      <Spacer />
      <View style={styles.media}>
        {[1, 2, 3].map((_, ind) => (
          <TouchableOpacity key={ind}>
            <MediaShare />
            {ind === 2 ? (
              <View style={styles.more}>
                <Text style={styles.moreText}>255+</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  media: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(90),
  },
  all: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  more: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.3)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(11),
    width: hp(11),
    borderRadius: 15,
  },
  moreText: {
    color: COLORS.white,
    fontWeight: '800',
  },
});
