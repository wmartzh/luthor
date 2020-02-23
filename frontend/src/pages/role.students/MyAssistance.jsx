import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { axios } from '../../plugins/axios'

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
import { StyledStatusCube } from '../../styles/StyledStatusCube'
import { assistanceStatusColor } from '../../constants/statusColor'
import { LoadingComponent } from '../../components/LoadingComponent'
import { NoDataComponent } from '../../components/NoDataComponent'
import { requestService } from '../../services/requestService'
import { getCurrentToken } from '../../helpers/getCurrentLocalStorage'

export const MyAssitance = () => {
  const [expanded, setExpanded] = useState(false)
  const [assistance, setAssistance] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // TODO: memory leak when the page is reloaded

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

  const tableheader = [
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

  const tableContent = (status, date, title, monitor, time) => (
    <StyledTableBody>
      <StyledTableItem
        width={tableheader[0].size}
        display={tableheader[0].display ? 'block' : 'none'}
        displayMd={tableheader[0].displayMd ? 'block' : 'none'}
        displaySm={tableheader[0].displaySm ? 'block' : 'none'}
      >
        <StyledStatusCube background={assistanceStatusColor(status)} />
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[1].size}
        display={tableheader[1].display ? 'block' : 'none'}
        displayMd={tableheader[1].displayMd ? 'block' : 'none'}
        displaySm={tableheader[1].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#A1C010">
          {title}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[2].size}
        display={tableheader[2].display ? 'block' : 'none'}
        displayMd={tableheader[2].displayMd ? 'block' : 'none'}
        displaySm={tableheader[2].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#A1C010">
          {monitor}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[3].size}
        display={tableheader[3].display ? 'block' : 'none'}
        displayMd={tableheader[3].displayMd ? 'block' : 'none'}
        displaySm={tableheader[3].displaySm ? 'block' : 'none'}
      >
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#A1C010">
          {moment(date).format('DD-MMM-YYYY')}, {time}
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

  const tableExpand = (date, monitor, time) =>
    expanded && (
      <StyledTableItemExpand paddingLerft={tableheader[0].size}>
        <StyledTableItem displayMd="none" displaySm="flex">
          <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#7ccc5b">
            {tableheader[3].title}
          </StyledSpan>
          <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#A1C010">
            {moment(date).format('DD-MMM-YYYY')}, {time}
          </StyledSpan>

          <StyledSpacer height="28px" />
        </StyledTableItem>
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#7ccc5b">
          {tableheader[2].title}
        </StyledSpan>
        <StyledH2 fontWeigth="600" color="#A1C010">
          {monitor}
        </StyledH2>
      </StyledTableItemExpand>
    )

  return (
    <StyledContainer>
      <Navigation />
      <TableComponent
        title="My Assistance"
        titleColor="#A1C010"
        tableheader={tableheader}
      >
        {loading && <LoadingComponent color="#A1C010" />}
        {/* TODO: fix no data! */}
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
      </TableComponent>
    </StyledContainer>
  )
}
