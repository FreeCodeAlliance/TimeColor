
import UserList, {Example2, Example} from '../../users'

import trainRecords from "../trainRecords"
import Balance from "../Balance"
export default {
  path: 'user',
  component: UserList,
  //indexRoute: {component: Example1},
  indexRoute: { onEnter: (nextState, replace) => replace('/user/Balance') },
  childRoutes: [
    {path: 'Balance', component: Balance},
    {path: 'Example2', component: Example2},
    {path: 'trainRecords', component: trainRecords},
    {path: 'Example(/:name)', component: Example},
  ]
}