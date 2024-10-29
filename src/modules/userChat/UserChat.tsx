import React, {useEffect, useState} from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {MediaModal, NavbarChat, Spacer} from '@common';
import {COLORS, hp, wp} from '@enums';
import SendIocn from 'react-native-vector-icons/FontAwesome';
import CopyIcon from 'react-native-vector-icons/Feather';
import LinkIcons from 'react-native-vector-icons/Fontisto';
import {fetchMessage, onSend, openCamera} from '@appServices';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

const UserChat = ({route}) => {
  const {mssgUser, myId} = route?.params || {};

  const [messages, setMessages] = useState<any>([]);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [media, setMedia] = useState<boolean>(false);

  useEffect(() => {
    fetchMessage(setMessages, myId);
  }, [myId]);

  // useEffect(() => {
  //   const unsubscribe = firestore()
  //     .collection('chats')
  //     .doc(myId.uid)
  //     .collection('messages')
  //     .orderBy('createdAt', 'desc')
  //     .onSnapshot(snap => {
  //       const allMessages = snap.docs.map(msg => {
  //         return {
  //           _id: msg.id,
  //           ...msg.data(),
  //           createdAt: new Date(),
  //         };
  //       });
  //       setMessages(allMessages);
  //     });

  //   return () => unsubscribe();
  // }, [myId.uid]);

  // const onSend: any = (newMessages = []) => {
  //   const msg: any = newMessages[0];
  //   const myMsg: any = {
  //     ...msg,
  //     senderId: myId.uid,
  //     receiverId: mssgUser.id,
  //     createdAt: firestore.FieldValue.serverTimestamp(),
  //   };
  //   console.log('Sending message:', myMsg);

  //   setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));

  //   // Add the message to the sender's document
  //   firestore()
  //     .collection('chats')
  //     .doc(myId.uid)
  //     .collection('messages')
  //     .add(myMsg)
  //     .then(() => {
  //       console.log('Message sent successfully to sender!');
  //     })
  //     .catch(error => {
  //       console.error('Error sending message to sender: ', error);
  //     });

  //   // recived user
  //   firestore()
  //     .collection('chats')
  //     .doc(mssgUser.id)
  //     .collection('messages')
  //     .add(myMsg)
  //     .then(() => {
  //       console.log('Message sent successfully to receiver!');
  //     })
  //     .catch(error => {
  //       console.error('Error sending message to receiver: ', error);
  //     });
  // };

  const handleSendMessage: any = newMessages => {
    onSend(newMessages, setMessages, myId, mssgUser);
  };

  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('front');

  // open camera
  const handleOpenCamera = () => {
    openCamera({
      setIsCameraOpen,
      hasPermission,
      requestPermission,
    });
  };

  //close camera
  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  return (
    <View style={styles.container}>
      <NavbarChat userData={mssgUser} />
      <Spacer height={hp(4)} />
      <GiftedChat
        messages={messages}
        onSend={newMessages => handleSendMessage(newMessages)}
        
        alwaysShowSend
        renderSend={props => {
          return (
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
          );
        }}
        renderInputToolbar={props => {
          return (
            <InputToolbar {...props} primaryStyle={styles.input}></InputToolbar>
          );
        }}
        renderAvatar={props => (
          <Image
            source={{ uri: mssgUser?.profileImg }}
            style={styles.avatar}
          />
        )}
        user={{
          _id: mssgUser?.id,
        }}
        placeholder="Type a message..."
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: COLORS.primary,
                  borderTopLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  borderBottomLeftRadius: 15,
                },
                left: {
                  backgroundColor: COLORS.lightestGray,
                  borderTopRightRadius: 15,
                  borderBottomRightRadius: 15,
                  borderBottomLeftRadius: 15,
                },
              }}
            />
          );
        }}
      />

      {/* open attachment modal */}
      <MediaModal open={media} Onclose={() => setMedia(false)} />

      {/* camera open modal */}
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
    borderRadius: 30,
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
