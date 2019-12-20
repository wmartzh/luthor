import { Settings } from '../pages/Settings'
import { Dashboard } from '../pages/Dashboard'

export const globalRoutes = [
  {
    path: '/',
    component: Dashboard
  },
  {
    path: '/settings',
    component: Settings
  }
]
