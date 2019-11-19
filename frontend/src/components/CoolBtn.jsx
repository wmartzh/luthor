import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const status = false

const useCoolBtn = makeStyles({
  root: {
    background: status
      ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
      : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
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
export const CoolBtn = ({ content, myClass }) => {
  const classes = useCoolBtn()

  return (
    <Button
      variant="contained"
      fullWidth
      className={[classes.root, myClass].join(' ')}
    >
      {content}
    </Button>
  )
}
