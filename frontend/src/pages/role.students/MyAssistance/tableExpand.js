import React from 'react'
import moment from 'moment'

import {
  StyledTableItemExpand,
  StyledTableItem
} from '../../../components/TableComponent'
import { tableHeader } from './tableHeader'
import { StyledSpan } from '../../../styles/StyledSpan'
import { StyledSpacer } from '../../../styles/StyledSpacer'
import { StyledH2 } from '../../../styles/StyledH2'

export const tableExpand = ({ date, monitor, time }, expanded) =>
  expanded && (
    <StyledTableItemExpand paddingLerft={tableHeader[0].size}>
      <StyledTableItem displayMd="none" displaySm="flex">
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#7ccc5b">
          {tableHeader[3].title}
        </StyledSpan>
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#A1C010">
          {moment(date).format('DD-MMM-YYYY')}, {time}
        </StyledSpan>

        <StyledSpacer height="28px" />
      </StyledTableItem>
      <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#7ccc5b">
        {tableHeader[2].title}
      </StyledSpan>
      <StyledH2 fontWeigth="600" color="#A1C010">
        {monitor}
      </StyledH2>
    </StyledTableItemExpand>
  )
