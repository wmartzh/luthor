import React, { useState, useEffect } from 'react'
import moment from 'moment'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

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
import { LoadingComponent } from '../../components/LoadingComponent'
import { NoDataComponent } from '../../components/NoDataComponent'
import { StyledSpacer } from '../../styles/StyledSpacer'
import { StyledTypography } from '../../styles/StyledTypography'
import { StyledBackButton } from '../../styles/StyledBackButton'
import { TextLabelContent } from '../../components/TextLabelContent'
import { axios } from '../../plugins/axios'
import { useUserValues } from '../../context/UserContext'
import { defaultColors } from '../../constants/statusColor'

export const ValidateWeekends = () => {
  const { user } = useUserValues()
  const { role } = user

  const [permission, setPermission] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState('')

  const requestData = () => {
    requestService(
      API_ROUTES.getWeekends.method,
      API_ROUTES.getWeekends.url,
      setPermission,
      setLoading,
      setError
    )
  }

  useEffect(() => {
    requestData()
  }, [])

  const tableheader = [
    {
      size: '110px',
      title: 'State',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#77B0C8'
    },
    {
      size: '340px',
      title: 'Name',
      display: true,
      displayMd: true,
      displaySm: true,
      color: '#77B0C8'
    },
    {
      size: '340px',
      title: role === '4' ? 'Vicerector' : 'Preceptor',
      display: true,
      displayMd: false,
      displaySm: false,
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

  const submitHandle = async type => {
    setSelected('')
    const preceptorData = {
      user_code: selected.code,
      preceptor: type
    }
    const vicerectorData = {
      user_code: selected.code,
      vicerector: type
    }
    try {
      const response = await axios({
        method: API_ROUTES.updateWeekendsApprove.method,
        url: API_ROUTES.updateWeekendsApprove.url,
        data: role === '4' ? preceptorData : vicerectorData
      })
      console.log(response)
      requestData()
    } catch (err) {
      console.log(err)
    }
  }

  const isActive =
    role === '4'
      ? selected.preceptor === 'rejected' || selected.preceptor === 'approved'
      : role === '6'
      ? selected.vicerector === 'rejected' || selected.vicerector === 'approved'
      : false

  const isValidated = (preceptor, vicerector) =>
    role === '4'
      ? `${
          preceptor === 'rejected' || preceptor === 'approved'
            ? 'Validated'
            : 'Validate'
        }`
      : role === '6'
      ? `${
          vicerector === 'rejected' || vicerector === 'approved'
            ? 'Validated'
            : 'Validate'
        }`
      : 'error'
  const studentInfo = (
    <>
      <StyledSpacer height="90px" />
      <StyledCard width="400px" flexDirection="column">
        <StyledBackButton onClick={() => setSelected('')}>
          <ArrowBackIosIcon fontSize="small" style={{ marginTop: '5px' }} />
        </StyledBackButton>
        <StyledTypography
          fontSize="22px"
          color="#A1C010"
          fontWeigth="400"
          style={{ margin: '5px 25px 8px' }}
        >
          User Details
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
            label="Complete name:"
            content={`${selected.fristName} ${selected.lastName}`}
            colorLabel="#77B0C8"
          />
          <TextLabelContent
            label="Permission State:"
            content={selected.state}
            colorLabel="#77B0C8"
          />
          <TextLabelContent
            label="Location"
            content={selected.location}
            colorLabel="#77B0C8"
          />
          <TextLabelContent
            label="Out Day:"
            content={moment(selected.outDay).format('DD/MMM/YYYY, H:m a')}
            colorLabel="#77B0C8"
          />
          <TextLabelContent
            label="Entry Day"
            content={moment(selected.entryDay).format('DD/MMM/YYYY, H:m a')}
            colorLabel="#77B0C8"
          />
          <TextLabelContent
            label="Permission state Preceptor:"
            content={selected.preceptor}
            colorLabel="#77B0C8"
          />
          <TextLabelContent
            label="Permission state Vicerector:"
            content={selected.vicerector}
            colorLabel="#77B0C8"
          />

          <StyledSpacer height="40px" />
        </div>

        <ButtonComponent
          background="#A1C010"
          width="360px"
          height="40px"
          margin="0"
          click={() => submitHandle('approved')}
          disable={isActive}
        >
          Approve
        </ButtonComponent>
        <StyledSpacer height="20px" />
        <ButtonComponent
          background={defaultColors.red}
          width="360px"
          height="40px"
          margin="0"
          click={() => submitHandle('rejected')}
          disable={isActive}
        >
          Rejected
        </ButtonComponent>
      </StyledCard>
    </>
  )

  const tableContent = (
    code,
    state,
    location,
    vicerector,
    preceptor,
    entryDay,
    outDay,
    fristName,
    lastName
  ) => (
    <StyledTableBody>
      <StyledTableItem
        width={tableheader[0].size}
        display={tableheader[0].display ? 'block' : 'none'}
        displayMd={tableheader[0].displayMd ? 'block' : 'none'}
        displaySm={tableheader[0].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#A1C010">
          {state.charAt(0).toUpperCase() + state.slice(1)}
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
        width={tableheader[2].size}
        display={tableheader[2].display ? 'block' : 'none'}
        displayMd={tableheader[2].displayMd ? 'block' : 'none'}
        displaySm={tableheader[2].displaySm ? 'block' : 'none'}
      >
        <StyledH2 fontWeigth="600" color="#77B0C8">
          {role === '4'
            ? `${vicerector.charAt(0).toUpperCase() + vicerector.slice(1)}`
            : `${preceptor.charAt(0).toUpperCase() + preceptor.slice(1)}`}
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
          background={
            isValidated(preceptor, vicerector) === 'Validated'
              ? defaultColors.yellow
              : defaultColors.green
          }
          width="100px"
          height="40px"
          margin="0"
          click={() =>
            setSelected({
              code,
              state,
              location,
              vicerector,
              preceptor,
              entryDay,
              outDay,
              fristName,
              lastName
            })
          }
        >
          {isValidated(preceptor, vicerector)}
        </ButtonComponent>
      </StyledTableItem>
    </StyledTableBody>
  )

  return (
    <StyledContainer>
      <Navigation />

      {selected === '' && (
        <TableComponent
          title="Validate weekends"
          titleColor="#A1C010"
          tableheader={tableheader}
        >
          {loading && <LoadingComponent color="#A1C010" />}
          {(permission.length !== 0 &&
            permission.map(
              ({
                id,
                state,
                vicerector,
                preceptor,
                location,
                in_date_time: entryDay,
                out_date_time: outDay,
                check_exit: check,
                user: { code, first_name: firstName, last_name: lastName }
              }) => {
                return check.toString() === '0' && state === 'in process' ? (
                  <StyledCard
                    width="100%"
                    flexDirection="column"
                    alignItems="start"
                    margin="0 0 16px 0"
                    key={id}
                  >
                    {tableContent(
                      code,
                      state,
                      location,
                      vicerector,
                      preceptor,
                      entryDay,
                      outDay,
                      firstName,
                      lastName
                    )}
                  </StyledCard>
                ) : null
              }
            )) ||
            (!loading && <NoDataComponent color="#A1C010" />)}
        </TableComponent>
      )}

      {/* TODO: get user photo */}
      {selected && studentInfo}
    </StyledContainer>
  )
}
