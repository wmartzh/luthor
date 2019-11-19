import { makeStyles } from '@material-ui/styles'

export const useCoolBtn = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: 'none',
    color: 'white',
    height: 48,
    padding: '0 30px',
    '&:hover': {
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
    }
  }
})

export const useAppbarStyle = makeStyles(theme => ({
  appbar: {
    background: theme.palette.common.white,
    marginTop: theme.spacing(8),
    color: theme.palette.secondary.contrastText
  },
  toolbar: {
    minHeight: '150px',
    borderRadius: '5px'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))
