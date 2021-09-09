import { useContext } from 'react'
import { Auth } from 'aws-amplify'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AuthHeader } from '../components/AuthHeader'
import { AuthContext } from '../context/AuthContext'

const schema = yup.object().shape({
  username: yup.string().min(4).max(20).required(),
})

export const ResendCode = () => {
  const { user, setUser } = useContext(AuthContext)
  let history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // const [serverError, setServerError] = useState({ status: false, message: '' })

  const onSubmit = async ({ username }) => {
    console.log(username)
    try {
      // TODO: Add auth context to store account name for quick access
      await Auth.resendSignUp(username)
      history.push('/verify-account')
      setUser(username)
    } catch (err) {
      // setServerError({
      //   status: true,
      //   message: err,
      // })
      console.log(err)
    }
  }

  const renderError = (message) => message

  return (
    <>
      <AuthHeader />
      <section className="flex justify-center md:flex-row-reverse gap-16 mt-9 md:mt-14 w-11/12 lg:max-w-screen-xl m-auto">
        <div className="max-w-md">
          <h1 className="font-bold text-center text-white text-3xl">
            Enter the Account Name
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex gap-4 flex-col"
          >
            <div className="flex gap-3 flex-col">
              <label className="text-white text-xs" htmlFor="username">
                Family/ Friend Group Name
              </label>
              <input
                name="accountname"
                defaultValue={user || ''}
                type="text"
                {...register('username')}
                className={
                  errors.username
                    ? 'focus:ring-error transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
                    : 'focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
                }
                placeholder="ahslandboys2000"
              />
              <p className="text-error text-sm">
                {errors.username &&
                  renderError(
                    'Must be between 1-20 alpha-numerical characters'
                  )}
              </p>
            </div>

            <div className="flex gap-3 flex-col"></div>
            <input
              className="transition-all transform hover:translate-y-1 rounded-md bg-tertiary py-3 mt-6 cursor-pointer border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent"
              type="submit"
              value="Resend Code"
            />
          </form>
        </div>
      </section>
    </>
  )
}
