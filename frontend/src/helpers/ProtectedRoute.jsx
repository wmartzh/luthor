import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useUserValues } from '../context/UserContext'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth } = useUserValues()

  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}
