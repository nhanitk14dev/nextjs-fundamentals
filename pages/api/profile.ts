import type { NextApiRequest, NextApiResponse } from 'next'
import type { UserResponseTypes } from '../../models'
import { userRepository } from './../../libs/user-repository'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../libs/session'

async function profile(
  req: NextApiRequest,
  res: NextApiResponse<UserResponseTypes>
) {
  const { email } = req.body
  const user = userRepository.findUserByEmail(email)

  try {
    if (user) {
      const updatedUser = await userRepository.updateUser(email, req.body)
      if (updatedUser) {
        const newUserSession = { ...req.session.user, ...updatedUser }
        req.session.user = newUserSession
        await req.session.save()
        req.session.user = updatedUser
        return res.status(200).json({ message: '' })
      }
    } else {
      res.status(200).json({ message: 'User not found' })
    }
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message })
  }
}

export default withIronSessionApiRoute(profile, sessionOptions)
