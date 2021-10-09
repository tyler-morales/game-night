import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { AuthNav } from '../components/nav/AuthNav'

import {
  SignUpValues,
  SignUpStepOneSchema,
  SignUpStepTwoSchema,
} from '../formik/SignUpValidation'

function SignUp() {
  const [data, setData] = useState(SignUpValues)

  const [currentStep, setCurrentStep] = useState(0)

  const makeRequest = (formData) => {
    console.log('Form Submitted', formData)
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
  const handleSubmit = (values) => {
    props.next(values)
  }

  return (
    <div className="flex flex-col gap-10 md:flex-row-reverse">
      <Formik
        validationSchema={SignUpStepOneSchema}
        initialValues={props.data}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="md:w-full flex gap-4 flex-col">
            <h1 className="font-bold text-white text-3xl md:text-left">
              Create an Account
            </h1>
            <div className="flex gap-3 flex-col">
              <label className="text-white text-xs" htmlFor="username">
                Family/ Friend Group Name
              </label>
              <Field
                name="username"
                type="text"
                className="focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2"
                placeholder="ahslandboys2000"
                autoFocus={true}
              />
              {errors.username && touched.username ? (
                <span className="text-sm text-error">{errors.username}</span>
              ) : null}
            </div>

            <div className="flex gap-3 flex-col">
              <label className="text-white text-xs" htmlFor="email">
                Email Addresss
              </label>
              <Field
                type="email"
                name="email"
                className="focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2"
                placeholder="anjay@gmail.com"
              />
              {errors.email && touched.email ? (
                <span className="text-sm text-error">{errors.email}</span>
              ) : null}
            </div>

            <div className="flex gap-3 flex-col">
              <label className="text-white text-xs" htmlFor="password">
                Password
              </label>
              <Field
                type="text"
                name="password"
                className="focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2"
                placeholder="qwerty123"
              />
              {errors.password && touched.password ? (
                <span className="text-sm text-error">{errors.password}</span>
              ) : null}
            </div>

            <button
              type="submit"
              className="transition-all transform hover:translate-y-1 rounded-md bg-tertiary py-3 mt-6 cursor-pointer border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent"
            >
              Next
            </button>

            {/* Already have an account */}
            <div className="mt-6">
              <p className="font-body text-white">
                <span className="mr-2">Already have an account?</span>
                <span className="text-quad cursor-pointer">Sign In</span>
              </p>
            </div>
          </Form>
        )}
      </Formik>
      {/* Marketing Section */}
      <section className="md:w-full ">
        <h2 className="text-white text-2xl mb-7">
          Track and view every family game night.
        </h2>
        <ul className="grid gap-5">
          <li className="grid gap-2 grid-cols-list">
            <span>✍️</span>
            <span className="text-white font-body font-bold">
              Document EVERY game. Easily track each game your family plays.
            </span>
          </li>
          <li className="grid gap-2 grid-cols-list">
            <span>📊</span>
            <span className="text-white font-body font-bold">
              Discover new insights. Uncover who has the most wins overall wins.
            </span>
          </li>
          <li className="grid gap-2 grid-cols-list">
            <span>📚</span>
            <span className="text-white font-body font-bold">
              Digitize your boardgame catalogue. Catagorize & store your board
              games.
            </span>
          </li>
        </ul>
      </section>
    </div>
  )
}

const StepTwo = (props) => {
  const handleSubmit = (values) => {
    props.next(values, true)
  }

  return (
    <section className="w-11/12 m-auto max-w-md">
      <Formik
        validationSchema={SignUpStepTwoSchema}
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
            {/* <div className="mt-4 flex gap-4 flex-col"> */}
            <div className="mt-4 flex gap-4 flex-col">
              <label className="text-white text-xs" htmlFor="authCode">
                Authentication Code
              </label>
              <Field
                name="confirmationCode"
                type="text"
                className="focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2"
                placeholder="123456"
              />
              {errors.confirmationCode && touched.confirmationCode ? (
                <span className="text-sm text-error">
                  {errors.confirmationCode}
                </span>
              ) : null}
            </div>
            {/* </div> */}
            <button
              type="submit"
              className="transition-all transform hover:translate-y-1 rounded-md bg-tertiary py-3 mt-6 cursor-pointer border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default SignUp
