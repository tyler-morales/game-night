import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import './App.css'
import { Router } from './pages/Router'

Amplify.configure(awsconfig)

function App() {
  return (
    <div className="bg-primary min-h-screen py-6 m-auto">
      <Router />
    </div>
  )
}

export default App
