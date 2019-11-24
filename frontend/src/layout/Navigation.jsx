import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { useCoolBtn, useAppbarStyle } from '../helpers/featherStyle'

export const Navigation = () => {
  const coolBtn = useCoolBtn()
  const appBarStyle = useAppbarStyle()

  return (
    <AppBar
      position="static"
      elevation={0}
      square={false}
      className={appBarStyle.appbar}
    >
      <Toolbar className={appBarStyle.toolbar}>
        <Typography variant="h6" className={appBarStyle.title}>
          Project Luthor
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
        <Button className={coolBtn.root}>API</Button>
      </Toolbar>
    </AppBar>
  )
}
