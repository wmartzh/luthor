import React, { useState, useEffect } from 'react'

import moment from 'moment'

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
import { API_ROUTES } from '../../constants/apiRoutes'
import { axios } from '../../plugins/axios'
import { StyledCard } from '../../styles/StyledCard'
import { StyledSpan } from '../../styles/StyledSpan'

export const Penalties = () => {
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [penalties, setPenalties] = useState([])
  const [weekends, setWeekends] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const request = await axios({
        method: API_ROUTES.getPenalties.method,
        url: API_ROUTES.getPenalties.url
      })
      if (request.status === 200) {
        setPenalties(request.data.data)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const tableheader = [
    {
      size: '160px',
      title: 'Code',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#FF719B'
    },
    {
      size: '320px',
      title: 'Name',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#FF719B'
    },
    {
      size: '120px',
      title: 'Type',
      display: true,
      displayMd: false,
      displaySm: false,
      color: '#FF719B'
    },
    {
      size: '100px',
      title: '',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#FF719B'
    }
  ]

  const tableContent = (code, firstName, created) => (
    <StyledTableBody>
      <StyledTableItem
        width={tableheader[0].size}
        display={tableheader[0].display ? 'block' : 'none'}
        displayMd={tableheader[0].displayMd ? 'block' : 'none'}
        displaySm={tableheader[0].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color={!weekends ? '#FF004C' : '#A1C010'}>
          {code}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[1].size}
        display={tableheader[1].display ? 'block' : 'none'}
        displayMd={tableheader[1].displayMd ? 'block' : 'none'}
        displaySm={tableheader[1].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color={!weekends ? '#FF004C' : '#A1C010'}>
          {firstName}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[2].size}
        display={tableheader[2].display ? 'block' : 'none'}
        displayMd={tableheader[2].displayMd ? 'block' : 'none'}
        displaySm={tableheader[2].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color={!weekends ? '#FF004C' : '#A1C010'}>
          {moment(created).format('DD/MMM/YYYY')}
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
          background={!weekends ? '#FF004C' : '#A1C010'}
          width="100px"
          height="40px"
          margin="0"
          click={() => setExpanded(prev => !prev)}
        >
          More
        </ButtonComponent>
      </StyledTableItem>
    </StyledTableBody>
  )

  const tableExpand = expanded && (
    <StyledTableItemExpand
      paddingLerft={tableheader[0].size}
      mediaExpand="block"
    >
      {/* TODO: add textfields to change penalty's type */}
      <StyledTableItem displayMd="none" displaySm="flex">
        <StyledTypography
          fontSize="14px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color="#FF719B"
        >
          Location
        </StyledTypography>
        <StyledTypography
          fontSize="16px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color={!weekends ? '#FF004C' : '#A1C010'}
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
        title="Penalties"
        subtitle="Total: 11"
        titleColor="#FF004C"
        tableheader={tableheader}
      >
        {loading && (
          <StyledCard width="100%" flexDirection="column" alignItems="center">
            <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#FF004C">
              Loading...
            </StyledSpan>
          </StyledCard>
        )}
        {(penalties &&
          penalties.map(({ user_code: code, active, created_at: created }) => (
            <StyledCard
              width="100%"
              flexDirection="column"
              alignItems="start"
              margin="0 0 16px 0"
              key={code}
            >
              {/* TODO: get the username */}
              {tableContent(code, active, created)}
              {/* {tableExpand(date, output_date_time, entry_date_time)} */}
            </StyledCard>
          ))) || (
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
