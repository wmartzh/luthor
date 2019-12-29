import React from 'react'

import userPhoto from '../assets/img/person_image.jpg'
import { ButtonComponent } from '../components/ButtonComponent'
import { userStatusColor } from '../constants/statusColor'
import { StyledH1 } from '../styles/StyledH1'
import { StyledSpan } from '../styles/StyledSpan'
import { StyledCard } from '../styles/StyledCard'
import { StyledSpacer } from '../styles/StyledSpacer'
import { StyledAvatar } from '../styles/StyledAvatar'
import { StyledStatusBar } from '../styles/StyledStatusBar'
// import { Navigation } from '../layout/Navigation'
import { StyledContainer } from '../styles/StyledContainer'
import { DashboardButtonsComponent } from '../components/DashboardButtonsComponent'

export const Dashboard = ({ user }) => {
  const { username, role, status, code } = user

  return (
    <StyledContainer>
      {/* <Navigation />
      <StyledSpacer height="54px" /> */}
      <StyledCard flexDirection="column" roundedTop width="340px">
        <StyledAvatar image={userPhoto} />
        <StyledH1 style={{ margin: '0 0 8px 0' }}>{username}</StyledH1>
        <StyledSpan>{code}</StyledSpan>
        <StyledSpacer height="20px" />

        <DashboardButtonsComponent role={role} />

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
        background={userStatusColor(status)}
        width="340px"
        margin="auto"
      />
    </StyledContainer>
  )
}
