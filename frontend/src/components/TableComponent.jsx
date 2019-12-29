import React from 'react'
import styled from 'styled-components'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { StyledCard } from '../styles/StyledCard'
import { StyledSpacer } from '../styles/StyledSpacer'
import { StyledH1 } from '../styles/StyledH1'
import { StyledBackButton } from '../styles/StyledBackButton'
import { LinkComponent } from './LinkComponent'
import { StyledTypography } from '../styles/StyledTypography'

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
  title,
  titleColor,
  subtitle,
  tableheader,
  tableContent,
  tableExpand
}) => {
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
  const StyledTableBody = styled.div`
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
          style={{ marginLeft: '40px', position: 'relative' }}
        >
          <StyledBackButton top="2.5px" left="-30px">
            <LinkComponent to="/">
              <ArrowBackIosIcon fontSize="small" />
            </LinkComponent>
          </StyledBackButton>
          {title}
        </StyledH1>
        {subtitle && (
          <StyledTypography fontSize="16px" color={titleColor}>
            {subtitle}
          </StyledTypography>
        )}
      </div>

      <StyledSpacer height="20px" />

      <StyledTableHeader>
        {tableheader.map(content => (
          <StyledTableItem
            key={content.title}
            width={content.size}
            display={content.display ? 'block' : 'none'}
            displayMd={content.displayMd ? 'block' : 'none'}
            displaySm={content.displaySm ? 'block' : 'none'}
          >
            <StyledTypography
              fontFamily="Segoe UI"
              fontSize="14px"
              fontWeigth="600"
              color={content.color}
            >
              {content.title}
            </StyledTypography>
          </StyledTableItem>
        ))}
        <StyledTableItem
          className="last-item"
          width="24px"
          display="none"
          displayMd="block"
        ></StyledTableItem>
      </StyledTableHeader>
      <StyledSpacer height="20px" />
      <StyledCard width="100%" flexDirection="column" alignItems="start">
        <StyledTableBody>{tableContent}</StyledTableBody>
        {tableExpand}
      </StyledCard>
    </>
  )
}
