import React from 'react'
import { Route } from 'react-router-dom'

import {
  studentRoute,
  monitorRoute,
  guardRoute,
  preceptorRoutes,
  globalRoutes
} from '../routes'

import { Login } from '../pages/Login'
import { ProtectedRoute } from './ProtectedRoute'
import { useUserValues } from '../context/UserContext'
import { rectorRoutes } from '../routes/rectorRoutes'
import { ToTest } from '../layout/ToTEst'
import { Register } from '../pages/Register'
import { ToastComponents } from '../components/ToastComponent'
import { useToastValues } from '../context/ToastContext'

export const RouterHelper = () => {
  const { user } = useUserValues()
  const {
    toastDisplay,
    setToastDisplay,
    toastMessage,
    toastStatus,
    toastSize
  } = useToastValues()

  return (
    <>
      {toastDisplay && (
        <ToastComponents
          display={setToastDisplay}
          status={toastStatus}
          size={toastSize}
        >
          {toastMessage}
        </ToastComponents>
      )}
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/test" component={ToTest} />

      {globalRoutes.map(({ path, component: Component }) => (
        <ProtectedRoute
          key={path}
          exact
          path={path}
          component={props => <Component user={user} />}
        />
      ))}

      {user.role === '2' &&
        studentRoute.map(({ path, component: Component }) => (
          <ProtectedRoute
            key={path}
            exact
            path={path}
            component={props => <Component user={user} />}
          />
        ))}

      {user.role === '3' &&
        monitorRoute.map(({ path, component: Component }) => (
          <ProtectedRoute
            key={path}
            exact
            path={path}
            component={props => <Component user={user} />}
          />
        ))}

      {user.role === '4' &&
        preceptorRoutes.map(({ path, component: Component }) => (
          <ProtectedRoute
            key={path}
            exact
            path={path}
            component={props => <Component user={user} />}
          />
        ))}

      {user.role === '5' &&
        guardRoute.map(({ path, component: Component }) => (
          <ProtectedRoute
            key={path}
            exact
            path={path}
            component={props => <Component user={user} />}
          />
        ))}

      {user.role === '6' &&
        rectorRoutes.map(({ path, component: Component }) => (
          <ProtectedRoute
            key={path}
            exact
            path={path}
            component={props => <Component user={user} />}
          />
        ))}
    </>
  )
}
