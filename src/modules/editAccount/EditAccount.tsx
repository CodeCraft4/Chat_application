import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {styles} from '../account/style';
import {CommonBtn, SeenAccount, Spacer} from '@common';
import {COLORS, hp} from '@enums';
import {BackArrow} from '@assets';
import {useNavigation} from '@react-navigation/native';
import {fetchUserInfo, editUpdateUser} from '@appServices';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import EditIcons from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';

const EditAccount = () => {
  const nav: any = useNavigation();
  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [address, setAddress] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [bio, setbio] = useState<string | null>(null);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  console.log(profileImageUri);

  useEffect(() => {
    fetchUserInfo(
      setEmail,
      setFullName,
      setAddress,
      setPhoneNumber,
      setbio,
      setProfileImageUri,
    );
  }, []);

  const inputRef = useRef<TextInput>(null);

  const toggleEditable = () => {
    setIsEditable(true);
    inputRef.current?.focus();
  };

  const handleUpdate: any = async () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      try {
        await editUpdateUser(
          currentUser.uid,
          fullName || '',
          email || '',
          address || '',
          bio || '',
          phoneNumber || '',
        );
        Alert.alert('Success', 'Profile updated successfully');
      } catch (error) {
        Alert.alert('Error', 'Failed to update profile');
        console.error('Error updating profile:', error);
      }
    } else {
      Alert.alert('Error', 'No user is currently signed in');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles().container}>
        <Spacer height={hp(4)} />
        <TouchableOpacity
          style={styles().backArrow}
          onPress={() => nav.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <SeenAccount edit={true} />
        <View style={styles().insideContainer}>
          <View>
            <Text style={styles().displayName}>Display Name</Text>
            <View style={styles().edits}>
              <TextInput
                ref={inputRef}
                value={fullName || ''}
                onChangeText={setFullName}
                style={styles().editUser}
                editable={isEditable}
              />
              <TouchableOpacity
                style={styles().editIcons}
                onPress={toggleEditable}>
                <EditIcons name="edit" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <Spacer height={hp(2)} />
          <View>
            <Text style={styles().displayName}>Email Address</Text>
            <View style={styles().edits}>
              <TextInput
                ref={inputRef}
                value={email || ''}
                onChangeText={setEmail}
                style={styles().editUser}
                editable={isEditable}
              />
              <TouchableOpacity
                style={styles().editIcons}
                onPress={toggleEditable}>
                <EditIcons name="edit" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <Spacer height={hp(2)} />
          <View>
            <Text style={styles().displayName}>biography</Text>
            <View style={styles().edits}>
              <TextInput
                ref={inputRef}
                value={bio || ''}
                onChangeText={setbio}
                style={styles().editUser}
                editable={isEditable}
              />
              <TouchableOpacity
                style={styles().editIcons}
                onPress={toggleEditable}>
                <EditIcons name="edit" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <Spacer height={hp(2)} />
          <View>
            <Text style={styles().displayName}>Address</Text>
            <View style={styles().edits}>
              <TextInput
                ref={inputRef}
                value={address || ''}
                onChangeText={setAddress}
                style={styles().editUser}
                editable={isEditable}
              />
              <TouchableOpacity
                style={styles().editIcons}
                onPress={toggleEditable}>
                <EditIcons name="edit" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <Spacer height={hp(2)} />
          <View>
            <Text style={styles().displayName}>Phone Number</Text>
            <View style={styles().edits}>
              <TextInput
                ref={inputRef}
                value={phoneNumber || ''}
                onChangeText={setPhoneNumber}
                style={styles().editUser}
                editable={isEditable}
              />
              <TouchableOpacity
                style={styles().editIcons}
                onPress={toggleEditable}>
                <EditIcons name="edit" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <Spacer height={hp(2)} />
          <View style={styles().updateBtn}>
            <CommonBtn
              title="Update"
              bgcolor={COLORS.primary}
              onPress={handleUpdate}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditAccount;
