import { useState } from 'react'
import { Auth } from 'aws-amplify'
import { NavLink } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

import { AuthNav } from '../components/nav/AuthNav'

import { SignInValues, SignInSchema } from '../formik/SignInValidation'

function SignIn(values) {
  const [signingIn, setSigningIn] = useState(false)
  // const [user, setUser] = useState(null)

  async function signIn({ username, password }, setUser) {
    try {
      const user = await Auth.signIn(username, password)
      // const userInfo = { username: user.username, ...user.attributes }

      // setUser(userInfo)
    } catch (err) {
      console.log('error signing in..', err)
    }
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
                  className="focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2"
                />
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
                  className="focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2"
                />
                {errors.password && touched.password ? (
                  <span className="text-sm text-error">{errors.password}</span>
                ) : null}
              </div>
              <button
                type="submit"
                className={`transition-all transform hover:translate-y-1 rounded-md bg-tertiary py-3 mt-6 cursor-pointer border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent ${
                  signingIn ? 'opacity-50 cursor-wait' : 'opacity-100'
                }`}
                disabled={signingIn ? true : false}
                onSubmit={() => [setSigningIn(true)]}
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
            <span className="text-quad cursor-pointer ml-2">
              Reset Password
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignIn
