import React, { useState, useEffect } from 'react'

import { Navigation } from '../../../layout/Navigation'
import { StyledContainer } from '../../../styles/StyledContainer'
import { TableComponent } from '../../../components/TableComponent'
import { StyledTypography } from '../../../styles/StyledTypography'
import { requestService } from '../../../services/requestService'
import { API_ROUTES } from '../../../constants/apiRoutes'
import { LoadingComponent } from '../../../components/LoadingComponent'
import { NoDataComponent } from '../../../components/NoDataComponent'
import { StyledCard } from '../../../styles/StyledCard'
import { tableHeader } from './tableHeader'
import { tableContent } from './tableContent'

export const StudentsOut = () => {
  const [search, setSearch] = useState('')

  const [students, setStudents] = useState([])
  const [selected, setSelected] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchData = () => {
    requestService(
      API_ROUTES.getFilter.method,
      `${API_ROUTES.getFilter.url}/out`,
      setStudents,
      setLoading,
      setError
    )
  }

  useEffect(() => {
    fetchData()
    // return () => {
    //   setStudents([])
    //   setLoading(false)
    //   setError(false)
    // }
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
                  setSelected
                )}
                {/* {expanded && tableExpand({lastName, phone})} */}
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
              setSelected
            )}
            {/* {expanded && tableExpand({lastName, phone})} */}
          </StyledCard>
        )
      )) ||
    (!loading && <NoDataComponent color="#4F3C75" />)

  return (
    <StyledContainer>
      <Navigation />
      <TableComponent
        title="Students Out"
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
