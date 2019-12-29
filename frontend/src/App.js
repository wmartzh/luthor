import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from './context/themeColor'
import { Login } from './pages/Login'

import { GlobalStyle } from './styles/GlobalStyle'
import { studentRoute, guardRoute, globalRoutes } from './routes'
import { UserProvider } from './context/UserContext'
import { useUser } from './hooks/useUser'

export const App = () => {
  const { user } = useUser()

  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />

            {globalRoutes.map(({ path, component: Component }) => (
              <Route
                exact
                path={path}
                component={props => <Component user={user} />}
                key={path}
              />
            ))}
            {user.role === '1' &&
              studentRoute.map(({ path, component: Component }) => (
                <Route
                  exact
                  path={path}
                  component={props => <Component user={user} />}
                  key={path}
                />
              ))}

            {user.role === '4' &&
              guardRoute.map(({ path, component: Component }) => (
                <Route exact path={path} component={Component} key={path} />
              ))}
          </Switch>
        </Router>
        <GlobalStyle />
      </ThemeProvider>
    </UserProvider>
  )
}
