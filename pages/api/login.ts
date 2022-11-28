import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../libs/session'
import type { IUser } from '../../models/user.model'
import { userRepository } from './../../libs/user-repository'

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {

  try {
    const user = userRepository.checkAuth(req.body) as IUser
    // get user from database then:

    if (user) {
      req.session.user = user
      await req.session.save()
      return res.status(200).json(user)
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
