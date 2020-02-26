import React, { useState } from 'react'

import { TableComponent } from '../../../components/TableComponent'
import { ButtonComponent } from '../../../components/ButtonComponent'
import { LoadingComponent } from '../../../components/LoadingComponent'
import { StyledTypography } from '../../../styles/StyledTypography'
import { StyledCard } from '../../../styles/StyledCard'
import { NoDataComponent } from '../../../components/NoDataComponent'

import { tableHeaderNormal } from './tableHeaderNormal'
import { tableheaderWeekend } from './tableheaderWeekend'
import { tableContent } from './tableContent'
import { tableExpand } from './tableExpand'
import { tableContentWeekend } from './tableContentWeekend'

export const MyPermissionTable = ({
  change,
  setChange,
  permission,
  weekends,
  loading,
  error
}) => {
  const [expanded, setExpanded] = useState(false)
  const [search, setSearch] = useState('')

  const searchResult = item => {
    let result = permission.filter(data => {
      return data[item].toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
    console.log(result)
    return result ? (
      <>
        {(result.length &&
          result.map(
            ({
              id,
              place,
              date,
              status,
              output_date_time,
              entry_date_time
            }) => (
              <StyledCard
                width="100%"
                flexDirection="column"
                alignItems="start"
                margin="0 0 16px 0"
                key={id}
              >
                {tableContent(
                  { status, place, date, output_date_time, entry_date_time },
                  setExpanded
                )}
                {tableExpand(
                  { date, output_date_time, entry_date_time },
                  expanded
                )}
              </StyledCard>
            )
          )) || (
          <StyledCard width="100%" flexDirection="column" alignItems="center">
            <StyledTypography
              fontSize="14px"
              fontFamily="Segoe UI"
              fontWeigth="600"
              color="#4F3C75"
            >
              No found
            </StyledTypography>
          </StyledCard>
        )}
      </>
    ) : (
      <StyledCard width="100%" flexDirection="column" alignItems="center">
        <StyledTypography
          fontSize="14px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color="#4F3C75"
        >
          Searching...
        </StyledTypography>
      </StyledCard>
    )
  }

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
                { status, place, date, output_date_time, entry_date_time },
                setExpanded
              )}
              {tableExpand(
                { date, output_date_time, entry_date_time },
                expanded
              )}
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
            </StyledCard>
          )
        )) ||
        (!loading && <NoDataComponent color="#4F3C75" />)}
    </>
  )

  return (
    <TableComponent
      title={`My ${change ? 'Weekends' : ''} Permissions`}
      search={setSearch}
      searchTitle="place"
      displaySearch={!change}
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
      tableheader={change ? tableheaderWeekend : tableHeaderNormal}
    >
      {search
        ? searchResult('place')
        : change
        ? weekendDisplayContent()
        : normalDisplayContent()}
      {/* {change ? weekendDisplayContent() : normalDisplayContent()} */}
    </TableComponent>
  )
}
