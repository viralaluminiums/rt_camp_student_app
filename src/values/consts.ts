import * as Yup from 'yup';

export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

export const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export const EMAIL = Yup.string()
  .matches(EMAIL_REGEX, 'Invalid Email Address')
  .required();

export const STRONG_PASSWORD = Yup.string()
  .matches(
    STRONG_PASSWORD_REGEX,
    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
  )
  .min(8, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required');

export const STRING = Yup.string()
  .min(8, 'Too Short')
  .max(50, 'Too Long')
  .required();

export const LoginSchema = Yup.object().shape({
  email: EMAIL,
  password: STRING,
});

export const ProfileSchema = Yup.object().shape({
  full_name: Yup.string().required('Required'),
  contact: Yup.string().required('Required'),
  date_of_birth: Yup.date().required('Required'),
  cgpa: Yup.number().required('Required'),
  address: Yup.string().required('Required'),
  gender: Yup.string()
    .oneOf(['Male', 'Female', 'Opt Not to Specify'])
    .required('Required'),
});

export const RegisterSchema = Yup.object().shape({
  email: EMAIL,
  password: STRONG_PASSWORD,
  confirmPassword: STRONG_PASSWORD,
});
