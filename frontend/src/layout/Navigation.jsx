import React from 'react'
import styled from 'styled-components'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import { LogoLarge } from '../components/LogoLarge'

export const Navigation = () => {
  const StyeledHeader = styled.header`
    width: 100%;
    height: 66px;
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    div {
      background: #fff;
      border-radius: 5px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
    }
    div:first-child {
      width: 100%;
      height: 100%;
      margin-right: 20px;
      svg {
        margin: 5px 0 5px 12px;
      }
    }
    div:last-child {
      width: 50px;
      height: 100%;
      svg {
        margin: 21px 12px 21px 12px;
        cursor: pointer;
      }
    }
  `

  return (
    <StyeledHeader>
      <div>
        <LogoLarge />
      </div>
      <div>
        <MoreVertIcon />
      </div>
    </StyeledHeader>
  )
}
