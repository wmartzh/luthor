import { GetPermission } from '../pages/GetPermission'
import { MyAssitance } from '../pages/MyAssitance'
import { MyPermissions } from '../pages/MyPermissions'

export const studentRoute = [
  {
    path: '/get-permission',
    component: GetPermission
  },
  {
    path: '/my-assistance',
    component: MyAssitance
  },
  {
    path: '/my-permissions',
    component: MyPermissions
  }
]
