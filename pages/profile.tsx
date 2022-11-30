import { withIronSessionSsr } from 'iron-session/next'
import type { InferGetServerSidePropsType } from 'next'
import { sessionOptions } from '../libs/session'
import { UserPropDefault } from '../models'
import styles from '../components/Form.module.scss'
import btnStyles from '../components/Button.module.scss'
import { useForm } from 'react-hook-form'
import { validateUserUpdate } from '../schemas'
import type { UserUpdateFormTypes } from './../models/user.model'
import axios from 'axios'

export default function Profile({
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserUpdateFormTypes>(validateUserUpdate)

  async function onSubmit(form: UserUpdateFormTypes) {

    // Send only data necessary when pass validation
    delete form.passwordConfirmation

    return await axios
      .post('/api/profile', form)
      .then(res => {
        if (res.data?.message) {
          alert(res.data.message)
        } else {
          alert('Update profile successfully!')
        }
      })
      .catch(error => alert(error.message))
  }

  return (
    <>
      <div className={styles.formContainer}>
        <h1>Profile Page</h1>
        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              defaultValue={user.email}
              readOnly={true}
              {...register('email')}
            />
            <p className="invalid-feedback">{errors.email?.message}</p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">User Name</label>
            <input
              type="name"
              id="name"
              placeholder="Enter user name"
              defaultValue={user.name}
              {...register('name')}
            />
            <p className="invalid-feedback">{errors.name?.message}</p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <input
              type="address"
              id="address"
              placeholder="Enter address"
              defaultValue={user.address}
              {...register('address')}
            />
            <p className="invalid-feedback">{errors.address?.message}</p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              {...register('password')}
            />
            <p className="invalid-feedback">{errors.password?.message}</p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="re-password">Password Confirmation</label>
            <input
              type="password"
              id="password-confirmation"
              placeholder="Enter password confirmation"
              {...register('passwordConfirmation')}
            />
            <p className="invalid-feedback">
              {errors.passwordConfirmation?.message}
            </p>
          </div>
          <input type="submit" value="Submit" className={btnStyles.primary} />
        </form>
      </div>
    </>
  )
}

/*
  We just use getServerSideProps to get authenticated user
  In latest version of Next, we're using middleware.ts to protect route
  https://github.com/vvo/iron-session
 */ 
export const getServerSideProps = withIronSessionSsr(async function ({
  req
}) {
  const userSession = req.session.user
  return {
    props: {
      user: userSession || UserPropDefault
    }
  }
},
sessionOptions)
