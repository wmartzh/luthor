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

export const RouterHelper = () => {
  const { user } = useUserValues()

  // useEffect(() => {
  //   console.log(token)
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  // }, [token])

  return (
    <>
      <Route exact path="/login" component={Login} />
      {/* <Route exact path="/test" component={ToTest} /> */}

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
    </>
  )
}
