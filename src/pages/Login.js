import { useState } from 'react'
import { Auth } from 'aws-amplify'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  username: yup.string().min(4).max(20).required(),
  password: yup.string().min(8).required(),
})

export const Login = () => {
  let history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const [serverError, setServerError] = useState({ status: false, message: '' })

  const onSubmit = async ({ username, password }) => {
    try {
      const user = await Auth.signIn(username, password)
      console.log(user)
      history.push('/dashboard')
    } catch (error) {
      console.error('error signing up:', error)
      setServerError({
        status: true,
        message: error.message,
      })
    }
  }

  const renderError = (message) => message

  return (
    <section className="flex flex-col justify-center md:flex-row-reverse gap-16 mt-9 md:mt-14 w-11/12 lg:max-w-screen-xl m-auto">
      <div className="md:w-1/2 lg:max-w-sm">
        <h1 className="font-bold text-center text-white text-3xl md:text-left">
          Log in
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
                errors.username
                  ? 'focus:ring-error transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
                  : 'focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
              }
              placeholder="ahslandboys2000"
              autofocus="true"
            />
            <p className="text-error text-sm">
              {errors.username &&
                renderError('Must be between 1-20 alpha-numerical characters')}
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
          <p className="text-error text-sm">{serverError.message}</p>
          <input
            className="transition-all transform hover:translate-y-1 rounded-md bg-tertiary py-3 mt-6 cursor-pointer border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent"
            type="submit"
            value="Log in"
          />
        </form>
        <h4 className="text-white text-center mt-5">
          Don't have an Account?
          <Link
            to="/signup"
            className="font-body text-quad cursor-pointer rounded-md font-bold px-2  border-transparent focus:outline-none focus:ring-1 focus:ring-quad focus:border-transparent"
          >
            Create an Account
          </Link>
        </h4>
      </div>
    </section>
  )
}
