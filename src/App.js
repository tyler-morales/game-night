import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
Amplify.configure(awsconfig)

function App() {
  return (
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
          <Route path="/" />
        </Switch>
      </Router>
    </div>
  )
}

export default App
