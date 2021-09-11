export const SignUp = () => {
  return (
    <>
      <div className="flex flex-col gap-10 md:flex-row-reverse">
        <form className="md:w-full flex gap-2 flex-col">
          <h1 className="font-bold text-white text-3xl md:text-left">
            Create an Account
          </h1>
          <div className="flex gap-3 flex-col">
            <label className="text-white text-xs" htmlFor="username">
              Family/ Friend Group Name
            </label>
            <input
              type="text"
              className="focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2"
              placeholder="ahslandboys2000"
              autoFocus={true}
            />
          </div>
          <div className="flex gap-3 flex-col">
            <label className="text-white text-xs" htmlFor="email">
              Email Addresss
            </label>
            <input
              type="email"
              className="focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2"
              placeholder="anjay@gmail.com"
            />
          </div>
          <div className="flex gap-3 flex-col">
            <label className="text-white text-xs" htmlFor="password">
              Password
            </label>
            <input
              type="text"
              className="focus:ring-tertiary transition-all rounded-md py-3 pl-3 border-2 focus:outline-none focus:ring-2"
              placeholder="qwerty123"
            />
          </div>
          <input
            className="transition-all transform hover:translate-y-1 rounded-md bg-tertiary py-3 mt-6 cursor-pointer border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent"
            type="submit"
            value="Create Account"
          />
        </form>

        {/* Marketing Section */}
        <section className="md:w-full ">
          <h2 className="text-white text-2xl mb-7">
            Track and view every family game night.
          </h2>
          <ul>
            <li className="text-white font-body mb-5">
              <span className="font-bold"> Document EVERY game</span>. Easily
              track each game your family plays.
            </li>
            <li className="text-white font-body mb-5">
              <span className="font-bold"> Discover new insights</span>. Uncover
              who has the most wins overall wins.
            </li>
            <li className="text-white font-body">
              <span className="font-bold"> Digitize your boardgame</span>{' '}
              catalogue. Catagorize & store your board games.
            </li>
          </ul>
        </section>
      </div>
    </>
  )
}
