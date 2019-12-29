import React from 'react'
import styled from 'styled-components'

import usersIcon from '../../assets/svg/users.svg'
import plusCircleIcon from '../../assets/svg/plus-circle.svg'
import checkCircleIcon from '../../assets/svg/check-circle.svg'

import userPhoto from '../../assets/img/person_image.jpg'
import { StyledTypography } from '../../styles/StyledTypography'
import { StyledCard } from '../../styles/StyledCard'
import { StyledSpacer } from '../../styles/StyledSpacer'
import { StyledAvatar } from '../../styles/StyledAvatar'
import { StyledContainer } from '../../styles/StyledContainer'
import { BigButtonComponent } from '../../components/BigButtonComponent'
import { StyledItemsContainer } from '../../styles/StyledItemsContainer'
import { IcoButtonComponent } from '../../components/IcoButtonComponent'

export const DashboardAdmin = ({ user }) => {
  const { username, role, code } = user

  const StyledSectionHeader = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `
  const StyledSectionSectionMore = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 40px;
    div {
      width: 235px;
    }
    @media (max-width: 555px) {
      flex-direction: column;
      div {
        width: 100%;
      }
    }
  `

  const labels = (label, secondLabel, color, secondColor) => (
    <>
      <StyledTypography fontSize="14px" color={color}>
        Current
      </StyledTypography>
      <StyledTypography fontSize="18px" fontWeigth="600" color={color}>
        {label}
      </StyledTypography>
      <StyledTypography fontSize="12px" color={secondColor}>
        {secondLabel}
      </StyledTypography>
    </>
  )

  return (
    <StyledContainer maxWidth="490px">
      <StyledSectionHeader>
        <div>
          <StyledTypography fontWeigth="800" color="#002D62" fontSize="26px">
            Welcome
          </StyledTypography>
          <StyledTypography
            color="#212121"
            fontSize="30px"
            fontFamily="Segoe UI"
          >
            {username}
          </StyledTypography>
          <StyledTypography
            color="#919191"
            fontSize="14px"
            fontFamily="Segoe UI"
          >
            {code}
          </StyledTypography>
        </div>
        <div>
          <StyledAvatar image={userPhoto} />
        </div>
      </StyledSectionHeader>
      <StyledSpacer height="40px" />
      <StyledItemsContainer>
        <div className="grid-row">
          <BigButtonComponent
            color="#4F3C75"
            label={labels('Students out', 'per day', '#4F3C75', '#B0A3CC')}
            content="24"
            to="students-out"
          />
          <BigButtonComponent
            color="#12B6C6"
            label={labels('Assistance', 'per day', '#12B6C6', '#77B0C8')}
            content="88"
            to="assistance-day"
          />
          <BigButtonComponent
            color="#FF004C"
            label={labels('Penalties', 'per month', '#FF004C', '#FF719B')}
            content="11"
            to="total-penalties"
          />
        </div>
      </StyledItemsContainer>
      <StyledSectionSectionMore>
        <div>
          <IcoButtonComponent
            label="Events"
            color="#FBB13C"
            svg={plusCircleIcon}
            to="/create-events"
          />
          <IcoButtonComponent
            label="Students"
            color="#007991"
            svg={usersIcon}
            to="/students-list"
          />
          <IcoButtonComponent
            label="Validate Permissions"
            color="#A1C010"
            svg={checkCircleIcon}
            to="/validate-permissions"
          />
        </div>
        <div>
          <StyledCard>
            <StyledTypography fontSize="14px" color="#1f1f1f">
              Todo
            </StyledTypography>
          </StyledCard>
        </div>
      </StyledSectionSectionMore>
    </StyledContainer>
  )
}
