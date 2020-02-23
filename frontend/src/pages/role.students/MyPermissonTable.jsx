import React, { useState } from 'react'
import moment from 'moment'

import ExpandMore from '@material-ui/icons/ExpandMore'

import {
  TableComponent,
  StyledTableItem,
  StyledTableItemExpand,
  StyledTableBody
} from '../../components/TableComponent'
import { ButtonComponent } from '../../components/ButtonComponent'
import { LoadingComponent } from '../../components/LoadingComponent'
import { StyledSpacer } from '../../styles/StyledSpacer'
import { StyledSpan } from '../../styles/StyledSpan'
import { StyledH2 } from '../../styles/StyledH2'
import { StyledTypography } from '../../styles/StyledTypography'
import { StyledCard } from '../../styles/StyledCard'
import { NoDataComponent } from '../../components/NoDataComponent'

export const MyPermissionTable = ({
  change,
  setChange,
  permission,
  weekends,
  loading,
  error
}) => {
  const [expanded, setExpanded] = useState(false)

  const tableheaderNormal = [
    {
      size: '100px',
      title: 'Type',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#B0A3CC'
    },
    {
      size: '300px',
      title: 'Place',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#B0A3CC'
    },
    {
      size: '140px',
      title: 'Date',
      display: true,
      displayMd: true,
      displaySm: false,
      color: '#B0A3CC'
    },
    {
      size: '220px',
      title: 'Out / Entry',
      display: true,
      displayMd: false,
      displaySm: false,
      color: '#B0A3CC'
    }
  ]

  const tableheaderWeekend = [
    {
      size: '100px',
      title: 'Type',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#B0A3CC'
    },
    {
      size: '260px',
      title: 'Place',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#B0A3CC'
    },
    {
      size: '180px',
      title: 'preceptor / vicerector',
      display: true,
      displayMd: true,
      displaySm: false,
      color: '#B0A3CC'
    },
    {
      size: '220px',
      title: 'Out / Entry',
      display: true,
      displayMd: false,
      displaySm: false,
      color: '#B0A3CC'
    }
  ]

  const tableContent = (status, place, date, out, entry) => (
    <StyledTableBody>
      <StyledTableItem
        width={tableheaderNormal[0].size}
        display={tableheaderNormal[0].display ? 'block' : 'none'}
        displayMd={tableheaderNormal[0].displayMd ? 'block' : 'none'}
        displaySm={tableheaderNormal[0].displaySm ? 'block' : 'none'}
      >
        <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#B0A3CC">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </StyledSpan>
      </StyledTableItem>
      <StyledTableItem
        width={tableheaderNormal[1].size}
        display={tableheaderNormal[1].display ? 'block' : 'none'}
        displayMd={tableheaderNormal[1].displayMd ? 'block' : 'none'}
        displaySm={tableheaderNormal[1].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#4F3C75">
          {place}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheaderNormal[2].size}
        display={tableheaderNormal[2].display ? 'block' : 'none'}
        displayMd={tableheaderNormal[2].displayMd ? 'block' : 'none'}
        displaySm={tableheaderNormal[2].displaySm ? 'block' : 'none'}
      >
        <StyledTypography
          fontSize="14px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color="#4F3C75"
        >
          {moment(date).format('DD-MMM-YYYY')}
        </StyledTypography>
      </StyledTableItem>
      <StyledTableItem
        width={tableheaderNormal[3].size}
        display={tableheaderNormal[3].display ? 'block' : 'none'}
        displayMd={tableheaderNormal[3].displayMd ? 'block' : 'none'}
        displaySm={tableheaderNormal[3].displaySm ? 'block' : 'none'}
      >
        <StyledTypography
          fontSize="14px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color="#4F3C75"
        >
          {`${out ? out.substr(0, out.length - 3) : '--'} / ${
            entry ? entry.substr(0, entry.length - 3) : '--'
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

  const tableExpand = (date, out, entry) =>
    expanded && (
      <StyledTableItemExpand paddingLerft={tableheaderNormal[0].size}>
        <StyledTableItem
          width={tableheaderNormal[3].size}
          displayMd="none"
          displaySm="flex"
        >
          <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#B0A3CC">
            {tableheaderNormal[2].title}
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

  const tableContentWeekend = (
    state,
    location,
    vicerector,
    preceptor,
    entryDay,
    outDay
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
          {`Out: ${
            outDay ? moment(outDay).format('DD-MMM-YYYY, H:mm a') : '--'
          }`}
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

  const normalDisplayContent = () => (
    <>
      {loading && <LoadingComponent color="#4F3C75" />}
      {(permission.length !== 0 &&
        permission.map(
          ({ id, place, date, status, output_date_time, entry_date_time }) => (
            <StyledCard
              width="100%"
              flexDirection="column"
              alignItems="start"
              margin="0 0 16px 0"
              key={id}
            >
              {tableContent(
                status,
                place,
                date,
                output_date_time,
                entry_date_time
              )}
              {tableExpand(date, output_date_time, entry_date_time)}
            </StyledCard>
          )
        )) ||
        (!loading && <NoDataComponent color="#4F3C75" />)}
    </>
  )

  const weekendDisplayContent = () => (
    <>
      {loading && <LoadingComponent color="#4F3C75" />}
      {(weekends.length !== 0 &&
        weekends.map(
          ({
            id,
            state,
            vicerector,
            preceptor,
            in_date_time: entryDay,
            out_date_time: outDay,
            location
          }) => (
            <StyledCard
              width="100%"
              flexDirection="column"
              alignItems="start"
              margin="0 0 16px 0"
              key={id}
            >
              {tableContentWeekend(
                state,
                location,
                vicerector,
                preceptor,
                entryDay,
                outDay
              )}
              {/* {tableExpandWeekend(date, output_date_time, entry_date_time)} */}
            </StyledCard>
          )
        )) ||
        (!loading && <NoDataComponent color="#4F3C75" />)}
    </>
  )

  return (
    <TableComponent
      title={`My ${change ? 'Weekends' : ''} Permissions`}
      subtitle={
        <>
          <ButtonComponent
            background="#4F3C75"
            color="#fff"
            width="100px"
            height="40px"
            margin="0"
            click={() => setChange(prev => !prev)}
          >
            {!change ? 'Weekends' : 'Normal'}
          </ButtonComponent>
        </>
      }
      titleColor="#4F3C75"
      tableheader={change ? tableheaderWeekend : tableheaderNormal}
    >
      {change ? weekendDisplayContent() : normalDisplayContent()}
    </TableComponent>
  )
}
