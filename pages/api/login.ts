import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../libs/session'
import { userRepository } from './../../libs/user-repository'
import type { UserResponseTypes } from '../../models'

async function loginRoute(
  req: NextApiRequest,
  res: NextApiResponse<UserResponseTypes>
) {
  try {
    const user = userRepository.checkAuth(req.body)
    // get user from database then:

    if (user?.isLoggedIn) {
      req.session.user = user
      await req.session.save()
      return res.status(200).json({ message: '' })
    } else {
      return res.status(200).json({
        message: 'Email or password is incorrect'
      })
    }
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message })
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)
