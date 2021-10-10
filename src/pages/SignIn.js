import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

import { AuthNav } from '../components/nav/AuthNav'

import { useUser } from '../contexts/UserContext'

import { SignInValues, SignInSchema } from '../formik/SignInValidation'

function SignIn(setUser) {
  let history = useHistory()
  // get access to the login function
  const { login, user } = useUser()

  const [signingIn, setSigningIn] = useState(false)
  const [serverError, setServerError] = useState(null)

  const signIn = async ({ username, password }) => {
    try {
      setSigningIn(true)
      await login(username, password)
      console.log(user)
      history.push('/dashboard')
    } catch (err) {
      setServerError(err.message)
      console.log('error signing in..', err)
    }
    setSigningIn(false)
  }

  return (
    <>
      <AuthNav />
      <div className="flex flex-col w-11/12 m-auto justify-center mt-9 md:mt-14 py-6 md:max-w-md">
        <h1 className="font-bold text-white text-3xl md:text-left mb-4">
          Sign in
        </h1>
        <Formik
          validationSchema={SignInSchema}
          initialValues={SignInValues}
          onSubmit={signIn}
        >
          {({ errors, touched }) => (
            <Form className="mt-4 flex gap-2 flex-col">
              <div className="flex gap-3 flex-col">
                <label className="text-white text-xs" htmlFor="username">
                  Family/ Friend Group Name
                </label>
                <Field
                  type="text"
                  name="username"
                  placeholder="username"
                  className="transition-all rounded-md py-3 pl-3 border-2 focus-tertiary-ring"
                  autoFocus={true}
                />
                {serverError && (
                  <span className="text-error">{serverError}</span>
                )}
                {errors.username && touched.username ? (
                  <span className="text-sm text-error">{errors.username}</span>
                ) : null}
              </div>
              <div className="flex gap-3 flex-col">
                <label className="text-white text-xs" htmlFor="password">
                  Password
                </label>
                <Field
                  name="password"
                  type="text"
                  placeholder="password"
                  className="transition-all rounded-md py-3 pl-3 border-2 focus-tertiary-ring"
                />
                {errors.password && touched.password ? (
                  <span className="text-sm text-error">{errors.password}</span>
                ) : null}
              </div>
              <button
                type="submit"
                className={`transition-all transform hover:translate-y-1 rounded-md bg-tertiary py-3 mt-6 cursor-pointer border-2 border-transparent focus-tertiary-ring ${
                  signingIn ? 'opacity-50 cursor-wait' : 'opacity-100'
                }`}
                disabled={signingIn ? true : false}
                title="Sign In"
              >
                {signingIn ? 'Loading...' : 'Sign in'}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-6">
          <p className="font-body text-white">
            Don't have an Account?
            <NavLink to="/sign-up">
              <span className="text-quad cursor-pointer ml-2">Sign Up</span>
            </NavLink>
          </p>
          <p className="font-body text-white">
            Forget your password?
            <NavLink to="/forgot-password">
              <span className="text-quad cursor-pointer ml-2">
                Reset Password
              </span>
            </NavLink>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignIn
