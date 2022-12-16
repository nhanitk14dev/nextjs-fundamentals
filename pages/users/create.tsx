import formStyles from '../../components/Form.module.scss'
import { useRouter } from 'next/router'
import { validateUserUpdate } from '../../schemas'
import { useForm } from 'react-hook-form'
import btnStyles from '../../components/Button.module.scss'
import type { UserUpdateFormTypes } from '../../models'
import axios from 'axios'
import AuthLayout from './../../components/layouts/AuthLayout'
import type { NextPageWithLayout } from '../_app'

const CreateUser: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserUpdateFormTypes>(validateUserUpdate)
  const router = useRouter()

  async function onSubmit(form: UserUpdateFormTypes) {
    return await axios
      .post('/api/users/create', form)
      .then(res => {
        const data = res.data
        if (data?.message) {
          alert(data.message)
        } else {
          alert('Add new user successfully')
          router.push('/users')
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <h1>Add New User Page</h1>
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
            <p className="invalid-feedback">{errors.address?.message}</p>
          </div>
          <div className={formStyles.formGroup}>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              placeholder="Enter address"
              {...register('address')}
            />
            <p className="invalid-feedback">{errors.address?.message}</p>
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
          <div className={formStyles.formGroup}>
            <label htmlFor="passwordConfirmation">Password Confirmation:</label>
            <input
              type="password"
              id="passwordConfirmation"
              placeholder="Enter passwordConfirmation"
              {...register('passwordConfirmation')}
            />
            <p className="invalid-feedback">{errors.passwordConfirmation?.message}</p>
          </div>
          <input type="submit" value="Submit" className={btnStyles.success} />
        </form>
      </div>
    </>
  )
}

CreateUser.getLayout = AuthLayout

export default CreateUser