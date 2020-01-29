import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { axios } from '../plugins/axios'

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
import { API_ROUTES } from '../constants/apiRoutes'
import { useUserValues } from '../context/UserContext'

export const Login = ({ location }) => {
  const history = useHistory()
  const { setUser, setToken, setAuth } = useUserValues()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [email, setEmail] = useState('studentMale@mail.com')
  const [password, setPassword] = useState('secret')

  useEffect(() => {
    let mounted = true
    if (mounted) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      setUser({})
      setToken('')
      setAuth(false)
    }
    return () => (mounted = false)
  }, [setAuth, setToken, setUser])

  const submitHandle = async () => {
    if (!email && !password) {
      setError('Some fields are empty 😢.')
      return
    }
    setError()
    setLoading(true)
    try {
      const request = await axios({
        method: 'POST',
        url: API_ROUTES.login,
        data: {
          email,
          password
        }
      })
      if (request.status === 401) {
        setError(request.data.message)
        return
      }

      const {
        username,
        status,
        code,
        token,
        intership,
        profile_image: photo
      } = request.data
      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem(
        'user',
        JSON.stringify({ username, status, code, intership, photo })
      )

      setUser({ username, status, code, role: token[0], intership, photo })
      setToken(token)
      setAuth(true)

      // TODO: leak memory
      // const realToken = token.substr(1)
      // axios.defaults.headers.common['Authorization'] = `Bearer ${realToken}`
      //

      // this route go to the last path
      // const { from } = location.state || { from: { pathname: '/' } }
      history.push('/')
    } catch (err) {
      err.message === 'Request failed with status code 401'
        ? setError('Invalid Credentials, please try again')
        : setError('Error, please try again')
    }
    setLoading(false)
  }

  return (
    <StyledContainer maxWidth="380px">
      <StyledSpacer height="100px" />
      <StyledCard flexDirection="column" roundedTop width="340px">
        <StyledAvatar radius="50%" background="#08B1C5" fill="#fff">
          <LockOutlinedIcon />
        </StyledAvatar>
        <StyledTypography fontSize="20px">Sign In</StyledTypography>
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
