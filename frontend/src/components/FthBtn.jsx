import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useBtnStyle = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#08B1C5',
      boxShadow: '0 3px 5px 2px rgba(25, 57, 132, .3)'
    }
  }
}))
export const FthBtn = ({ content, myClass, to, bg = '#08B1C5' }) => {
  const classes = useBtnStyle()
  const btnStyle = {
    background: bg,
    margin: '10px 0',
    color: 'white'
  }
  return (
    <Button
      variant="contained"
      fullWidth
      className={['fth-button', classes.root, myClass].join(' ')}
      style={btnStyle}
      href={to}
    >
      {content}
    </Button>
  )
}
