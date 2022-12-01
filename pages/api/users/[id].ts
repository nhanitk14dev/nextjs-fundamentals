import type { NextApiRequest, NextApiResponse } from 'next'
import type { UserResponseTypes } from '../../../models'
import { userRepository } from './../../../libs/user-repository'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponseTypes>
) {
  const { query } = req
  const { id } = query
  const user = userRepository.findUserById(id as string)

  try {
    if (user) {
      res.status(200).json({
        user,
        message: ''
      })
    } else {
      res.status(200).json({
        message: 'User Not Found'
      })
    }
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message
    })
  }
}
