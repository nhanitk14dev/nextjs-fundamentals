import useUser from '../../libs/use-user'

const UserComponent = () => {

  // check auth
  const { user } = useUser({redirectTo: '/login'})

  return <h1>User Page</h1>
}

export default UserComponent;