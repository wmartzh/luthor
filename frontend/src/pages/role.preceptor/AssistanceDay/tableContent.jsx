import React from 'react'
import {
  StyledTableBody,
  StyledTableItem
} from '../../../components/TableComponent'
import { tableHeader } from './tableHeader'
import { StyledSpan } from '../../../styles/StyledSpan'
import { userStatusColor } from '../../../constants/statusColor'
import { StyledH2 } from '../../../styles/StyledH2'

export const tableContent = ({ status, title, name, time }) => (
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
