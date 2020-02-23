import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/es/TextField'
import { StyledSpacer } from '../styles/StyledSpacer'
import { StyledTypography } from '../styles/StyledTypography'

export const HourMinComponent = ({
  title,
  time,
  setTime,
  color = undefined
}) => {
  const [hour, setHour] = useState(time.h)
  const [min, setMin] = useState(time.m)

  useEffect(() => {
    setTime({
      h: hour === '0' ? '00' : hour > 24 ? '24' : hour,
      m: min === '0' ? '00' : min > 59 ? '59' : min
    })
  }, [hour, min, setTime])
  return (
    <>
      <StyledSpacer height="18px" />
      <StyledTypography fontSize="16px" fontFamily="Segoe UI" color={color}>
        {title}
      </StyledTypography>
      <div style={{ display: 'flex', displayDirection: 'row' }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          name="password"
          label="Hour"
          type="number"
          id="password"
          onChange={e => setHour(e.target.value)}
          value={hour > 24 ? '24' : hour}
          InputProps={{ inputProps: { min: 0, max: 24 } }}
          style={{ width: '80px' }}
        />
        <StyledSpacer width="18px" />
        <TextField
          variant="outlined"
          margin="normal"
          required
          name="password"
          label="Min"
          type="number"
          id="password"
          onChange={e => setMin(e.target.value)}
          value={min > 59 ? '59' : min}
          InputProps={{ inputProps: { min: 0, max: 59 } }}
          style={{ width: '80px' }}
        />
      </div>
    </>
  )
}
