import React from 'react';
import {
  Home,
  RecentCalls,
  Contact,
  Settings,
} from '@modules';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS, SCREEN, wp} from '@enums';
import {StyleSheet, View} from 'react-native';
import MessageIcon from 'react-native-vector-icons/AntDesign';
import CallIcon from 'react-native-vector-icons/Feather';
import SettingIcon from 'react-native-vector-icons/Ionicons';

export const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  const TabIcon = ({focused, children}) => {
    return (
      <View style={[styles.tabIcon, focused && {color: COLORS.primary}]}>
        {children}
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
        },
        tabBarLabel: () => null,
      }}>
      <Tab.Screen
        name={SCREEN.HOME_SCREEN}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused}>
              <MessageIcon
                name="message1"
                size={25}
                color={focused ? COLORS.primary : COLORS.darkBlack}
              />
            </TabIcon>
          ),
        }}
      />
      <Tab.Screen
        name={SCREEN.CALL_SCREEN}
        component={RecentCalls}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused}>
              <CallIcon
                name="phone-call"
                size={25}
                color={focused ? COLORS.primary : COLORS.darkBlack}
              />
            </TabIcon>
          ),
        }}
      />
      <Tab.Screen
        name={SCREEN.CONTACT_SCREEN}
        component={Contact}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused}>
              <MessageIcon
                name="contacts"
                size={25}
                color={focused ? COLORS.primary : COLORS.darkBlack}
              />
            </TabIcon>
          ),
        }}
      />
      <Tab.Screen
        name={SCREEN.SETTINGS_SCREEN}
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused}>
              <SettingIcon
                name="settings-outline"
                size={25}
                color={focused ? COLORS.primary : COLORS.darkBlack}
              />
            </TabIcon>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    borderRadius: 50,
    padding: wp(1.8),
    flexDirection: 'column',
    alignItems: 'center',
    width: wp(25),
  },
});
