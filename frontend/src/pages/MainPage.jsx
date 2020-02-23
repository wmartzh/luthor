import React from 'react'

import { Navigation } from '../layout/Navigation'
import { StyledSpacer } from '../styles/StyledSpacer'
import { StyledContainer } from '../styles/StyledContainer'
import { Dashboard } from './Dashboard'
import { DashboardAdmin } from './role.preceptor/DashboardAdmin'
import { useUserValues } from '../context/UserContext'

export const MainPage = () => {
  const { user } = useUserValues()
  const { role } = user

  return (
    <StyledContainer>
      <Navigation />
      <StyledSpacer height="54px" />
      {role === '2' || role === '3' || role === '5' ? (
        <Dashboard user={user} />
      ) : null}
      {role === '4' || role === '6' ? <DashboardAdmin user={user} /> : null}
    </StyledContainer>
  )
}
