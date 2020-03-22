import React, { useState, useEffect } from 'react'

import userPhoto from '../assets/img/person_image.jpg'
import { ButtonComponent } from '../components/ButtonComponent'
import { userStatusColor } from '../constants/statusColor'
import { StyledCard } from '../styles/StyledCard'
import { StyledSpacer } from '../styles/StyledSpacer'
import { StyledAvatar } from '../styles/StyledAvatar'
import { StyledStatusBar } from '../styles/StyledStatusBar'
// import { Navigation } from '../layout/Navigation'
import { StyledContainer } from '../styles/StyledContainer'
import { DashboardButtonsComponent } from '../components/DashboardButtonsComponent'
import { useUserValues } from '../context/UserContext'
import { statusService } from '../services/statusService'
import { StyledTypography } from '../styles/StyledTypography'
// import { useToastValues } from '../context/ToastContext'

export const Dashboard = () => {
  const { user, setUser } = useUserValues()
  // const { setToastDisplay, setToastMessage } = useToastValues()
  const { username, role, status, code } = user

  return (
    <StyledContainer>
      {/* <Navigation />
      <StyledSpacer height="54px" /> */}
      <StyledCard flexDirection="column" roundedTop width="340px">
        {role !== '5' && <StyledAvatar image={userPhoto} />}

        <StyledTypography
          fontSize="24px"
          fontWeigth="400"
          style={{ margin: '0 0 8px 0' }}
        >
          {username}
        </StyledTypography>
        {role !== '5' && (
          <StyledTypography fontSize="14px" fontWeigth="400" color="#919191">
            #{code}
          </StyledTypography>
        )}
        <StyledSpacer height="20px" />

        <DashboardButtonsComponent role={role} status={status} />

        <StyledSpacer height="40px" />
        <ButtonComponent
          // to="/settings"
          background="#F0F2F0"
          color="#000"
          width="300px"
          click={() => {
            console.log('h')
            // setToastDisplay(true)
            // setToastMessage('message!!')
          }}
        >
          Settings
        </ButtonComponent>
        <StyledSpacer height="10px" />
      </StyledCard>
      <StyledStatusBar
        background={userStatusColor(status)}
        width="340px"
        margin="auto"
        onClick={() => statusService(setUser)}
      />
    </StyledContainer>
  )
}
