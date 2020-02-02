import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import usersIcon from '../../assets/svg/users.svg'
import plusCircleIcon from '../../assets/svg/plus-circle.svg'
import checkCircleIcon from '../../assets/svg/check-circle.svg'

import userPhoto from '../../assets/img/person_image.jpg'
import { StyledCard } from '../../styles/StyledCard'
import { StyledSpacer } from '../../styles/StyledSpacer'
import { StyledAvatar } from '../../styles/StyledAvatar'
import { StyledContainer } from '../../styles/StyledContainer'
import { StyledTypography } from '../../styles/StyledTypography'
import { BigButtonComponent } from '../../components/BigButtonComponent'
import { StyledItemsContainer } from '../../styles/StyledItemsContainer'
import { IcoButtonComponent } from '../../components/IcoButtonComponent'
import { preceptorRoutes } from '../../routes'
import { useUserValues } from '../../context/UserContext'
import { requestService } from '../../services/requestService'
import { API_ROUTES } from '../../constants/apiRoutes'
// import { Navigation } from '../../layout/Navigation'

export const DashboardAdmin = () => {
  const { user } = useUserValues()
  const { username, code } = user
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    requestService(
      API_ROUTES.getFilter.method,
      `${API_ROUTES.getFilter.url}/indicators`,
      setData,
      setLoading,
      setError
    )
  }, [])

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
    <StyledContainer maxWidth="520px">
      {/* <Navigation />
      <StyledSpacer height="54px" /> */}
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
            content={data.students_out}
            to={preceptorRoutes[0].path}
          />
          <BigButtonComponent
            color="#12B6C6"
            label={labels('Assistance', 'per day', '#12B6C6', '#77B0C8')}
            content={data.assitance}
            to={preceptorRoutes[1].path}
          />
          <BigButtonComponent
            color="#FF004C"
            label={labels('Penalties', 'per month', '#FF004C', '#FF719B')}
            content={data.penalties}
            to={preceptorRoutes[2].path}
          />
        </div>
      </StyledItemsContainer>
      <StyledSectionSectionMore>
        <div>
          <IcoButtonComponent
            label="Events"
            color="#FBB13C"
            svg={plusCircleIcon}
            to={preceptorRoutes[3].path}
          />
          <IcoButtonComponent
            label="Students"
            color="#007991"
            svg={usersIcon}
            to={preceptorRoutes[4].path}
          />
          <IcoButtonComponent
            label="Validate Permissions"
            color="#A1C010"
            svg={checkCircleIcon}
            to={preceptorRoutes[5].path}
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
