import React, { useState, useEffect } from 'react'

import { TableComponent } from '../../../components/TableComponent'

import { Navigation } from '../../../layout/Navigation'
import { StyledContainer } from '../../../styles/StyledContainer'
import { API_ROUTES } from '../../../constants/apiRoutes'
import { requestService } from '../../../services/requestService'
import { submitService } from '../../../services/submitService'
import { StyledCard } from '../../../styles/StyledCard'
import { LoadingComponent } from '../../../components/LoadingComponent'
import { NoDataComponent } from '../../../components/NoDataComponent'
import { tableHeader } from './tableHeader'
import { tableContent } from './tableContent'

export const ValidateEntry = () => {
  const [permission, setPermission] = useState([])
  const [tempData, setTempData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchData = () => {
    requestService(
      API_ROUTES.getPermission.method,
      API_ROUTES.getPermission.url,
      setTempData,
      setLoading,
      setError
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (tempData.normal && tempData.weekend) {
      const normal = tempData.normal.map(data => ({
        ...data,
        type: 'normal'
      }))
      const weekend = tempData.weekend.map(data => ({
        ...data,
        type: 'weekend'
      }))
      const newArray = [].concat(normal, weekend)
      setPermission(newArray)
    }
  }, [tempData.normal, tempData.weekend])

  const openDialog = (type, code) => {
    submitService(
      type === 'normal'
        ? API_ROUTES.updatePermission.method
        : API_ROUTES.updateWeekendsPermission.method,
      type === 'normal'
        ? API_ROUTES.updatePermission.url
        : API_ROUTES.updateWeekendsPermission.url,
      { check_exit: 0, user_code: code }
    )
    fetchData()
  }

  return (
    <StyledContainer>
      <Navigation />
      <TableComponent
        title="Validate Entry"
        titleColor="#4F3C75"
        tableheader={tableHeader}
      >
        {loading && <LoadingComponent color="#4F3C75" />}
        {(permission.length &&
          permission.map(
            ({
              type,
              status,
              state,
              check_exit: check,
              user: { code, first_name: firstName, last_name: lastName }
            }) => {
              return check.toString() === '1' &&
                state !== 'rejected' &&
                state !== 'deprecated' &&
                state !== 'in process' &&
                status !== 'deprecated' &&
                status !== 'rejected' ? (
                <StyledCard
                  width="100%"
                  flexDirection="column"
                  alignItems="start"
                  margin="0 0 16px 0"
                  key={code}
                >
                  {tableContent(
                    { code, firstName, lastName, type },
                    openDialog
                  )}
                </StyledCard>
              ) : null
            }
          )) ||
          (!loading && <NoDataComponent color="#4F3C75" />)}
      </TableComponent>
    </StyledContainer>
  )
}
