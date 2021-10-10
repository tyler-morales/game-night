import { useState } from 'react'
import { Auth } from 'aws-amplify'
import { useHistory } from 'react-router-dom'

import { NavLink } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

import { AuthNav } from '../components/nav/AuthNav'

import {
  ForgotPasswordValues,
  ForgotPasswordStepOneSchema,
  ForgotPasswordStepTwoSchema,
} from '../formik/ForgotPasswordValidation'

function ForgotPassword() {
  let history = useHistory()

  const [data, setData] = useState(ForgotPasswordValues)
  const [currentStep, setCurrentStep] = useState(0)

  const makeRequest = (formData) => {
    history.push('/sign-in')
  }

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }))

    if (final) {
      makeRequest(newData)
      return
    }

    setCurrentStep((prev) => prev + 1)
  }

  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo next={handleNextStep} data={data} />,
  ]

  return (
    <>
      <AuthNav />
      <div className="flex flex-col w-11/12 m-auto justify-center mt-9 md:mt-14 py-6 md:max-w-4xl">
        {steps[currentStep]}
      </div>
    </>
  )
}

const StepOne = (props) => {
  const [signingIn, setSigningIn] = useState(false)
  const [serverError, setServerError] = useState(null)

  const handleSubmit = async ({ username, password, email }) => {
    setSigningIn(true)
    try {
      await Auth.forgotPassword(username)
      props.next({ username, password, email })
    } catch (err) {
      setServerError(err.message)
      setSigningIn(false)

      console.error('error confirming account..', err)
    }
  }

  return (
    <div className="flex flex-col w-11/12 m-auto justify-center mt-9 md:mt-14 py-6 md:max-w-md">
      <section className="md:w-full flex gap-4 flex-col">
        <Formik
          validationSchema={ForgotPasswordStepOneSchema}
          initialValues={props.data}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex gap-4 flex-col">
              <h1 className="font-bold text-white text-3xl md:text-left">
                Reset Password
              </h1>
              <div className="flex gap-3 flex-col">
                <label className="text-white text-xs" htmlFor="username">
                  Account name
                </label>
                <Field
                  name="username"
                  type="text"
                  className="transition-all rounded-md py-3 pl-3 border-2 focus-tertiary-ring"
                  placeholder="username"
                  autofocus={true}
                />
                {serverError && (
                  <span className="text-error">{serverError}</span>
                )}
                {errors.username && touched.username ? (
                  <span className="text-sm text-error">{errors.username}</span>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={signingIn ? true : false}
                className={`transition-all transform hover:translate-y-1 w-full rounded-md bg-tertiary py-3 mt-6 cursor-pointer border-2 border-transparent focus-tertiary-ring ${
                  signingIn ? 'opacity-50 cursor-wait' : 'opacity-100'
                }`}
              >
                {signingIn ? 'Loading...' : 'Next'}
              </button>
            </Form>
          )}
        </Formik>

        {/* Already have an account */}
        <div className="mt-6">
          <p className="font-body text-white">
            <span className="mr-2">Remembered your password?</span>
            <NavLink to="/sign-in">
              <span className="text-quad cursor-pointer">Sign In</span>
            </NavLink>
          </p>
        </div>
      </section>
    </div>
  )
}

const StepTwo = (props) => {
  const [signingIn, setSigningIn] = useState(false)
  const [serverError, setServerError] = useState(null)

  const handleSubmit = async ({ username, confirmationCode }) => {
    setSigningIn(true)
    try {
      await Auth.confirmForgotPassword(username, confirmationCode)
      props.next(username, true)
    } catch (err) {
      setSigningIn(false)
      setServerError(err.message)
      console.error('error confirming account..', err)
    }
  }

  return (
    <section className="w-11/12 m-auto max-w-md">
      <Formik
        validationSchema={ForgotPasswordStepTwoSchema}
        initialValues={props.data}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="md:w-full flex gap-2 flex-col">
            <h1 className="font-bold text-center text-white text-3xl">
              Enter your Validation Code
            </h1>
            <p className="text-white text-sm text-center mt-4 mb-8 font-body">
              You were just emailed a validation code. Please enter it below to
              confrim you account
            </p>
            <div className="mt-4 flex gap-4 flex-col">
              <label className="text-white text-xs" htmlFor="authCode">
                Authentication Code
              </label>
              <Field
                name="confirmationCode"
                type="text"
                className="focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2"
                placeholder="123456"
                autoFocus={true}
              />
              {serverError && <span className="text-error">{serverError}</span>}
              {errors.confirmationCode && touched.confirmationCode ? (
                <span className="text-sm text-error">
                  {errors.confirmationCode}
                </span>
              ) : null}
            </div>
            <button
              type="submit"
              disabled={signingIn ? true : false}
              className={`transition-all transform hover:translate-y-1 rounded-md bg-tertiary py-3 mt-6 cursor-pointer border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent ${
                signingIn ? 'opacity-50 cursor-wait' : 'opacity-100'
              }`}
            >
              {signingIn ? 'Loading...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default ForgotPassword
