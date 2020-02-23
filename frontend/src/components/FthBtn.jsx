import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useBtnStyle = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#08B1C5',
      boxShadow: '0 3px 3px 1px rgba(0,0,0,0.2)'
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
  // const preventDefault = event => event.preventDefault()
  return (
    <Button
      variant="contained"
      fullWidth
      className={['fth-button', classes.root, myClass].join(' ')}
      style={btnStyle}
      href={to}
      // onClick={preventDefault}
    >
      {content}
    </Button>
  )
}
