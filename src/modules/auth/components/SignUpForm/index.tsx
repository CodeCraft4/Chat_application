import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BackArrow} from '@assets';
import {CommonBtn, CustomInput, Spacer} from '@common';
import {COLORS, hp} from '@enums';
import {styles} from '../LogInForm/style';
import {useNavigation} from '@react-navigation/native';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {signUpSchema} from '@validations';
import {signUpWithEmail} from '@appServices';
import {ScrollView} from 'react-native-gesture-handler';

interface FormValues {
  fullName: string;
  password: string;
  confirmPassword: string;
  email: string;
}
export const SignUpForm = () => {
  const navigation: any = useNavigation();

  const methods = useForm<FormValues>({
    resolver: yupResolver(signUpSchema),
  });

  const {isValid} = methods.formState;

  const onSubmit = (data: FormValues) => {
    signUpWithEmail(
      data.fullName,
      data.email,
      data.password,
      data.confirmPassword,
      navigation,
    );
    methods.reset();
  };

  const handleNext = () => {
    methods.handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles().container}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrow />
          </TouchableOpacity>
          <Spacer height={hp(10)} />
          <View style={styles().insideContainer}>
            <Text style={styles().title}>Sign up with Email</Text>
            <Spacer height={hp(2)} />
            <Text style={styles().desc}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim,
              facere!
            </Text>
            <Spacer height={hp(8)} />
            <CustomInput lable="Your name" type="text" name="fullName" />
            <Spacer height={hp(2)} />
            <CustomInput lable="Your email" type="email" name="email" />
            <Spacer height={hp(2)} />
            <CustomInput lable="Password" type="password" name="password" />
            <Spacer height={hp(2)} />
            <CustomInput
              lable="Confirm Password"
              type="password"
              name="confirmPassword"
            />
            <Spacer height={hp(6)} />
            <CommonBtn
              bgcolor={isValid ? COLORS.primary : COLORS.lightGray}
              title={'Create an account'}
              onPress={handleNext}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </FormProvider>
  );
};

export default SignUpForm;
