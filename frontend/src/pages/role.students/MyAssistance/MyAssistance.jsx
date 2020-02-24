import React, { useState, useEffect } from 'react'

import { TableComponent } from '../../../components/TableComponent'

import { API_ROUTES } from '../../../constants/apiRoutes'

import { StyledCard } from '../../../styles/StyledCard'
import { Navigation } from '../../../layout/Navigation'
import { StyledContainer } from '../../../styles/StyledContainer'
import { LoadingComponent } from '../../../components/LoadingComponent'
import { NoDataComponent } from '../../../components/NoDataComponent'
import { requestService } from '../../../services/requestService'
import { StyledTypography } from '../../../styles/StyledTypography'

import { tableHeader } from './tableHeader'
import { tableContent } from './tableContent'
import { tableExpand } from './tableExpand'

export const MyAssistance = () => {
  const [expanded, setExpanded] = useState(false)
  const [assistance, setAssistance] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const fetchData = () => {
    requestService(
      API_ROUTES.getAssistance.method,
      API_ROUTES.getAssistance.url,
      setAssistance,
      setLoading,
      setError
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  const searchResult = item => {
    let result = assistance.filter(data => {
      return data[item].title.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
    console.log(result)
    return result ? (
      <>
        {(result.length &&
          result.map(
            ({
              id,
              time,
              date,
              status,
              event: { title },
              monitor: { first_name: monitor }
            }) => (
              <StyledCard
                width="100%"
                flexDirection="column"
                alignItems="start"
                margin="0 0 16px 0"
                key={id}
              >
                {tableContent(
                  { status, date, title, monitor, time },
                  setExpanded
                )}
                {tableExpand({ date, monitor, time }, expanded)}
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

  const displayTable = (
    <>
      {(assistance.length !== 0 &&
        assistance.map(
          ({
            id,
            time,
            date,
            status,
            event: { title },
            monitor: { first_name: monitor }
          }) => (
            <StyledCard
              width="100%"
              flexDirection="column"
              alignItems="start"
              margin="0 0 16px 0"
              key={id}
            >
              {tableContent(status, date, title, monitor, time)}
              {tableExpand(date, monitor, time)}
            </StyledCard>
          )
        )) ||
        (!loading && <NoDataComponent color="#A1C010" />)}
    </>
  )
  return (
    <StyledContainer>
      <Navigation />
      <TableComponent
        title="My Assistance"
        search={setSearch}
        searchTitle="assistance"
        titleColor="#A1C010"
        tableheader={tableHeader}
      >
        {loading && <LoadingComponent color="#A1C010" />}
        {/* TODO: fix no data! */}

        {search.length === 0 ? displayTable : searchResult('event')}
      </TableComponent>
    </StyledContainer>
  )
}
