import React from 'react'

import {
  Grid,
  Paper,
  Avatar,
  Typography,
  Container,
  Box,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import imageAvatar from '../assets/img/person_image.jpg'
import { Navigation } from '../components/layout/Navigation'

const usePapperStyle = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  banner: {
    height: '100px',
    marginTop: theme.spacing(6),
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  paperUser: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    height: '100px',
    width: '100px',
    margin: theme.spacing(1),
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: `url(${imageAvatar})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  status: {
    width: '100%',
    height: '50px',
    background: 'linear-gradient(45deg, #92F1D5 30%, #ABF6BD 90%)',
    textAlign: 'center',
    justifyItems: 'center'
  },
  btn: {
    width: '100%',
    height: '50px',
    marginTop: theme.spacing(2),
    background: '#1D7AA2',
    color: theme.palette.primary.contrastText,
    '&:hover': {
      background: '#1D7AA2'
    }
  }
}))

export const Dashboard = () => {
  const classes = usePapperStyle()
  return (
    <Container maxWidth="md">
      <Navigation />
      <Grid container justify="center">
        {/* <Grid item xs={12}>
          <Paper elevation={0} className={classes.banner}>
            banner
          </Paper>
        </Grid> */}
        <Grid item xs={12} md={5}>
          <Paper elevation={0} className={classes.paperUser}>
            <Avatar variant="rounded" className={classes.avatar}>
              {/* <AccountCircleIcon fontSize="large" /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sandra Wells
            </Typography>
            <Typography component="span" variant="h5">
              <Box fontSize={16} lineHeight={2} color="gray">
                #202066
              </Box>
            </Typography>
          </Paper>
          <Box className={classes.status}></Box>
          <Button className={classes.btn}>Hola</Button>
          <Button className={classes.btn}>Hola</Button>
          <Button className={classes.btn}>Hola</Button>
        </Grid>
      </Grid>
    </Container>
  )
}
