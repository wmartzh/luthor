import React from 'react'
import styled from 'styled-components'
import { StyledTypography } from '../styles/StyledTypography'
import { StyledImageContainer } from '../styles/StyledImageContainer'
import xIcon from '../assets/svg/x.svg'

export const ToastComponents = ({
  children,
  display,
  status = '#A1C010',
  closeColor = '#ff004c',
  ico = xIcon,
  size = 200
}) => {
  const statusSize = 10
  const btnSize = 40

  const StyledToast = styled.div`
    position: absolute;
    top: 20px;
    right: 28px;
    min-width: ${size}px;
    height: 60px;
    background: #fff;
    border-radius: 10px 5px 5px 10px;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048);
  `

  const StyledToastBtn = styled.div`
    position: absolute;
    right: 0;
    width: ${btnSize}px;
    height: 100%;
    background: #08b1c5;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background: ${closeColor};
      box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048);
    }
  `

  const StyledToastContent = styled.div`
    width: ${size - btnSize - statusSize}px;
    padding: 20px 12px;
    display: flex;
    align-items: center;
    justify-content: start;
  `

  const StyledToastStatus = styled.div`
    width: ${statusSize}px;
    height: 100%;
    background: ${status};
  `

  return (
    <StyledToast>
      <StyledToastStatus />
      <StyledToastContent>
        <StyledTypography fontSize="14px">{children}</StyledTypography>
      </StyledToastContent>
      <StyledToastBtn onClick={() => display(false)}>
        <StyledImageContainer
          image={ico}
          style={{ height: '1.1rem', width: '1.1rem' }}
        />
      </StyledToastBtn>
    </StyledToast>
  )
}
