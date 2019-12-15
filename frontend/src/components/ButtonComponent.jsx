import React from 'react'
import styled from 'styled-components'
import { LinkComponent } from './LinkComponent'

export const ButtonComponent = ({
  children,
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
  return (
    <LinkComponent to={to}>
      <StyledButton background={background} color={color} width={width}>
        <span>{children}</span>
      </StyledButton>
    </LinkComponent>
  )
}
