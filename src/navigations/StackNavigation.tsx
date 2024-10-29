import React, {useEffect, useState} from 'react';
import * as ui from '@modules';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN} from '@enums';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {BottomTabNavigation} from './BottomTabNavigation';
import {useAuth} from '@contexts';

export const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  const [logo, setLogo] = useState(true);

  useEffect(() => {
    setLogo(true);
    setTimeout(() => {
      setLogo(false);
    }, 3000);
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {logo && (
        <Stack.Screen
          name={SCREEN.START_APP_SCREEN}
          component={ui.StartScreen}
        />
      )}
      <Stack.Screen name={SCREEN.ONBOARDING_SCREEN} component={ui.Onboarding} />
      <Stack.Screen name={SCREEN.LOGIN_SCREEN} component={ui.LogInForm} />
      <Stack.Screen name={SCREEN.SIGNUP_SCREEN} component={ui.SignUpForm} />
      <Stack.Screen name={SCREEN.CALL_SCREEN} component={ui.RecentCalls} />
      <Stack.Screen
        name={SCREEN.INCOMING_CALL_SCREEN}
        component={ui.IncomingCall}
      />
      <Stack.Screen
        name={SCREEN.RECIVED_CALL_SCREEN}
        component={ui.RecievedCall}
      />
      <Stack.Screen name={'Bottom_tab'} component={BottomTabNavigation} />
    </Stack.Navigator>
  );
};

export const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Bottom_tab"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Bottom_tab'} component={BottomTabNavigation} />
      <Stack.Screen name={SCREEN.HOME_SCREEN} component={ui.Home} />
      <Stack.Screen name={SCREEN.CALL_SCREEN} component={ui.RecentCalls} />
      <Stack.Screen name={SCREEN.CONTACT_SCREEN} component={ui.Contact} />
      <Stack.Screen name={SCREEN.SETTINGS_SCREEN} component={ui.Settings} />
      <Stack.Screen name={SCREEN.ACCOUNT_SCREEN} component={ui.Account} />
      <Stack.Screen name={SCREEN.EDITS_ACCOUNT} component={ui.EditAccount} />
      <Stack.Screen name={SCREEN.CHAT_SCREEN} component={ui.UserChat} />
      <Stack.Screen name={SCREEN.USER_STATUS} component={ui.UserStatuses} />
      <Stack.Screen name={SCREEN.SEARCH_SCREEN} component={ui.Search} />
      <Stack.Screen name={SCREEN.SENDING_CALL} component={ui.SendingCall} />
      <Stack.Screen
        name={SCREEN.RECIVED_CALL_SCREEN}
        component={ui.RecievedCall}
      />
      <Stack.Screen
        name={SCREEN.INCOMING_CALL_SCREEN}
        component={ui.IncomingCall}
      />
    </Stack.Navigator>
  );
};

export const AppNavigation = () => {
  const {user, loading} = useAuth();

  if (loading) {
    return <ui.StartScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      {!user ? <StackNavigation /> : <HomeStack />}
    </NavigationContainer>
  );
};

