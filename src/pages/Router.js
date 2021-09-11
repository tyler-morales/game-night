import React, { useState, useEffect } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

// import Nav from '../components/Nav'
import { AuthNav } from '../components/AuthNav'
import Public from './Public'
import About from './About'
import Profile from './Profile'
import Protected from './Protected'

export const Router = () => {
  const pageTypes = {
    authFlow: 'authFlow',
    dashboard: 'dashboard',
    landing: 'landing',
  }

  const [pageType, setPageType] = useState(pageTypes.authFlow)

  const [current, setCurrent] = useState('home')
  useEffect(() => {
    setRoute()
    window.addEventListener('hashchange', setRoute)
    return () => window.removeEventListener('hashchange', setRoute)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function setRoute() {
    const location = window.location.href.split('/')
    const pathname = location[location.length - 1]
    // TODO: Set 'setPageType' to change nav component
    setPageType(pageTypes.authFlow)

    // console.log(pathname)
    setCurrent(pathname ? pathname : 'home')
  }

  return (
    <HashRouter>
      {pageType === pageTypes.authFlow && <AuthNav />}
      {/* {pageType === pageTypes.authFlow && <AuthNav current={current} />} */}
      <Switch>
        <Route exact path="/" component={Public} />
        <Route exact path="/about" component={About} />
        <Route exact path="/protected" component={Protected} />
        <Route exact path="/profile" component={Profile} />
        <Route component={Public} />
      </Switch>
    </HashRouter>
  )
}
