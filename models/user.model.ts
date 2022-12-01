export interface IUser {
  id?: number
  email: string
  password: string
  name?: string
  address?: string
  isLoggedIn?: boolean
}

export const UserPropDefault: IUser = {
  email: '',
  name: '',
  password: '',
  isLoggedIn: false
}

export type SignUpFormTypes = {
  name: string
  email: string
  password: string
}

export type UserUpdateFormTypes = SignUpFormTypes & {
  passwordConfirmation?: string
  address?: string
}

export type LoginTypes = {
  email: string
  password: string
}

export type UserResponseTypes = {
  user?: IUser
  message?: string
}
