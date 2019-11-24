import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from './context/themeColor'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'

export const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
