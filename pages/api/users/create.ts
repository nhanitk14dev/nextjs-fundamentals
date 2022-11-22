// https://nextjs.org/docs/api-routes/introduction
// Run on server side

// import { runCorsMiddleware, cors } from '../../../utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { userService } from '../../../services/user.service'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body
  const user = await userService.createUserInBackend(data)
  if (user) {
    console.log(user)
    return res.status(200).json(user)
  }

  return res.status(500).json({msg: 'Add user is failed!!'})
}
