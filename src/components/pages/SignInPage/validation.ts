import * as Yup from 'yup';

export const signInValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required field'),
  password: Yup.string().required('Required field'),
});

export default signInValidation;
