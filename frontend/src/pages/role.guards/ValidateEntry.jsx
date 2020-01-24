import React, { useState, useEffect } from 'react'

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
import { API_ROUTES } from '../../constants/apiRoutes'
import { requestService } from '../../services/requestService'
import { submitService } from '../../services/submitService'
import { StyledCard } from '../../styles/StyledCard'
import { StyledTypography } from '../../styles/StyledTypography'
import { LoadingComponent } from '../../components/LoadingComponent'

export const ValidateEntry = () => {
  const [permission, setPermission] = useState([])
  const [tempData, setTempData] = useState([])
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const requestData = () => {
    requestService(
      API_ROUTES.getPermission.method,
      API_ROUTES.getPermission.url,
      null,
      setTempData,
      setLoading
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
      console.log(newArray)
    }
  }, [tempData.normal, tempData.weekend])

  const tableheader = [
    {
      size: '110px',
      title: 'Code',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#B0A3CC'
    },
    {
      size: '440px',
      title: 'Name',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#B0A3CC'
    },
    {
      size: '100px',
      title: '',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#B0A3CC'
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
      { check_exit: 0, user_code: code }
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
        <StyledH2 fontWeigth="600" color="#4F3C75">
          {code}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[1].size}
        display={tableheader[1].display ? 'block' : 'none'}
        displayMd={tableheader[1].displayMd ? 'block' : 'none'}
        displaySm={tableheader[1].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#B0A3CC">
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
          background="#4F3C75"
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
        title="Validate Entry"
        titleColor="#4F3C75"
        tableheader={tableheader}
      >
        {loading && <LoadingComponent color="#4F3C75" />}
        {(permission.length === 0 &&
          permission.map(
            ({
              type,
              status,
              check_exit: check,
              user: { code, first_name: firstName, last_name: lastName }
            }) => {
              return check.toString() === '1' &&
                status !== 'deprecated' &&
                status !== 'rejected' ? (
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
          )) || (
          <StyledCard width="100%" flexDirection="column" alignItems="center">
            <StyledTypography
              fontSize="14px"
              fontFamily="Segoe UI"
              fontWeigth="600"
              color="#4F3C75"
            >
              No data
            </StyledTypography>
          </StyledCard>
        )}
      </TableComponent>
      {/* TODO: get user photo */}
      {expanded && <StyledCard>TODO Dialog</StyledCard>}
    </StyledContainer>
  )
}
