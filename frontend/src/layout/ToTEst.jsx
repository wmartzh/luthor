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
  const StyledTable = styled.table`
    width: 100%;
    th,
    td {
      text-align: start;
    }
    th {
      font-size: 14px;
      font-weight: 600;
      color: #b0a3cc;
      padding-bottom: 30px;
    }
    tbody tr {
      height: 24px;
      padding: 20px;
      background: #fff;
    }
  `

  return (
    <StyledContainer>
      <StyledSpacer height="90px" />
      <StyledH1 fontWeigth="700" color="#4F3C75">
        My Assistance
      </StyledH1>
      <StyledSpacer height="20px" />
      <StyledTable>
        <thead>
          <tr>
            <th>Assistance</th>
            <th>Event</th>
            <th>Monitor</th>
            <th>Date</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
            <td>50</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
            <td>94</td>
            <td>94</td>
          </tr>
        </tbody>
      </StyledTable>
    </StyledContainer>
  )
}
