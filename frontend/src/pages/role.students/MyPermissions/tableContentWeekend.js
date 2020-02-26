import React from 'react'
import moment from 'moment'

import ExpandMore from '@material-ui/icons/ExpandMore'

import {
  StyledTableBody,
  StyledTableItem
} from '../../../components/TableComponent'
import { tableheaderWeekend } from './tableheaderWeekend'
import { StyledSpan } from '../../../styles/StyledSpan'
import { StyledH2 } from '../../../styles/StyledH2'
import { StyledTypography } from '../../../styles/StyledTypography'
import { StyledSpacer } from '../../../styles/StyledSpacer'

export const tableContentWeekend = (
  { state, location, vicerector, preceptor, entryDay, outDay },
  setExpanded
) => (
  <StyledTableBody>
    <StyledTableItem
      width={tableheaderWeekend[0].size}
      display={tableheaderWeekend[0].display ? 'block' : 'none'}
      displayMd={tableheaderWeekend[0].displayMd ? 'block' : 'none'}
      displaySm={tableheaderWeekend[0].displaySm ? 'block' : 'none'}
    >
      <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#B0A3CC">
        {state.charAt(0).toUpperCase() + state.slice(1)}
      </StyledSpan>
    </StyledTableItem>
    <StyledTableItem
      width={tableheaderWeekend[1].size}
      display={tableheaderWeekend[1].display ? 'block' : 'none'}
      displayMd={tableheaderWeekend[1].displayMd ? 'block' : 'none'}
      displaySm={tableheaderWeekend[1].displaySm ? 'block' : 'none'}
    >
      <StyledH2 fontWeigth="600" color="#4F3C75">
        {location}
      </StyledH2>
    </StyledTableItem>
    <StyledTableItem
      width={tableheaderWeekend[2].size}
      display={tableheaderWeekend[2].display ? 'block' : 'none'}
      displayMd={tableheaderWeekend[2].displayMd ? 'block' : 'none'}
      displaySm={tableheaderWeekend[2].displaySm ? 'block' : 'none'}
    >
      <StyledTypography
        fontSize="14px"
        fontFamily="Segoe UI"
        fontWeigth="600"
        color="#4F3C75"
      >
        {`Preceptor: ${preceptor}`}
        <br />
        <StyledSpacer height="8px" />
        {`Vicerector ${vicerector}`}
      </StyledTypography>
    </StyledTableItem>
    <StyledTableItem
      width={tableheaderWeekend[3].size}
      display={tableheaderWeekend[3].display ? 'block' : 'none'}
      displayMd={tableheaderWeekend[3].displayMd ? 'block' : 'none'}
      displaySm={tableheaderWeekend[3].displaySm ? 'block' : 'none'}
    >
      <StyledTypography
        fontSize="14px"
        fontFamily="Segoe UI"
        fontWeigth="600"
        color="#4F3C75"
      >
        {`Out: ${outDay ? moment(outDay).format('DD-MMM-YYYY, H:mm a') : '--'}`}
        <br />
        <StyledSpacer height="8px" />
        {`Entry: ${
          entryDay ? moment(entryDay).format('DD-MMM-YYYY, H:mm a') : '--'
        }`}
      </StyledTypography>
    </StyledTableItem>
    <StyledTableItem
      className="last-item"
      width="24px"
      display="none"
      displayMd="block"
    >
      <ExpandMore
        fontSize="small"
        style={{ cursor: 'pointer' }}
        onClick={() => setExpanded(prev => !prev)}
      />
    </StyledTableItem>
  </StyledTableBody>
)
