import React from 'react'
import moment from 'moment'

import ExpandMore from '@material-ui/icons/ExpandMore'

import {
  StyledTableBody,
  StyledTableItem
} from '../../../components/TableComponent'
import { tableHeader } from './tableHeader'
import { StyledStatusCube } from '../../../styles/StyledStatusCube'
import { assistanceStatusColor } from '../../../constants/statusColor'
import { StyledH2 } from '../../../styles/StyledH2'
import { StyledSpan } from '../../../styles/StyledSpan'

export const tableContent = (
  { status, date, title, monitor, time },
  setExpanded
) => (
  <StyledTableBody>
    <StyledTableItem
      width={tableHeader[0].size}
      display={tableHeader[0].display ? 'block' : 'none'}
      displayMd={tableHeader[0].displayMd ? 'block' : 'none'}
      displaySm={tableHeader[0].displaySm ? 'block' : 'none'}
    >
      <StyledStatusCube background={assistanceStatusColor(status)} />
    </StyledTableItem>
    <StyledTableItem
      width={tableHeader[1].size}
      display={tableHeader[1].display ? 'block' : 'none'}
      displayMd={tableHeader[1].displayMd ? 'block' : 'none'}
      displaySm={tableHeader[1].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#A1C010">
        {title}
      </StyledH2>
    </StyledTableItem>
    <StyledTableItem
      width={tableHeader[2].size}
      display={tableHeader[2].display ? 'block' : 'none'}
      displayMd={tableHeader[2].displayMd ? 'block' : 'none'}
      displaySm={tableHeader[2].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#A1C010">
        {monitor}
      </StyledH2>
    </StyledTableItem>
    <StyledTableItem
      width={tableHeader[3].size}
      display={tableHeader[3].display ? 'block' : 'none'}
      displayMd={tableHeader[3].displayMd ? 'block' : 'none'}
      displaySm={tableHeader[3].displaySm ? 'block' : 'none'}
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
