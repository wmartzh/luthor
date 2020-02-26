import React from 'react'
import moment from 'moment'

import {
  StyledTableBody,
  StyledTableItem
} from '../../../components/TableComponent'
import { tableHeader } from './tableHeader'
import { StyledH2 } from '../../../styles/StyledH2'
import { ButtonComponent } from '../../../components/ButtonComponent'

export const tableContent = (
  { code, conclusion, reason, created, active },
  setDetailUser
) => (
  <StyledTableBody>
    <StyledTableItem
      width={tableHeader[0].size}
      display={tableHeader[0].display ? 'block' : 'none'}
      displayMd={tableHeader[0].displayMd ? 'block' : 'none'}
      displaySm={tableHeader[0].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#E0425D">
        {code}
      </StyledH2>
    </StyledTableItem>
    <StyledTableItem
      width={tableHeader[1].size}
      display={tableHeader[1].display ? 'block' : 'none'}
      displayMd={tableHeader[1].displayMd ? 'block' : 'none'}
      displaySm={tableHeader[1].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#E0425D">
        {reason}
      </StyledH2>
    </StyledTableItem>
    <StyledTableItem
      width={tableHeader[2].size}
      display={tableHeader[2].display ? 'block' : 'none'}
      displayMd={tableHeader[2].displayMd ? 'block' : 'none'}
      displaySm={tableHeader[2].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#E0425D">
        {moment(conclusion).format('DD/MMM/YYYY')}
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
        background="#E0425D"
        width="90px"
        height="40px"
        margin="0"
        disable={active === 0}
        click={() =>
          setDetailUser({
            code,
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
