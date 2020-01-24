import React from 'react'
import { StyledCard } from '../styles/StyledCard'
import { StyledTypography } from '../styles/StyledTypography'

export const NoDataComponent = ({ color }) => (
  <StyledCard width="100%" flexDirection="column" alignItems="center">
    <StyledTypography
      fontSize="14px"
      fontFamily="Segoe UI"
      fontWeigth="600"
      color={color}
    >
      No data
    </StyledTypography>
  </StyledCard>
)
