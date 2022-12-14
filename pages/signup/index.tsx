import formStyles from '../../components/Form.module.scss'
import { useRouter } from 'next/router'
import { validateSignUpForm } from '../../schemas'
import { useForm } from 'react-hook-form'
import btnStyles from '../../components/Button.module.scss'
import type { SignUpFormTypes } from '../../models'
import axios from 'axios'
import AuthLayout from './../../components/layouts/AuthLayout'
import type { NextPageWithLayout } from '../_app'
import type { GetServerSideProps } from 'next'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '../../libs/session'

const SignUp: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormTypes>(validateSignUpForm)
  const router = useRouter()

  async function onSubmit(form: SignUpFormTypes) {
    return await axios
      .post('/api/register', form)
      .then(res => {
        const data = res.data
        if (data?.message) {
          alert(data.message)
        } else {
          alert('Add new user successfully')
          router.push('/login')
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <h1>SignUp Page</h1>
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
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              {...register('name')}
            />
            <p className="invalid-feedback">{errors.name?.message}</p>
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
          <input type="submit" value="Submit" className={btnStyles.success} />
        </form>
      </div>
    </>
  )
}

SignUp.getLayout = AuthLayout

export default SignUp

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
