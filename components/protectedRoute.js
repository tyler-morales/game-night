import React, { useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'

const protectedRoute =
  (Comp, route = '/dashboard') =>
  (props) => {
    const router = useRouter()
    async function checkAuthState() {
      try {
        await Auth.currentAuthenticatedUser()
      } catch (err) {
        router.push(route)
      }
    }
    useEffect(() => {
      checkAuthState()
    })
    return <Comp {...props} />
  }

export default protectedRoute
