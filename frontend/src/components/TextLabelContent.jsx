import React from 'react'
import { StyledSpacer } from '../styles/StyledSpacer'
import { StyledTypography } from '../styles/StyledTypography'

export const TextLabelContent = ({
  label,
  content,
  colorLabel,
  colorContent
}) => (
  <>
    <StyledSpacer height="20px" />
    <StyledTypography fontSize="14px" color={colorLabel}>
      {label}
    </StyledTypography>
    <StyledTypography fontSize="16px" color={colorContent}>
      {content}
    </StyledTypography>
  </>
)
