import React, { useState } from 'react'
import styled from 'styled-components'

import { statusColor, userStatusColor } from '../constants/statusColor'
import userPhoto from '../assets/img/person_image.jpg'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { ButtonComponent } from '../components/ButtonComponent'

import { StyledContainer } from '../styles/StyledContainer'
import { StyledSpacer } from '../styles/StyledSpacer'
import { StyledStatusBar } from '../styles/StyledStatusBar'
import { StyledCard } from '../styles/StyledCard'
import { StyledH1 } from '../styles/StyledH1'
import { StyledSpan } from '../styles/StyledSpan'
import { StyledAvatar } from '../styles/StyledAvatar'
import { StyledBackButton } from '../styles/StyledBackButton'
import { LinkComponent } from '../components/LinkComponent'

import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/es/TextField'
import FormControlLabel from '@material-ui/core/es/FormControlLabel'
import Checkbox from '@material-ui/core/es/Checkbox'
import MenuItem from '@material-ui/core/MenuItem'
import { StyledTypography } from '../styles/StyledTypography'
import { Copyright } from '../components/Copyright'

export const ToTest = () => {
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
