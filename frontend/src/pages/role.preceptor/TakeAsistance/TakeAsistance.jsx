import React, { useState, useEffect } from 'react'

import { Navigation } from '../../../layout/Navigation'
import { StyledContainer } from '../../../styles/StyledContainer'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { TableComponent } from '../../../components/TableComponent'
import { StyledTypography } from '../../../styles/StyledTypography'
import { requestService } from '../../../services/requestService'
import { API_ROUTES } from '../../../constants/apiRoutes'
import { LoadingComponent } from '../../../components/LoadingComponent'
import { StyledCard } from '../../../styles/StyledCard'
import { StyledSpacer } from '../../../styles/StyledSpacer'
import { StyledBackButton } from '../../../styles/StyledBackButton'
import { LinkComponent } from '../../../components/LinkComponent'
import { NoDataComponent } from '../../../components/NoDataComponent'

import { tableHeader } from './tableHeader'
import { tableContent } from './tableContent'

export const TakeAsistance = () => {
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
          tableheader={tableHeader}
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
                  {tableContent(
                    { code, firstName, lastName, phone, status },
                    selectedEvent
                  )}
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
