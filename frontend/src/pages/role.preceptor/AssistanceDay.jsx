import React, { useState, useEffect } from 'react'

import { Navigation } from '../../layout/Navigation'
import { StyledContainer } from '../../styles/StyledContainer'
import {
  StyledTableItem,
  TableComponent,
  StyledTableBody
} from '../../components/TableComponent'
import { StyledH2 } from '../../styles/StyledH2'
import { requestService } from '../../services/requestService'
import { API_ROUTES } from '../../constants/apiRoutes'
import { LoadingComponent } from '../../components/LoadingComponent'
import { NoDataComponent } from '../../components/NoDataComponent'
import { StyledCard } from '../../styles/StyledCard'
import { StyledSpan } from '../../styles/StyledSpan'
import { userStatusColor } from '../../constants/statusColor'

export const AssistanceDay = () => {
  const [students, setStudents] = useState([])
  const [selected, setSelected] = useState('')
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
      title: 'Student',
      display: true,
      displayMd: false,
      displaySm: false,
      color: '#7ccc5b'
    },
    {
      size: '150px',
      title: 'Time',
      display: true,
      displayMd: true,
      displaySm: false,
      color: '#7ccc5b'
    }
  ]

  const tableContent = ({ status, title, name, time }) => (
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
          {status}
        </StyledSpan>
      </StyledTableItem>
      <StyledTableItem
        width={tableHeader[1].size}
        display={tableHeader[1].display ? 'block' : 'none'}
        displayMd={tableHeader[1].displayMd ? 'block' : 'none'}
        displaySm={tableHeader[1].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#4F3C75">
          {title}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableHeader[2].size}
        display={tableHeader[2].display ? 'block' : 'none'}
        displayMd={tableHeader[2].displayMd ? 'block' : 'none'}
        displaySm={tableHeader[2].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#4F3C75">
          {name}
        </StyledH2>
      </StyledTableItem>

      <StyledTableItem
        className="last-item"
        width={tableHeader[3].size}
        display={tableHeader[3].display ? 'block' : 'none'}
        displayMd={tableHeader[3].displayMd ? 'block' : 'none'}
        displaySm={tableHeader[3].displaySm ? 'block' : 'none'}
      >
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#4F3C75">
          {time}
        </StyledSpan>
      </StyledTableItem>
    </StyledTableBody>
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
                {/* {expanded && tableExpand(lastName, phone)} */}
              </StyledCard>
            )
          )) ||
          (!loading && <NoDataComponent color="#4F3C75" />)}
      </TableComponent>
    </StyledContainer>
  )
}
