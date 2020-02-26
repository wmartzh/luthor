import React from 'react'
import moment from 'moment'

import ExpandMore from '@material-ui/icons/ExpandMore'

import {
  StyledTableBody,
  StyledTableItem
} from '../../../components/TableComponent'
import { tableHeaderNormal } from './tableHeaderNormal'
import { StyledSpan } from '../../../styles/StyledSpan'
import { StyledH2 } from '../../../styles/StyledH2'
import { StyledTypography } from '../../../styles/StyledTypography'

export const tableContent = (
  { status, place, date, out, entry },
  setExpanded
) => (
  <StyledTableBody>
    <StyledTableItem
      width={tableHeaderNormal[0].size}
      display={tableHeaderNormal[0].display ? 'block' : 'none'}
      displayMd={tableHeaderNormal[0].displayMd ? 'block' : 'none'}
      displaySm={tableHeaderNormal[0].displaySm ? 'block' : 'none'}
    >
      <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#B0A3CC">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </StyledSpan>
    </StyledTableItem>
    <StyledTableItem
      width={tableHeaderNormal[1].size}
      display={tableHeaderNormal[1].display ? 'block' : 'none'}
      displayMd={tableHeaderNormal[1].displayMd ? 'block' : 'none'}
      displaySm={tableHeaderNormal[1].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#4F3C75">
        {place}
      </StyledH2>
    </StyledTableItem>
    <StyledTableItem
      width={tableHeaderNormal[2].size}
      display={tableHeaderNormal[2].display ? 'block' : 'none'}
      displayMd={tableHeaderNormal[2].displayMd ? 'block' : 'none'}
      displaySm={tableHeaderNormal[2].displaySm ? 'block' : 'none'}
    >
      <StyledTypography
        fontSize="14px"
        fontFamily="Segoe UI"
        fontWeigth="600"
        color="#4F3C75"
      >
        {moment(date).format('DD-MMM-YYYY')}
      </StyledTypography>
    </StyledTableItem>
    <StyledTableItem
      width={tableHeaderNormal[3].size}
      display={tableHeaderNormal[3].display ? 'block' : 'none'}
      displayMd={tableHeaderNormal[3].displayMd ? 'block' : 'none'}
      displaySm={tableHeaderNormal[3].displaySm ? 'block' : 'none'}
    >
      <StyledTypography
        fontSize="14px"
        fontFamily="Segoe UI"
        fontWeigth="600"
        color="#4F3C75"
      >
        {`${out ? out.substr(0, out.length - 3) : '--'} / ${
          entry ? entry.substr(0, entry.length - 3) : '--'
        }`}
      </StyledTypography>
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
