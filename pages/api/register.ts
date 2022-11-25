import type { NextApiRequest, NextApiResponse } from 'next'
import type { IUser } from '../../models/user.model'
import { userRepository } from './../../libs/user-repository'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body

  try {
    const user = userRepository.findUserByEmail(email)
    if (user) {
      res.status(200).json({
        message: 'This email address is already taken. Please try another one'
      })
    } else {
      const user = await userRepository.createUser(req.body) as IUser
      console.log(user)
      res.status(200).json(user)

    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
