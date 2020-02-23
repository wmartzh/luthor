import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { ThemeProvider } from './context/themeColor'
import { GlobalStyle } from './styles/GlobalStyle'
import { UserProvider } from './context/UserContext'
import { RouterHelper } from './helpers/RouterHelper'
import { ToastProvider } from './context/ToastContext'

export const App = () => {
  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <Switch>
            <ToastProvider>
              <RouterHelper />
            </ToastProvider>
          </Switch>
        </Router>
        <GlobalStyle />
      </ThemeProvider>
    </UserProvider>
  )
}
