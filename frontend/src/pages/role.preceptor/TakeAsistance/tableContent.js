import React from 'react'
import {
  StyledTableBody,
  StyledTableItem
} from '../../../components/TableComponent'
import { tableHeader } from './tableHeader'
import { StyledH2 } from '../../../styles/StyledH2'
import { AssistanceButton } from '../../../components/AssistenceButton'

export const tableContent = (
  { code, firstName, lastName, phone, status },
  selectedEvent
) => (
  <StyledTableBody>
    <StyledTableItem
      width={tableHeader[0].size}
      display={tableHeader[0].display ? 'block' : 'none'}
      displayMd={tableHeader[0].displayMd ? 'block' : 'none'}
      displaySm={tableHeader[0].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#12B6C6">
        {code}
      </StyledH2>
    </StyledTableItem>
    <StyledTableItem
      width={tableHeader[1].size}
      display={tableHeader[1].display ? 'block' : 'none'}
      displayMd={tableHeader[1].displayMd ? 'block' : 'none'}
      displaySm={tableHeader[1].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#12B6C6">
        {firstName} {lastName}
      </StyledH2>
    </StyledTableItem>
    <StyledTableItem
      width={tableHeader[2].size}
      display={tableHeader[2].display ? 'block' : 'none'}
      displayMd={tableHeader[2].displayMd ? 'block' : 'none'}
      displaySm={tableHeader[2].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#12B6C6">
        {selectedEvent.title}
      </StyledH2>
    </StyledTableItem>
    <StyledTableItem
      className="last-item"
      width={tableHeader[3].size}
      display={tableHeader[3].display ? 'block' : 'none'}
      displayMd={tableHeader[3].displayMd ? 'block' : 'none'}
      displaySm={tableHeader[3].displaySm ? 'block' : 'none'}
    >
      <AssistanceButton code={code} event={selectedEvent.id} />
    </StyledTableItem>
  </StyledTableBody>
)
