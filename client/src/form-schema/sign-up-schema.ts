import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
    repeatPassword: yup
        .string()
        .oneOf([yup.ref('password'), null!], 'Passwords must match')
        .required('Repeat password.'),
});
