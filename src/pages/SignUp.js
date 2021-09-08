import { useState, useContext } from 'react'
import { Auth } from 'aws-amplify'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AuthContext } from '../context/AuthContext'
import { AuthHeader } from '../components/AuthHeader'

const schema = yup.object().shape({
  username: yup.string().min(4).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

export const SignUp = () => {
  const { setUser } = useContext(AuthContext)

  let history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const [serverError, setServerError] = useState({ status: false, message: '' })

  const onSubmit = async (data) => {
    console.log(data, data.username)
    try {
      await Auth.signUp({
        username: data.username,
        password: data.password,
        attributes: {
          email: data.email,
        },
      })
      history.push('/verify-account')
      setUser(data.username)
    } catch (error) {
      console.error('error signing up:', error)
      setServerError({
        status: true,
        message: (error.message += ': Either Log in or use a different name'),
      })
    }
  }

  const renderError = (message) => message

  return (
    <>
      <AuthHeader />
      <section className="flex flex-col justify-center md:flex-row-reverse gap-16 mt-9 md:mt-14 w-11/12 lg:max-w-screen-xl m-auto">
        <div className="md:w-1/2 lg:max-w-sm">
          <h1 className="font-bold text-center text-white text-3xl md:text-left">
            Create an Account
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex gap-2 flex-col"
          >
            <div className="flex gap-3 flex-col">
              <label className="text-white text-xs" htmlFor="username">
                Family/ Friend Group Name
              </label>
              <input
                type="text"
                {...register('username')}
                className={
                  errors.username || serverError.status
                    ? 'focus:ring-error transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
                    : 'focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
                }
                placeholder="ahslandboys2000"
                autoFocus={true}
              />
              <p className="text-error text-sm">
                {errors.username &&
                  renderError(
                    'Must be between 1-20 alpha-numerical characters'
                  )}
                {serverError.message}
              </p>
            </div>
            <div className="flex gap-3 flex-col">
              <label className="text-white text-xs" htmlFor="email">
                Email Addresss
              </label>
              <input
                type="email"
                {...register('email')}
                className={
                  errors.email
                    ? 'focus:ring-error transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
                    : 'focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
                }
                placeholder="anjay@gmail.com"
              />
              <p className="text-error text-sm">
                {errors.email && renderError('Must be a valid email address')}
              </p>
            </div>
            <div className="flex gap-3 flex-col">
              <label className="text-white text-xs" htmlFor="password">
                Password
              </label>
              <input
                type="text"
                {...register('password')}
                className={
                  errors.password
                    ? 'focus:ring-error transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
                    : 'focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
                }
                placeholder="qwerty123"
              />
              <p className="text-error text-sm">
                {errors.password &&
                  renderError(
                    'Must be at least 8 characters long and include a number'
                  )}
              </p>
            </div>
            <input
              className="transition-all transform hover:translate-y-1 rounded-md bg-tertiary py-3 mt-6 cursor-pointer border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent"
              type="submit"
              value="Create Account"
            />
          </form>
          <h4 className="text-white text-center mt-5">
            Have an Account?
            <Link
              to="/login"
              className="font-body text-quad cursor-pointer rounded-md font-bold px-2  border-transparent focus:outline-none focus:ring-1 focus:ring-quad focus:border-transparent"
            >
              Log in
            </Link>
          </h4>
        </div>
        <div className="md:w-1/2 lg:max-w-sm">
          <h2 className="text-white text-2xl mb-7">
            Track and view every family game night.
          </h2>
          <ul>
            <li className="text-white font-body mb-5">
              <span className="font-bold"> Document EVERY game</span>. Easily
              track each game your family plays.
            </li>
            <li className="text-white font-body mb-5">
              <span className="font-bold"> Discover new insights</span>. Uncover
              who has the most wins overall wins.
            </li>
            <li className="text-white font-body">
              <span className="font-bold"> Digitize your boardgame</span>{' '}
              catalogue. Catagorize & store your board games.
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
