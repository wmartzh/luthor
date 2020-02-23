import React, { useState } from 'react'
import styled from 'styled-components'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import TextField from '@material-ui/core/es/TextField'

import searchIcon from '../assets/svg/search.svg'

import { StyledSpacer } from '../styles/StyledSpacer'
import { StyledH1 } from '../styles/StyledH1'
import { StyledBackButton } from '../styles/StyledBackButton'
import { LinkComponent } from './LinkComponent'
import { StyledTypography } from '../styles/StyledTypography'
import { StyledImageContainer } from '../styles/StyledImageContainer'

export const StyledTableItem = styled.div`
  min-width: ${props => (props.width ? props.width : '100%')};
  flex-direction: column;
  vertical-align: middle;

  @media (min-width: 800px) {
    display: ${props => (props.display ? props.display : 'block')};
  }
  @media (max-width: 840px) {
    display: ${props => (props.displayMd ? props.displayMd : 'block')};
  }
  @media (max-width: 690px) {
    display: ${props => (props.displaySm ? props.displaySm : 'block')};
  }
`

export const StyledTableBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  flex-direction: row;
  position: relative;
  align-items: center;
  .last-item:last-child {
    position: absolute;
    right: 10px;
  }
`

export const StyledTableItemExpand = styled.div`
  width: 100%;
  padding: 28px 0 0 ${props => props.paddingLerft};
  display: flex;
  flex-direction: column;
  @media (min-width: 800px) {
    display: ${props => (props.mediaExpand ? props.mediaExpand : 'none')};
  }
`

export const TableComponent = ({
  children,
  title,
  titleColor,
  subtitle,
  tableheader,
  tableContent,
  search,
  searchTitle = '',
  displaySearch: searchDisplay = true
}) => {
  const [displaySearch, setDisplaySearch] = useState(false)
  const StyledTableHeader = styled.div`
    display: flex;
    justify-content: start;
    flex-direction: row;
    padding: 0 20px;
    position: relative;
    .last-item:last-child {
      position: absolute;
      right: 10px;
    }
  `

  return (
    <>
      <StyledSpacer height="90px" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <StyledH1
          fontWeigth="700"
          color={titleColor}
          style={{ marginLeft: '40px', position: 'relative', display: 'flex' }}
        >
          <StyledBackButton top="2.5px" left="-30px">
            <LinkComponent to="/">
              <ArrowBackIosIcon fontSize="small" />
            </LinkComponent>
          </StyledBackButton>
          {title}
          <StyledSpacer width="12px" />
          {searchDisplay && (
            <StyledImageContainer
              image={searchIcon}
              height="1.4rem"
              width="1.4rem"
              style={{ marginTop: '8px', cursor: 'pointer' }}
              onClick={() => setDisplaySearch(prev => !prev)}
            />
          )}
        </StyledH1>
        {subtitle && (
          <StyledTypography fontSize="16px" color={titleColor}>
            {subtitle}
          </StyledTypography>
        )}
      </div>

      <StyledSpacer height="20px" />
      {/* <StyledCard> */}
      {displaySearch && (
        <TextField
          variant="outlined"
          margin="normal"
          name="search"
          label={`Search ${searchTitle}`}
          id="search"
          autoComplete="search"
          onChange={e => search(e.target.value)}
          fullWidth
        />
      )}
      {/* </StyledCard> */}
      <StyledSpacer height="20px" />

      <StyledTableHeader>
        {tableheader.map(
          ({ title, size, display, displayMd, displaySm, color }) => (
            <StyledTableItem
              key={title}
              width={size}
              display={display ? 'block' : 'none'}
              displayMd={displayMd ? 'block' : 'none'}
              displaySm={displaySm ? 'block' : 'none'}
            >
              <StyledTypography
                fontFamily="Segoe UI"
                fontSize="14px"
                fontWeigth="600"
                color={color}
              >
                {title}
              </StyledTypography>
            </StyledTableItem>
          )
        )}
        <StyledTableItem
          className="last-item"
          width="24px"
          display="none"
          displayMd="block"
        ></StyledTableItem>
      </StyledTableHeader>
      <StyledSpacer height="20px" />
      {children}
    </>
  )
}
