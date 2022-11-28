import { object, string } from 'yup'
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
  confirmPassword: string().required().min(6).max(120)
})

export const validateUserUpdate = {
  resolver: yupResolver(userUpdateSchema)
}