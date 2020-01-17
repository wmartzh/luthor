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

export const CreateEvents = () => {
  const [error, setError] = useState(false)
  const [toast, setToast] = useState(false)
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [create, setCreate] = useState(false)

  const [expanded, setExpanded] = useState(false)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)

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
      title: 'Craeted',
      display: true,
      displayMd: false,
      displaySm: false,
      color: '#FBB84D'
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const request = await axios({
        method: API_ROUTES.getEvents.method,
        url: API_ROUTES.getEvents.url
      })
      if (request.status === 200) {
        setEvents(request.data.data)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const tableContent = (title, time, created) => (
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
          {moment(created).format('DD/MMM/YYYY')}
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

  const tableExpand = (date, monitor) =>
    expanded && (
      <StyledTableItemExpand paddingLerft={tableheader[0].size}>
        <StyledTableItem displayMd="none" displaySm="flex">
          <StyledTypography
            fontFamily="Segoe UI"
            fontWeigth="600"
            color="#FBB84D"
          >
            {tableheader[3].title}
          </StyledTypography>
          <StyledTypography
            fontFamily="Segoe UI"
            fontWeigth="600"
            color="#FBB13C"
          >
            {moment(date).format('DD-MMM-YYYY')}
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
          {monitor}
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
              ({ id, title, start_time: time, created_at: created }) => (
                <StyledCard
                  width="100%"
                  flexDirection="column"
                  alignItems="start"
                  margin="0 0 16px 0"
                  key={id}
                >
                  {tableContent(title, time, created)}
                  {/* {tableExpand(date, monitor)} */}
                </StyledCard>
              )
            )}
        </TableComponent>
      )}
      {create && (
        <StyledCard flexDirection="column" roundedTop width="400px">
          <StyledBackButton>
            <ArrowBackIosIcon
              onClick={() => setCreate(prev => !prev)}
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
            background="#FBB13C"
            width="360px"
            disable={isEmpty}
          >
            Create
          </ButtonComponent>
        </StyledCard>
      )}
    </StyledContainer>
  )
}
