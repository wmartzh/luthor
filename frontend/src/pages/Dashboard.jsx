import React from 'react'

import {
  Grid,
  Paper,
  Avatar,
  Typography,
  Container,
  Box
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import imageAvatar from '../assets/img/person_image.jpg'
import { FthBtn } from '../components/FthBtn'
import { statusColor } from '../constants/statusColor'
import { Navigation } from '../layout/Navigation'

const useDashboardStyle = makeStyles(theme => ({
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
    alignItems: 'center',
    borderRadius: '10px'
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
    height: '10px',
    marginTop: '-5px',
    textAlign: 'center',
    justifyItems: 'center',
    borderRadius: '0 0 10px 10px'
  }
}))

export const Dashboard = () => {
  const classes = useDashboardStyle()

  return (
    <Container maxWidth="md">
      <Navigation />
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={5}>
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
            <Box marginTop="50px" />
            <FthBtn content="Get Permission" bg="#12B6C6" />
            <FthBtn content="My Assistances" bg="#F8B500" />
            <FthBtn content="My Permissions" bg="#1D7AA2" />
          </Paper>
          <Box
            className={classes.status}
            style={{
              background: statusColor.denied
            }}
          ></Box>
        </Grid>
      </Grid>
    </Container>
  )
}
