import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Route from './Route'

// => Pages
import SignIn from '../pages/SighIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'

const routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/sighup" component={SignUp} />

        <Route path="/dashboard" component={Dashboard} isPrivate />
      </Switch>
    </BrowserRouter>
  )
}

export default routes
