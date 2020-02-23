import React, { useState, useEffect, useRef } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import moment from 'moment'

import Select from '@material-ui/core/es/Select'
import MenuItem from '@material-ui/core/es/MenuItem'
import TextField from '@material-ui/core/es/TextField'
import InputLabel from '@material-ui/core/es/InputLabel'
import FormControl from '@material-ui/core/es/FormControl'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { axios } from '../../plugins/axios'
import { Navigation } from '../../layout/Navigation'
import { API_ROUTES } from '../../constants/apiRoutes'
import { userStatusColor } from '../../constants/statusColor'
import { useUserValues } from '../../context/UserContext'
import { statusService } from '../../services/statusService'
import { LinkComponent } from '../../components/LinkComponent'
import { ButtonComponent } from '../../components/ButtonComponent'

import { StyledH1 } from '../../styles/StyledH1'
import { StyledCard } from '../../styles/StyledCard'
import { StyledSpacer } from '../../styles/StyledSpacer'
import { StyledContainer } from '../../styles/StyledContainer'
import { StyledStatusBar } from '../../styles/StyledStatusBar'
import { StyledBackButton } from '../../styles/StyledBackButton'
import { StyledTypography } from '../../styles/StyledTypography'
import { useToastValues } from '../../context/ToastContext'

export const GetPermission = () => {
  const history = useHistory()
  const { user, setUser } = useUserValues()
  const { status, intership, role } = user

  const { setToastMessage, setToastDisplay } = useToastValues()

  const [error, setError] = useState(false)
  const [type, setType] = useState('')
  const [place, setPlace] = useState('')
  const [entryDate, setEntryDate] = useState('')
  const [entryTime, setEntryTime] = useState('')
  const [outDate, setOutDate] = useState('')
  const [outTime, setOutTime] = useState('')
  const [googleLocation, setGoogleLocation] = useState('')
  const [students, setStudents] = useState([])
  const [userCode, setUserCode] = useState('')
  const [dislableAll, setDislableAll] = useState(false)

  const inputLabel = useRef(null)
  const [labelWidth, setLabelWidth] = useState(0)

  const fetchStudents = async () => {
    try {
      const response = await axios({
        method: API_ROUTES.getFilter.method,
        url: `${API_ROUTES.getFilter.url}/studentCodeName`
      })
      setStudents(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  useEffect(() => {
    if (role === '4' || role === '6') {
      fetchStudents()
    }
    return () => {
      setStudents([])
      setUserCode('')
    }
  }, [role])

  const axiosQuery = async (method, url, data) => {
    try {
      const request = await axios({
        method: method,
        url: url,
        data: data
      })
      if (
        request.data.message === 'User has already permission request' ||
        request.data.message === 'User already has a request in process'
      ) {
        setError('You already have a permission')
      } else if (request.data.response === 'Time not permitted') {
        setDislableAll(true)
        setError('Time not permitted')
      } else {
        setToastMessage('Permission created successfully.')
        setToastDisplay(true)
        history.push(role === '2' || role === '3' ? '/my-permissions' : '/')
      }
    } catch (e) {
      const {
        data: { message },
        status
      } = e.response
      if (status === 400 || status === 422 || status === 500) {
        if (
          message === 'User has already permission request' ||
          message === 'User already has a request in process'
        ) {
          setError('You already have a permission')
          setDislableAll(true)
        } else if (message === 'The given data was invalid.') {
          setError('Missing fields.')
        } else {
          setError('Bad request, try later or call 911 (BETA)')
        }
      }
    }
  }

  const submitHandle = () => {
    if (type === 'normal') {
      axiosQuery(
        API_ROUTES.requestPermission.method,
        API_ROUTES.requestPermission.url,
        {
          code_user: userCode,
          place,
          intership,
          date: moment().format('YYYY/MM/DD'),
          output_date_time: moment().format('YYYY/MM/DD H:mm:ss')
        }
      )
    } else if (type === 'weekends') {
      axiosQuery(
        API_ROUTES.requestWeekendsPermission.method,
        API_ROUTES.requestWeekendsPermission.url,
        {
          user_code: userCode,
          intership,
          in_date_time: `${entryDate} ${entryTime}`,
          out_date_time: `${outDate} ${outTime}`,
          location: googleLocation
        }
      )
    }
  }

  const button = (disable = false) => (
    <ButtonComponent
      click={submitHandle}
      background="#12B6C6"
      width="300px"
      disable={disable}
    >
      Confirm
    </ButtonComponent>
  )

  return status !== 'penalized' ? (
    <StyledContainer>
      <Navigation />
      <StyledSpacer height="54px" />
      <StyledCard flexDirection="column" roundedTop width="340px">
        <StyledBackButton>
          <LinkComponent to="/">
            <ArrowBackIosIcon fontSize="small" style={{ marginTop: '5px' }} />
          </LinkComponent>
        </StyledBackButton>
        <StyledH1
          fontWeigth="600"
          color="#12B6C6"
          style={{ margin: '0 0 8px 0' }}
        >
          {role === '2' || role === '3'
            ? 'Get my permission'
            : role === '4' || role === '6'
            ? 'Special Permission'
            : 'error'}
        </StyledH1>

        <StyledSpacer height="20px" />
        {(role === '4' || role === '6') && (
          <FormControl fullWidth variant="outlined">
            <InputLabel ref={inputLabel} id="userCode">
              Student
            </InputLabel>
            <Select
              labelId="userCode"
              id="userCode"
              labelWidth={labelWidth}
              onChange={e => setUserCode(e.target.value)}
              value={userCode}
              disabled={dislableAll}
            >
              {students.map(
                ({ code, first_name: firstName, last_name: lastName }) => (
                  <MenuItem key={code} value={code}>
                    {code} / {firstName} {lastName}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        )}

        {(userCode || role === '2' || role === '3') && (
          <>
            <StyledSpacer height="20px" />
            <FormControl fullWidth variant="outlined">
              <InputLabel
                ref={inputLabel}
                id="demo-simple-select-outlined-label"
              >
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                labelWidth={labelWidth}
                onChange={e => setType(e.target.value)}
                value={type}
                disabled={dislableAll}
              >
                <MenuItem value={'normal'}>Normal</MenuItem>
                <MenuItem value={'weekends'}>Weekends</MenuItem>
              </Select>
            </FormControl>
          </>
        )}

        {type === 'normal' && (
          <TextField
            variant="outlined"
            label="Place"
            margin="normal"
            fullWidth
            id="place"
            onChange={e => setPlace(e.target.value)}
            value={place}
            disabled={dislableAll}
            required
          />
        )}

        {/* TODO: add the google maps api here!! */}
        {type === 'weekends' && (
          <>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="out"
              label="Departure date"
              type="date"
              value={outDate}
              disabled={dislableAll}
              onChange={e => setOutDate(e.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="out"
              label="Departure time"
              type="time"
              value={outTime}
              disabled={dislableAll}
              onChange={e => setOutTime(e.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="entry"
              label="Return date"
              type="date"
              value={entryDate}
              disabled={dislableAll}
              onChange={e => setEntryDate(e.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="entry"
              label="Return time"
              type="time"
              value={entryTime}
              disabled={dislableAll}
              onChange={e => setEntryTime(e.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              variant="outlined"
              label="Location"
              margin="normal"
              fullWidth
              id="location"
              onChange={e => setGoogleLocation(e.target.value)}
              value={googleLocation}
              disabled={dislableAll}
              required
            />
          </>
        )}

        {!error && <StyledSpacer height="40px" />}
        {error && (
          <>
            <StyledSpacer height="21px" />
            <StyledTypography color="red" fontSize="16px">
              {error}
            </StyledTypography>
          </>
        )}
        {type === 'normal'
          ? !place
            ? button(dislableAll || true)
            : button(dislableAll || false)
          : type === 'weekends'
          ? !entryDate &&
            !entryTime &&
            !outDate &&
            !entryTime &&
            !googleLocation
            ? button(dislableAll || true)
            : button(dislableAll || false)
          : null}
        <StyledSpacer height="10px" />
      </StyledCard>
      <StyledStatusBar
        background={userStatusColor(status)}
        width="340px"
        margin="auto"
        onClick={() => statusService(setUser)}
      />
    </StyledContainer>
  ) : (
    <Redirect to="/" />
  )
}
