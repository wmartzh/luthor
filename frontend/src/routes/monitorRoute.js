import { GetPermission } from '../pages/role.students/GetPermission'
import { MyAssitance } from '../pages/role.students/MyAssistance'
import { MyPermissions } from '../pages/role.students/MyPermissions'
import { AssistanceDay } from '../pages/role.preceptor/AssistanceDay'

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
    component: AssistanceDay
  },
  {
    path: '/alert',
    component: MyAssitance
  }
]
