import React, { useState, useEffect } from 'react'

import { Navigation } from '../../../layout/Navigation'
import { StyledContainer } from '../../../styles/StyledContainer'
import { TableComponent } from '../../../components/TableComponent'
import { requestService } from '../../../services/requestService'
import { API_ROUTES } from '../../../constants/apiRoutes'
import { LoadingComponent } from '../../../components/LoadingComponent'
import { NoDataComponent } from '../../../components/NoDataComponent'
import { StyledCard } from '../../../styles/StyledCard'
import { tableHeader } from './tableHeader'
import { tableContent } from './tableContent'
import { StyledTypography } from '../../../styles/StyledTypography'

export const AssistanceDay = () => {
  const [search, setSearch] = useState('')
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchData = () => {
    requestService(
      API_ROUTES.getTodayAssistance.method,
      API_ROUTES.getTodayAssistance.url,
      setStudents,
      setLoading,
      setError
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  const searchResult = item => {
    let result = students.filter(data => {
      return (
        data['first_name'].toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
    })
    return result ? (
      <>
        {(result.length &&
          result.map(
            ({
              id,
              event: { title },
              monitor: { first_name: firstName, last_name: lastName },
              status,
              time
            }) => (
              <StyledCard
                width="100%"
                flexDirection="column"
                alignItems="start"
                margin="0 0 16px 0"
                key={id}
              >
                {tableContent({
                  status,
                  title,
                  name: `${firstName || ''} ${lastName || ''}`,
                  time
                })}
              </StyledCard>
            )
          )) ||
          (!loading && (
            <StyledCard width="100%" flexDirection="column" alignItems="center">
              <StyledTypography
                fontSize="14px"
                fontFamily="Segoe UI"
                fontWeigth="600"
                color="#4F3C75"
              >
                No found
              </StyledTypography>
            </StyledCard>
          ))}
      </>
    ) : (
      <StyledCard width="100%" flexDirection="column" alignItems="center">
        <StyledTypography
          fontSize="14px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color="#4F3C75"
        >
          Searching...
        </StyledTypography>
      </StyledCard>
    )
  }

  const displayTable =
    (students.length &&
      students.map(
        ({
          id,
          event: { title },
          monitor: { first_name: firstName, last_name: lastName },
          status,
          time
        }) => (
          <StyledCard
            width="100%"
            flexDirection="column"
            alignItems="start"
            margin="0 0 16px 0"
            key={id}
          >
            {tableContent({
              status,
              title,
              name: `${firstName || ''} ${lastName || ''}`,
              time
            })}
          </StyledCard>
        )
      )) ||
    (!loading && <NoDataComponent color="#4F3C75" />)

  return (
    <StyledContainer>
      <Navigation />
      <TableComponent
        title="Assistance"
        subtitle={`Total out: ${students.length}`}
        search={setSearch}
        searchTitle="name"
        titleColor="#4F3C75"
        tableheader={tableHeader}
      >
        {loading && <LoadingComponent color="#4F3C75" />}
        {search.length === 0 ? displayTable : searchResult('event')}
      </TableComponent>
    </StyledContainer>
  )
}
