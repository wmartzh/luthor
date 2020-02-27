import React, { useState, useEffect, useCallback } from 'react'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { TableComponent } from '../../../components/TableComponent'

import { API_ROUTES } from '../../../constants/apiRoutes'

import { StyledCard } from '../../../styles/StyledCard'
import { Navigation } from '../../../layout/Navigation'
import { StyledSpacer } from '../../../styles/StyledSpacer'
import { StyledContainer } from '../../../styles/StyledContainer'
import { requestService } from '../../../services/requestService'
import { defaultColors } from '../../../constants/statusColor'
import { NoDataComponent } from '../../../components/NoDataComponent'
import { LoadingComponent } from '../../../components/LoadingComponent'
import { ButtonComponent } from '../../../components/ButtonComponent'
import { axios } from '../../../plugins/axios'
import { StyledBackButton } from '../../../styles/StyledBackButton'
import { StyledTypography } from '../../../styles/StyledTypography'
import { TextLabelContent } from '../../../components/TextLabelContent'
import { tableHeader } from './tableHeader'
import { tableContent } from './tableContent'
import { tableExpand } from './tableExpand'

export const StudentList = () => {
  const [blockAll, setBlockAll] = useState(false)

  const [search, setSearch] = useState('')

  const [expanded, setExpanded] = useState(false)
  const [students, setStudents] = useState([])
  const [selected, setSelected] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const test = useCallback(() => {
    let block = []
    let result
    students.map(student =>
      student['status'] === 'penalized' ? block.push(true) : block.push(false)
    )
    for (let i in block) {
      if (block[i] === true) {
        result = true
        break
      } else {
        result = false
        break
      }
    }
    return result
  }, [students])

  const fetchData = () => {
    requestService(
      API_ROUTES.getStudents.method,
      API_ROUTES.getStudents.url.base,
      setStudents,
      setLoading,
      setError
    )
  }

  // TODO:
  // const penalizedHandler = code => {
  //   try {
  //     const response = axios({
  //       method: API_ROUTES.penalizeUser.method,
  //       url: API_ROUTES.penalizeUser.url,
  //       data: {}
  //     })
  //     const { status } = response
  //     if (status === 201 || status === 200) {
  //     }
  //   } catch (err) {
  //     console.log(`student list Ln 76 = ${err}`)
  //   }
  // }

  useEffect(() => {
    fetchData()
    return () => {
      setStudents([])
      setLoading(false)
      setError(false)
    }
  }, [])

  useEffect(() => {
    setBlockAll(test())
    return () => {
      setBlockAll(false)
    }
  }, [test])

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
            // colorContent={
            //   selected.status === 'penalized'
            //     ? defaultColors.red
            //     : selected.status === 'in'
            //     ? '#007991'
            //     : defaultColors.green
            // }
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
        {/* TODO: */}
        {/* <StyledSpacer height="40px" /> */}
        {/* <ButtonComponent
          background={defaultColors.red}
          width="360px"
          height="40px"
          margin="0"
          click={() => penalizedHandler(selected.code)}
        >
          Penalize
        </ButtonComponent> */}
      </StyledCard>
    </>
  )

  const blockerHandler = async () => {
    try {
      await axios({
        method: API_ROUTES.blockAll.method,
        url: API_ROUTES.blockAll.url,
        data: { block: blockAll ? '0' : '1' }
      })
      // console.log(response)
      fetchData()
      // setBlockAll(test())
    } catch (err) {
      console.log(err)
    }
    setBlockAll(test())
  }

  const searchResult = () => {
    let result = students.filter(
      data =>
        data['first_name'].toLowerCase().indexOf(search.toLowerCase()) !== -1
    )
    return result ? (
      <>
        {(result.length &&
          result.map(
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
          )) || (
          <StyledCard width="100%" flexDirection="column" alignItems="center">
            <StyledTypography
              fontSize="14px"
              fontFamily="Segoe UI"
              fontWeigth="600"
              color="#4F3C75"
            >
              No found
            </StyledTypography>
          </StyledCard>
        )}
      </>
    ) : (
      <StyledCard width="100%" flexDirection="column" alignItems="center">
        <StyledTypography
          fontSize="14px"
          fontFamily="Segoe UI"
          fontWeigth="600"
          color="#4F3C75"
        >
          Searching...
        </StyledTypography>
      </StyledCard>
    )
  }

  const displayTable =
    (students.length &&
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
    (!loading && <NoDataComponent color="#007991" />)

  return (
    <StyledContainer>
      <Navigation />
      {!selected && (
        <TableComponent
          title="Students"
          titleColor="#007991"
          search={setSearch}
          searchTitle="name"
          tableheader={tableHeader}
          subtitle={
            <ButtonComponent
              background={blockAll ? defaultColors.green : defaultColors.red}
              color="#fff"
              width="90px"
              height="40px"
              margin="0"
              click={() => blockerHandler()}
            >
              {blockAll ? 'Unlock' : 'Block'}
            </ButtonComponent>
          }
        >
          {loading && <LoadingComponent color="#007991" />}
          {search.length === 0 ? displayTable : searchResult()}
        </TableComponent>
      )}
      {selected && studentInfo}
    </StyledContainer>
  )
}
