import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, hp, wp} from '@enums';
import Icons from 'react-native-vector-icons/AntDesign';
import {Spacer} from '../spacer';
import CameraIcon from 'react-native-vector-icons/Feather';
import DocIcnos from 'react-native-vector-icons/SimpleLineIcons';
import SignalIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MediaIcons from 'react-native-vector-icons/MaterialIcons';
import UserIcons from 'react-native-vector-icons/FontAwesome5';
import LoctionIcons from 'react-native-vector-icons/EvilIcons';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {openDocumentPicker, openGallery} from '@appServices';
import CopyIcon from 'react-native-vector-icons/Feather';

type Props = {
  open: boolean;
  Onclose?: () => void;
};

export const MediaModal = (props: Props) => {
  const {open, Onclose} = props;
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [document, setDocument] = useState<string | null>(null);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('front');

  const handleOpenCamera = () => {
    if (hasPermission) {
      setIsCameraOpen(true);
    } else {
      requestPermission();
    }
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const contentMedia = [
    {
      poster: <CameraIcon name="camera" size={30} color={COLORS.black} />,
      title: 'Camera',
      description: '',
    },
    {
      poster: <DocIcnos name="doc" size={30} color={COLORS.black} />,
      title: 'Documents',
      description: 'Select documents to share',
    },
    {
      poster: <SignalIcons name="signal" size={30} color={COLORS.black} />,
      title: 'Create a poll',
      description: 'Create a quick poll',
    },
    {
      poster: <MediaIcons name="perm-media" size={30} color={COLORS.black} />,
      title: 'Media',
      description: 'Choose from gallery',
    },
    {
      poster: <UserIcons name="user-circle" size={30} color={COLORS.black} />,
      title: 'Contact',
      description: 'Share a contact',
    },
    {
      poster: <LoctionIcons name="location" size={30} color={COLORS.black} />,
      title: 'Location',
      description: 'Share location',
    },
  ];

  const handleOpenIndex = (index: number) => {
    if (index === 0) {
      handleOpenCamera();
    } else if (index === 1) {
      openDocumentPicker(setDocument);
    } else if (index === 3) {
      openGallery(setProfileImageUri);
    }
  };

  return (
    <Modal
      visible={open}
      onRequestClose={Onclose}
      animationType="slide"
      transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.insideContainer}>
          <View style={styles.share}>
            <Icons
              name="close"
              size={25}
              color={COLORS.darkBlack}
              onPress={Onclose}
            />
            <Spacer width={wp(25)} />
            <Text style={styles.content}>Share Content</Text>
          </View>
          {contentMedia.map((item, index) => (
            <TouchableOpacity
              style={styles.media}
              key={index}
              onPress={() => handleOpenIndex(index)}>
              <View style={styles.poster}>{item.poster}</View>
              <Spacer width={wp(6)} />
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
          {/* {document && (
            <View style={styles.selectedDocument}>
              <Text style={styles.documentText}>Selected Document:</Text>
              <Text style={styles.documentUri}>{document}</Text>
            </View>
          )}
          {profileImageUri && (
            <View style={styles.selectedDocument}>
              <Text style={styles.documentText}>Selected ProfileImge:</Text>
              <Text style={styles.documentUri}>{document}</Text>
            </View>
          )} */}
        </View>
      </View>
      <Modal visible={isCameraOpen} transparent={true} animationType="fade">
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  insideContainer: {
    backgroundColor: COLORS.white,
    width: wp(100),
    height: hp(80),
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: wp(4),
    marginTop: hp(40),
  },
  share: {
    flexDirection: 'row',
  },
  content: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.darkBlack,
  },
  media: {
    flexDirection: 'row',
    marginVertical: hp(2),
    alignItems: 'center',
  },
  poster: {
    padding: hp(1),
    backgroundColor: COLORS.lightGray,
    borderRadius: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },
  selectedDocument: {
    marginTop: hp(2),
    padding: wp(3),
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
  },
  documentText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.gray,
  },
  documentUri: {
    fontSize: 14,
    color: COLORS.black,
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
});
