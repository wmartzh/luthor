import { ValidatePermission } from '../pages/role.guards/ValidatePermission'
import { ValidateEntry } from '../pages/role.guards/ValidateEntry'

export const guardRoute = [
  {
    path: '/validate-permission',
    component: ValidatePermission
  },
  {
    path: '/validate-entry',
    component: ValidateEntry
  }
]
