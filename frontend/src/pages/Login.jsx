import React from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import TextField from '@material-ui/core/es/TextField'

import { Copyright } from '../components/Copyright'
import { StyledStatusBar } from '../styles/StyledStatusBar'
import { StyledSpacer } from '../styles/StyledSpacer'
import { userStatusColor } from '../constants/statusColor'
import { ButtonComponent } from '../components/ButtonComponent'
import { StyledTypography } from '../styles/StyledTypography'
import { StyledAvatar } from '../styles/StyledAvatar'
import { StyledCard } from '../styles/StyledCard'
import { StyledContainer } from '../styles/StyledContainer'

export const Login = () => {
  const submitHandle = () => {}

  return (
    <StyledContainer maxWidth="380px">
      <StyledSpacer height="100px" />
      <StyledCard flexDirection="column" roundedTop width="340px">
        <StyledAvatar radius="50%" background="#08B1C5" fill="#fff">
          <LockOutlinedIcon />
        </StyledAvatar>
        <StyledTypography fontSize="20px">Sign In</StyledTypography>
        <StyledSpacer height="20px" />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <StyledSpacer height="40px" />
        <ButtonComponent
          click={submitHandle}
          background="#08B1C5"
          color="#fff"
          width="300px"
        >
          Sign In
        </ButtonComponent>
        <StyledSpacer height="30px" />
        <Copyright />
        <StyledSpacer height="10px" />
      </StyledCard>
      <StyledStatusBar
        background={userStatusColor('in')}
        width="340px"
        margin="auto"
      />
    </StyledContainer>
  )
}
