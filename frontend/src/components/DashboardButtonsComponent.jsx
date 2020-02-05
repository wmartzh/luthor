import React from 'react'

import { studentRoute, monitorRoute, guardRoute } from '../routes'

import { ButtonComponent } from './ButtonComponent'

export const DashboardButtonsComponent = ({ role, status }) => {
  return (
    <>
      {/* Student View */}
      {role === '2' && (
        <>
          <ButtonComponent
            to={studentRoute[0].path}
            background="#12B6C6"
            width="300px"
            disable={status === 'penalized'}
          >
            Get Permission
          </ButtonComponent>
          <ButtonComponent
            to={studentRoute[1].path}
            background="#A1C010"
            width="300px"
          >
            My Assistance
          </ButtonComponent>
          <ButtonComponent
            to={studentRoute[2].path}
            background="#4F3C75"
            width="300px"
          >
            My Permissions
          </ButtonComponent>
          <ButtonComponent
            to={studentRoute[3].path}
            background="#E0425D"
            width="300px"
          >
            My Penalizations
          </ButtonComponent>
        </>
      )}

      {role === '3' && (
        <>
          <ButtonComponent
            to={monitorRoute[0].path}
            background="#12B6C6"
            width="300px"
          >
            Get Permission
          </ButtonComponent>
          <ButtonComponent
            to={monitorRoute[1].path}
            background="#4F3C75"
            width="300px"
          >
            My Assistance
          </ButtonComponent>
          <ButtonComponent
            to={monitorRoute[2].path}
            background="#FB7140"
            width="300px"
          >
            My Permissions
          </ButtonComponent>
          {/* FIXME: Change the bg */}
          <ButtonComponent
            to={monitorRoute[3].path}
            background="#FBB13C"
            width="300px"
          >
            Take Assistance
          </ButtonComponent>
          <ButtonComponent
            to={monitorRoute[4].path}
            background="#FF004C"
            width="300px"
            disable={true}
          >
            Alert
          </ButtonComponent>
        </>
      )}

      {/* Guard View */}

      {role === '5' && (
        <>
          <ButtonComponent
            to={guardRoute[0].path}
            background="#12B6C6"
            width="300px"
          >
            Validate Exit
          </ButtonComponent>
          <ButtonComponent
            to={guardRoute[1].path}
            background="#4F3C75"
            width="300px"
          >
            Validate Entry
          </ButtonComponent>
          {/* TODO: */}
          {/* <ButtonComponent
              to="/my-permission"
              background="#1D7AA2"
              width="300px"
              disable
            >
              Status
            </ButtonComponent> */}
        </>
      )}
    </>
  )
}
