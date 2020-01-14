import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'

import Select from '@material-ui/core/es/Select'
import MenuItem from '@material-ui/core/es/MenuItem'
import TextField from '@material-ui/core/es/TextField'
import InputLabel from '@material-ui/core/es/InputLabel'
import FormControl from '@material-ui/core/es/FormControl'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { axios } from '../../plugins/axios'
import { API_ROUTES } from '../../constants/apiRoutes'
import { userStatusColor } from '../../constants/statusColor'

import { Navigation } from '../../layout/Navigation'
import { LinkComponent } from '../../components/LinkComponent'
import { ButtonComponent } from '../../components/ButtonComponent'

import { StyledH1 } from '../../styles/StyledH1'
import { StyledCard } from '../../styles/StyledCard'
import { StyledSpacer } from '../../styles/StyledSpacer'
import { StyledContainer } from '../../styles/StyledContainer'
import { StyledStatusBar } from '../../styles/StyledStatusBar'
import { StyledBackButton } from '../../styles/StyledBackButton'
import { StyledTypography } from '../../styles/StyledTypography'

export const CreateEvents = () => {
  const [error, setError] = useState(false)
  const [toast, setToast] = useState(false)
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')

  const submitHandle = async () => {
    const request = await axios({
      method: API_ROUTES.createEvent.method,
      url: API_ROUTES.createEvent.url,
      data: { title, start_time: time }
    })
    if (request.status === 200) {
      setTime('')
      setTitle('')
    }
    console.log(request)
  }

  const isEmpty = !(title !== '' && time !== '')

  return (
    <StyledContainer>
      <Navigation />
      <StyledSpacer height="54px" />
      <StyledCard flexDirection="column" roundedTop width="400px">
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
          Create a new Event
        </StyledH1>

        <StyledSpacer height="20px" />
        <TextField
          variant="outlined"
          label="Event Title"
          margin="normal"
          fullWidth
          id="title"
          onChange={e => setTitle(e.target.value)}
          value={title}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="time"
          label="Event time"
          type="time"
          onChange={e => setTime(e.target.value)}
          value={time}
          InputLabelProps={{
            shrink: true
          }}
        />
        {!error && <StyledSpacer height="40px" />}
        {error && (
          <>
            <StyledSpacer height="21px" />
            <StyledTypography color="red" fontSize="16px">
              {error}
            </StyledTypography>
          </>
        )}
        <ButtonComponent
          click={submitHandle}
          background="#12B6C6"
          width="360px"
          disable={isEmpty}
        >
          Create
        </ButtonComponent>
      </StyledCard>
    </StyledContainer>
  )
}
