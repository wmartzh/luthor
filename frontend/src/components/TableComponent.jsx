import React, { useState } from 'react'
import styled from 'styled-components'

import ExpandMore from '@material-ui/icons/ExpandMore'

import { StyledSpacer } from '../styles/StyledSpacer'

import { StyledCard } from '../styles/StyledCard'
import { StyledSpan } from '../styles/StyledSpan'
import { StyledH2 } from '../styles/StyledH2'
import { StyledDataContent } from '../styles/StyledDataContent'

export const TableComponent = ({ tableItemsSizes, tableheader }) => {
  const [expanded, setExpanded] = useState(false)

  const StyledStatusCube = styled.div`
    width: 24px;
    height: 24px;
    background: ${props => props.background};
    border-radius: 7px;
  `

  const StyledTableItem = styled.div`
    min-width: ${props => (props.width ? props.width : '100%')};

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
    .last-item:last-child {
      position: absolute;
      right: 10px;
    }
  `

  const StyledTableItemExpand = styled.div`
    width: 100%;
    padding: 28px 0 0 ${props => props.paddingLerft};
    @media (min-width: 800px) {
      display: none;
    }
  `
  return (
    <>
      <StyledTableHeader>
        {tableheader.map(content => (
          <StyledTableItem
            key={content.title}
            width={content.size}
            display={content.display}
            displayMd={content.displayMd}
            displaySm={content.displaySm}
          >
            <StyledSpan
              fontFamily="Segoe UI"
              fontWeigth="600"
              color={content.color}
            >
              {content.title}
            </StyledSpan>
          </StyledTableItem>
        ))}
        <StyledTableItem
          className="last-item"
          width="24px"
          display="none"
          displayMd="block"
        ></StyledTableItem>
      </StyledTableHeader>

      {/* TODO: reduce the code when i have the data queries  */}
      <StyledSpacer height="20px" />
      <StyledCard width="100%" flexDirection="column" alignItems="start">
        <StyledTableBody>
          <StyledTableItem width={tableItemsSizes[0]}>
            <StyledStatusCube background="#F45953" />
          </StyledTableItem>
          <StyledTableItem width={tableItemsSizes[1]}>
            <StyledH2 fontWeigth="600" color="#4F3C75">
              Culto Despertino
            </StyledH2>
          </StyledTableItem>
          <StyledTableItem
            width={tableItemsSizes[2]}
            displayMd="none"
            displaySm="none"
          >
            <StyledH2 fontWeigth="600" color="#4F3C75">
              Paco Pedro de la mar
            </StyledH2>
          </StyledTableItem>
          <StyledTableItem width={tableItemsSizes[3]} displaySm="none">
            <StyledSpan fontFamily="Segoe UI" fontWeigth="600" color="#4F3C75">
              NOV 08 - 28
            </StyledSpan>
          </StyledTableItem>
          <StyledTableItem
            className="last-item"
            width={tableItemsSizes[4]}
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
        {/*  */}

        {/* FIXME: date responsive! */}
        {expanded && (
          <StyledTableItemExpand paddingLerft={tableItemsSizes[0]}>
            <StyledDataContent>
              <StyledSpan
                fontFamily="Segoe UI"
                fontWeigth="600"
                color="#B0A3CC"
              >
                Monitor
              </StyledSpan>
              <StyledH2 fontWeigth="600" color="#4F3C75">
                Paco Pedro de la mar
              </StyledH2>
              <StyledSpacer height="28px" />
              <StyledSpan
                fontFamily="Segoe UI"
                fontWeigth="600"
                color="#B0A3CC"
              >
                Date
              </StyledSpan>
              <StyledSpan
                fontFamily="Segoe UI"
                fontWeigth="600"
                color="#4F3C75"
              >
                NOV 08 - 28
              </StyledSpan>
            </StyledDataContent>
          </StyledTableItemExpand>
        )}
      </StyledCard>
    </>
  )
}
