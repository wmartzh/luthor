import React, { useState } from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/es/FormLabel'
import TextField from '@material-ui/core/es/TextField'
import FormControl from '@material-ui/core/es/FormControl'
import FormControlLabel from '@material-ui/core/es/FormControlLabel'
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
// import { useToastValues } from '../../context/ToastContext'

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
  weeks,
  setTime,
  tolerancePrecent,
  setTolerancePrecent,
  toleranceLate,
  setToleranceLate,
  fetchData
}) => {
  // const { setToastDisplay, setToastMessage } = useToastValues()

  const [days, setDays] = useState(
    weeks || {
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false
    }
  )

  const {
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday
  } = days
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
        tolerance_late: `${toleranceLate.h}:${toleranceLate.m}`,
        sunday,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday
      }
    })
    if (response.status === 201 || response.status === 200) {
      cancel()
      // setToastDisplay(true)
      // setToastMessage('The event was created successfully!')
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
      // setToastDisplay(true)
      // setToastMessage('The event was deleted successfully!')
      fetchData()
    }
  }

  const handleChangeCheckbox = name => event => {
    setDays({ ...days, [name]: event.target.checked })
  }

  return (
    <>
      <StyledSpacer height="54px" />
      <StyledCard flexDirection="column" width="400px">
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

        <StyledSpacer height="40px" />
        <div style={{ width: '100%', display: 'flex', alignItems: 'start' }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Days of the Week</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sunday}
                    onChange={handleChangeCheckbox('sunday')}
                    value="sunday"
                  />
                }
                label="Sunday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={monday}
                    onChange={handleChangeCheckbox('monday')}
                    value="monday"
                  />
                }
                label="Monday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={tuesday}
                    onChange={handleChangeCheckbox('tuesday')}
                    value="tuesday"
                  />
                }
                label="Tuesday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={wednesday}
                    onChange={handleChangeCheckbox('wednesday')}
                    value="wednesday"
                  />
                }
                label="Wednesday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={thursday}
                    onChange={handleChangeCheckbox('thursday')}
                    value="thursday"
                  />
                }
                label="Thursday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={friday}
                    onChange={handleChangeCheckbox('friday')}
                    value="friday"
                  />
                }
                label="Friday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={saturday}
                    onChange={handleChangeCheckbox('Saturday')}
                    value="Saturday"
                  />
                }
                label="Saturday"
              />
            </FormGroup>
            {/* <FormHelperText>Be careful</FormHelperText> */}
          </FormControl>
        </div>

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
      <StyledSpacer height="60px" />
    </>
  )
}
