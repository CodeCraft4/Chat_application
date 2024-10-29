import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS, wp} from '@enums';
import {Controller, useFormContext} from 'react-hook-form';

type Props = {
  lable: string;
  type?: string;
  name: string;
};
export const CustomInput: React.FC<Props> = ({lable, name, type}) => {
  const {control} = useFormContext();
  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>{lable}</Text>
      <Controller
        name={name}
        control={control}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <View>
            <TextInput
              style={[
                styles.input,
                {borderBottomColor: error?.message ? 'red' : COLORS.black},
              ]}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry={type === 'password'}
              keyboardType={type === 'email' ? 'email-address' : 'default'}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 0.6,
  },
  input: {
    borderBottomWidth: 1.6,
    borderBottomColor: COLORS.black,
    width: wp(90),
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
});
