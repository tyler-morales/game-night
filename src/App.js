import logo from './logo.svg'
import './App.css'

function App() {
  return (
    <div className="bg-primary h-full pt-6 m-auto">
      <header class="m-auto">
        <img
          style={{ width: '150px' }}
          class="m-auto"
          src={logo}
          alt="Game Night Logo"
        />
      </header>

      <section class="grid gap-16 mt-9 w-11/12 m-auto">
        <div>
          <h1 class="font-bold text-center text-white text-3xl">
            Create an Account
          </h1>
          <form class="mt-4 flex gap-4 flex-col">
            <div class="flex gap-3 flex-col">
              <label class="text-white text-xs" htmlFor="group-name">
                Family Name
              </label>
              <input
                type="text"
                class="rounded-md py-3 pl-3"
                placeholder="Family or Group name"
              />
            </div>
            <div class="flex gap-3 flex-col">
              <label class="text-white text-xs" htmlFor="email">
                Email Addresss
              </label>
              <input
                type="text"
                class="rounded-md py-3 pl-3"
                placeholder="Email Addresss"
              />
            </div>
            <div class="flex gap-3 flex-col">
              <label class="text-white text-xs" htmlFor="password">
                Password
              </label>
              <input
                type="text"
                class="rounded-md py-3 pl-3"
                placeholder="Password"
              />
            </div>
            <input
              class="rounded-md bg-tertiary py-3 mt-6 cursor-pointer"
              type="submit"
            />
          </form>
          <h4 class="text-white text-center mt-5">
            Have an Account?
            <span class="font-body text-quad cursor-pointer font-bold pl-1">
              Log in
            </span>
          </h4>
        </div>
        <div>
          <h2 class="text-white text-2xl">
            Track and view every family game night.
          </h2>
          <ul>
            <li class="text-white font-body">
              <span class="font-bold"> Document EVERY game</span>. Easily track
              each game your family plays.
            </li>
            <li class="text-white font-body">
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
    </div>
  )
}

export default App
