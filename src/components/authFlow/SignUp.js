import { Formik, Field, Form } from 'formik'

import { SignUpValues, SignUpSchema } from '../../formik/SignUpValidation'
// import { SignUpErrors } from '../errors/SignUpErrors'

function SignUp({ updateFormState, signUp }) {
  return (
    <div className="flex flex-col gap-10 md:flex-row-reverse">
      <Formik
        initialValues={SignUpValues}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          console.log(values)
          updateFormState(values)
          signUp()
        }}
      >
        {({ errors, touched }) => (
          <Form className="md:w-full flex gap-2 flex-col">
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
                // onChange={(e) => {
                //   e.persist()
                //   updateFormState(e)
                // }}
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
                // onChange={(e) => {
                //   e.persist()
                //   updateFormState(e)
                // }}
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
                // onChange={(e) => {
                //   e.persist()
                //   updateFormState(e)
                // }}
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
              Create Account
            </button>
          </Form>
        )}
      </Formik>

      {/* Marketing Section */}
      <section className="md:w-full ">
        <h2 className="text-white text-2xl mb-7">
          Track and view every family game night.
        </h2>
        <ul>
          <li id="emoji-1" className="text-white font-body mb-5">
            <span className="font-bold"> Document EVERY game</span>. Easily
            track each game your family plays.
          </li>
          <li id="emoji-2" className="text-white font-body mb-5">
            <span className="font-bold"> Discover new insights</span>. Uncover
            who has the most wins overall wins.
          </li>
          <li id="emoji-3" className="text-white font-body">
            <span className="font-bold"> Digitize your boardgame</span>{' '}
            catalogue. Catagorize & store your board games.
          </li>
        </ul>
      </section>
    </div>
  )
}

export default SignUp
