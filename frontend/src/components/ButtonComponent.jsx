import React from 'react'
import styled from 'styled-components'
import { LinkComponent } from './LinkComponent'

export const ButtonComponent = ({
  children,
  disable,
  background,
  color = '#fff',
  width = '100%',
  to
}) => {
  const StyledButton = styled.div`
    width: ${props => props.width};
    height: 48px;
    background: ${props => props.background};
    border-radius: 5px;
    color: ${props => props.color};
    margin: 10px;
    display: flex;
    align-items: center;
    span {
      font-size: 0.875rem;
      font-weight: 500;
      margin: auto;
    }
  `
  const button = (
    <StyledButton
      background={disable ? '#999' : background}
      color={disable ? '#333' : color}
      width={width}
    >
      <span>{children}</span>
    </StyledButton>
  )

  return disable ? button : <LinkComponent to={to}>{button}</LinkComponent>
}
