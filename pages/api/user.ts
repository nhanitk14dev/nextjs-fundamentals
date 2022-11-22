import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../libs/session'
import { IUser } from './../../models/user.model'

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user as IUser
  console.log(user)

  if (user) {
    res.json({
      ...user,
      isLoggedIn: true
    })
  } else {
    res.json({
      isLoggedIn: false,
    })
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions)
