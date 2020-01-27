import React, { useState } from 'react'
import styled from 'styled-components'

import { statusColor, userStatusColor } from '../constants/statusColor'
import userPhoto from '../assets/img/person_image.jpg'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

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
import FormControlLabel from '@material-ui/core/es/FormControlLabel'
import Checkbox from '@material-ui/core/es/Checkbox'
import MenuItem from '@material-ui/core/MenuItem'
import { StyledTypography } from '../styles/StyledTypography'
import { Copyright } from '../components/Copyright'
import { HourMinComponent } from '../components/HourMinComponent'

export const ToTest = () => {
  const [tolerancePrecent, setTolerancePrecent] = useState({
    h: '00',
    m: '10'
  })
  const [toleranceLate, setToleranceLate] = useState({
    h: '00',
    m: '10'
  })
  const submitHandle = () => {
    console.log(`precent = ${tolerancePrecent.h}:${tolerancePrecent.m}`)
    console.log(`late = ${toleranceLate.h}:${toleranceLate.m}`)
  }
  return (
    <StyledContainer maxWidth="380px">
      <StyledSpacer height="100px" />
      <StyledCard flexDirection="column" roundedTop width="400px">
        <HourMinComponent
          title="Tolerance Precent"
          time={tolerancePrecent}
          setTime={setTolerancePrecent}
          color="#08B1C5"
        />

        <HourMinComponent
          title="Tolerance Late"
          time={toleranceLate}
          setTime={setToleranceLate}
          color="#08B1C5"
        />

        <StyledSpacer height="40px" />
        <ButtonComponent
          click={submitHandle}
          background="#08B1C5"
          color="#fff"
          width="300px"
        >
          Sign In
        </ButtonComponent>
      </StyledCard>
    </StyledContainer>
  )
}
