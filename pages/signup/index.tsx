
import formStyles from '../../components/Form.module.scss';
import { useRouter } from 'next/router';
import { validateSignUpForm } from '../../schemas';
import { useForm } from 'react-hook-form';
import { userService } from '../../services';
import btnStyles from '../../components/Button.module.scss';
import type { IUser, SignUpFormTypes } from '../../models';

type TypeProps = {
  users: IUser[]
}

const SignUp = ({ users = [] }: TypeProps) => {
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState: { errors } } = useForm < SignUpFormTypes > (validateSignUpForm);
  const router = useRouter();

  function onSubmit(form: SignUpFormTypes) {
    const email = form.email;
    const isExistingUser = userService.findUserByEmail({ users, email });
    if (isExistingUser) {
      alert('This email address is already taken. Please try another one')
      return;
    }

    return userService.signUp(form)
      .then((res) => {
        // todo: handle alert component
        console.log(res.data)
        alert('Add new user successfully');
        router.push('/login')
      })
      .catch((error) => console.log(error))
  }

  return (
    <>
      <h1>SignUp Page</h1>
      <div className={formStyles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)} method='post'>
          <div className={formStyles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Enter email" {...register("email")} />
            <p className='invalid-feedback'>{errors.email?.message}</p>
          </div>
          <div className={formStyles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Enter name" {...register("name")} />
            <p className='invalid-feedback'>{errors.name?.message}</p>
          </div>
          <div className={formStyles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Enter password" {...register("password")} />
            <p className='invalid-feedback'>{errors.password?.message}</p>
          </div>
          <input type="submit" value="Submit" className={btnStyles.success} />
        </form>
      </div>
    </>
  );
}

export default SignUp;

// https://nextjs.org/docs/basic-features/data-fetching/get-static-props
export async function getStaticProps() {
  // function directly in `getStaticProps`
  const users = await userService.getUsers();
  return {
    props: {
      users,
    },
  }
}