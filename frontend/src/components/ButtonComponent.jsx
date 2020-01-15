import React from 'react'
import styled from 'styled-components'
import { LinkComponent } from './LinkComponent'

export const ButtonComponent = ({
  children,
  disable,
  background,
  color = '#fff',
  width = '100%',
  height = '48px',
  margin = '10px',
  to = undefined,
  click
}) => {
  const StyledButton = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    background: ${props => props.background};
    border-radius: 5px;
    color: ${props => props.color};
    margin: ${props => props.margin};
    display: flex;
    align-items: center;
    cursor: pointer;
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
      height={height}
      margin={margin}
    >
      <span>{children}</span>
    </StyledButton>
  )

  return to !== undefined ? (
    disable ? (
      button
    ) : (
      <LinkComponent to={to}>{button}</LinkComponent>
    )
  ) : disable ? (
    button
  ) : (
    <div onClick={click}>{button}</div>
  )
}
