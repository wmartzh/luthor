import React from 'react'
import {
  StyledTableBody,
  StyledTableItem
} from '../../../components/TableComponent'
import { tableHeader } from './tableHeader'
import { StyledH2 } from '../../../styles/StyledH2'
import { ButtonComponent } from '../../../components/ButtonComponent'

export const tableContent = (
  { code, fristName, lastName, type },
  openDialog
) => (
  <StyledTableBody>
    <StyledTableItem
      width={tableHeader[0].size}
      display={tableHeader[0].display ? 'block' : 'none'}
      displayMd={tableHeader[0].displayMd ? 'block' : 'none'}
      displaySm={tableHeader[0].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#1D7AA2">
        {code}
      </StyledH2>
    </StyledTableItem>
    <StyledTableItem
      width={tableHeader[1].size}
      display={tableHeader[1].display ? 'block' : 'none'}
      displayMd={tableHeader[1].displayMd ? 'block' : 'none'}
      displaySm={tableHeader[1].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#77B0C8">
        {fristName} {lastName}
      </StyledH2>
    </StyledTableItem>
    <StyledTableItem
      className="last-item"
      width={tableHeader[2].size}
      display={tableHeader[2].display ? 'block' : 'none'}
      displayMd={tableHeader[2].displayMd ? 'block' : 'none'}
      displaySm={tableHeader[2].displaySm ? 'block' : 'none'}
    >
      <ButtonComponent
        background="#12B6C6"
        width="100px"
        height="40px"
        margin="0"
        click={() => openDialog(type, code)}
      >
        Validate
      </ButtonComponent>
    </StyledTableItem>
  </StyledTableBody>
)
