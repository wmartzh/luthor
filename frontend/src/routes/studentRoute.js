import { GetPermission } from '../pages/role.students/GetPermission'
import { MyAssitance } from '../pages/role.students/MyAssistance'
import { MyPermissions } from '../pages/role.students/MyPermissions'
import { MyPenalties } from '../pages/role.students/MyPenalties'

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
  },
  {
    path: '/my-penalizations',
    component: MyPenalties
  }
]
