import React, { useState, useEffect } from 'react'

import ExpandMore from '@material-ui/icons/ExpandMore'

import { API_ROUTES } from '../../constants/apiRoutes'

import { Navigation } from '../../layout/Navigation'
import { ButtonComponent } from '../../components/ButtonComponent'

import { StyledCard } from '../../styles/StyledCard'
import { StyledSpacer } from '../../styles/StyledSpacer'
import { StyledContainer } from '../../styles/StyledContainer'
import { StyledTypography } from '../../styles/StyledTypography'
import {
  TableComponent,
  StyledTableBody,
  StyledTableItem,
  StyledTableItemExpand
} from '../../components/TableComponent'
import { requestService } from '../../services/requestService'
import { LoadingComponent } from '../../components/LoadingComponent'
import { NoDataComponent } from '../../components/NoDataComponent'
import { CreateEventsForm } from './CreateEventsForm'

export const MyEvents = () => {
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [tolerancePrecent, setTolerancePrecent] = useState({
    h: '00',
    m: '10'
  })
  const [toleranceLate, setToleranceLate] = useState({
    h: '00',
    m: '10'
  })
  const [weeks, setWeeks] = useState([])
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)

  const [expanded, setExpanded] = useState(false)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchData = () => {
    requestService(
      API_ROUTES.getEvents.method,
      API_ROUTES.getEvents.url,
      setEvents,
      setLoading,
      setError
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  const tableheader = [
    {
      size: '230px',
      title: 'Title event',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#FBB84D'
    },
    {
      size: '170px',
      title: 'Days',
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
      size: '210px',
      title: 'Tolerance: Present / Late',
      display: true,
      displayMd: false,
      displaySm: false,
      color: '#FBB84D'
    }
  ]

  const editHandler = (
    id,
    title,
    time,
    present,
    late,
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday
  ) => {
    setId(id)
    setTitle(title)
    setTime(time)
    setTolerancePrecent({
      h: present.substr(0, present.length - 6),
      m: present.substr(3, present.length - 6)
    })
    setToleranceLate({
      h: late.substr(0, late.length - 6),
      m: late.substr(3, late.length - 6)
    })
    setWeeks({
      sunday: sunday === 1 ? true : false,
      monday: monday === 1 ? true : false,
      tuesday: tuesday === 1 ? true : false,
      wednesday: wednesday === 1 ? true : false,
      thursday: thursday === 1 ? true : false,
      friday: friday === 1 ? true : false,
      saturday: saturday === 1 ? true : false
    })
    setCreate(true)
    setEdit(true)
  }

  const tableContent = (
    id,
    title,
    time,
    present,
    late,
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday
  ) => (
    <StyledTableBody
      onClick={() =>
        editHandler(
          id,
          title,
          time,
          present,
          late,
          sunday,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday
        )
      }
    >
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
          {sunday === 1 ? 'Sunday' : null}
          {sunday === 1 ? <br /> : null}
          {monday === 1 ? 'Monday' : null}
          {monday === 1 ? <br /> : null}
          {tuesday === 1 ? 'Tuesday' : null}
          {tuesday === 1 ? <br /> : null}
          {wednesday === 1 ? 'Wednesday' : null}
          {wednesday === 1 ? <br /> : null}
          {thursday === 1 ? 'Thursday' : null}
          {thursday === 1 ? <br /> : null}
          {friday === 1 ? 'Friday' : null}
          {friday === 1 ? <br /> : null}
          {saturday === 1 ? 'Saturday' : null}
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
          {time}
        </StyledTypography>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[3].size}
        display={tableheader[3].display ? 'block' : 'none'}
        displayMd={tableheader[3].displayMd ? 'block' : 'none'}
        displaySm={tableheader[3].displaySm ? 'block' : 'none'}
      >
        <StyledTypography
          fontSize="16px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color="#FBB13C"
        >
          {present.substr(0, present.length - 3)} /{' '}
          {late.substr(0, late.length - 3)}
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

  const tableExpand = (time, present) =>
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
          {present}
        </StyledTypography>
      </StyledTableItemExpand>
    )

  return (
    <StyledContainer>
      <Navigation />

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
          {loading && <LoadingComponent color="#FBB13C" />}
          {(events.length &&
            events.map(
              ({
                sunday,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                event: {
                  id,
                  title,
                  start_time: time,
                  tolerance_present: present,
                  tolerance_late: late
                }
              }) => (
                <StyledCard
                  width="100%"
                  flexDirection="column"
                  alignItems="start"
                  margin="0 0 16px 0"
                  key={id}
                  style={{ cursor: 'pointer' }}
                >
                  {tableContent(
                    id,
                    title,
                    time,
                    present,
                    late,
                    sunday,
                    monday,
                    tuesday,
                    wednesday,
                    thursday,
                    friday,
                    saturday
                  )}
                  {tableExpand(time, present, late)}
                </StyledCard>
              )
            )) ||
            (!loading && <NoDataComponent color="#FBB13C" />)}
        </TableComponent>
      )}
      {create && (
        <CreateEventsForm
          id={id}
          setCreate={setCreate}
          error={error}
          setError={setError}
          edit={edit}
          setEdit={setEdit}
          title={title}
          setTitle={setTitle}
          time={time}
          weeks={weeks}
          setTime={setTime}
          tolerancePrecent={tolerancePrecent}
          setTolerancePrecent={setTolerancePrecent}
          toleranceLate={toleranceLate}
          setToleranceLate={setToleranceLate}
          fetchData={fetchData}
        />
      )}
    </StyledContainer>
  )
}
