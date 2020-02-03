import React, { useState, useEffect } from 'react'

import moment from 'moment'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { Navigation } from '../../layout/Navigation'
import { StyledContainer } from '../../styles/StyledContainer'
import {
  StyledTableItem,
  TableComponent,
  StyledTableBody
} from '../../components/TableComponent'
import { StyledH2 } from '../../styles/StyledH2'
import { ButtonComponent } from '../../components/ButtonComponent'
import { API_ROUTES } from '../../constants/apiRoutes'
import { axios } from '../../plugins/axios'
import { StyledCard } from '../../styles/StyledCard'
import { defaultColors } from '../../constants/statusColor'
import { LoadingComponent } from '../../components/LoadingComponent'
import { NoDataComponent } from '../../components/NoDataComponent'
import { CreatePenaltiesForm } from './CreatePenaltiesForm'
import { StyledSpacer } from '../../styles/StyledSpacer'
import { StyledBackButton } from '../../styles/StyledBackButton'
import { StyledTypography } from '../../styles/StyledTypography'
import { TextLabelContent } from '../../components/TextLabelContent'

export const Penalties = () => {
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  const [detailUser, setDetailUser] = useState(false)

  const [loading, setLoading] = useState(false)
  const [penalties, setPenalties] = useState([])
  const [weekends, setWeekends] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    const request = await axios({
      method: API_ROUTES.getPenalties.method,
      url: API_ROUTES.getPenalties.url
    })
    if (request.status === 200) {
      setPenalties(request.data.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const tableheader = [
    {
      size: '160px',
      title: 'Code',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#FF719B'
    },
    {
      size: '320px',
      title: 'Name',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#FF719B'
    },
    {
      size: '120px',
      title: 'End',
      display: true,
      displayMd: false,
      displaySm: false,
      color: '#FF719B'
    },
    {
      size: '100px',
      title: '',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#FF719B'
    }
  ]

  const tableContent = (
    code,
    firstName,
    lastName,
    conclusion,
    reason,
    created
  ) => (
    <StyledTableBody>
      <StyledTableItem
        width={tableheader[0].size}
        display={tableheader[0].display ? 'block' : 'none'}
        displayMd={tableheader[0].displayMd ? 'block' : 'none'}
        displaySm={tableheader[0].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color={!weekends ? '#FF004C' : '#A1C010'}>
          {code}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[1].size}
        display={tableheader[1].display ? 'block' : 'none'}
        displayMd={tableheader[1].displayMd ? 'block' : 'none'}
        displaySm={tableheader[1].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color={!weekends ? '#FF004C' : '#A1C010'}>
          {firstName} {lastName}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        width={tableheader[2].size}
        display={tableheader[2].display ? 'block' : 'none'}
        displayMd={tableheader[2].displayMd ? 'block' : 'none'}
        displaySm={tableheader[2].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color={!weekends ? '#FF004C' : '#A1C010'}>
          {moment(conclusion).format('DD/MMM/YYYY')}
        </StyledH2>
      </StyledTableItem>
      <StyledTableItem
        className="last-item"
        width={tableheader[3].size}
        display={tableheader[3].display ? 'block' : 'none'}
        displayMd={tableheader[3].displayMd ? 'block' : 'none'}
        displaySm={tableheader[3].displaySm ? 'block' : 'none'}
      >
        <ButtonComponent
          background={!weekends ? '#FF004C' : '#A1C010'}
          width="90px"
          height="40px"
          margin="0"
          click={() =>
            setDetailUser({
              code,
              firstName,
              lastName,
              conclusion,
              reason,
              created
            })
          }
        >
          More
        </ButtonComponent>
      </StyledTableItem>
    </StyledTableBody>
  )

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
          color="#FF004C"
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
            colorLabel="#FF004C"
          />

          <TextLabelContent
            label="Complete name:"
            content={`${detailUser.firstName} ${detailUser.lastName}`}
            colorLabel="#FF004C"
          />
          <TextLabelContent
            label="Reason:"
            content={detailUser.reason}
            colorLabel="#FF004C"
          />

          <TextLabelContent
            label="Penaltie end:"
            content={moment(detailUser.conclusion).format('DD/MMM/YYYY')}
            colorLabel="#FF004C"
          />

          <StyledSpacer height="10px" />
          <TextLabelContent
            label="Created:"
            content={moment(detailUser.created).format('DD/MMM/YYYY')}
            colorLabel="#FF004C"
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

  return (
    <StyledContainer>
      <Navigation />
      {!detailUser && !create && (
        <TableComponent
          title="Penalties"
          subtitle={
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
          }
          titleColor="#FF004C"
          tableheader={tableheader}
        >
          {loading && <LoadingComponent color="#FF004C" />}
          {(penalties.length &&
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
                    code,
                    firstName,
                    lastName,
                    conclusion,
                    reason,
                    created
                  )}
                </StyledCard>
              )
            )) ||
            (!loading && <NoDataComponent color="#FF004C" />)}
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
