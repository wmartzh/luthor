import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from './context/themeColor'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { GetPermission } from './pages/GetPermission'

import { GlobalStyle } from './styles/GlobalStyle'
import { MyAssitance } from './pages/MyAssitance'
import { MyPermissions } from './pages/MyPermissions'

export const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/get-permission" component={GetPermission} />
          <Route exact path="/my-assistance" component={MyAssitance} />
          <Route exact path="/my-permissions" component={MyPermissions} />
        </Switch>
      </Router>
      <GlobalStyle />
    </ThemeProvider>
  )
}
