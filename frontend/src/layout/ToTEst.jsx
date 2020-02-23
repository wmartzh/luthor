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
import { HourMinComponent } from '../components/HourMinComponent'
import Button from '@material-ui/core/Button'

export const ToTest = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [code, setCode] = useState('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [photo, setPhoto] = useState('')
  const [gender, setGender] = useState('')

  const submitHandle = () => {}
  return (
    <StyledContainer maxWidth="380px">
      <StyledSpacer height="80px" />
      <StyledCard flexDirection="column" roundedTop width="340px">
        <StyledBackButton>
          <LinkComponent to="/login">
            <ArrowBackIosIcon fontSize="small" style={{ marginTop: '5px' }} />
          </LinkComponent>
        </StyledBackButton>
        <StyledAvatar radius="50%" background="#08B1C5" fill="#fff">
          <LockOutlinedIcon />
        </StyledAvatar>
        <StyledTypography fontSize="20px">Sign Up</StyledTypography>
        {error && (
          <>
            <StyledSpacer height="20px" />
            <StyledTypography fontSize="14px" color="red">
              {error}
            </StyledTypography>
          </>
        )}
        {loading && (
          <StyledTypography fontSize="14px" color="green">
            {loading}
          </StyledTypography>
        )}
        {!error && <StyledSpacer height="20px" />}
        <TextField
          variant="outlined"
          margin="normal"
          name="email"
          label="CODE"
          id="code"
          onChange={e => setCode(e.target.value)}
          value={code}
          autoFocus
          fullWidth
          required
        />
        <StyledSpacer height="20px" />
        <TextField
          variant="outlined"
          margin="normal"
          name="email"
          label="Username"
          id="username"
          onChange={e => setUsername(e.target.value)}
          value={username}
          autoFocus
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          name="firstName"
          label="First Name"
          id="firstName"
          onChange={e => setFirstName(e.target.value)}
          value={firstName}
          autoFocus
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          name="lastName"
          label="Last Name"
          id="lastName"
          onChange={e => setLastName(e.target.value)}
          value={lastName}
          autoFocus
          fullWidth
          required
        />
        <StyledSpacer height="20px" />
        <TextField
          variant="outlined"
          margin="normal"
          name="email"
          label="Email Address"
          id="email"
          autoComplete="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          autoFocus
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          type="password"
          name="password"
          label="Password"
          id="password"
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          type="confirmPassword"
          name="confirmPassword"
          label="Cornfirm Password"
          id="confirmPassword"
          autoComplete="current-password"
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          fullWidth
          required
        />
        <StyledSpacer height="40px" />
        <Button variant="contained" component="label">
          Upload File
          <input type="file" style={{ display: 'none' }} />
        </Button>
        <ButtonComponent
          click={submitHandle}
          background="#08B1C5"
          color="#fff"
          width="300px"
        >
          Register
        </ButtonComponent>
      </StyledCard>
      <StyledStatusBar
        background={userStatusColor('in')}
        width="340px"
        margin="auto"
      />
      <StyledSpacer height="40px" />
    </StyledContainer>
  )
}
