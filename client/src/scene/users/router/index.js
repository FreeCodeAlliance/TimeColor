
import UserList from '../../users'

import Zhupansi from "../zhupansi"
import Shuangmian from "../shuangmian"
import Zonghelonghu from "../zonghelonghu"

export default {
  path: 'user',
  component: UserList,
  //indexRoute: {component: Example1},
  indexRoute: { onEnter: (nextState, replace) => replace('/user/zhupansi') },
  childRoutes: [
    {path: 'zhupansi', component: Zhupansi},
    {path: 'shuangmian', component: Shuangmian},
    {path: 'zonghelonghu', component: Zonghelonghu},
  ]
}

//    {path: 'Example(/:name)', component: Example},