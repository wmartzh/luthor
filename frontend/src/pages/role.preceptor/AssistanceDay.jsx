import React, { useState, useEffect } from 'react'

import { Navigation } from '../../layout/Navigation'
import { StyledContainer } from '../../styles/StyledContainer'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import {
  StyledTableItem,
  TableComponent,
  StyledTableItemExpand,
  StyledTableBody
} from '../../components/TableComponent'
import { StyledH2 } from '../../styles/StyledH2'
import { ButtonComponent } from '../../components/ButtonComponent'
import { StyledTypography } from '../../styles/StyledTypography'
import { requestService } from '../../services/requestService'
import { API_ROUTES } from '../../constants/apiRoutes'
import { LoadingComponent } from '../../components/LoadingComponent'
import { StyledCard } from '../../styles/StyledCard'
import { StyledSpacer } from '../../styles/StyledSpacer'
import { StyledH1 } from '../../styles/StyledH1'
import { StyledBackButton } from '../../styles/StyledBackButton'
import { LinkComponent } from '../../components/LinkComponent'
import { NoDataComponent } from '../../components/NoDataComponent'
import { AssistanceButton } from '../../components/AssistenceButton'

export const AssistanceDay = () => {
  const [expanded, setExpanded] = useState(false)
  const [weekends, setWeekends] = useState(false)
  const [startPanel, setStartPanel] = useState(true)
  const [assistance, setAssistance] = useState([])
  const [students, setStudents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    requestService(
      API_ROUTES.getStudents.method,
      API_ROUTES.getStudents.url.base,
      setStudents,
      setLoading,
      setError
    )
    requestService(
      API_ROUTES.getActualEvent.method,
      API_ROUTES.getActualEvent.url,
      setAssistance,
      setLoading,
      setError
    )
  }, [])

  const tableheader = [
    {
      size: '160px',
      title: 'Code',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#77B0C8'
    },
    {
      size: '300px',
      title: 'Name',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#77B0C8'
    },
    {
      size: '140px',
      title: 'Event',
      display: true,
      displayMd: false,
      displaySm: false,
      color: '#77B0C8'
    },
    {
      size: '100px',
      title: '',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#77B0C8'
    }
  ]

  const tableContent = (code, firstName, lastName, phone, status) => (
    <StyledTableBody>
      <StyledTableItem
        width={tableheader[0].size}
        display={tableheader[0].display ? 'block' : 'none'}
        displayMd={tableheader[0].displayMd ? 'block' : 'none'}
        displaySm={tableheader[0].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color={!weekends ? '#12B6C6' : '#A1C010'}>
          {code}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[1].size}
        display={tableheader[1].display ? 'block' : 'none'}
        displayMd={tableheader[1].displayMd ? 'block' : 'none'}
        displaySm={tableheader[1].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color={!weekends ? '#12B6C6' : '#A1C010'}>
          {firstName} {lastName}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[2].size}
        display={tableheader[2].display ? 'block' : 'none'}
        displayMd={tableheader[2].displayMd ? 'block' : 'none'}
        displaySm={tableheader[2].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color={!weekends ? '#12B6C6' : '#A1C010'}>
          {selectedEvent.title}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        className="last-item"
        width={tableheader[3].size}
        display={tableheader[3].display ? 'block' : 'none'}
        displayMd={tableheader[3].displayMd ? 'block' : 'none'}
        displaySm={tableheader[3].displaySm ? 'block' : 'none'}
      >
        <AssistanceButton code={code} event={selectedEvent.id} />
      </StyledTableItem>
    </StyledTableBody>
  )

  const tableExpand = expanded && (
    <StyledTableItemExpand
      paddingLerft={tableheader[0].size}
      mediaExpand="block"
    >
      <StyledTableItem displayMd="none" displaySm="flex">
        <StyledTypography
          fontSize="14px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color="#77B0C8"
        >
          Location
        </StyledTypography>
        <StyledTypography
          fontSize="16px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color={!weekends ? '#12B6C6' : '#A1C010'}
        >
          Automercado
        </StyledTypography>
      </StyledTableItem>
    </StyledTableItemExpand>
  )

  return (
    <StyledContainer>
      <Navigation />
      {!selectedEvent && (
        <>
          <StyledSpacer height="54px" />
          <StyledCard width="400px" flexDirection="column">
            <StyledBackButton>
              <LinkComponent to="/">
                <ArrowBackIosIcon
                  fontSize="small"
                  style={{ marginTop: '5px' }}
                />
              </LinkComponent>
            </StyledBackButton>
            <StyledTypography
              fontSize="18px"
              color="#12B6C6"
              fontWeigth="400"
              style={{ margin: '7px 0 6px 0' }}
            >
              User Details
            </StyledTypography>
          </StyledCard>
          <StyledSpacer height="20px" />
        </>
      )}
      {selectedEvent && (
        <TableComponent
          title="Assistance"
          subtitle={`Total: ${students.length}`}
          titleColor="#12B6C6"
          tableheader={tableheader}
        >
          {loading && <LoadingComponent color="#12B6C6" />}
          {(students.length !== 0 &&
            students.map(
              ({
                code,
                status,
                first_name: firstName,
                last_name: lastName,
                phone_number: phone
              }) => (
                <StyledCard
                  width="100%"
                  flexDirection="column"
                  alignItems="start"
                  margin="0 0 16px 0"
                  key={code}
                >
                  {tableContent(code, firstName, lastName, phone, status)}
                </StyledCard>
              )
            )) ||
            (!loading && <NoDataComponent color="#12B6C6" />)}
        </TableComponent>
      )}
      {loading ? (
        <StyledCard width="400px" flexDirection="column" alignItems="center">
          <StyledTypography
            fontSize="14px"
            fontFamily="Segoe UI"
            fontWeigth="600"
            color="#12B6C6"
          >
            Loading...
          </StyledTypography>
        </StyledCard>
      ) : null}
      {!selectedEvent &&
        assistance.map(({ id, title, start_time: time }) => (
          <div key={id}>
            <StyledCard
              width="400px"
              flexDirection="column"
              alignItems="start"
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedEvent({ id, title, time })}
            >
              <StyledTypography fontSize="14px" color="#12B6C6">
                Title
              </StyledTypography>
              <StyledTypography fontSize="16px">{title}</StyledTypography>
              <StyledSpacer height="10px" />
              <StyledTypography fontSize="14px" color="#12B6C6">
                Time
              </StyledTypography>
              <StyledTypography fontSize="16px">{time}</StyledTypography>
            </StyledCard>
            <StyledSpacer height="20px" />
          </div>
        ))}
    </StyledContainer>
  )
}
