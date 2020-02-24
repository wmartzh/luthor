import React, { useState, useEffect } from 'react'

import { Navigation } from '../../layout/Navigation'
import { StyledContainer } from '../../styles/StyledContainer'
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
import { NoDataComponent } from '../../components/NoDataComponent'
import { StyledCard } from '../../styles/StyledCard'
import { StyledSpan } from '../../styles/StyledSpan'
import { userStatusColor } from '../../constants/statusColor'

export const AssistanceDay = () => {
  const [expanded, setExpanded] = useState(false)
  const [weekends, setWeekends] = useState(false)

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

  const tableHeader = [
    {
      size: '74px',
      title: 'Status',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#7ccc5b'
    },
    {
      size: '330px',
      title: 'Event',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#7ccc5b'
    },
    {
      size: '200px',
      title: 'Monitor',
      display: true,
      displayMd: false,
      displaySm: false,
      color: '#7ccc5b'
    },
    {
      size: '150px',
      title: 'Date',
      display: true,
      displayMd: true,
      displaySm: false,
      color: '#7ccc5b'
    }
  ]

  const tableContent = (code, firstName, lastName, phone, status) => (
    <StyledTableBody>
      <StyledTableItem
        width={tableHeader[0].size}
        display={tableHeader[0].display ? 'block' : 'none'}
        displayMd={tableHeader[0].displayMd ? 'block' : 'none'}
        displaySm={tableHeader[0].displaySm ? 'block' : 'none'}
      >
        <StyledSpan
          fontFamily="Segoe UI"
          fontWeigth="600"
          color={userStatusColor(status)}
        >
          {code}
        </StyledSpan>
      </StyledTableItem>
      <StyledTableItem
        width={tableHeader[1].size}
        display={tableHeader[1].display ? 'block' : 'none'}
        displayMd={tableHeader[1].displayMd ? 'block' : 'none'}
        displaySm={tableHeader[1].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#4F3C75">
          {firstName} {lastName}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableHeader[2].size}
        display={tableHeader[2].display ? 'block' : 'none'}
        displayMd={tableHeader[2].displayMd ? 'block' : 'none'}
        displaySm={tableHeader[2].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#4F3C75">
          {phone || 'none'}
        </StyledH2>
      </StyledTableItem>

      <StyledTableItem
        className="last-item"
        width={tableHeader[3].size}
        display={tableHeader[3].display ? 'block' : 'none'}
        displayMd={tableHeader[3].displayMd ? 'block' : 'none'}
        displaySm={tableHeader[3].displaySm ? 'block' : 'none'}
      >
        <ButtonComponent
          background="#4F3C75"
          width="90px"
          height="40px"
          margin="0"
          click={() =>
            setSelected({
              status: `${status.charAt(0).toUpperCase() + status.slice(1)}`,
              code,
              firstName,
              lastName
            })
          }
        >
          More
        </ButtonComponent>
      </StyledTableItem>
    </StyledTableBody>
  )

  const tableExpand = expanded && (
    <StyledTableItemExpand
      paddingLerft={tableHeader[0].size}
      mediaExpand="block"
    >
      <StyledTableItem displayMd="none" displaySm="flex">
        <StyledTypography
          fontSize="14px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color="#B0A3CC"
        >
          Location
        </StyledTypography>
        <StyledTypography
          fontSize="16px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color="#4F3C75"
        >
          Automercado
        </StyledTypography>
      </StyledTableItem>
    </StyledTableItemExpand>
  )

  return (
    <StyledContainer>
      <Navigation />
      <TableComponent
        title="Assistance"
        subtitle={`Total out: ${students.length}`}
        titleColor="#4F3C75"
        tableheader={tableHeader}
      >
        {loading && <LoadingComponent color="#4F3C75" />}
        {(students.length &&
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
                {/* {expanded && tableExpand(lastName, phone)} */}
              </StyledCard>
            )
          )) ||
          (!loading && <NoDataComponent color="#4F3C75" />)}
      </TableComponent>
    </StyledContainer>
  )
}
