import { GetPermission } from '../pages/role.students/GetPermission'
import { MyAssitance } from '../pages/role.students/MyAssistance'
import { MyPermissions } from '../pages/role.students/MyPermissions'
import { StudentsOut } from '../pages/role.preceptor/StudentsOut'
import { AssistanceDay } from '../pages/role.preceptor/AssistanceDay'
import { Penalties } from '../pages/role.preceptor/Penalties'

export const preceptorRoutes = [
  {
    path: '/students-out',
    component: StudentsOut
  },
  {
    path: '/assistance-day',
    component: AssistanceDay
  },
  {
    path: '/total-penalties',
    component: Penalties
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
