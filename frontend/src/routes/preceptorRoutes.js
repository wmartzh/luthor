import { MyPermissions } from '../pages/role.students/MyPermissions'
import { StudentsOut } from '../pages/role.preceptor/StudentsOut'
import { AssistanceDay } from '../pages/role.preceptor/AssistanceDay'
import { Penalties } from '../pages/role.preceptor/Penalties'
import { MyEvents } from '../pages/role.preceptor/MyEvents'
import { StudentList } from '../pages/role.preceptor/StudentList'

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
    component: MyEvents
  },
  {
    path: '/students-list',
    component: StudentList
  },
  {
    path: '/validate-permissions',
    component: MyPermissions
  }
]
