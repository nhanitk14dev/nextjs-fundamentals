/*
 This file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
 The password is a private key you must pass at runtime and builtime (for getServerSideProps), 
 it has to be at least 32 characters long. 
 You can use https://1password.com/password-generator/ to generate strong passwords.
*/

import type { IronSessionOptions } from 'iron-session'
import type { IUser } from '../models'

export const sessionOptions: IronSessionOptions = {
  password: process.env.NEXT_PUBLIC_COOKIE_PASSWORD as string, //complex_password_at_least_32_characters_long
  cookieName: 'iron-session/next/session.js',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: IUser
  }
}

