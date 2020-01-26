import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { axios } from '../../plugins/axios'

import TextField from '@material-ui/core/es/TextField'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { API_ROUTES } from '../../constants/apiRoutes'

import { Navigation } from '../../layout/Navigation'
import { LinkComponent } from '../../components/LinkComponent'
import { ButtonComponent } from '../../components/ButtonComponent'

import { StyledH1 } from '../../styles/StyledH1'
import { StyledCard } from '../../styles/StyledCard'
import { StyledSpacer } from '../../styles/StyledSpacer'
import { StyledContainer } from '../../styles/StyledContainer'
import { StyledBackButton } from '../../styles/StyledBackButton'
import { StyledTypography } from '../../styles/StyledTypography'
import {
  TableComponent,
  StyledTableBody,
  StyledTableItem,
  StyledTableItemExpand
} from '../../components/TableComponent'
import { myEventsService } from '../../services/myEventsService'
import { requestService } from '../../services/requestService'
import { defaultColors } from '../../constants/statusColor'

// TODO: presente, tarde, ausente

export const CreateEvents = () => {
  const [error, setError] = useState(false)
  const [toast, setToast] = useState(false)
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [toleranceTime, setToleranceTime] = useState('')
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)

  const [expanded, setExpanded] = useState(false)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)

  const submitHandle = async () => {
    const request = await axios({
      method: API_ROUTES.createEvent.method,
      url: API_ROUTES.createEvent.url,
      data: { title, start_time: time }
    })
    // TODO: update method!
    if (request.status === 200) {
      setTime('')
      setTitle('')
      setCreate(false)
      setToast('Event was created successfully!')
      requestService(
        API_ROUTES.getEvents.method,
        API_ROUTES.getEvents.url,
        setEvents,
        setLoading
      )
    }
  }

  const isEmpty = !(title !== '' && time !== '')

  const tableheader = [
    {
      size: '440px',
      title: 'Title event',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#FBB84D'
    },
    {
      size: '170px',
      title: 'Time',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#FBB84D'
    },
    {
      size: '170px',
      title: 'Tolerance',
      display: true,
      displayMd: false,
      displaySm: false,
      color: '#FBB84D'
    }
  ]

  useEffect(() => {
    // myEventsService(setEvents, setLoading)
    requestService(
      API_ROUTES.getEvents.method,
      API_ROUTES.getEvents.url,
      setEvents,
      setLoading
    )
  }, [])

  const editHandler = (id, title, time, tolerance) => {
    setTitle(title)
    setTime(time)
    setToleranceTime(tolerance)
    setId(id)
    setCreate(true)
    setEdit(true)
  }

  const cancel = () => {
    setTitle('')
    setTime('')
    setToleranceTime('')
    setCreate(false)
    setEdit(false)
  }

  const createForm = (
    <StyledCard flexDirection="column" roundedTop width="400px">
      <StyledBackButton>
        <ArrowBackIosIcon
          onClick={() => cancel()}
          fontSize="small"
          style={{ marginTop: '5px' }}
        />
      </StyledBackButton>
      <StyledH1
        fontWeigth="600"
        color="#FBB13C"
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
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="time"
        label="Tolerance time"
        type="time"
        onChange={e => setToleranceTime(e.target.value)}
        value={toleranceTime}
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
      {edit && (
        <ButtonComponent
          click={submitHandle}
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

  const tableContent = (title, time, tolerance) => (
    <StyledTableBody>
      <StyledTableItem
        width={tableheader[0].size}
        display={tableheader[0].display ? 'block' : 'none'}
        displayMd={tableheader[0].displayMd ? 'block' : 'none'}
        displaySm={tableheader[0].displaySm ? 'block' : 'none'}
      >
        <StyledTypography
          fontSize="16px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color="#FBB13C"
        >
          {title}
        </StyledTypography>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[1].size}
        display={tableheader[1].display ? 'block' : 'none'}
        displayMd={tableheader[1].displayMd ? 'block' : 'none'}
        displaySm={tableheader[1].displaySm ? 'block' : 'none'}
      >
        <StyledTypography
          fontSize="16px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color="#FBB13C"
        >
          {time}
        </StyledTypography>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[2].size}
        display={tableheader[2].display ? 'block' : 'none'}
        displayMd={tableheader[2].displayMd ? 'block' : 'none'}
        displaySm={tableheader[2].displaySm ? 'block' : 'none'}
      >
        <StyledTypography
          fontSize="16px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color="#FBB13C"
        >
          {tolerance}
        </StyledTypography>
      </StyledTableItem>
      <StyledTableItem
        className="last-item"
        width="24px"
        display="none"
        displayMd="block"
      >
        <ExpandMore
          fontSize="small"
          style={{ cursor: 'pointer' }}
          onClick={() => setExpanded(prev => !prev)}
        />
      </StyledTableItem>
    </StyledTableBody>
  )

  const tableExpand = (time, tolerance) =>
    expanded && (
      <StyledTableItemExpand paddingLerft={tableheader[0].size}>
        <StyledTableItem displayMd="none" displaySm="flex">
          <StyledTypography
            fontFamily="Segoe UI"
            fontWeigth="600"
            color="#FBB84D"
          >
            {tableheader[1].title}
          </StyledTypography>
          <StyledTypography
            fontFamily="Segoe UI"
            fontWeigth="600"
            color="#FBB13C"
          >
            {time}
          </StyledTypography>

          <StyledSpacer height="28px" />
        </StyledTableItem>
        <StyledTypography
          fontFamily="Segoe UI"
          fontWeigth="600"
          color="#FBB84D"
        >
          {tableheader[2].title}
        </StyledTypography>
        <StyledTypography fontWeigth="600" color="#FBB13C">
          {tolerance}
        </StyledTypography>
      </StyledTableItemExpand>
    )

  return (
    <StyledContainer>
      <Navigation />
      <StyledSpacer height="54px" />
      {!create && (
        <TableComponent
          title="My Events"
          subtitle={
            <>
              <ButtonComponent
                background="#fff"
                color="#FBB13C"
                width="100px"
                height="40px"
                margin="0"
                click={() => setCreate(prev => !prev)}
              >
                Create
              </ButtonComponent>
            </>
          }
          titleColor="#FBB13C"
          tableheader={tableheader}
        >
          {loading && (
            <StyledCard width="100%" flexDirection="column" alignItems="center">
              <StyledTypography
                fontSize="16px"
                fontFamily="Segoe UI"
                fontWeigth="600"
                color="#FBB13C"
              >
                Loading...
              </StyledTypography>
            </StyledCard>
          )}
          {events &&
            events.map(
              ({ id, title, start_time: time, tolerance_time: tolerance }) => (
                <StyledCard
                  width="100%"
                  flexDirection="column"
                  alignItems="start"
                  margin="0 0 16px 0"
                  key={id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => editHandler(id, title, time, tolerance)}
                >
                  {tableContent(title, time, tolerance)}
                  {tableExpand(time, tolerance)}
                </StyledCard>
              )
            )}
        </TableComponent>
      )}
      {create && createForm}
    </StyledContainer>
  )
}
