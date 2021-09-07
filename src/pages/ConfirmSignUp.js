// import { useState } from 'react'
import { Auth } from 'aws-amplify'
// import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  username: yup.string().min(4).max(20).required(),
  authCode: yup.string().max(6).required(),
})

export const ConfirmSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // const [serverError, setServerError] = useState({ status: false, message: '' })

  const onSubmit = async ({ username, authCode }) => {
    try {
      await Auth.confirmSignUp(username, authCode)
      console.log('Code confirmed')
    } catch (error) {
      console.error(
        'Verification code does not match. Please enter a valid verification code.',
        error
      )
    }
  }

  return (
    <section className="flex justify-center md:flex-row-reverse gap-16 mt-9 md:mt-14 w-11/12 lg:max-w-screen-xl m-auto">
      <div className="max-w-md">
        <h1 className="font-bold text-center text-white text-3xl">
          Enter your Validation Code
        </h1>
        <p className="text-white text-sm text-center mt-4 mb-12 font-body">
          You were just emailed a validation code. Please enter it below to
          confrim you account
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex gap-4 flex-col"
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
            />
            {/* <p className="text-error text-sm">{serverError.message}</p> */}
          </div>

          <div className="flex gap-3 flex-col">
            <label className="text-white text-xs" htmlFor="authCode">
              Authentication Code
            </label>
            <input
              type="text"
              {...register('authCode')}
              className={
                errors.authCode
                  ? 'focus:ring-error transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
                  : 'focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
              }
              placeholder="ahslandboys2000"
              autoFocus
            />
            {/* <p className="text-error text-sm">{serverError.message}</p> */}
            <input
              className="transition-all transform hover:translate-y-1 rounded-md bg-tertiary py-3 mt-6 cursor-pointer border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent"
              type="submit"
              value="Confirm Account"
            />
          </div>
        </form>
      </div>
    </section>
  )
}
