import React from 'react'
import {
  StyledTableBody,
  StyledTableItem
} from '../../../components/TableComponent'
import { tableHeader } from './tableHeader'
import { StyledSpan } from '../../../styles/StyledSpan'
import { StyledH2 } from '../../../styles/StyledH2'
import { ButtonComponent } from '../../../components/ButtonComponent'
import { userStatusColor } from '../../../constants/statusColor'

export const tableContent = (
  { code, firstName, lastName, phone, status },
  setSelected
) => (
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
        {code}
      </StyledSpan>
    </StyledTableItem>
    <StyledTableItem
      width={tableHeader[1].size}
      display={tableHeader[1].display ? 'block' : 'none'}
      displayMd={tableHeader[1].displayMd ? 'block' : 'none'}
      displaySm={tableHeader[1].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#4F3C75">
        {firstName} {lastName}
      </StyledH2>
    </StyledTableItem>
    <StyledTableItem
      width={tableHeader[2].size}
      display={tableHeader[2].display ? 'block' : 'none'}
      displayMd={tableHeader[2].displayMd ? 'block' : 'none'}
      displaySm={tableHeader[2].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#4F3C75">
        {phone || 'none'}
      </StyledH2>
    </StyledTableItem>

    <StyledTableItem
      className="last-item"
      width={tableHeader[3].size}
      display={tableHeader[3].display ? 'block' : 'none'}
      displayMd={tableHeader[3].displayMd ? 'block' : 'none'}
      displaySm={tableHeader[3].displaySm ? 'block' : 'none'}
    >
      <ButtonComponent
        background="#4F3C75"
        width="90px"
        height="40px"
        margin="0"
        click={() =>
          setSelected({
            status: `${status.charAt(0).toUpperCase() + status.slice(1)}`,
            code,
            firstName,
            lastName
          })
        }
      >
        More
      </ButtonComponent>
    </StyledTableItem>
  </StyledTableBody>
)
