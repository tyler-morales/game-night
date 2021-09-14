function ConfirmSignUp(props) {
  return (
    <>
      <section className="flex justify-center md:flex-row-reverse gap-16 mt-9 md:mt-14 w-11/12 lg:max-w-screen-xl m-auto">
        <div className="max-w-md">
          <h1 className="font-bold text-center text-white text-3xl">
            Enter your Validation Code
          </h1>
          <p className="text-white text-sm text-center mt-4 mb-12 font-body">
            You were just emailed a validation code. Please enter it below to
            confrim you account
          </p>
          <div className="mt-4 flex gap-4 flex-col">
            <div className="flex gap-3 flex-col">
              <label className="text-white text-xs" htmlFor="authCode">
                Authentication Code
              </label>
              <input
                name="confirmationCode"
                type="text"
                onChange={(e) => {
                  e.persist()
                  props.updateFormState(e)
                }}
                className="focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2"
                placeholder="123456"
              />
              <button
                onClick={props.confirmSignUp}
                className="transition-all transform hover:translate-y-1 rounded-md bg-tertiary py-3 mt-6 cursor-pointer border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent"
              >
                Confirm Account
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ConfirmSignUp
