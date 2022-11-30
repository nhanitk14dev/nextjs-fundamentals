import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '../../libs/session'
import type { IUser } from '../../models'
import { UserPropDefault } from '../../models'

function logoutRoute(req: NextApiRequest, res: NextApiResponse<IUser>) {
  req.session.destroy()
  res.json(UserPropDefault)
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions)
