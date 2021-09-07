import { useState, useMemo } from 'react'
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { VerifyAccount } from './pages/VerifyAccount'
import { ResendCode } from './pages/ResendCode'
import { AuthContext } from './context/AuthContext'

Amplify.configure(awsconfig)

function App() {
  const [user, setUser] = useState(null)

  const value = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <AuthContext.Provider value={value}>
      <div className="bg-primary min-h-screen py-6 m-auto">
        <header className="m-auto">
          <img
            style={{ width: '150px' }}
            className="m-auto"
            src={logo}
            alt="Game Night Logo"
          />
        </header>
        <Router>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/verify-account" component={VerifyAccount} />
            <Route path="/resend-code" component={ResendCode} />
            <Route path="/" />
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  )
}

export default App
