
import formStyles from '../../components/Form.module.scss';
import { validateLoginForm } from '../../schemas';
import { useForm } from 'react-hook-form';
import { userService } from '../../services';
import Link from '../../components/Link';
import btnStyles from '../../components/Button.module.scss';
import { useRouter } from 'next/router'
import type { IUser, LoginTypes } from '../../models';

type TypeProps = {
  users: IUser[]
}

const Login = ({ users = [] }: TypeProps) => {

  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm < LoginTypes > (validateLoginForm);
  async function onSubmit({ email, password }: LoginTypes) {
    const isExistingUser = userService.findUserByEmail({ users, email });
    if (!isExistingUser) {
      alert('This email does not exist in system. Please try another')
      return;
    }

    return await userService.logIn({ email, password })
      .then(() => { alert('Login Successfully !!') })
      .then(() => router.push('/users'))
      .catch((error) => alert(error));

  }

  return (
    <>
      <h1>Login Page</h1>
      <div className={formStyles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)} method='post'>
          <div className={formStyles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Enter email" {...register("email")} />
            <p className='invalid-feedback'>{errors.email?.message}</p>
          </div>
          <div className={formStyles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Enter password" {...register("password")} />
            <p className='invalid-feedback'>{errors.password?.message}</p>
          </div>
          <input type="submit" value="Submit" className={btnStyles.primary} />
          <Link href="/signup"><a className={btnStyles.success} >Sign Up</a></Link>
        </form>
      </div>
      <div>
      </div>
    </>
  );
}

export default Login;

export async function getStaticProps() {
  // function directly in `getStaticProps`
  const users = await userService.getUsers();
  // will receive `posts` as a prop at build time
  return {
    props: {
      users,
    },
  }
}