import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { MediaModal, NavbarChat, Spacer } from '@common';
import { COLORS, hp, wp } from '@enums';
import SendIocn from 'react-native-vector-icons/FontAwesome';
import CopyIcon from 'react-native-vector-icons/Feather';
import LinkIcons from 'react-native-vector-icons/Fontisto';
import { fetchMessage, onSend, openCamera } from '@appServices';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

const UserChat = ({ route }) => {
  const { mssgUser, myId } = route?.params || {};

  const [messages, setMessages] = useState<any>([]);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [media, setMedia] = useState<boolean>(false);

  useEffect(() => {
    fetchMessage(setMessages, myId);
  }, [myId]);

  const handleSendMessage: any = newMessages => {
    onSend(newMessages, setMessages, myId, mssgUser);
  };

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('front');

  // open camera
  const handleOpenCamera = () => {
    openCamera({
      setIsCameraOpen,
      hasPermission,
      requestPermission,
    });
  };

  // close camera
  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <NavbarChat userData={mssgUser} />
        <Spacer height={hp(4)} />
        <GiftedChat
          messages={messages}
          onSend={newMessages => handleSendMessage(newMessages)}
          placeholder="Write a message..."
          alwaysShowSend
          renderSend={props => (
            <View style={styles.send}>
              <TouchableOpacity onPress={() => setMedia(!media)}>
                <LinkIcons name="link" size={23} color={COLORS.black} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleOpenCamera}>
                <CopyIcon name="camera" size={23} color={COLORS.black} />
              </TouchableOpacity>
              <Send {...props} containerStyle={styles.sendIcons}>
                <SendIocn name="send-o" size={25} color={COLORS.white} />
              </Send>
            </View>
          )}
          renderInputToolbar={props => (
            <InputToolbar
              {...props}
              containerStyle={styles.input}
            />
          )}
          renderAvatar={props => (
            <Image
              {...props}
              source={{ uri: mssgUser?.profileImg }}
              style={styles.avatar}
            />
          )}
          user={{ _id: mssgUser?.id }}
          renderBubble={props => (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: COLORS.primary,
                  borderTopLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  marginBottom: 1,
                },
                left: {
                  backgroundColor: COLORS.lightestGray,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  marginBottom: 1,
                },
              }}
            />
          )}
        />

        {/* Open attachment modal */}
        <MediaModal open={media} Onclose={() => setMedia(false)} />

        {/* Camera open modal */}
        <Modal visible={isCameraOpen} transparent={false} animationType="slide">
          {device && (
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={isCameraOpen}
            />
          )}
          <TouchableOpacity
            style={styles.closeCameraButton}
            onPress={closeCamera}>
            <CopyIcon name="x" size={30} color={COLORS.white} />
          </TouchableOpacity>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  send: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    padding: hp(1),
  },
  sendIcons: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    width: wp(10),
    height: hp(5),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: COLORS.lightGray,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: hp(0.3),
    elevation: 5,
    borderTopWidth: 0,
  },
  closeCameraButton: {
    position: 'absolute',
    top: hp(2),
    right: wp(2),
    backgroundColor: COLORS.black,
    padding: 10,
    borderRadius: 30,
    zIndex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
});
