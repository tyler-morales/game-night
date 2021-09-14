function ForgotPasswordSubmit(props) {
  return (
    <>
      <h1 className="font-bold text-white text-3xl md:text-left mb-4 text-center">
        Reset your Password
      </h1>
      <p className="text-white text-sm mt-4 mb-12 font-body text-center md:text-left">
        You were just emailed a validation code. Please enter it below to
        confrim you account
      </p>
      <div className="mt-4 flex gap-2 flex-col">
        <div className="flex gap-3 flex-col">
          <label className="text-white text-xs" htmlFor="username">
            Confirmation Code
          </label>
          <input
            name="confirmationCode"
            placeholder="123456"
            onChange={(e) => {
              e.persist()
              props.updateFormState(e)
            }}
            className="focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2"
          />
        </div>
        <div className="flex gap-3 flex-col">
          <label className="text-white text-xs" htmlFor="password">
            New Password
          </label>
          <input
            name="password"
            placeholder="New password"
            type="text"
            onChange={(e) => {
              e.persist()
              props.updateFormState(e)
            }}
            className="focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2"
          />
        </div>
        <button
          className="transition-all transform hover:translate-y-1 rounded-md bg-tertiary py-3 mt-6 cursor-pointer border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent"
          onClick={props.forgotPasswordSubmit}
        >
          Sign in
        </button>
      </div>
    </>
  )
}

export default ForgotPasswordSubmit
