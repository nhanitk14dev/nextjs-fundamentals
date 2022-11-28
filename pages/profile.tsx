import { withIronSessionSsr } from 'iron-session/next';
import type { InferGetServerSidePropsType } from 'next';
import { sessionOptions } from '../libs/session';
import type { IUser } from '../models';
import { UserPropDefault } from '../models';
import styles from '../components/Form.module.scss'
import btnStyles from '../components/Button.module.scss'
import { useForm } from 'react-hook-form';
import { validateUserUpdate } from '../schemas';

export default function Profile({
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const { register, handleSubmit, formState: { errors } } = useForm < IUser > (validateUserUpdate);

  function onSubmit() {
    alert('todo later')
  }

  return (
    <>
      <div className={styles.formContainer}>
        <h1>Profile Page</h1>
        <form onSubmit={handleSubmit(onSubmit)} method='post'>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter email" defaultValue={user.email} readOnly={true} {...register("email")} />
            <p className='invalid-feedback'>{errors.email?.message}</p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">User Name</label>
            <input type="name" id="name" placeholder="Enter user name" defaultValue={user.name} {...register("name")} />
            <p className='invalid-feedback'>{errors.name?.message}</p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <input type="address" id="address" placeholder="Enter address" defaultValue={user.address} {...register("address")} />
            <p className='invalid-feedback'>{errors.address?.message}</p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">New Password</label>
            <input type="password" id="password" placeholder="Enter password" {...register("password")} />
            <p className='invalid-feedback'>{errors.password?.message}</p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="re-password">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="Enter confirm password" {...register("confirmPassword")} />
            <p className='invalid-feedback'>{errors.confirmPassword?.message}</p>
          </div>
          <input type="submit" value="Submit" className={btnStyles.primary} />
        </form>
      </div>
    </>
  )
}

/*
  We just use getServerSideProps to check authentication for demo on Profile page.
  In latest version of Next, use middleware.ts to protect route)
 */
export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res
}) {
  const userSession = req.session.user;

  if (!userSession) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();

    return {
      props: {
        user: UserPropDefault as IUser
      }
    }
  }

  return {
    props: { user: userSession }
  }

},
  sessionOptions);