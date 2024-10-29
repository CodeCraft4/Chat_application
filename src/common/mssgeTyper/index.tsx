import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import LinkIcons from 'react-native-vector-icons/Fontisto';
import CopyIcon from 'react-native-vector-icons/Feather';
import SendIocn from 'react-native-vector-icons/FontAwesome';
import {RecordIcns} from '@assets';
import {COLORS, hp, wp} from '@enums';
import {MediaModal} from '../mediaModal';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {openCamera} from '@appServices';

export const MessageTyper = (props: any) => {
  const {onChangeText, onSend} = props || {};
  const [media, setMedia] = useState<boolean>(false);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('front');

  const handleOpenCamera = () => {
    openCamera({
      setIsCameraOpen,
      hasPermission,
      requestPermission,
    });
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const handleChangeText = (inputText: string) => {
    setText(inputText);
    onChangeText(inputText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.typer}>
        <TouchableOpacity onPress={() => setMedia(!media)}>
          <LinkIcons name="link" size={23} color={COLORS.black} />
        </TouchableOpacity>
        <View style={styles.input}>
          <TextInput
            style={styles.inputField}
            placeholder=" Write your message"
            value={text}
            onChangeText={handleChangeText}
          />
          <CopyIcon name="copy" size={23} color={COLORS.gray} />
        </View>
        {text.length > 0 ? (
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => {
              onSend();
              setText('');
            }}>
            <SendIocn name="send-o" size={25} color={COLORS.white} />
          </TouchableOpacity>
        ) : (
          <View style={styles.icons}>
            <TouchableOpacity onPress={handleOpenCamera}>
              <CopyIcon name="camera" size={23} color={COLORS.black} />
            </TouchableOpacity>
            <RecordIcns />
          </View>
        )}
      </View>

      <MediaModal open={media} Onclose={() => setMedia(false)} />

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

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    backgroundColor: COLORS.white,
    padding: hp(2),
    shadowColor: COLORS.lightGray,
    flex: 1,
  },
  typer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 'auto',
    alignItems: 'center',
    gap: wp(2),
  },
  input: {
    flexDirection: 'row',
    gap: wp(2),
    backgroundColor: COLORS.lightGray,
    width: wp(70),
    alignItems: 'center',
    borderRadius: 30,
  },
  inputField: {
    width: wp(60),
  },
  icons: {
    flexDirection: 'row',
    gap: wp(3),
    alignItems: 'center',
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
  submitBtn: {
    padding: hp(1),
    backgroundColor: COLORS.primary,
    borderRadius: 30,
  },
});
