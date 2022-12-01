/* 
  Use this repo to response data, not use service
*/

import * as fs from 'fs'
import database from './db.json'
import { UserPropDefault } from './../models/user.model'
import type {
  IUser,
  LoginTypes,
  UserUpdateFormTypes
} from './../models/user.model'

export const userRepository = {
  getAll: () => database.users as IUser[],
  findUserByEmail,
  checkAuth,
  createUser,
  updateUser,
  saveData
}

function findUserByEmail(email: string) {
  const data = userRepository.getAll()
  if (Array.isArray(data)) {
    const user = data.filter(i => i.email === email)
    return Array.isArray(user) ? user.shift() : user
  }
  return false
}

// Hybrid Types: https://www.typescriptlang.org/docs/handbook/interfaces.html
function checkAuth(form: LoginTypes): IUser {
  const { email, password } = form
  const data = userRepository.getAll()
  if (data.length) {
    const user = data
      .filter(i => i.email === email.trim() && i.password === password.trim())
      .shift() as IUser

    if (user) {
      user.isLoggedIn = true
      return user
    }
  }

  return UserPropDefault
}

async function createUser(user = UserPropDefault as IUser) {
  const users = userRepository.getAll()
  if (user && users.length) {
    // Generate new user
    user.id = Math.max(...users.map(x => x.id as number)) + 1 || (1 as number)
    user.name = user.name || ''
    users.push(user)
    userRepository.saveData(users)
    return user
  }

  return false
}

async function updateUser(email: string, form: UserUpdateFormTypes) {
  const users = userRepository.getAll()

  if (users.length) {
    const newData = users.map(user => {
      // Check current user
      if (user.email === email) {
        user = { ...user, ...form }
      }
      return user
    })
    saveData(newData)
    return newData.filter(i => i.email === email).shift() // get user object in data array
  }
  return false
}

function saveData(users: IUser[]) {
  const newRepo = JSON.stringify({ users: users })
  try {
    fs.writeFileSync('libs/db.json', newRepo)
    return newRepo
  } catch (error) {
    throw error as Error
  }
}
