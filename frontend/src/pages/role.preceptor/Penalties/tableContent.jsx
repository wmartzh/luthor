import React from 'react'
import moment from 'moment'

import { tableHeader } from './tableHeader'
import {
  StyledTableBody,
  StyledTableItem
} from '../../../components/TableComponent'
import { StyledH2 } from '../../../styles/StyledH2'
import { ButtonComponent } from '../../../components/ButtonComponent'

export const tableContent = (
  { code, firstName, lastName, conclusion, reason, created, active },
  role,
  setDetailUser
) => (
  <StyledTableBody>
    <StyledTableItem
      width={tableHeader(role)[0].size}
      display={tableHeader(role)[0].display ? 'block' : 'none'}
      displayMd={tableHeader(role)[0].displayMd ? 'block' : 'none'}
      displaySm={tableHeader(role)[0].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#E0425D">
        {code}
      </StyledH2>
    </StyledTableItem>
    <StyledTableItem
      width={tableHeader(role)[1].size}
      display={tableHeader(role)[1].display ? 'block' : 'none'}
      displayMd={tableHeader(role)[1].displayMd ? 'block' : 'none'}
      displaySm={tableHeader(role)[1].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#E0425D">
        {firstName} {lastName}
      </StyledH2>
    </StyledTableItem>
    <StyledTableItem
      width={tableHeader(role)[2].size}
      display={tableHeader(role)[2].display ? 'block' : 'none'}
      displayMd={tableHeader(role)[2].displayMd ? 'block' : 'none'}
      displaySm={tableHeader(role)[2].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#E0425D">
        {moment(conclusion).format('DD/MMM/YYYY')}
      </StyledH2>
    </StyledTableItem>
    <StyledTableItem
      className="last-item"
      width={tableHeader(role)[3].size}
      display={tableHeader(role)[3].display ? 'block' : 'none'}
      displayMd={tableHeader(role)[3].displayMd ? 'block' : 'none'}
      displaySm={tableHeader(role)[3].displaySm ? 'block' : 'none'}
    >
      <ButtonComponent
        background="#E0425D"
        width="90px"
        height="40px"
        margin="0"
        disable={active === 0}
        click={() =>
          setDetailUser({
            code,
            firstName,
            lastName,
            conclusion,
            reason,
            created
          })
        }
      >
        {active === 0 ? 'Deprecated' : 'More'}
      </ButtonComponent>
    </StyledTableItem>
  </StyledTableBody>
)
