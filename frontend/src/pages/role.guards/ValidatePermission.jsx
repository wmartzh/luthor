import React, { useState, useEffect } from 'react'
import moment from 'moment'

import ExpandMore from '@material-ui/icons/ExpandMore'

import {
  TableComponent,
  StyledTableItem,
  StyledTableBody
} from '../../components/TableComponent'

import { Navigation } from '../../layout/Navigation'
import { StyledH2 } from '../../styles/StyledH2'
import { StyledContainer } from '../../styles/StyledContainer'
import { ButtonComponent } from '../../components/ButtonComponent'
import { requestService } from '../../services/requestService'
import { API_ROUTES } from '../../constants/apiRoutes'
import { StyledCard } from '../../styles/StyledCard'
import { submitService } from '../../services/submitService'
import { LoadingComponent } from '../../components/LoadingComponent'
import { NoDataComponent } from '../../components/NoDataComponent'

export const ValidatePermission = () => {
  const [permission, setPermission] = useState([])
  const [tempData, setTempData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState(false)

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

  const tableheader = [
    {
      size: '110px',
      title: 'Code',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#77B0C8'
    },
    {
      size: '440px',
      title: 'Name',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#77B0C8'
    },
    {
      size: '100px',
      title: '',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#77B0C8'
    }
  ]

  const openDialog = (type, code) => {
    // setExpanded(true)
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

  const tableContent = (code, fristName, lastName, type) => (
    <StyledTableBody>
      <StyledTableItem
        width={tableheader[0].size}
        display={tableheader[0].display ? 'block' : 'none'}
        displayMd={tableheader[0].displayMd ? 'block' : 'none'}
        displaySm={tableheader[0].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#1D7AA2">
          {code}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[1].size}
        display={tableheader[1].display ? 'block' : 'none'}
        displayMd={tableheader[1].displayMd ? 'block' : 'none'}
        displaySm={tableheader[1].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#77B0C8">
          {fristName} {lastName}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        className="last-item"
        width={tableheader[2].size}
        display={tableheader[2].display ? 'block' : 'none'}
        displayMd={tableheader[2].displayMd ? 'block' : 'none'}
        displaySm={tableheader[2].displaySm ? 'block' : 'none'}
      >
        <ButtonComponent
          background="#12B6C6"
          width="100px"
          height="40px"
          margin="0"
          click={() => openDialog(type, code)}
        >
          Validate
        </ButtonComponent>
      </StyledTableItem>
    </StyledTableBody>
  )

  return (
    <StyledContainer>
      <Navigation />
      <TableComponent
        title="Validate Permissions"
        titleColor="#1D7AA2"
        tableheader={tableheader}
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
                  {tableContent(code, firstName, lastName, type)}
                </StyledCard>
              ) : null
            }
          )) ||
          (!loading && <NoDataComponent color="#1D7AA2" />)}
      </TableComponent>
      {/* TODO: get user photo */}
      {expanded && <StyledCard>TODO Dialog</StyledCard>}
    </StyledContainer>
  )
}
