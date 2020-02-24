import { StudentsOut } from '../pages/role.preceptor/StudentsOut'
import { AssistanceDay } from '../pages/role.preceptor/AssistanceDay'
import { Penalties } from '../pages/role.preceptor/Penalties'
import { MyEvents } from '../pages/role.preceptor/MyEvents'
import { StudentList } from '../pages/role.preceptor/StudentList'
import { ValidateWeekends } from '../pages/role.preceptor/ValidateWeekends'
import { GetPermission } from '../pages/role.students/GetPermission'
import { ActivateStudent } from '../pages/role.preceptor/ActivateStudent'

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
    path: '/validate-weekens',
    component: ValidateWeekends
  },
  {
    path: '/take-assistance',
    component: AssistanceDay
  },
  {
    path: '/special-permission',
    component: GetPermission
  },
  {
    path: '/activate-student',
    component: ActivateStudent
  }
]
