import React from 'react'

import TextField from '@material-ui/core/es/TextField'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { axios } from '../../plugins/axios'
import { API_ROUTES } from '../../constants/apiRoutes'
import { defaultColors } from '../../constants/statusColor'

import { StyledCard } from '../../styles/StyledCard'
import { StyledSpacer } from '../../styles/StyledSpacer'
import { StyledBackButton } from '../../styles/StyledBackButton'
import { StyledTypography } from '../../styles/StyledTypography'
import { ButtonComponent } from '../../components/ButtonComponent'
import { HourMinComponent } from '../../components/HourMinComponent'

export const CreateEventsForm = ({
  id,
  setCreate,
  error,
  setError,
  edit,
  setEdit,
  title,
  setTitle,
  time,
  setTime,
  tolerancePrecent,
  setTolerancePrecent,
  toleranceLate,
  setToleranceLate,
  fetchData
}) => {
  const cancel = () => {
    setTitle('')
    setTime('')
    setTolerancePrecent({
      h: '00',
      m: '10'
    })
    setToleranceLate({
      h: '00',
      m: '10'
    })
    setError(false)
    setEdit(false)
    setCreate(false)
  }

  const isEmpty = !(
    title !== '' &&
    time !== '' &&
    tolerancePrecent !== '' &&
    toleranceLate !== ''
  )

  const submitHandle = async () => {
    const response = await axios({
      method: edit
        ? API_ROUTES.updateEvent.method
        : API_ROUTES.createEvent.method,
      url: edit
        ? `${API_ROUTES.updateEvent.url}/${id}`
        : API_ROUTES.createEvent.url,
      data: {
        title,
        start_time: time,
        tolerance_present: `${tolerancePrecent.h}:${tolerancePrecent.m}`,
        tolerance_late: `${toleranceLate.h}:${toleranceLate.m}`
      }
    })
    if (response.status === 201 || response.status === 200) {
      cancel()
      // setToast('Event was created successfully!')
      fetchData()
    }
  }
  const deleteHandle = async () => {
    const response = await axios({
      method: API_ROUTES.deleteEvent.method,
      url: `${API_ROUTES.deleteEvent.url}/${id}`
    })
    if (response.status === 200) {
      cancel()
      fetchData()
    }
  }
  return (
    <>
      <StyledSpacer height="54px" />
      <StyledCard flexDirection="column" roundedTop width="400px">
        <StyledBackButton>
          <ArrowBackIosIcon
            onClick={() => cancel()}
            fontSize="small"
            style={{ marginTop: '5px' }}
          />
        </StyledBackButton>
        <StyledTypography
          fontSize="24px"
          fontWeigth="600"
          fontFamily="Segoe UI"
          color="#FBB13C"
          style={{ margin: '0 0 8px 0' }}
        >
          Create a new Event
        </StyledTypography>

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
        <HourMinComponent
          title="Tolerance Precent"
          time={tolerancePrecent}
          setTime={setTolerancePrecent}
          color="#FBB13C"
        />
        <HourMinComponent
          title="Tolerance Late"
          time={toleranceLate}
          setTime={setToleranceLate}
          color="#FBB13C"
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
        {edit && (
          <ButtonComponent
            click={deleteHandle}
            background={defaultColors.red}
            width="360px"
            disable={isEmpty}
          >
            Delete
          </ButtonComponent>
        )}
        <ButtonComponent
          click={submitHandle}
          background={edit ? defaultColors.green : '#FBB13C'}
          width="360px"
          disable={isEmpty}
        >
          {(edit && 'Update') || 'Create'}
        </ButtonComponent>
      </StyledCard>
    </>
  )
}
