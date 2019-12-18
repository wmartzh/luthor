import React from 'react'

import userPhoto from '../assets/img/person_image.jpg'
import { statusColor } from '../constants/statusColor'
import { Navigation } from '../layout/Navigation'
import { StyledContainer } from '../styles/StyledContainer'
import { StyledSpacer } from '../styles/StyledSpacer'
import { StyledCard } from '../styles/StyledCard'
import { StyledAvatar } from '../styles/StyledAvatar'
import { StyledH1 } from '../styles/StyledH1'
import { StyledSpan } from '../styles/StyledSpan'
import { ButtonComponent } from '../components/ButtonComponent'
import { StyledStatusBar } from '../styles/StyledStatusBar'

export const Dashboard = () => {
  return (
    <StyledContainer>
      <Navigation />
      <StyledSpacer height="54px" />
      <StyledCard flexDirection="column" roundedTop width="340px">
        <StyledAvatar image={userPhoto} />
        <StyledH1 style={{ margin: '0 0 8px 0' }}>Sandra Wells</StyledH1>
        <StyledSpan>#202066</StyledSpan>
        <StyledSpacer height="20px" />
        <ButtonComponent
          to="/get-permission"
          background="#12B6C6"
          width="300px"
        >
          Get Permission
        </ButtonComponent>
        <ButtonComponent to="/my-assistance" background="#4F3C75" width="300px">
          My Assistance
        </ButtonComponent>
        <ButtonComponent
          to="/my-permissions"
          background="#1D7AA2"
          width="300px"
        >
          My Permissions
        </ButtonComponent>
        <StyledSpacer height="40px" />
        <ButtonComponent
          to="/settings"
          background="#F0F2F0"
          color="#000"
          width="300px"
        >
          Settings
        </ButtonComponent>
        <StyledSpacer height="10px" />
      </StyledCard>
      <StyledStatusBar
        background={statusColor.allow}
        width="340px"
        margin="auto"
      />
    </StyledContainer>
  )
}
