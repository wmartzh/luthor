import React from 'react'
import { Box, Paper } from '@material-ui/core'
import { useAppbarStyle } from '../helpers/featherStyle'
import MoreVertIcon from '@material-ui/icons/MoreVert'

export const Navigation = () => {
  const appBarStyle = useAppbarStyle()

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Paper
          elevation={1}
          style={{
            marginTop: '40px',
            height: '66px',
            width: '90%',
            justifyItems: 'flex-start',
            background: '#fff'
          }}
        >
          <Box className={appBarStyle.avatar}></Box>
        </Paper>
        <Box mr={3} />
        <Paper
          elevation={1}
          style={{
            marginTop: '40px',
            height: '66px',
            width: '66px',
            justifyItems: 'flex-end',
            background: '#fff'
          }}
        >
          <Box style={{ margin: '20px 12px 0 32px' }}>
            <MoreVertIcon />
          </Box>
        </Paper>
      </div>
    </>
  )
}
