import logo from '../logo.svg'

export const AuthHeader = () => {
  return (
    <header className="m-auto">
      <img
        style={{ width: '150px' }}
        className="m-auto"
        src={logo}
        alt="Game Night Logo"
      />
    </header>
  )
}
