import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// => Pages
import SignIn from '../pages/SighIn'
import SignUp from '../pages/SignUp'

const routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/sighup" component={SignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default routes
