import {SCREEN} from '@enums';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import storage from '@react-native-firebase/storage';
import '@react-native-firebase/app';
import {GiftedChat} from 'react-native-gifted-chat';

export interface FormValues {
  email: string;
  password: string;
}

// login with email & password Fn.
export const LoginWithEmail = async (data: FormValues, navigation: any) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      data.email,
      data.password,
    );
    console.log('User logged in:', userCredential.user.email);
    navigation.navigate('Bottom_tab', {screen: SCREEN.HOME_SCREEN});
  } catch (error: any) {
    Alert.alert(error.message);
  }
};

// user Name and email store in firestore Fn.
const saveUserToFirestore = async (
  userId: string,
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  try {
    await firestore().collection('Users').doc(userId).set({
      fullName,
      email,
      password,
      confirmPassword,
    });
    console.log('User details saved to Firestore');
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
  }
};

// signup with email and password Fn.
export const signUpWithEmail = async (
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string,
  navigation: any,
) => {
  console.log('Attempting sign up with:', email);
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    await saveUserToFirestore(
      userCredential.user.uid,
      fullName,
      email,
      password,
      confirmPassword,
    );
    navigation.navigate('Bottom_tab', {screen: SCREEN.HOME_SCREEN});
  } catch (error: any) {
    Alert.alert(error.message);
  }
};

// User information for Account Fn.
export const fetchUserInfo = async (
  setEmail: (email: string | null) => void,
  setFullName: (fullName: string | null) => void,
  setAddress: any,
  setPhoneNumber: (phoneNumber: string | null) => void,
  setbio: (bio: string | null) => void,
  setProfileImageUri: (profileImageUri: string | null) => void,
) => {
  const currentUser = auth().currentUser;
  if (currentUser) {
    setEmail(currentUser.email);
    const fetchUserDetails = async () => {
      try {
        const userDoc = await firestore()
          .collection('Users')
          .doc(currentUser.uid)
          .get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setEmail(userData?.email ? userData?.email : currentUser.email);
          setFullName(userData?.fullName || '');
          setAddress(userData?.address || '');
          setbio(userData?.biography || '');
          setPhoneNumber(userData?.phoneNumber || '');
          setProfileImageUri(userData?.profileImg || '');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }
};

// update userProfile date
export const editUpdateUser = async (
  userId: string,
  fullName: string,
  email: string,
  address: string,
  biography: string,
  phoneNumber: string,
) => {
  try {
    await firestore().collection('Users').doc(userId).update({
      fullName,
      email,
      address,
      biography,
      phoneNumber,
    });
  } catch (error) {}
};

// upload profile image
export const uploadImageStore = async (userId: string, imageUri: string) => {
  try {
    const reference = storage().ref(`profileImages/${userId}`);
    await reference.putFile(imageUri);
    const downloadURL = await reference.getDownloadURL();
    await firestore().collection('Users').doc(userId).update({
      profileImg: downloadURL,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

// Fetch all registered users from Firebase Firestore
const usersCollection = firestore().collection('Users');
export const fetchAllUsers = async setUsers => {
  try {
    const user = auth().currentUser;
    if (!user) {
      return;
    }

    // Use email for querying
    const userEmail = user.email;

    usersCollection.where('email', '!=', userEmail).onSnapshot(
      snapshot => {
        if (!snapshot.empty) {
          const usersData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUsers(usersData);
          console.log('Registered Users:', usersData);
        } else {
        }
      },
      error => {
        console.error('Snapshot error:', error);
      },
    );
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// onSend Message to firestore
export const onSend: any = (newMessages = [], setMessages, myId, mssgUser) => {
  const msg: any = newMessages[0];
  const myMsg: any = {
    ...msg,
    senderId: myId.uid,
    receiverId: mssgUser.id,
    createdAt: firestore.FieldValue.serverTimestamp(),
  };
  setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
  firestore()
    .collection('chats')
    .doc(myId.uid)
    .collection('messages')
    .add(myMsg)
    .then(() => {
      console.log('Message sent successfully to sender!');
    })
    .catch(error => {
      console.error('Error sending message to sender: ', error);
    });

  // recived user
  firestore()
    .collection('chats')
    .doc(mssgUser.id)
    .collection('messages')
    .add(myMsg);
};

// fetch all messges from firestor
export const fetchMessage = (setMessages, myId) => {
  try {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(myId.uid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snap => {
        const allMessages = snap.docs.map(msg => {
          return {
            _id: msg.id,
            ...msg.data(),
            createdAt: new Date(),
          };
        });
        setMessages(allMessages);
      });

    return () => unsubscribe();
  } catch (error: any) {
    console.log('mssge not found in firestore', error.message);
  }
};

// clearChat
export const clearMssgeChat = async user => {
  const myId = user.uid;
  try {
    const messagesRef = firestore()
      .collection('chats')
      .doc(myId)
      .collection('messages');
    const snapshot = await messagesRef.get();
    const deletePromises = snapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error clearing messages:', error);
  }
};
