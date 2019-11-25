import { makeStyles } from '@material-ui/styles'
import imageAvatar from '../assets/svg/unadeca_logo_large.svg'

export const useAppbarStyle = makeStyles(theme => ({
  appbar: {
    background: theme.palette.common.white,
    marginTop: theme.spacing(2),
    color: theme.palette.secondary.contrastText
  },
  toolbar: {
    minHeight: '66px',
    borderRadius: '5px'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  avatar: {
    height: '60px',
    width: '200px',
    margin: '2px 0 5px 12px',
    background: `url(${imageAvatar})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
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
