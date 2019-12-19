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
import { StyledStatusCube } from '../../styles/StyledStatusCube'

export const MyAssitance = () => {
  const [expanded, setExpanded] = useState(false)
  const tableItemsSizes = ['74px', '340px', '240px', '100px', '24px']

  const tableheader = [
    {
      size: '74px',
      title: 'Status',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#B0A3CC'
    },
    {
      size: '330px',
      title: 'Event',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#B0A3CC'
    },
    {
      size: '250px',
      title: 'Monitor',
      display: true,
      displayMd: false,
      displaySm: false,
      color: '#B0A3CC'
    },
    {
      size: '100px',
      title: 'Date',
      display: true,
      displayMd: true,
      displaySm: false,
      color: '#B0A3CC'
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
        <StyledStatusCube background="#F45953" />
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[1].size}
        display={tableheader[1].display ? 'block' : 'none'}
        displayMd={tableheader[1].displayMd ? 'block' : 'none'}
        displaySm={tableheader[1].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#4F3C75">
          Culto Despertino
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[2].size}
        display={tableheader[2].display ? 'block' : 'none'}
        displayMd={tableheader[2].displayMd ? 'block' : 'none'}
        displaySm={tableheader[2].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#4F3C75">
          Paco Pedro de la mar
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[3].size}
        display={tableheader[3].display ? 'block' : 'none'}
        displayMd={tableheader[3].displayMd ? 'block' : 'none'}
        displaySm={tableheader[3].displaySm ? 'block' : 'none'}
      >
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#4F3C75">
          NOV 08 - 28
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
      <StyledTableItem displayMd="none" displaySm="flex">
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#B0A3CC">
          {tableheader[3].title}
        </StyledSpan>
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#4F3C75">
          NOV 08 - 28
        </StyledSpan>

        <StyledSpacer height="28px" />
      </StyledTableItem>
      <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#B0A3CC">
        {tableheader[2].title}
      </StyledSpan>
      <StyledH2 fontWeigth="600" color="#4F3C75">
        Paco Pedro de la mar
      </StyledH2>
    </StyledTableItemExpand>
  )

  return (
    <StyledContainer>
      <Navigation />
      <TableComponent
        title="My Assistance"
        titleColor="#4F3C75"
        tableItemsSizes={tableItemsSizes}
        tableheader={tableheader}
        tableContent={tableContent}
        tableExpand={tableExpand}
      />
    </StyledContainer>
  )
}
