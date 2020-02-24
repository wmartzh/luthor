import React from 'react'
import {
  StyledTableItemExpand,
  StyledTableItem
} from '../../../components/TableComponent'
import { tableHeaderNormal } from './tableHeaderNormal'
import { StyledSpan } from '../../../styles/StyledSpan'
import moment from 'moment'
import { StyledSpacer } from '../../../styles/StyledSpacer'

export const tableExpand = ({ date, out, entry }, expanded) =>
  expanded && (
    <StyledTableItemExpand paddingLerft={tableHeaderNormal[0].size}>
      <StyledTableItem
        width={tableHeaderNormal[3].size}
        displayMd="none"
        displaySm="flex"
      >
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#B0A3CC">
          {tableHeaderNormal[2].title}
        </StyledSpan>
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#4F3C75">
          {moment(date).format('DD-MMM-YYYY')}
        </StyledSpan>
      </StyledTableItem>

      <StyledSpacer height="28px" />
      <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#B0A3CC">
        Out
      </StyledSpan>
      <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#4F3C75">
        {out ? moment(out).format('DD-MMM-YYYY, h:mm:ss a') : '--'}
      </StyledSpan>

      <StyledSpacer height="28px" />
      <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#B0A3CC">
        Entry
      </StyledSpan>
      <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#4F3C75">
        {entry ? moment(entry).format('DD-MMM-YYYY, h:mm:ss a') : '--'}
      </StyledSpan>
    </StyledTableItemExpand>
  )
