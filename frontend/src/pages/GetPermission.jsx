import React, { useState, useEffect, useRef } from 'react'

import Select from '@material-ui/core/es/Select'
import InputLabel from '@material-ui/core/es/InputLabel'
import FormControl from '@material-ui/core/es/FormControl'
import TextField from '@material-ui/core/es/TextField'
import MenuItem from '@material-ui/core/es/MenuItem'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { statusColor } from '../constants/statusColor'
import { Navigation } from '../layout/Navigation'
import { ButtonComponent } from '../components/ButtonComponent'

import { StyledContainer } from '../styles/StyledContainer'
import { StyledSpacer } from '../styles/StyledSpacer'
import { StyledStatusBar } from '../styles/StyledStatusBar'
import { StyledCard } from '../styles/StyledCard'
import { StyledH1 } from '../styles/StyledH1'
import { StyledBackButton } from '../styles/StyledBackButton'
import { LinkComponent } from '../components/LinkComponent'

export const GetPermission = () => {
  const [type, setType] = useState('')
  const [place, setPlace] = useState('')

  const inputLabel = useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  return (
    <StyledContainer>
      <Navigation />
      <StyledSpacer height="54px" />
      <StyledCard roundedTop width="300px">
        <StyledBackButton>
          <LinkComponent to="/">
            <ArrowBackIosIcon fontSize="small" style={{ marginTop: '5px' }} />
          </LinkComponent>
        </StyledBackButton>
        <StyledH1
          fontWeigth="600"
          color="#12B6C6"
          style={{ margin: '0 0 8px 0' }}
        >
          Get my permission
        </StyledH1>

        <StyledSpacer height="20px" />
        <FormControl fullWidth variant="outlined">
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            labelWidth={labelWidth}
            onChange={e => setType(e.target.value)}
            value={type}
          >
            <MenuItem value={'normal'}>Normal</MenuItem>
            <MenuItem value={'weekends'}>Weekends</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          label="Place"
          margin="normal"
          fullWidth
          id="place"
          onChange={e => setPlace(e.target.value)}
          value={place}
          required
        />
        <StyledSpacer height="40px" />
        <ButtonComponent to="/" background="#12B6C6" width="300px">
          Confirm
        </ButtonComponent>
        <StyledSpacer height="10px" />
      </StyledCard>
      <StyledStatusBar
        background={statusColor.allow}
        width="340px"
        margin="auto"
      />
    </StyledContainer>
  )
}
