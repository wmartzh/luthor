import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/es/Select'
import MenuItem from '@material-ui/core/es/MenuItem'
import TextField from '@material-ui/core/es/TextField'
import InputLabel from '@material-ui/core/es/InputLabel'
import FormControl from '@material-ui/core/es/FormControl'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { StyledCard } from '../styles/StyledCard'
import { StyledSpacer } from '../styles/StyledSpacer'
import { StyledContainer } from '../styles/StyledContainer'
import { LinkComponent } from '../components/LinkComponent'
import { StyledBackButton } from '../styles/StyledBackButton'
import { StyledAvatar } from '../styles/StyledAvatar'
import { StyledTypography } from '../styles/StyledTypography'
import { ButtonComponent } from '../components/ButtonComponent'
import { StyledStatusBar } from '../styles/StyledStatusBar'
import { userStatusColor } from '../constants/statusColor'
import { axios } from '../plugins/axios'
import { API_ROUTES } from '../constants/apiRoutes'

export const Register = () => {
  const history = useHistory()

  const [error, setError] = useState(false)
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
  const [passwordError, setPasswordError] = useState(false)

  const inputLabel = useRef(null)
  const [labelWidth, setLabelWidth] = useState(0)

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const axiosQuery = async () => {
    try {
      const response = await axios({
        method: API_ROUTES.register.method,
        url: API_ROUTES.register.url,
        data: {
          code,
          username,
          profile_image: null,
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          password_confirmation: confirmPassword,
          gender
        }
      })
      console.log(response)
    } catch (err) {
      const {
        data: { message },
        status
      } = err.response
      if (status === 422) {
        if (message === 'The given data was invalid.') {
          setError('Missing fields.')
        }
      }
      console.log(`Hola ${message}, ${status}`)
    }
  }

  const submitHandle = () => {
    setLoading(true)
    password !== confirmPassword ||
    password.length === 0 ||
    confirmPassword.length === 0
      ? setPasswordError(true)
      : setPasswordError(false)
    if (passwordError) {
      setLoading(false)
    } else {
      axiosQuery()
      setLoading(false)
    }
  }

  return (
    <StyledContainer maxWidth="390px">
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
          <>
            <StyledSpacer height="20px" />
            <StyledTypography fontSize="14px" color="green">
              Loading...
            </StyledTypography>
          </>
        )}
        {/* {!error && <StyledSpacer height="20px" />} */}
        <TextField
          variant="outlined"
          margin="normal"
          name="email"
          label="CODE"
          id="code"
          onChange={e => setCode(e.target.value)}
          value={code}
          fullWidth
          autoFocus
          required
        />
        <StyledSpacer height="20px" />
        {/* <Button
          variant="contained"
          component="label" 
          style={{ width: '100%', background: '#08B1C5', height: '40px', color: '#fff' }}>
          Upload File (in beta)
          <input type="file" style={{ display: 'none' }} />
        </Button> */}
        <TextField
          variant="outlined"
          margin="normal"
          name="email"
          label="Username"
          id="username"
          onChange={e => setUsername(e.target.value)}
          value={username}
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
          fullWidth
          required
        />
        <StyledSpacer height="16px" />
        <FormControl fullWidth variant="outlined">
          <InputLabel
            required
            ref={inputLabel}
            id="demo-simple-select-outlined-label"
          >
            Gender
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            labelWidth={labelWidth}
            onChange={e => setGender(e.target.value)}
            value={gender}
          >
            <MenuItem value={'Female'}>Female</MenuItem>
            <MenuItem value={'Male'}>Male</MenuItem>
          </Select>
        </FormControl>
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
          error={passwordError}
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
          error={passwordError}
        />
        <StyledSpacer height="40px" />
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
