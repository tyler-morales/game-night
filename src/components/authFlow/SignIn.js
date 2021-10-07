import { useState } from 'react'

export const SignIn = ({ signIn, updateFormState }) => {
  const [signingIn, setSigningIn] = useState(false)
  return (
    <>
      <h1 className="font-bold text-white text-3xl md:text-left mb-4">
        Sign in
      </h1>
      <form className="mt-4 flex gap-2 flex-col">
        <div className="flex gap-3 flex-col">
          <label className="text-white text-xs" htmlFor="username">
            Family/ Friend Group Name
          </label>
          <input
            type="text"
            name="username"
            onChange={(e) => {
              e.persist()
              updateFormState(e)
            }}
            placeholder="username"
            className="focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2"
          />
        </div>
        <div className="flex gap-3 flex-col">
          <label className="text-white text-xs" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            type="text"
            onChange={(e) => {
              e.persist()
              updateFormState(e)
            }}
            placeholder="password"
            className="focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2"
          />
        </div>
        <button
          className={`transition-all transform hover:translate-y-1 rounded-md bg-tertiary py-3 mt-6 cursor-pointer border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent ${
            signingIn ? 'opacity-50 cursor-wait' : 'opacity-100'
          }`}
          disabled={signingIn ? true : false}
          onClick={() => [setSigningIn(true), signIn()]}
          title="Sign In"
        >
          {signingIn ? 'Loading...' : 'Sign in'}
        </button>
      </form>
    </>
  )
}
