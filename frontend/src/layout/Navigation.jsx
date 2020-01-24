import React, { useState } from 'react'
import styled from 'styled-components'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import { LogoLarge } from '../components/LogoLarge'
import { LinkComponent } from '../components/LinkComponent'

export const Navigation = () => {
  const [selectMenu, setSelectMenu] = useState(false)

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

  const StyledMore = styled.div`
    z-index: 3;
    display: ${props => props.display};
    flex-direction: column;
    position: absolute;
    right: 0;
    top: 56px;
    min-width: 145px;
    background: #f0f2f0;
    border-radius: 5px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
    padding: 8px 0;

    &::before {
      content: '';
      position: absolute;
      top: -12px;
      width: 0;
      height: 0;
      right: 12px;
      border-bottom: 12px solid #f0f2f0;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
    }
    div {
      padding: 10px 18px;
      span {
        width: 100%;
        min-height: 22px;
        cursor: pointer;
        font-weight: 600;
      }
    }
  `

  return (
    <>
      <StyeledHeader>
        <div>
          <LogoLarge />
        </div>
        <div onClick={() => setSelectMenu(prev => !prev)}>
          <MoreVertIcon />
        </div>
      </StyeledHeader>
      <StyledMore display={selectMenu ? 'flex' : 'none'}>
        <LinkComponent to="/login">
          <span>LogOut</span>
        </LinkComponent>
      </StyledMore>
    </>
  )
}
