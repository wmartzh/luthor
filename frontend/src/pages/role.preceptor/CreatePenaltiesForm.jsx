import React, { useState, useEffect, useRef } from 'react'

import Select from '@material-ui/core/es/Select'
import MenuItem from '@material-ui/core/es/MenuItem'
import TextField from '@material-ui/core/es/TextField'
import InputLabel from '@material-ui/core/es/InputLabel'
import FormControl from '@material-ui/core/es/FormControl'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { StyledCard } from '../../styles/StyledCard'
import { StyledBackButton } from '../../styles/StyledBackButton'
import { StyledTypography } from '../../styles/StyledTypography'
import { StyledSpacer } from '../../styles/StyledSpacer'
import { ButtonComponent } from '../../components/ButtonComponent'
import { defaultColors } from '../../constants/statusColor'
import { axios } from '../../plugins/axios'
import { API_ROUTES } from '../../constants/apiRoutes'

export const CreatePenaltiesForm = ({
  display,
  edit = false,
  fetchExternData
}) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [code, setCode] = useState('')
  const [reason, setReason] = useState('')
  const [conclusion, setConclusion] = useState('')
  const [students, setStudents] = useState([])

  const inputLabel = useRef(null)
  const [labelWidth, setLabelWidth] = useState(0)

  const fetchData = async () => {
    try {
      const response = await axios({
        method: API_ROUTES.getFilter.method,
        url: `${API_ROUTES.getFilter.url}/studentCodeName`
      })
      setStudents(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    setCode(edit ? edit.code : '')
    setReason(edit ? edit.reason : '')
    setConclusion(edit ? edit.conclusion : '')
    return () => {
      setCode('')
      setReason('')
      setConclusion('')
    }
  }, [edit])

  useEffect(() => {
    fetchData()
    return () => {
      setStudents([])
    }
  }, [])

  const cancel = () => {
    display(false)
    edit = false
  }

  const deleteHandler = () => {}

  const submitHandler = async () => {
    setLoading(true)
    try {
      const userSelected = students.filter(student => student.code === code)
      const response = await axios({
        method: edit
          ? API_ROUTES.updatePenalizeUser.method
          : API_ROUTES.penalizeUser.method,
        url: edit
          ? API_ROUTES.updatePenalizeUser.url
          : API_ROUTES.penalizeUser.url,
        data: {
          user_code: code,
          reason,
          conclusion,
          intership: userSelected[0].intership
        }
      })
      const { status } = response
      if (status === 201 || status === 200) {
        cancel()
        fetchExternData()
      }
    } catch (err) {
      console.log(err)
      // setError()
    }
    setLoading(false)
  }

  const isEmpty = !(reason !== '' && conclusion !== '')

  return (
    <>
      <StyledSpacer height="54px" />
      <StyledCard flexDirection="column" roundedTop width="400px">
        <StyledBackButton>
          <ArrowBackIosIcon
            onClick={() => cancel()}
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
          Create a new Penaltie
        </StyledTypography>

        <StyledSpacer height="20px" />
        {(edit && (
          <>
            <StyledTypography
              fontSize="18px"
              fontWeigth="600"
              fontFamily="Segoe UI"
              color="#FF004C"
            >
              {edit.code} / {edit.firstName}
            </StyledTypography>
            <StyledSpacer height="21px" />
          </>
        )) || (
          <>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                ref={inputLabel}
                id="demo-simple-select-outlined-label"
                required
              >
                Student
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                labelWidth={labelWidth}
                onChange={e => setCode(e.target.value)}
                value={code}
                disabled={!students.length}
                required
              >
                {students.map(
                  ({ code, first_name: firstName, last_name: lastName }) => (
                    <MenuItem key={code} value={code}>
                      {code} / {firstName} {lastName}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </>
        )}
        <TextField
          variant="outlined"
          label="Reason"
          margin="normal"
          fullWidth
          id="reason"
          onChange={e => setReason(e.target.value)}
          value={reason}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="conclusion"
          label="Conclusion"
          type="date"
          onChange={e => setConclusion(e.target.value)}
          value={conclusion}
          format="dd/MM/yyyy"
          InputLabelProps={{
            shrink: true
          }}
        />

        {!error && <StyledSpacer height="40px" />}
        {error && (
          <>
            <StyledSpacer height="21px" />
            <StyledTypography color="red" fontSize="16px">
              {error}
            </StyledTypography>
          </>
        )}
        {edit && (
          <ButtonComponent
            click={submitHandler}
            background={defaultColors.red}
            width="360px"
            disable={isEmpty}
          >
            Disable
          </ButtonComponent>
        )}
        {!edit && (
          <ButtonComponent
            click={submitHandler}
            background={edit ? defaultColors.green : '#FBB13C'}
            width="360px"
            disable={isEmpty}
          >
            {edit ? 'Update' : 'Create'}
          </ButtonComponent>
        )}
      </StyledCard>
    </>
  )
}
