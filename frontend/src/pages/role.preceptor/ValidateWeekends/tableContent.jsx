import React from 'react'
import {
  StyledTableBody,
  StyledTableItem
} from '../../../components/TableComponent'
import { tableHeader } from './tableHeader'
import { StyledH2 } from '../../../styles/StyledH2'
import { ButtonComponent } from '../../../components/ButtonComponent'
import { defaultColors } from '../../../constants/statusColor'

export const tableContent = (
  {
    code,
    state,
    location,
    vicerector,
    preceptor,
    entryDay,
    outDay,
    fristName,
    lastName
  },
  role,
  isValidated,
  setSelected
) => (
  <StyledTableBody>
    <StyledTableItem
      width={tableHeader(role)[0].size}
      display={tableHeader(role)[0].display ? 'block' : 'none'}
      displayMd={tableHeader(role)[0].displayMd ? 'block' : 'none'}
      displaySm={tableHeader(role)[0].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#A1C010">
        {state.charAt(0).toUpperCase() + state.slice(1)}
      </StyledH2>
    </StyledTableItem>
    <StyledTableItem
      width={tableHeader(role)[1].size}
      display={tableHeader(role)[1].display ? 'block' : 'none'}
      displayMd={tableHeader(role)[1].displayMd ? 'block' : 'none'}
      displaySm={tableHeader(role)[1].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#77B0C8">
        {fristName} {lastName}
      </StyledH2>
    </StyledTableItem>
    <StyledTableItem
      width={tableHeader(role)[2].size}
      display={tableHeader(role)[2].display ? 'block' : 'none'}
      displayMd={tableHeader(role)[2].displayMd ? 'block' : 'none'}
      displaySm={tableHeader(role)[2].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#77B0C8">
        {role === '4'
          ? `${vicerector.charAt(0).toUpperCase() + vicerector.slice(1)}`
          : `${preceptor.charAt(0).toUpperCase() + preceptor.slice(1)}`}
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
        background={
          isValidated(preceptor, vicerector) === 'Validated'
            ? defaultColors.yellow
            : defaultColors.green
        }
        width="100px"
        height="40px"
        margin="0"
        click={() =>
          setSelected({
            code,
            state,
            location,
            vicerector,
            preceptor,
            entryDay,
            outDay,
            fristName,
            lastName
          })
        }
      >
        {isValidated(preceptor, vicerector)}
      </ButtonComponent>
    </StyledTableItem>
  </StyledTableBody>
)
