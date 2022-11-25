import useUser from '../../libs/use-user'

const UserComponent = () => {

  // check auth
  const { user } = useUser({redirectTo: '/login'})
  console.log(user)

  return <h1>User Page</h1>
}

export default UserComponent;