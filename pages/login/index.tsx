import formStyles from '../../components/Form.module.scss'
import { validateLoginForm } from '../../schemas'
import { useForm } from 'react-hook-form'
import Link from '../../components/Link'
import btnStyles from '../../components/Button.module.scss'
import { useRouter } from 'next/router'
import type { LoginTypes } from '../../models'
import axios from 'axios'
import AuthLayout from '../../components/layouts/AuthLayout'
import type { NextPageWithLayout } from '../_app'
import type { GetServerSideProps } from 'next'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from './../../libs/session'

const Login: NextPageWithLayout = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginTypes>(validateLoginForm)

  async function onSubmit(form: LoginTypes) {
    return await axios
      .post('/api/login', form)
      .then(res => {
        const user = res.data
        if (user?.message) {
          alert(user.message)
        } else {
          alert('Login Successfully !!')
          router.push('/users')
        }
      })
      .catch(error => console.log(error.message))
  }

  return (
    <>
      <h1>Login Page</h1>
      <div className={formStyles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <div className={formStyles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              {...register('email')}
            />
            <p className="invalid-feedback">{errors.email?.message}</p>
          </div>
          <div className={formStyles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              {...register('password')}
            />
            <p className="invalid-feedback">{errors.password?.message}</p>
          </div>
          <input type="submit" value="Submit" className={btnStyles.primary} />
          <Link href="/signup">
            <a className={btnStyles.success}>Sign Up</a>
          </Link>
        </form>
      </div>
      <div></div>
    </>
  )
}

Login.getLayout = AuthLayout

export default Login

// https://www.npmjs.com/package/iron-session
// https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter
export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user

    // Redirect to home if already logged in
    if (user) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    return {
      props: {}
    }
  },
  sessionOptions
)
