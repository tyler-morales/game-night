import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import { SignIn } from './SignIn'
import SignUp from './SignUp'
import ConfirmSignUp from './ConfirmSignUp'
import ForgotPassword from './ForgotPassword'
import ForgotPasswordSubmit from './ForgotPasswordSubmit'

import { AuthNav } from '../nav/AuthNav'

const initialFormState = {
  username: '',
  password: '',
  email: '',
  confirmationCode: '',
}

async function signUp({ username, password, email }, updateFormType) {
  try {
    await Auth.signUp({
      username,
      password,
      attributes: { email },
    })
    console.log('sign up success!')
    updateFormType('confirmSignUp')
  } catch (err) {
    console.log('error signing up..', err)
  }
}

async function confirmSignUp({ username, confirmationCode }, updateFormType) {
  try {
    await Auth.confirmSignUp(username, confirmationCode)
    updateFormType('signIn')
  } catch (err) {
    console.log('error confirming account..', err)
  }
}

async function signIn({ username, password }, setUser) {
  try {
    const user = await Auth.signIn(username, password)
    const userInfo = { username: user.username, ...user.attributes }
    setUser(userInfo)
  } catch (err) {
    console.log('error signing in..', err)
  }
}

async function forgotPassword({ username }, updateFormType) {
  try {
    await Auth.forgotPassword(username)
    updateFormType('forgotPasswordSubmit')
  } catch (err) {
    console.log('error submitting username to reset password...', err)
  }
}

async function forgotPasswordSubmit(
  { username, confirmationCode, password },
  updateFormType
) {
  try {
    await Auth.forgotPasswordSubmit(username, confirmationCode, password)
    updateFormType('signIn')
  } catch (err) {
    console.log('error updating password... :', err)
  }
}

export const AuthForm = (props) => {
  const [formType, updateFormType] = useState('signIn')
  const [formState, updateFormState] = useState(initialFormState)
  function updateForm(event) {
    const newFormState = {
      ...formState,
      [event.target.name]: event.target.value,
    }
    updateFormState(newFormState)
    console.log(formState)
  }

  function renderForm() {
    switch (formType) {
      case 'signUp':
        return (
          <SignUp
            signUp={() => signUp(formState, updateFormType)}
            updateFormState={(e) => updateForm(e)}
          />
        )
      case 'confirmSignUp':
        return (
          <ConfirmSignUp
            confirmSignUp={() => confirmSignUp(formState, updateFormType)}
            updateFormState={(e) => updateForm(e)}
          />
        )
      case 'signIn':
        return (
          <SignIn
            signIn={() => signIn(formState, props.setUser)}
            updateFormState={(e) => updateForm(e)}
          />
        )
      case 'forgotPassword':
        return (
          <ForgotPassword
            forgotPassword={() => forgotPassword(formState, updateFormType)}
            updateFormState={(e) => updateForm(e)}
          />
        )
      case 'forgotPasswordSubmit':
        return (
          <ForgotPasswordSubmit
            forgotPasswordSubmit={() =>
              forgotPasswordSubmit(formState, updateFormType)
            }
            updateFormState={(e) => updateForm(e)}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <AuthNav />
      <div
        className={`flex flex-col w-11/12 m-auto justify-center mt-9 md:mt-14 py-6 ${
          formType === 'signUp' ? 'md:max-w-2xl' : 'md:max-w-md'
        }`}
      >
        {renderForm()}
        {formType === 'signUp' && (
          <div className="mt-6">
            <p className="font-body text-white">
              Already have an account?{' '}
              <span
                className="text-quad cursor-pointer"
                onClick={() => updateFormType('signIn')}
              >
                Sign In
              </span>
            </p>
          </div>
        )}
        {formType === 'forgotPassword' && (
          <div className="mt-6">
            <p className="font-body text-white">
              Remembered your password?{' '}
              <span
                className="text-quad cursor-pointer"
                onClick={() => updateFormType('signIn')}
              >
                Sign in
              </span>
            </p>
          </div>
        )}
        {formType === 'signIn' && (
          <div className="mt-6">
            <p className="font-body text-white">
              Don't have an Account?{' '}
              <span
                className="text-quad cursor-pointer"
                onClick={() => updateFormType('signUp')}
              >
                Sign Up
              </span>
            </p>
            <p className="font-body text-white">
              Forget your password?{' '}
              <span
                className="text-quad cursor-pointer"
                onClick={() => updateFormType('forgotPassword')}
              >
                Reset Password
              </span>
            </p>
          </div>
        )}
      </div>
    </>
  )
}
