import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { ThemeProvider } from './context/themeColor'
import { GlobalStyle } from './styles/GlobalStyle'
import { UserProvider } from './context/UserContext'
import { RouterHelper } from './helpers/RouterHelper'

export const App = () => {
  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <Switch>
            <RouterHelper />
          </Switch>
        </Router>
        <GlobalStyle />
      </ThemeProvider>
    </UserProvider>
  )
}
