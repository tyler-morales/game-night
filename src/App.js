import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import './App.css'
import { Router } from './pages/Router'
// import { HashRouter, Switch, Route } from 'react-router-dom'
// import { SignUp } from './components/authFlow/SignUp'
// import { Login } from './pages/Login'
// import { VerifyAccount } from './pages/VerifyAccount'
// import { ResendCode } from './pages/ResendCode'
// import { Dashboard } from './pages/Dashboard'

// import { Router } from './pages/Router'
// import { AuthContext } from './context/AuthContext'

Amplify.configure(awsconfig)

function App() {
  // const [user, setUser] = useState(null)

  // const value = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <div className="bg-primary min-h-screen py-6 m-auto">
      <Router />
    </div>
    // <AuthContext.Provider value={value}>
    //   <div className="bg-primary min-h-screen py-6 m-auto">
    //     <Router>
    //       <Switch>
    //         <Route path="/signup" component={SignUp} />
    //         <Route path="/login" component={Login} />
    //         <Route path="/verify-account" component={VerifyAccount} />
    //         <Route path="/resend-code" component={ResendCode} />
    //         {/* <Route path="/profile" component={Profile} /> */}
    //         <Route path="/dashboard" component={Dashboard} />
    //         <Route path="/" />
    //       </Switch>
    //     </Router>
    //   </div>
    // </AuthContext.Provider>
  )
}

export default App
