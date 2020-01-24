import React from 'react'
import { StyledTypography } from '../styles/StyledTypography'
import { StyledCard } from '../styles/StyledCard'

export const LoadingComponent = ({ color }) => (
  <StyledCard width="100%" flexDirection="column" alignItems="center">
    <StyledTypography
      fontSize="14px"
      fontFamily="Segoe UI"
      fontWeigth="600"
      color={color}
    >
      Loading...
    </StyledTypography>
  </StyledCard>
)
