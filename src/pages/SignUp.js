import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  groupName: yup.string().min(4).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => console.log(data)

  const renderError = (message) => message

  return (
    <section class="flex flex-col justify-center md:flex-row-reverse gap-16 mt-9 md:mt-14 w-11/12 lg:max-w-screen-xl m-auto">
      <div class="md:w-1/2 lg:max-w-sm">
        <h1 class="font-bold text-center text-white text-3xl md:text-left">
          Create an Account
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          class="mt-4 flex gap-2 flex-col"
        >
          <div class="flex gap-3 flex-col">
            <label class="text-white text-xs" htmlFor="groupName">
              Family/ Friend Group Name
            </label>
            <input
              type="text"
              {...register('groupName')}
              class={
                errors.groupName
                  ? 'focus:ring-error transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
                  : 'focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
              }
              placeholder="ahslandboys2000"
            />
            <p class="text-error text-sm">
              {errors.groupName &&
                renderError('Must be between 1-20 alpha-numerical characters')}
            </p>
          </div>
          <div class="flex gap-3 flex-col">
            <label class="text-white text-xs" htmlFor="email">
              Email Addresss
            </label>
            <input
              type="email"
              {...register('email')}
              class={
                errors.email
                  ? 'focus:ring-error transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
                  : 'focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
              }
              placeholder="anjay@gmail.com"
            />
            <p class="text-error text-sm">
              {errors.email && renderError('Must be a valid email address')}
            </p>
          </div>
          <div class="flex gap-3 flex-col">
            <label class="text-white text-xs" htmlFor="password">
              Password
            </label>
            <input
              type="text"
              {...register('password')}
              class={
                errors.password
                  ? 'focus:ring-error transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
                  : 'focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2'
              }
              placeholder="qwerty123"
            />
            <p class="text-error text-sm">
              {errors.password &&
                renderError('Must be at least 6 characters long ')}
            </p>
          </div>
          <input
            class="transition-all transform hover:translate-y-1 rounded-md bg-tertiary py-3 mt-6 cursor-pointer border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent"
            type="submit"
            value="Create Account"
          />
        </form>
        <h4 class="text-white text-center mt-5">
          Have an Account?
          <Link
            to="/login"
            class="font-body text-quad cursor-pointer rounded-md font-bold px-2  border-transparent focus:outline-none focus:ring-1 focus:ring-quad focus:border-transparent"
          >
            Log in
          </Link>
        </h4>
      </div>
      <div class="md:w-1/2 lg:max-w-sm">
        <h2 class="text-white text-2xl mb-7">
          Track and view every family game night.
        </h2>
        <ul>
          <li class="text-white font-body mb-5">
            <span class="font-bold"> Document EVERY game</span>. Easily track
            each game your family plays.
          </li>
          <li class="text-white font-body mb-5">
            <span class="font-bold"> Discover new insights</span>. Uncover who
            has the most wins overall wins.
          </li>
          <li class="text-white font-body">
            <span class="font-bold"> Digitize your boardgame</span> catalogue.
            Catagorize & store your board games.
          </li>
        </ul>
      </div>
    </section>
  )
}
