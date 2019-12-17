import React from 'react'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { LinkComponent } from '../components/LinkComponent'

import { Navigation } from '../layout/Navigation'
import { StyledContainer } from '../styles/StyledContainer'
import { StyledH1 } from '../styles/StyledH1'
import { StyledSpacer } from '../styles/StyledSpacer'
import { StyledBackButton } from '../styles/StyledBackButton'
import { TableComponent } from '../components/TableComponent'

export const MyAssitance = () => {
  const tableItemsSizes = ['74px', '340px', '240px', '100px', '24px']
  const tableheader = [
    {
      size: '74px',
      title: 'Status',
      display: 'block',
      displayMd: 'block',
      displaySm: 'block',
      color: '#B0A3CC'
    },
    {
      size: '340px',
      title: 'Event',
      display: 'block',
      displayMd: 'block',
      displaySm: 'block',
      color: '#B0A3CC'
    },
    {
      size: '240px',
      title: 'Monitor',
      display: 'block',
      displayMd: 'none',
      displaySm: 'none',
      color: '#B0A3CC'
    },
    {
      size: '100px',
      title: 'Date',
      display: 'block',
      displayMd: 'block',
      displaySm: 'none',
      color: '#B0A3CC'
    }
  ]

  return (
    <StyledContainer>
      <Navigation />
      <StyledSpacer height="90px" />
      <StyledH1
        fontWeigth="700"
        color="#4F3C75"
        style={{ marginLeft: '40px', position: 'relative' }}
      >
        <StyledBackButton top="2.5px" left="-30px">
          <LinkComponent to="/">
            <ArrowBackIosIcon fontSize="small" />
          </LinkComponent>
        </StyledBackButton>
        My Assistance
      </StyledH1>

      <StyledSpacer height="20px" />

      <TableComponent
        tableItemsSizes={tableItemsSizes}
        tableheader={tableheader}
      />
    </StyledContainer>
  )
}
