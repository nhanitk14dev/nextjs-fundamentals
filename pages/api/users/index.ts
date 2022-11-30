import type { NextApiRequest, NextApiResponse } from 'next'
import { userRepository } from '../../../libs/user-repository'
import type { UserResponseTypes, IUser } from '../../../models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponseTypes>
) {
  const users = userRepository.getAll()
  const method = req.method?.toLowerCase()

  switch (method) {
    case 'get':
      res.status(200).json({ users })
      break
    default:
      res.status(405).json({
        message: 'Method Not Allowed'
      })
  }

  return res.status(200)
}
