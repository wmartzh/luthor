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
  avatar: {
    height: '100px',
    width: '100px',
    margin: theme.spacing(1),
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: `url(${imageAvatar})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
}))

export const Dashboard = () => {
  const classes = useDashboardStyle()

  return (
    <Container maxWidth="md">
      <Navigation />
      <Grid container justify="center">
        <Grid item xs={12} sm={5}>
          <Paper elevation={1} className="fth-paper">
            <Avatar variant="rounded" className={classes.avatar}>
              {/* <AccountCircleIcon fontSize="large" /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sandra Wells
            </Typography>
            <Typography component="span" variant="h5">
              <Box fontSize={14} lineHeight={2} color="gray">
                #202066
              </Box>
            </Typography>
            <Box marginTop="50px" />
            <FthBtn
              to="/permission"
              content="Get Permission"
              bg={statusColor.allow}
            />
            <FthBtn content="My Assistances" bg="#F8B500" />
            <FthBtn content="My Permissions" bg="#1D7AA2" />
          </Paper>
          <Box
            className="fth-status-bar"
            style={{
              background: statusColor.allow
            }}
          ></Box>
        </Grid>
      </Grid>
    </Container>
  )
}
