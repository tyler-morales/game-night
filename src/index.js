import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { UserProvider } from './contexts/UserContext'

import AOS from 'aos'
import 'aos/dist/aos.css' // You can also use <link> for styles

AOS.init({
  easing: 'ease-in-out',
})

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
