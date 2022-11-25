/* 
  Use this repo to response data, not use service
*/

import * as fs from 'fs'
import database from './db.json'
import type { LoginTypes } from './../models/user.model'
import type { IUser } from './../models/user.model'

export const userRepository = {
  getAll: () => database.users,
  findUserByEmail,
  checkAuth,
  createUser,
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

function checkAuth(form: LoginTypes) {
  const { email, password } = form
  const data = userRepository.getAll()
  if (Array.isArray(data)) {
    const user = data.filter(
      i => i.email === email.trim() && i.password === password.trim()
    )
    return Array.isArray(user) ? user.shift() : user
  }
  return {}
}

async function createUser(user: any) {
  if (user) {
    const users = userRepository.getAll()
    // Generate new user
    user.id = users.length
      ? Math.max(...users.map(x => x.id)) + 1
      : (1 as number)
    users.push(user)
    userRepository.saveData(users)
    return user
  }

  return false
}

function saveData(users = [] as any) {
  const newRepo = JSON.stringify({ users: users })
  try {
    fs.writeFileSync('libs/db.json', newRepo)
    return newRepo
  } catch (error) {
    throw error as Error
  }
}
