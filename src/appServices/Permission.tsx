import {Alert, Linking, PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import {uploadImageStore} from './AuthServices';
import DocumentPicker from 'react-native-document-picker';

// mobile Conteact..
export const ReadContactFn = async (setContact: any) => {
  try {
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );

    if (permission === PermissionsAndroid.RESULTS.GRANTED) {
      const contacts: any = await Contacts.getAll();
      // Sort contacts alphabetically by displayName
      contacts.sort((a, b) => {
        const nameA = a.displayName?.toUpperCase() || '';
        const nameB = b.displayName?.toUpperCase() || '';
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      setContact(contacts);
    } else {
      setContact([]);
    }
  } catch (error: any) {
    setContact([]);
  }
};

// camera permission Fn
const openAppSettings = () => {
  Linking.openSettings();
};

type Props = {
  setIsCameraOpen: any;
  hasPermission: boolean;
  requestPermission: any;
};

// camera permission function
export const openCamera = async ({
  setIsCameraOpen,
  hasPermission,
  requestPermission,
}: Props) => {
  if (hasPermission) {
    console.log('Opening camera...');
    setIsCameraOpen(true);
  } else {
    const newStatus = await requestPermission();
    if (newStatus === 'granted') {
      setIsCameraOpen(true);
    } else {
      Alert.alert(
        'Permission Denied',
        'Camera permission is required. Please enable it from settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: openAppSettings},
        ],
      );
    }
  }
};

//Gallary permission for media
export const openGallery = async (setProfileImageUri: any) => {
  const currentUser = auth().currentUser;
  const userId: any = currentUser?.uid;
  try {
    const options: any = {
      mediaType: 'photo',
    };
    const response = await launchImageLibrary(options);

    if (response.didCancel) {
    } else if (response.errorMessage) {
    } else if (response.assets && response.assets.length > 0) {
      const selectedImage: any = response.assets[0].uri;
      setProfileImageUri(selectedImage);
      await uploadImageStore(userId, selectedImage);
    }
  } catch (error) {
    console.error( error);
  }
};

//Gallary permission for Document
export const openDocumentPicker = async (
  setDocument: (uri: string) => void,
) => {
  const currentUser = auth().currentUser;
  const userId: any = currentUser?.uid;

  try {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });

    if (result && result.length > 0) {
      const selectedDocument = result[0].uri;
      setDocument(selectedDocument);
      await uploadImageStore(userId, selectedDocument);
    }
  } catch (error) {
    if (DocumentPicker.isCancel(error)) {
    } else {
      console.error(error);
    }
  }
};
