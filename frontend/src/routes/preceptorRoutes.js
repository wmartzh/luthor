import { GetPermission } from '../pages/role.students/GetPermission'
import { MyAssitance } from '../pages/role.students/MyAssistance'
import { MyPermissions } from '../pages/role.students/MyPermissions'

export const preceptorRoutes = [
  {
    path: '/students-out',
    component: GetPermission
  },
  {
    path: '/assistance-day',
    component: MyAssitance
  },
  {
    path: '/total-penalties',
    component: MyAssitance
  },
  {
    path: '/create-events',
    component: GetPermission
  },
  {
    path: '/students-list',
    component: MyAssitance
  },
  {
    path: '/validate-permissions',
    component: MyPermissions
  }
]
