import React from 'react'
import { tableHeader } from './tableHeader'
import {
  StyledTableItemExpand,
  StyledTableItem
} from '../../../components/TableComponent'
import { StyledSpan } from '../../../styles/StyledSpan'
import { StyledSpacer } from '../../../styles/StyledSpacer'

export const tableExpand = ({ lastName, phone }) => (
  <StyledTableItemExpand paddingLerft={tableHeader[0].size}>
    <StyledTableItem
      width={tableHeader[3].size}
      displayMd="none"
      displaySm="flex"
    >
      <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#00A7CA">
        {tableHeader[2].title}
      </StyledSpan>
      <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#007991">
        {lastName}
      </StyledSpan>
      <StyledSpacer height="28px" />
    </StyledTableItem>

    <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#00A7CA">
      {tableHeader[3].title}
    </StyledSpan>
    <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#007991">
      {phone || 'none'}
    </StyledSpan>
  </StyledTableItemExpand>
)
