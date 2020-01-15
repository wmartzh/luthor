import { GetPermission } from '../pages/role.students/GetPermission'
import { MyAssitance } from '../pages/role.students/MyAssistance'
import { MyPermissions } from '../pages/role.students/MyPermissions'

export const monitorRoute = [
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
  },
  {
    path: '/take-assistance',
    component: GetPermission
  },
  {
    path: '/alert',
    component: MyAssitance
  }
]
