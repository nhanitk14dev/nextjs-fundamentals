import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// form validate rule
const signUpSchema = Yup.object().shape({
    name: Yup.string().required().min(3).max(120),
    email: Yup.string().email().min(3).max(120),
    password: Yup.string().required().min(6).max(120)
});

const loginSchema = Yup.object().shape({
    email: Yup.string().email().min(3).max(120),
    password: Yup.string().required().min(6).max(120)
});

export const validateSignUpForm = { 
    resolver: yupResolver(signUpSchema)
};

export const validateLoginForm = { 
    resolver: yupResolver(loginSchema)
};