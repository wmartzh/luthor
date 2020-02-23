import { createMuiTheme } from '@material-ui/core/styles'

export const themeColors = createMuiTheme({
  palette: {
    primary: {
      light: '#1D7AA2',
      main: '#193984',
      dark: '#3A4B6C',
      contrastText: '#f1f1f1'
    },
    secondary: {
      light: '#F8BE65',
      main: '#FBAB31',
      dark: '#D69634',
      contrastText: '#1f1f1f'
    },
    common: {
      white: '#F5F7FB'
    }
  }
})
