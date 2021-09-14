import React, { useEffect } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Public from './Public'
import About from './About'
import Profile from './Profile'
import Protected from './Protected'
import Dashboard from './Dashboard'

export const Router = () => {
  // const [pageType, setPageType] = useState(pageTypes.authFlow)

  // const [current, setCurrent] = useState('home')

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

    console.log(pathname)
    // setCurrent(pathname ? pathname : 'home')
  }

  return (
    <HashRouter>
      {/* {pageType === pageTypes.authFlow && <AuthNav current={current} />} */}
      <Switch>
        <Route exact path="/" component={Public} />
        <Route exact path="/about" component={About} />
        <Route exact path="/protected" component={Protected} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route component={Public} />
      </Switch>
    </HashRouter>
  )
}
