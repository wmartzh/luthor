import React from 'react'

import userPhoto from '../assets/img/person_image.jpg'
import { ButtonComponent } from '../components/ButtonComponent'
import { userStatusColor } from '../constants/statusColor'
import { Navigation } from '../layout/Navigation'
import { StyledH1 } from '../styles/StyledH1'
import { StyledSpan } from '../styles/StyledSpan'
import { StyledCard } from '../styles/StyledCard'
import { StyledSpacer } from '../styles/StyledSpacer'
import { StyledAvatar } from '../styles/StyledAvatar'
import { StyledContainer } from '../styles/StyledContainer'
import { StyledStatusBar } from '../styles/StyledStatusBar'

export const Dashboard = ({ user }) => {
  const { username, role, status, code } = user

  return (
    <StyledContainer>
      <Navigation />
      <StyledSpacer height="54px" />
      <StyledCard flexDirection="column" roundedTop width="340px">
        <StyledAvatar image={userPhoto} />
        <StyledH1 style={{ margin: '0 0 8px 0' }}>{username}</StyledH1>
        <StyledSpan>{code}</StyledSpan>
        <StyledSpacer height="20px" />
        {/* Student View */}
        {role === '0' && (
          <>
            <ButtonComponent
              to="/get-permission"
              background="#12B6C6"
              width="300px"
            >
              Get Permission
            </ButtonComponent>
            <ButtonComponent
              to="/my-assistance"
              background="#4F3C75"
              width="300px"
            >
              My Assistance
            </ButtonComponent>
            <ButtonComponent
              to="/my-permissions"
              background="#FB7140"
              width="300px"
            >
              My Permissions
            </ButtonComponent>
          </>
        )}

        {/* Guard View */}

        {role === '4' && (
          <>
            <ButtonComponent
              to="/validate-permission"
              background="#12B6C6"
              width="300px"
            >
              Validate Permissions
            </ButtonComponent>
            <ButtonComponent
              to="/validate-entry"
              background="#4F3C75"
              width="300px"
            >
              Validate Entry
            </ButtonComponent>
            {/* TODO: */}
            {/* <ButtonComponent
              to="/my-permission"
              background="#1D7AA2"
              width="300px"
              disable
            >
              Status
            </ButtonComponent> */}
          </>
        )}

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
