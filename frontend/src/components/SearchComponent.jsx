import React from 'react'
import { StyledCard } from '../styles/StyledCard'

// TODO !!!!

export const SearchComponent = ({
  data: dataToSearch,
  search,
  children,
  result
}) => {
  const searchResult = item => {
    let result = dataToSearch.filter(data => {
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
                  status,
                  place,
                  date,
                  output_date_time,
                  entry_date_time
                )}
                {tableExpand(date, output_date_time, entry_date_time)}
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
  return searchResult
}
