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

export const MyPermissions = () => {
  const [expanded, setExpanded] = useState(false)
  const [permission, setPermission] = useState([])

  // TODO: create a loading component

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios({
        method: 'GET',
        url: API_ROUTES.getPermission
      })
      if (request.status === 200) {
        setPermission(request.data.data)
      }
    }
    fetchData()
  }, [])

  const tableheader = [
    {
      size: '100px',
      title: 'Type',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#ff9e7a'
    },
    {
      size: '300px',
      title: 'Place',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#ff9e7a'
    },
    {
      size: '180px',
      title: 'Date',
      display: true,
      displayMd: true,
      displaySm: false,
      color: '#ff9e7a'
    },
    {
      size: '180px',
      title: 'Out / Entry',
      display: true,
      displayMd: false,
      displaySm: false,
      color: '#ff9e7a'
    }
  ]

  const tableContent = (status, place, date, out, entry) => (
    <StyledTableBody>
      <StyledTableItem
        width={tableheader[0].size}
        display={tableheader[0].display ? 'block' : 'none'}
        displayMd={tableheader[0].displayMd ? 'block' : 'none'}
        displaySm={tableheader[0].displaySm ? 'block' : 'none'}
      >
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#ff9e7a">
          {status}
        </StyledSpan>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[1].size}
        display={tableheader[1].display ? 'block' : 'none'}
        displayMd={tableheader[1].displayMd ? 'block' : 'none'}
        displaySm={tableheader[1].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#FB7140">
          {place}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[2].size}
        display={tableheader[2].display ? 'block' : 'none'}
        displayMd={tableheader[2].displayMd ? 'block' : 'none'}
        displaySm={tableheader[2].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#FB7140">
          {moment(date).format('DD-MMM-YYYY')}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[3].size}
        display={tableheader[3].display ? 'block' : 'none'}
        displayMd={tableheader[3].displayMd ? 'block' : 'none'}
        displaySm={tableheader[3].displaySm ? 'block' : 'none'}
      >
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#FB7140">
          {`${out ? moment(out).format('DD-MMM-YYYY') : '--'} / ${
            entry ? moment(entry).format('DD-MMM-YYYY') : '--'
          }`}
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

  const tableExpand = (date, out, entry) =>
    expanded && (
      <StyledTableItemExpand paddingLerft={tableheader[0].size}>
        <StyledTableItem
          width={tableheader[3].size}
          displayMd="none"
          displaySm="flex"
        >
          <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#ff9e7a">
            {tableheader[2].title}
          </StyledSpan>
          <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#FB7140">
            {moment(date).format('DD-MMM-YYYY')}
          </StyledSpan>
          <StyledSpacer height="28px" />
        </StyledTableItem>

        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#ff9e7a">
          {tableheader[3].title}
        </StyledSpan>
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#FB7140">
          {`${out ? moment(out).format('DD-MMM-YYYY') : '--'} / ${
            entry ? moment(entry).format('DD-MMM-YYYY') : '--'
          }`}
        </StyledSpan>
      </StyledTableItemExpand>
    )

  return (
    <StyledContainer>
      <Navigation />
      <TableComponent
        title="My Permissions"
        titleColor="#FB7140"
        tableheader={tableheader}
      >
        {(permission &&
          permission.map(
            ({
              id,
              place,
              date,
              status,
              output_date_time,
              entry_date_time
            }) => (
              <StyledCard
                width="100%"
                flexDirection="column"
                alignItems="start"
                margin="0 0 16px 0"
                key={id}
              >
                {tableContent(
                  status,
                  place,
                  date,
                  output_date_time,
                  entry_date_time
                )}
                {tableExpand(date, output_date_time, entry_date_time)}
              </StyledCard>
            )
          )) || (
          <StyledCard width="100%" flexDirection="column" alignItems="center">
            <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#FB7140">
              No data
            </StyledSpan>
          </StyledCard>
        )}
      </TableComponent>
    </StyledContainer>
  )
}
