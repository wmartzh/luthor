import React, { useState, useEffect } from 'react'

import moment from 'moment'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { Navigation } from '../../../layout/Navigation'
import { StyledContainer } from '../../../styles/StyledContainer'
import { TableComponent } from '../../../components/TableComponent'
import { ButtonComponent } from '../../../components/ButtonComponent'
import { API_ROUTES } from '../../../constants/apiRoutes'
import { axios } from '../../../plugins/axios'
import { StyledCard } from '../../../styles/StyledCard'
import { defaultColors } from '../../../constants/statusColor'
import { LoadingComponent } from '../../../components/LoadingComponent'
import { NoDataComponent } from '../../../components/NoDataComponent'
import { CreatePenaltiesForm } from '../CreatePenaltiesForm'
import { StyledSpacer } from '../../../styles/StyledSpacer'
import { StyledBackButton } from '../../../styles/StyledBackButton'
import { StyledTypography } from '../../../styles/StyledTypography'
import { TextLabelContent } from '../../../components/TextLabelContent'
import { useUserValues } from '../../../context/UserContext'
import { tableHeader } from './tableHeader'
import { tableContent } from './tableContent'

export const Penalties = () => {
  const { user } = useUserValues()
  const { role } = user

  const [search, setSearch] = useState('')

  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  const [detailUser, setDetailUser] = useState(false)

  const [loading, setLoading] = useState(false)
  const [penalties, setPenalties] = useState([])

  const fetchData = async () => {
    setLoading(true)
    const request = await axios({
      method: API_ROUTES.getPenaltiesActive.method,
      url: API_ROUTES.getPenaltiesActive.url
    })
    if (request.status === 200) {
      setPenalties(request.data.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const displayUserDetails = (
    <>
      <StyledSpacer height="90px" />
      <StyledCard flexDirection="column" width="400px">
        <StyledBackButton>
          <ArrowBackIosIcon
            onClick={() => {
              setDetailUser(false)
              setEdit(false)
            }}
            fontSize="small"
            style={{ marginTop: '5px' }}
          />
        </StyledBackButton>
        <StyledTypography
          fontSize="24px"
          fontWeigth="600"
          fontFamily="Segoe UI"
          color="#E0425D"
          style={{ margin: '0 0 8px 0' }}
        >
          Details of {detailUser.firstName}
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
            label="Code"
            content={detailUser.code}
            colorLabel="#E0425D"
          />

          <TextLabelContent
            label="Complete name:"
            content={`${detailUser.firstName} ${detailUser.lastName}`}
            colorLabel="#E0425D"
          />
          <TextLabelContent
            label="Reason:"
            content={detailUser.reason}
            colorLabel="#E0425D"
          />

          <TextLabelContent
            label="Penaltie end:"
            content={moment(detailUser.conclusion).format('DD/MMM/YYYY')}
            colorLabel="#E0425D"
          />

          <StyledSpacer height="10px" />
          <TextLabelContent
            label="Created:"
            content={moment(detailUser.created).format('DD/MMM/YYYY')}
            colorLabel="#E0425D"
          />

          <StyledSpacer height="40px" />
        </div>
        <ButtonComponent
          background="#A1C010"
          width="360px"
          height="40px"
          margin="0"
          click={() => {
            setCreate(true)
            setEdit(detailUser)
            setDetailUser(false)
          }}
          // disable={isActive}
        >
          Edit
        </ButtonComponent>
        <StyledSpacer height="20px" />
        {/* <ButtonComponent
          background={defaultColors.red}
          width="360px"
          height="40px"
          margin="0"
          click={() => deleteHandler('rejected')}
          // disable={isActive}
        >
          Disable
        </ButtonComponent> */}
      </StyledCard>
    </>
  )

  const searchResult = item => {
    let result = penalties.filter(data => {
      return (
        data['first_name'].toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
    })
    return result ? (
      <>
        {(result.length &&
          result.map(
            ({
              user: { code, first_name: firstName, last_name: lastName },
              active,
              conclusion,
              reason,
              created_at: created
            }) => (
              <StyledCard
                width="100%"
                flexDirection="column"
                alignItems="start"
                margin="0 0 16px 0"
                key={code}
              >
                {/* TODO: get the username */}
                {tableContent(
                  {
                    code,
                    firstName,
                    lastName,
                    conclusion,
                    reason,
                    created,
                    active
                  },
                  role,
                  setDetailUser
                )}
              </StyledCard>
            )
          )) ||
          (!loading && (
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
          ))}
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
    (penalties.length &&
      penalties.map(
        ({
          user: { code, first_name: firstName, last_name: lastName },
          active,
          conclusion,
          reason,
          created_at: created
        }) => (
          <StyledCard
            width="100%"
            flexDirection="column"
            alignItems="start"
            margin="0 0 16px 0"
            key={code}
          >
            {/* TODO: get the username */}
            {tableContent(
              {
                code,
                firstName,
                lastName,
                conclusion,
                reason,
                created,
                active
              },
              role,
              setDetailUser
            )}
          </StyledCard>
        )
      )) ||
    (!loading && <NoDataComponent color="#E0425D" />)

  return (
    <StyledContainer>
      <Navigation />
      {!detailUser && !create && (
        <TableComponent
          title="Penalties"
          subtitle={
            role === '4' || role === '6' ? (
              <ButtonComponent
                background={defaultColors.green}
                color="#fff"
                width="90px"
                height="40px"
                margin="0"
                click={() => setCreate(prev => !prev)}
              >
                Create
              </ButtonComponent>
            ) : (
              `Total: ${penalties.length}`
            )
          }
          titleColor="#E0425D"
          search={setSearch}
          searchTitle="assistance"
          tableheader={tableHeader(role)}
        >
          {loading && <LoadingComponent color="#E0425D" />}
          {search.length === 0 ? displayTable : searchResult('event')}
        </TableComponent>
      )}
      {create && (
        <CreatePenaltiesForm
          display={setCreate}
          edit={edit}
          fetchExternData={fetchData}
        />
      )}
      {detailUser && displayUserDetails}
    </StyledContainer>
  )
}
