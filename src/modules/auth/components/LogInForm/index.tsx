import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {styles} from './style';
import {BackArrow} from '@assets';
import {CommonBtn, CustomInput, SocialIcons, Spacer} from '@common';
import {COLORS, hp, SCREEN} from '@enums';
import {useNavigation} from '@react-navigation/native';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema} from '@validations';
import {useAuth} from '@contexts';
import {LoginWithEmail} from '@appServices';

interface FormValues {
  email: string;
  password: string;
}

export const LogInForm = () => {
  const navigation: any = useNavigation();
  const {loading, setLoading} = useAuth();

  const methods = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const {isValid} = methods.formState;

  const handleSubmitForm = () => {
    methods.handleSubmit(onSubmit)();
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      await LoginWithEmail(data, navigation);
      navigation.navigate('Bottom_tab', {screen: SCREEN.HOME_SCREEN});
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      methods.reset();
    }
  };

  return (
    <FormProvider {...methods}>
      {loading ? (
        <ActivityIndicator size={'large'} color={COLORS.primary} />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView contentContainerStyle={styles().container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackArrow />
            </TouchableOpacity>
            <Spacer height={hp(15)} />
            <View style={styles().insideContainer}>
              <Text style={styles().title}>Log in to Chatbox</Text>
              <Spacer height={hp(2)} />
              <Text style={styles().desc}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim,
                facere!
              </Text>
              <Spacer height={hp(2)} />
              <SocialIcons login={true} />
              <Spacer height={hp(2)} />
              <Text style={styles().or}>OR</Text>
              <Spacer height={hp(4)} />
              <CustomInput lable="Your email" type="email" name="email" />
              <Spacer height={hp(4)} />
              <CustomInput lable="Password" type="password" name="password" />
              <Spacer height={hp(10)} />
              <CommonBtn
                bgcolor={isValid ? COLORS.primary : COLORS.lightGray}
                title={'Log in'}
                onPress={handleSubmitForm}
              />
              <Spacer height={hp(2)} />
              <Text style={styles().forget}>Forget Password?</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </FormProvider>
  );
};
