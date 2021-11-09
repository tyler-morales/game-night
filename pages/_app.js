import { useEffect } from 'react'
import '../styles/globals.css'

import AOS from 'aos'
import 'aos/dist/aos.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // here you can add your aos options
    AOS.init({
      easing: 'ease-in-out',
    })
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
