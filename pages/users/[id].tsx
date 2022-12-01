import type { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Spinner from '../../components/loading/Spinner'
import type { IUser } from './../../models/user.model'
import axios from 'axios'

type Props = {
  user: IUser
}

export default function UserDetail({ user }: Props) {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
  if (router.isFallback) {
    return <Spinner />
  }

  return (
    <div className="container">
      <h1>User Detail</h1>
      <div>
        <span>
          <strong>User Name:</strong>
        </span>
        <span>{user.name}</span>
      </div>
      <div>
        <span>
          <strong>Address:</strong>
        </span>
        <span>{user.address}</span>
      </div>
      <div>
        <span>
          <strong>Email:</strong>
        </span>
        <span>{user.email}</span>
      </div>
    </div>
  )
}

// Get the paths we want to pre-render based on users
// We'll pre-render only these paths at build time.
// { fallback: false } means not match any id, redirect to 404
// Generate all id in list. Example: paths: [{ params: { id: '1' } }, { params: { id: '2' } }],

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await axios
  .get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
  .then(res => res.data?.users)

  return {
    
    paths: users.map((user: IUser) => {
      return {
        params: {
          id: user.id?.toString()
        }
      }
    }),
    fallback: false 
  }
}


// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id
    const user = await axios
    .get( `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`)
    .then(res => res.data?.user)

    return {
      props: {
        user: user
      }
    }
}