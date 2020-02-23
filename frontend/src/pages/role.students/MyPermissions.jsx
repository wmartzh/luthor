import React, { useState, useEffect } from 'react'

import { requestService } from '../../services/requestService'
import { API_ROUTES } from '../../constants/apiRoutes'

import { Navigation } from '../../layout/Navigation'
import { StyledContainer } from '../../styles/StyledContainer'
import { MyPermissionTable } from './MyPermissonTable'

export const MyPermissions = () => {
  const [change, setChange] = useState(false)

  const [normalPermission, setNormalPermission] = useState([])
  const [weekendsPermission, setWeekendsPermission] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // TODO: memory leak when the page is reloaded

  const fetchData = () => {
    requestService(
      API_ROUTES.getWeekends.method,
      API_ROUTES.getWeekends.url,
      setWeekendsPermission,
      setLoading,
      setError
    )
    requestService(
      API_ROUTES.getPermission.method,
      API_ROUTES.getPermission.url,
      setNormalPermission,
      setLoading,
      setError
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <StyledContainer>
      <Navigation />
      <MyPermissionTable
        change={change}
        setChange={setChange}
        permission={normalPermission}
        weekends={weekendsPermission}
        loading={loading}
        error={error}
      />
    </StyledContainer>
  )
}
