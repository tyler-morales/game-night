function ForgotPassword(props) {
  return (
    <>
      <h1 className="font-bold text-white text-3xl md:text-left mb-4">
        Reset Password
      </h1>
      <div className="mt-4 flex gap-2 flex-col">
        <div className="flex gap-3 flex-col">
          <label className="text-white text-xs" htmlFor="username">
            Account name
          </label>
          <input
            name="username"
            placeholder="Username"
            className="focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2"
            onChange={(e) => {
              e.persist()
              props.updateFormState(e)
            }}
          />
          <button
            className="transition-all transform hover:translate-y-1 rounded-md bg-tertiary py-3 mt-6 cursor-pointer border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent"
            onClick={props.forgotPassword}
            title="Reset password"
          >
            Reset Password
          </button>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
