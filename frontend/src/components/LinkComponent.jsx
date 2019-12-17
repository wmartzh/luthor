import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const LinkComponent = ({ children, to, color = '#000' }) => {
  const StyledLink = styled.div`
    a {
      color: ${color};
      text-decoration: none;
    }
  `
  return (
    <StyledLink>
      <Link to={to}>{children}</Link>
    </StyledLink>
  )
}
