import React, { useState } from 'react'

import ExpandMore from '@material-ui/icons/ExpandMore'

import {
  TableComponent,
  StyledTableItem,
  StyledTableItemExpand
} from '../../components/TableComponent'

import { Navigation } from '../../layout/Navigation'
import { StyledH2 } from '../../styles/StyledH2'
import { StyledSpan } from '../../styles/StyledSpan'
import { StyledSpacer } from '../../styles/StyledSpacer'
import { StyledContainer } from '../../styles/StyledContainer'

export const MyPermissions = () => {
  const [expanded, setExpanded] = useState(false)

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

  const tableContent = (
    <>
      <StyledTableItem
        width={tableheader[0].size}
        display={tableheader[0].display ? 'block' : 'none'}
        displayMd={tableheader[0].displayMd ? 'block' : 'none'}
        displaySm={tableheader[0].displaySm ? 'block' : 'none'}
      >
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#ff9e7a">
          Normal
        </StyledSpan>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[1].size}
        display={tableheader[1].display ? 'block' : 'none'}
        displayMd={tableheader[1].displayMd ? 'block' : 'none'}
        displaySm={tableheader[1].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#FB7140">
          Culto Despertino
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[2].size}
        display={tableheader[2].display ? 'block' : 'none'}
        displayMd={tableheader[2].displayMd ? 'block' : 'none'}
        displaySm={tableheader[2].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#FB7140">
          NOV 08 - 2019
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[3].size}
        display={tableheader[3].display ? 'block' : 'none'}
        displayMd={tableheader[3].displayMd ? 'block' : 'none'}
        displaySm={tableheader[3].displaySm ? 'block' : 'none'}
      >
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#FB7140">
          4:00 pm / 6:00 pm
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
    </>
  )

  const tableExpand = expanded && (
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
          NOV 08 - 2019
        </StyledSpan>
        <StyledSpacer height="28px" />
      </StyledTableItem>

      <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#ff9e7a">
        {tableheader[3].title}
      </StyledSpan>
      <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#FB7140">
        4:00 pm / 6:00 pm
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
        tableContent={tableContent}
        tableExpand={tableExpand}
      />
    </StyledContainer>
  )
}
