import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { TableComponent } from '../../../components/TableComponent'

import { Navigation } from '../../../layout/Navigation'
import { StyledContainer } from '../../../styles/StyledContainer'
import { requestService } from '../../../services/requestService'
import { API_ROUTES } from '../../../constants/apiRoutes'
import { StyledCard } from '../../../styles/StyledCard'
import { submitService } from '../../../services/submitService'
import { LoadingComponent } from '../../../components/LoadingComponent'
import { NoDataComponent } from '../../../components/NoDataComponent'
import { tableHeader } from './tableHeader'
import { tableContent } from './tableContent'

export const ValidatePermission = () => {
  const [permission, setPermission] = useState([])
  const [tempData, setTempData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const requestData = () => {
    requestService(
      API_ROUTES.getPermission.method,
      API_ROUTES.getPermission.url,
      setTempData,
      setLoading,
      setError
    )
  }

  useEffect(() => {
    requestData()
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
      {
        check_exit: 1,
        user_code: code,
        output_date_time: moment().format('YYYY/MM/DD H:mm:ss')
      }
    )
    requestData()
  }

  return (
    <StyledContainer>
      <Navigation />
      <TableComponent
        title="Validate Permissions"
        titleColor="#1D7AA2"
        tableheader={tableHeader}
      >
        {loading && <LoadingComponent color="#1D7AA2" />}
        {(permission.length &&
          permission.map(
            ({
              type,
              status,
              state,
              check_exit: check,
              user: { code, first_name: firstName, last_name: lastName }
            }) => {
              return check.toString() === '0' &&
                state !== 'rejected' &&
                state !== 'deprecated' &&
                state !== 'in process' &&
                status !== 'deprecated' ? (
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
          (!loading && <NoDataComponent color="#1D7AA2" />)}
      </TableComponent>
    </StyledContainer>
  )
}
