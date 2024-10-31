import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '@enums';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {useNavigation} from '@react-navigation/native';

const RecievedCall = ({route}) => {
  const {userData} = route?.params || {};

  // const {user} = useAuth();
  const navigation = useNavigation();

  const APP_ID_KEY = 2057510125;
  const APP_SIGNIN_KEY =
    '272dfe8f46febf2147646be7d07848d26a942ee7ec8eecbff800b92e3148e40a';
  const callID = 'test-call';

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={APP_ID_KEY}
        appSign={APP_SIGNIN_KEY}
        userID={userData?.id}
        userName={userData?.fullName || ''}
        callID={callID}
        config={{
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onCallEnd: () => {
            navigation.goBack();
          },
        }}
      />
    </View>
  );
};

export default RecievedCall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
});
