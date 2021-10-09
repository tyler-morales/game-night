import React, { useEffect } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from './Home'
import About from './About'
import SignUp from './SignUp'
import Profile from './Profile'
import Stats from './Stats'
import RecordGame from './RecordGame'

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
    // const location = window.location.href.split('/')
    // const pathname = location[location.length - 1]
    // TODO: Set 'setPageType' to change nav component
    // console.log(pathname)
    // setCurrent(pathname ? pathname : 'home')
  }

  return (
    <HashRouter>
      {/* {pageType === pageTypes.authFlow && <AuthNav current={current} />} */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/dashboard" component={Stats} />
        <Route exact path="/record-game" component={RecordGame} />
        <Route exact path="/profile" component={Profile} />
        <Route component={Home} />
      </Switch>
    </HashRouter>
  )
}
