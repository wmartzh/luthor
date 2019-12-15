import React, { useState } from 'react'
import styled from 'styled-components'

import { statusColor } from '../constants/statusColor'
import userPhoto from '../assets/img/person_image.jpg'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { ButtonComponent } from '../components/ButtonComponent'

import { StyledContainer } from '../styles/StyledContainer'
import { StyledSpacer } from '../styles/StyledSpacer'
import { StyledStatusBar } from '../styles/StyledStatusBar'
import { StyledCard } from '../styles/StyledCard'
import { StyledH1 } from '../styles/StyledH1'
import { StyledSpan } from '../styles/StyledSpan'
import { StyledAvatar } from '../styles/StyledAvatar'
import { StyledBackButton } from '../styles/StyledBackButton'
import { LinkComponent } from '../components/LinkComponent'

import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/es/TextField'
import MenuItem from '@material-ui/core/MenuItem'

export const ToTest = () => {
  const [type, setType] = useState('')
  const [labelWidth, setLabelWidth] = useState(0)
  const inputLabel = React.useRef(null)

  const handleChange = event => {
    setType(event.target.value)
  }

  return (
    <StyledContainer>
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
            value={type}
            onChange={handleChange}
            labelWidth={labelWidth}
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
