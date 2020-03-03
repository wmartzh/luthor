import React from 'react'
import {
  StyledTableItemExpand,
  StyledTableItem
} from '../../../components/TableComponent'
import { tableHeader } from './tableHeader'
import { StyledTypography } from '../../../styles/StyledTypography'

export const tableExpand = expanded =>
  expanded && (
    <StyledTableItemExpand
      paddingLerft={tableHeader[0].size}
      mediaExpand="block"
    >
      <StyledTableItem displayMd="none" displaySm="flex">
        <StyledTypography
          fontSize="14px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color="#B0A3CC"
        >
          Location
        </StyledTypography>
        <StyledTypography
          fontSize="16px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color="#4F3C75"
        >
          Automercado
        </StyledTypography>
      </StyledTableItem>
    </StyledTableItemExpand>
  )
