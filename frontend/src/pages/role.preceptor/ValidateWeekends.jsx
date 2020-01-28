import React, { useState, useEffect } from 'react'

import {
  TableComponent,
  StyledTableItem,
  StyledTableBody
} from '../../components/TableComponent'

import { Navigation } from '../../layout/Navigation'
import { StyledH2 } from '../../styles/StyledH2'
import { StyledContainer } from '../../styles/StyledContainer'
import { ButtonComponent } from '../../components/ButtonComponent'
import { requestService } from '../../services/requestService'
import { API_ROUTES } from '../../constants/apiRoutes'
import { StyledCard } from '../../styles/StyledCard'
import { submitService } from '../../services/submitService'
import { LoadingComponent } from '../../components/LoadingComponent'
import { NoDataComponent } from '../../components/NoDataComponent'

export const ValidateWeekends = () => {
  const [permission, setPermission] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState(false)

  const requestData = () => {
    requestService(
      API_ROUTES.getWeekends.method,
      API_ROUTES.getWeekends.url,
      setPermission,
      setLoading,
      setError
    )
  }

  useEffect(() => {
    requestData()
  }, [])

  const tableheader = [
    {
      size: '110px',
      title: 'Code',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#77B0C8'
    },
    {
      size: '340px',
      title: 'Name',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#77B0C8'
    },
    {
      size: '340px',
      title: 'Preceptor',
      display: true,
      displayMd: false,
      displaySm: true,
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

  const openDialog = (type, code) => {
    // setExpanded(true)
    submitService(
      type === 'normal'
        ? API_ROUTES.updatePermission.method
        : API_ROUTES.updateWeekendsPermission.method,
      type === 'normal'
        ? API_ROUTES.updatePermission.url
        : API_ROUTES.updateWeekendsPermission.url,
      { check_exit: 1, user_code: code }
    )
    requestData()
  }

  const tableContent = (
    state,
    location,
    vicerector,
    preceptor,
    entryDay,
    outDay,
    fristName,
    lastName
  ) => (
    <StyledTableBody>
      <StyledTableItem
        width={tableheader[0].size}
        display={tableheader[0].display ? 'block' : 'none'}
        displayMd={tableheader[0].displayMd ? 'block' : 'none'}
        displaySm={tableheader[0].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#A1C010">
          {state}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[1].size}
        display={tableheader[1].display ? 'block' : 'none'}
        displayMd={tableheader[1].displayMd ? 'block' : 'none'}
        displaySm={tableheader[1].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#77B0C8">
          {fristName} {lastName}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[2].size}
        display={tableheader[2].display ? 'block' : 'none'}
        displayMd={tableheader[2].displayMd ? 'block' : 'none'}
        displaySm={tableheader[2].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#77B0C8">
          {preceptor}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        className="last-item"
        width={tableheader[3].size}
        display={tableheader[3].display ? 'block' : 'none'}
        displayMd={tableheader[3].displayMd ? 'block' : 'none'}
        displaySm={tableheader[3].displaySm ? 'block' : 'none'}
      >
        <ButtonComponent
          background="#A1C010"
          width="100px"
          height="40px"
          margin="0"
          // click={() => openDialog(type, code)}
        >
          Validate
        </ButtonComponent>
      </StyledTableItem>
    </StyledTableBody>
  )

  return (
    <StyledContainer>
      <Navigation />
      <TableComponent
        title="Validate weekends"
        titleColor="#A1C010"
        tableheader={tableheader}
      >
        {loading && <LoadingComponent color="#A1C010" />}
        {(permission.length !== 0 &&
          permission.map(
            ({
              id,
              state,
              vicerector,
              preceptor,
              location,
              in_date_time: entryDay,
              out_date_time: outDay,
              check_exit: check,
              user: { code, first_name: firstName, last_name: lastName }
            }) => {
              return check.toString() === '0' && state === 'in process' ? (
                <StyledCard
                  width="100%"
                  flexDirection="column"
                  alignItems="start"
                  margin="0 0 16px 0"
                  key={id}
                >
                  {tableContent(
                    state,
                    location,
                    vicerector,
                    preceptor,
                    entryDay,
                    outDay,
                    firstName,
                    lastName
                  )}
                </StyledCard>
              ) : null
            }
          )) ||
          (!loading && <NoDataComponent color="#A1C010" />)}
      </TableComponent>
      {/* TODO: get user photo */}
      {expanded && <StyledCard>TODO Dialog</StyledCard>}
    </StyledContainer>
  )
}
