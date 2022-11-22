import { userService } from '../../services/user.service'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../libs/session'
import type { IUser } from '../../models/user.model'

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  // console.log(email, password) check console.log in terminal (run on server side)
  const { email, password } = req.body

  try {
    const user = (await userService.checkAuthInBackend({email,password})) as IUser;
    // get user from database then:
    req.session.user = user
    await req.session.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)
