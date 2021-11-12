import { useEffect } from 'react'

import Amplify from 'aws-amplify'
import awsconfig from '../aws-exports'

import '../styles/globals.css'
import 'react-day-picker/lib/style.css'
import '../styles/dayPicker.css'

import AOS from 'aos'
import 'aos/dist/aos.css'

import { UserProvider } from '../contexts/UserContext'

Amplify.configure(awsconfig)

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
