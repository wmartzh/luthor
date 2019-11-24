import React from 'react'
import { Typography, Link } from '@material-ui/core'

export const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://f34th3r.io/">
        f34th3r.io
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
