import { makeStyles } from '@material-ui/styles'

export const useAppbarStyle = makeStyles(theme => ({
  appbar: {
    background: theme.palette.common.white,
    marginTop: theme.spacing(2),
    color: theme.palette.secondary.contrastText
  },
  toolbar: {
    minHeight: '60px',
    borderRadius: '5px'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export const usePaperStyle = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '10px 10px 0 0'
  }
}))
