import React from 'react'

import { Navigation } from '../layout/Navigation'
import { StyledSpacer } from '../styles/StyledSpacer'
import { StyledContainer } from '../styles/StyledContainer'
import { Dashboard } from './Dashboard'
import { DashboardAdmin } from './role.preceptor/DashboardAdmin'

export const MainPage = ({ user }) => {
  const { role } = user
  console.log(role)

  return (
    <StyledContainer>
      <Navigation />
      <StyledSpacer height="54px" />
      {role === '1' || role === '4' ? <Dashboard user={user} /> : null}
      {role === '3' && <DashboardAdmin user={user} />}
    </StyledContainer>
  )
}
