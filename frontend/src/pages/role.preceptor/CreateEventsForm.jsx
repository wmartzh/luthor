import React from 'react'

import TextField from '@material-ui/core/es/TextField'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { StyledCard } from '../../styles/StyledCard'
import { StyledSpacer } from '../../styles/StyledSpacer'
import { StyledTypography } from '../../styles/StyledTypography'
import { StyledBackButton } from '../../styles/StyledBackButton'
import { HourMinComponent } from '../../components/HourMinComponent'
import { ButtonComponent } from '../../components/ButtonComponent'
import { defaultColors } from '../../constants/statusColor'
import { API_ROUTES } from '../../constants/apiRoutes'
import { axios } from '../../plugins/axios'

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
      // headers: {
      //   Authorization:
      //     'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTAzYzI2ZjUxYTE4N2UyZTQ3MmQ5MjA5MzgyMTM2NGE2NTJhZGMzNzUzNmFkYjc3N2RjOTg0YzRmNjg3ZTFiZDllOGVkMjY2NzY5NjJlYmYiLCJpYXQiOjE1ODAxMDc0NjYsIm5iZiI6MTU4MDEwNzQ2NiwiZXhwIjoxNjExNzI5ODY2LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.bCNh-jeKs7_iHwEMt1y0xiqDhZThOwaoGoVZb5sYCU36R81UUixYgJHZJg25PZKZZeLgZyFcR6ZA61P4x47Yn6bKT91Lv3hVKY-EMkEgPSfB3F5b_t-NUudIvMHW1gGFKBHmY9IVk6XXBw4IDa6mmVQHNRR8VvwutEpehzf9odQqg7asqyqFRgKZ3xVLKHzKcXURv46CdFz-ri9qKygNNg5iyjOzzg9kgc2QGX9ifAWaSu5TU-QTB-9XegFZdnDwWtCk1ce6Waw-j6xk7UMQwaHyxzy6ukpIr5IJXbILKDrt4rbRc7rdh9rdUEErLoa5EYDf5LUbLrD8E2y-DX9ciVN_dBFf4GH1BRUUO-BlSB_HoA4qY5bAYc1I5O2vbB_aBYZ3Jo18AfURmSsosNklf6TjYK61We3K3N12qCxsWrpp7sUOXrYcXtcPD6IwFOVDqCu2DhzgT6VROXCDi10tfKmH2CNNYzNsMcGPppnjC0yUfH5zYG3bgqY5O7t_4mn8WVmt-iBjLFBoGjTckkhFlea1PT7-Coc2wdzuhb1wHrw_Yk5dHpMU6TofW8ZuoOpzQIgfK8R4BdPERkh7Hu4AODxfsFn8ZEalxVNUFxzanwILEeO4Xlo-Q4Z2vRx3eHVVFTE0k5Xy3vRoHn9SHytrTKMqncIk3LTwTmFGS9r6ta8'
      // },
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
      // headers: {
      //   Authorization:
      //     'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTAzYzI2ZjUxYTE4N2UyZTQ3MmQ5MjA5MzgyMTM2NGE2NTJhZGMzNzUzNmFkYjc3N2RjOTg0YzRmNjg3ZTFiZDllOGVkMjY2NzY5NjJlYmYiLCJpYXQiOjE1ODAxMDc0NjYsIm5iZiI6MTU4MDEwNzQ2NiwiZXhwIjoxNjExNzI5ODY2LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.bCNh-jeKs7_iHwEMt1y0xiqDhZThOwaoGoVZb5sYCU36R81UUixYgJHZJg25PZKZZeLgZyFcR6ZA61P4x47Yn6bKT91Lv3hVKY-EMkEgPSfB3F5b_t-NUudIvMHW1gGFKBHmY9IVk6XXBw4IDa6mmVQHNRR8VvwutEpehzf9odQqg7asqyqFRgKZ3xVLKHzKcXURv46CdFz-ri9qKygNNg5iyjOzzg9kgc2QGX9ifAWaSu5TU-QTB-9XegFZdnDwWtCk1ce6Waw-j6xk7UMQwaHyxzy6ukpIr5IJXbILKDrt4rbRc7rdh9rdUEErLoa5EYDf5LUbLrD8E2y-DX9ciVN_dBFf4GH1BRUUO-BlSB_HoA4qY5bAYc1I5O2vbB_aBYZ3Jo18AfURmSsosNklf6TjYK61We3K3N12qCxsWrpp7sUOXrYcXtcPD6IwFOVDqCu2DhzgT6VROXCDi10tfKmH2CNNYzNsMcGPppnjC0yUfH5zYG3bgqY5O7t_4mn8WVmt-iBjLFBoGjTckkhFlea1PT7-Coc2wdzuhb1wHrw_Yk5dHpMU6TofW8ZuoOpzQIgfK8R4BdPERkh7Hu4AODxfsFn8ZEalxVNUFxzanwILEeO4Xlo-Q4Z2vRx3eHVVFTE0k5Xy3vRoHn9SHytrTKMqncIk3LTwTmFGS9r6ta8'
      // }
    })
    if (response.status === 200) {
      cancel()
      fetchData()
    }
  }
  return (
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
  )
}
