import React, { useState, useEffect } from 'react'
import ExpandMore from '@material-ui/icons/ExpandMore'

import {
  TableComponent,
  StyledTableItem,
  StyledTableItemExpand,
  StyledTableBody
} from '../../components/TableComponent'

import { API_ROUTES } from '../../constants/apiRoutes'

import { StyledH2 } from '../../styles/StyledH2'
import { StyledCard } from '../../styles/StyledCard'
import { StyledSpan } from '../../styles/StyledSpan'
import { Navigation } from '../../layout/Navigation'
import { StyledSpacer } from '../../styles/StyledSpacer'
import { StyledContainer } from '../../styles/StyledContainer'
import { requestService } from '../../services/requestService'
import { defaultColors } from '../../constants/statusColor'
import { NoDataComponent } from '../../components/NoDataComponent'
import { LoadingComponent } from '../../components/LoadingComponent'

export const StudentList = () => {
  const [expanded, setExpanded] = useState(false)
  const [students, setStudents] = useState([])
  const [selected, setSelected] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchData = () => {
    requestService(
      API_ROUTES.getStudents.method,
      API_ROUTES.getStudents.url.base,
      setStudents,
      setLoading,
      setError
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  const tableheader = [
    {
      size: '100px',
      title: 'Code',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#00A7CA'
    },
    {
      size: '240px',
      title: 'First Name',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#00A7CA'
    },
    {
      size: '260px',
      title: 'Last Name',
      display: true,
      displayMd: true,
      displaySm: false,
      color: '#00A7CA'
    },
    {
      size: '160px',
      title: 'Phone',
      display: true,
      displayMd: false,
      displaySm: false,
      color: '#00A7CA'
    }
  ]

  const statusColor = status =>
    status === 'in'
      ? defaultColors.primary
      : status === 'out'
      ? defaultColors.green
      : defaultColors.red

  const studentInfo = (
    <>
      <StyledSpacer height="90px" />
      <StyledCard style={{ cursor: 'pointer' }} onClick={() => setSelected('')}>
        User Details
        {selected.code}
      </StyledCard>
    </>
  )

  const tableContent = (code, firstName, lastName, phone, status) => (
    <StyledTableBody style={{ cursor: 'pointer' }}>
      <StyledTableItem
        width={tableheader[0].size}
        display={tableheader[0].display ? 'block' : 'none'}
        displayMd={tableheader[0].displayMd ? 'block' : 'none'}
        displaySm={tableheader[0].displaySm ? 'block' : 'none'}
        onClick={() =>
          setSelected({ code, firstName, lastName, phone, status })
        }
      >
        <StyledSpan
          fontFamily="Segoe UI"
          fontWeigth="600"
          color={statusColor(status)}
        >
          {code}
        </StyledSpan>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[1].size}
        display={tableheader[1].display ? 'block' : 'none'}
        displayMd={tableheader[1].displayMd ? 'block' : 'none'}
        displaySm={tableheader[1].displaySm ? 'block' : 'none'}
        onClick={() =>
          setSelected({ code, firstName, lastName, phone, status })
        }
      >
        <StyledH2 fontWeigth="600" color="#007991">
          {firstName}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[2].size}
        display={tableheader[2].display ? 'block' : 'none'}
        displayMd={tableheader[2].displayMd ? 'block' : 'none'}
        displaySm={tableheader[2].displaySm ? 'block' : 'none'}
        onClick={() =>
          setSelected({ code, firstName, lastName, phone, status })
        }
      >
        <StyledH2 fontWeigth="600" color="#007991">
          {lastName}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[3].size}
        display={tableheader[3].display ? 'block' : 'none'}
        displayMd={tableheader[3].displayMd ? 'block' : 'none'}
        displaySm={tableheader[3].displaySm ? 'block' : 'none'}
      >
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#007991">
          {phone || 'none'}
        </StyledSpan>
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

  const tableExpand = (lastName, phone) => (
    <StyledTableItemExpand paddingLerft={tableheader[0].size}>
      <StyledTableItem
        width={tableheader[3].size}
        displayMd="none"
        displaySm="flex"
      >
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#00A7CA">
          {tableheader[2].title}
        </StyledSpan>
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#007991">
          {lastName}
        </StyledSpan>
        <StyledSpacer height="28px" />
      </StyledTableItem>

      <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#00A7CA">
        {tableheader[3].title}
      </StyledSpan>
      <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#007991">
        {phone || 'none'}
      </StyledSpan>
    </StyledTableItemExpand>
  )

  return (
    <StyledContainer>
      <Navigation />
      {selected === '' && (
        <TableComponent
          title="Students"
          titleColor="#007991"
          tableheader={tableheader}
        >
          {loading && <LoadingComponent color="#007991" />}
          {(students &&
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
                  {expanded && tableExpand(lastName, phone)}
                </StyledCard>
              )
            )) ||
            (!loading && <NoDataComponent color="#007991" />)}
        </TableComponent>
      )}
      {selected && studentInfo}
    </StyledContainer>
  )
}
