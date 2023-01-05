import type { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Spinner from '../../components/loading/Spinner'
import type { IUser } from './../../models/user.model'
import { UserPropDefault } from './../../models/user.model'
import { userRepository } from './../../libs/user-repository'
import NextLink from '../../components/Link'
import btnStyles from '../../components/Button.module.scss'

type Props = {
  user: IUser
}

export default function UserDetail({ user = UserPropDefault }: Props) {
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
      <div className="card">
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

      <NextLink href="/users">
        <a className={btnStyles.primary}>Back To List</a>
      </NextLink>
    </div>
  )
}

export const getServerSideProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string
  const user = userRepository.findUserById(id)
  return {
    props: {
      user: user
    }
  }
}
