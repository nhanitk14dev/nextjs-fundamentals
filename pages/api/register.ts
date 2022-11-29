import type { NextApiRequest, NextApiResponse } from 'next'
import type { UserResponseTypes } from '../../models/user.model'
import { userRepository } from './../../libs/user-repository'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponseTypes>
) {
  const { email } = req.body

  try {
    const user = userRepository.findUserByEmail(email)
    if (user) {
      res.status(200).json({
        message: 'This email address is already taken. Please try another one'
      })
    } else {
      const newUser = await userRepository.createUser(req.body)
      if (newUser) {
        res.status(200).json({ message: '' })
      }
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
