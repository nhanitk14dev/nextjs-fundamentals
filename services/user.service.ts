import axios from 'axios'
import { SignUpFormTypes, LoginTypes } from '../models'
import { IUser } from './../models/user.model'
const publicApiUrl = `${process.env.NEXT_PUBLIC_API_URL}`
const baseServerApi = `${process.env.NEXT_PUBLIC_SERVER_API_URL}`

export const userService = {
  signUp,
  logIn,
  logout,
  getUsers,
  checkAuthInBackend,
  createUserInBackend,
  findUserByEmail
}
async function logIn({ email, password }: LoginTypes) {
  // Call public api, just a mask to protect private api, return only a Promise
  return await axios
    .post(`${publicApiUrl}/login`, { email, password })
    .then(res => {
      return res.data
    })
}

async function signUp(form: SignUpFormTypes) {
  return await axios.post(`${publicApiUrl}/users/create`, form)
}

// check api backend server, just filter, have to return data
async function checkAuthInBackend({ email, password }: LoginTypes) {
  return await axios
    .get(`${baseServerApi}/users?email=${email}&password=${password}`)
    .then(res => {
      // server-json tool return array, just get 1 item
      return Array.isArray(res.data) ? res.data.shift() : res.data
    })
}

async function getUsers() {
  return await axios.get(`${baseServerApi}/users`).then(res => res.data)
}

async function createUserInBackend(form: SignUpFormTypes) {
  return await axios.post(`${baseServerApi}/users/create`, form).then(res => {
    return res.data
  })
}

type FindUserType = {
  users: IUser[]
  email: string
}

function findUserByEmail({ users, email }: FindUserType) {
  if (Array.isArray(users)) {
    const user = users.filter(i => i.email === email)
    return Array.isArray(user) ? user.shift() : user
  }

  throw 'Users is not array'
}


function logout() {
  
}