import * as yup from 'yup';

// password matching Schema
const passwordSchema = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters long')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(/[@$!%*?&#]/, 'Password must contain at least one symbol');

export const signUpSchema = yup.object().shape({
  fullName: yup.string().required('Your name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .test('passwords-match', 'Passwords do not match', function (value) {
      return value === this.parent.password;
    }),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: passwordSchema,
});

export const accountFormSchema = yup.object().shape({
  holderName: yup.string().required('Holder name is required'),
  cardNumber: yup.string().required('Card number is required'),
  date: yup.string().required('Please select date'),
  coupon: yup.string().required('Coupon is required'),
});
