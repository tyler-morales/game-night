import { useEffect } from 'react'

// 💻 AWS
import Amplify, { withSSRContext } from 'aws-amplify'
import awsconfig from '../aws-exports'

// 🎨 CSS
import '../styles/globals.css'
import 'react-day-picker/lib/style.css'
import '../styles/dayPicker.css'

// 📚 Library
import AOS from 'aos'
import 'aos/dist/aos.css'

// 👥 Authentication
import { UserProvider } from '../contexts/UserContext'
const { Auth } = withSSRContext()

Amplify.configure({ ...awsconfig, ssr: true })

Auth.configure({
  region: process.env.AUTH_REGION,
  userPoolId: process.env.AUTH_POOL,
  userPoolWebClientId: process.env.AUTH_POOL_CLIENT,
  mandatorySignIn: false,
})

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // here you can add your aos options
    AOS.init({
      easing: 'ease-in-out',
    })
  }, [])
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
