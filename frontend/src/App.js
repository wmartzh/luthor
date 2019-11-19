import React from 'react'
import { ThemeProvider } from './context/themeColor'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'

export const App = () => {
  return (
    <ThemeProvider>
      {false && <Login />}
      <Dashboard />
    </ThemeProvider>
  )
}

export default App
