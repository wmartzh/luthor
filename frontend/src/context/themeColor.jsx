import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { themeColors } from '../helpers/themeColors'

export const ThemeProvider = ({ children }) => {
  return <MuiThemeProvider theme={themeColors}>{children}</MuiThemeProvider>
}
