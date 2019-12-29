import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { ThemeProvider } from './context/themeColor'
import { GlobalStyle } from './styles/GlobalStyle'
import { UserProvider } from './context/UserContext'
import { useUser } from './hooks/useUser'
import { RouterHelper } from './helpers/RouterHelper'

export const App = () => {
  const { user } = useUser()
  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <Switch>
            <RouterHelper user={user} />
          </Switch>
        </Router>
        <GlobalStyle />
      </ThemeProvider>
    </UserProvider>
  )
}
