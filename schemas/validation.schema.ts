import { object, string, ref } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// form validate rule
const signUpSchema = object().shape({
  name: string().required().min(3).max(120),
  email: string().email().min(3).max(120),
  password: string().required().min(6).max(120)
})

const loginSchema = object().shape({
  email: string().email().min(3).max(120),
  password: string().required().min(6).max(120)
})

export const validateSignUpForm = {
  resolver: yupResolver(signUpSchema)
}

export const validateLoginForm = {
  resolver: yupResolver(loginSchema)
}

const userUpdateSchema = object().shape({
  name: string().required().min(3).max(120),
  email: string().email().min(3).max(120),
  password: string().required().min(6).max(120),
  passwordConfirmation: string()
    .required('Password confirmation is required.')
    .oneOf([ref('password')], 'Your passwords do not match.')
})

export const validateUserUpdate = {
  resolver: yupResolver(userUpdateSchema)
}
