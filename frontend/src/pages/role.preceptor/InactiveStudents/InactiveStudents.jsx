import React, { useState, useEffect } from 'react'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { TableComponent } from '../../../components/TableComponent'

import { API_ROUTES } from '../../../constants/apiRoutes'

import { StyledCard } from '../../../styles/StyledCard'
import { Navigation } from '../../../layout/Navigation'
import { StyledSpacer } from '../../../styles/StyledSpacer'
import { StyledContainer } from '../../../styles/StyledContainer'
import { requestService } from '../../../services/requestService'
import { NoDataComponent } from '../../../components/NoDataComponent'
import { LoadingComponent } from '../../../components/LoadingComponent'
import { StyledBackButton } from '../../../styles/StyledBackButton'
import { StyledTypography } from '../../../styles/StyledTypography'
import { TextLabelContent } from '../../../components/TextLabelContent'
import { tableHeader } from './tableHeader'
import { tableContent } from './tableContent'
import { tableExpand } from './tableExpand'
import { axios } from '../../../plugins/axios'
import { ButtonComponent } from '../../../components/ButtonComponent'

export const InactiveStudents = () => {
  const [expanded, setExpanded] = useState(false)
  const [students, setStudents] = useState([])
  const [selected, setSelected] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchData = () => {
    requestService(
      API_ROUTES.getFilter.method,
      API_ROUTES.getFilter.url + API_ROUTES.getFilter.params.inactives,
      setStudents,
      setLoading,
      setError
    )
  }

  useEffect(() => {
    fetchData()
    return () => {
      setStudents([])
      setLoading(false)
      setError(false)
    }
  }, [])

  const activateHandler = async code => {
    try {
      const response = await axios({
        method: API_ROUTES.updateStudentActive.method,
        url: API_ROUTES.updateStudentActive.url,
        data: { is_active: '1', code }
      })
      console.log(response)
      setSelected(false)
      fetchData()
    } catch (e) {
      console.log(e)
    }
  }

  const studentInfo = (
    <>
      <StyledSpacer height="90px" />
      <StyledCard flexDirection="column" width="400px">
        <StyledBackButton>
          <ArrowBackIosIcon
            onClick={() => {
              setSelected(false)
            }}
            fontSize="small"
            style={{ marginTop: '5px' }}
          />
        </StyledBackButton>
        <StyledTypography
          fontSize="24px"
          fontWeigth="600"
          fontFamily="Segoe UI"
          color="#007991"
          style={{ margin: '0 0 8px 0' }}
        >
          Details of {selected.firstName}
        </StyledTypography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            width: '100%'
          }}
        >
          <TextLabelContent
            label="Status:"
            content={selected.status}
            colorLabel="#007991"
          />

          <TextLabelContent
            label="Code:"
            content={selected.code}
            colorLabel="#007991"
          />

          <TextLabelContent
            label="Complete name:"
            content={`${selected.firstName} ${selected.lastName}`}
            colorLabel="#007991"
          />

          <TextLabelContent
            label="Phone Number:"
            content={selected.phone || 'none'}
            colorLabel="#007991"
          />
        </div>
        <StyledSpacer height="40px" />
        <ButtonComponent
          background="#007991"
          width="360px"
          height="40px"
          margin="0"
          click={() => activateHandler(selected.code)}
        >
          Active user
        </ButtonComponent>
      </StyledCard>
    </>
  )

  return (
    <StyledContainer>
      <Navigation />
      {!selected && (
        <TableComponent
          title="Inactive Students"
          titleColor="#007991"
          tableheader={tableHeader}
          subtitle={`Total: ${students.length}`}
        >
          {loading && <LoadingComponent color="#007991" />}
          {(students.length &&
            students.map(
              ({
                code,
                status,
                first_name: firstName,
                last_name: lastName,
                phone_number: phone
              }) => (
                <StyledCard
                  width="100%"
                  flexDirection="column"
                  alignItems="start"
                  margin="0 0 16px 0"
                  key={code}
                >
                  {tableContent(
                    { code, firstName, lastName, phone, status },
                    setSelected
                  )}
                  {expanded && tableExpand({ lastName, phone })}
                </StyledCard>
              )
            )) ||
            (!loading && <NoDataComponent color="#007991" />)}
        </TableComponent>
      )}
      {selected && studentInfo}
    </StyledContainer>
  )
}
