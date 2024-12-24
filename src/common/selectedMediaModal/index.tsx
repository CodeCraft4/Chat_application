import React from 'react';
import {COLORS, hp, wp} from '@enums';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import DocumentIcons from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/AntDesign';
import SendIocn from 'react-native-vector-icons/MaterialIcons';
import {Spacer} from '../spacer';

type Props = {
  open: boolean;
  modalClose: () => void;
  mediaType: string | null;
  documentType: string | null;
};

const SelectedMediaModal = (props: Props) => {
  const {open, modalClose, mediaType, documentType} = props;

  return (
    <Modal visible={open} onRequestClose={modalClose} transparent={true}>
      <View style={styles.modal}>
        {/* Show the selected profile image if available */}
        {mediaType && <Image source={{uri: mediaType}} style={styles.image} />}
        <TouchableOpacity style={styles.close} onPress={modalClose}>
          <Icons name="close" size={35} color={COLORS.darkBlack} />
        </TouchableOpacity>
        <Spacer />

        {/* Show the selected document type if available */}
        {documentType && (
          <View style={styles.documentContainer}>
            <DocumentIcons
              name="file-pdf-o"
              size={wp(40)}
              color={COLORS.black}
            />
            <Text style={styles.documentUri}>{documentType}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.send} onPress={modalClose}>
          <SendIocn name="send" size={35} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default SelectedMediaModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: COLORS.white,
    height: hp(100),
    width: wp(100),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: hp(2),
  },
  image: {
    width: wp(100),
    height: hp(102),
    marginBottom: hp(2),
  },
  documentContainer: {
    padding: wp(4),
    marginBottom: hp(2),
    alignItems: 'center',
    height: hp(105),
    flex: 1,
    justifyContent: 'center',
  },
  documentText: {
    fontSize: 18,
    fontWeight: '600',
  },
  documentUri: {
    fontSize: 16,
    color: 'black',
  },
  send: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: COLORS.primary,
    padding: wp(2),
    borderRadius: 50,
    right: 10,
  },
  close: {
    position: 'absolute',
    right: 5,
    top: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
