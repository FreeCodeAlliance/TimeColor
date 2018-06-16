import Users from '../scene/home'
import homeRouter from "../scene/home/router"
import authenticateRouter from "../scene/authenticate/router"
import App from "../scene/mainScene"
//import Authenticate from "../scene/authenticate"

export const routes = {
  path: '/',
  //onEnter,
  //component: App,
  getComponent(location,cb) {
      cb(null, require('../scene/mainScene').default)
  },
  indexRoute:{onEnter: (nextState, replace) => replace('/authenticate')},
  childRoutes: [
    //authenticateRouter,
    {
        path: 'authenticate',
        //component: Authenticate,
        getComponent(location,cb) {
            require.ensure([], require => {
                cb(null, require('../scene/authenticate').default)
            },'authenticate')
        },
        indexRoute: { onEnter: (nextState, replace) => replace('/authenticate/login') },
        childRoutes: [
            require("../scene/authenticate/router").default,
        ]
    },
    //homeRouter,
      {
          path: 'home',
          //component: Home,
          getComponent(location,cb) {
              require.ensure([], require => {
                  cb(null, require('../scene/home').default)
              },'home')
          },
          //indexRoute: {component: Example1},
          indexRoute: { onEnter: (nextState, replace) => replace('/home/zhupansi') },
          childRoutes: [
              require("../scene/home/router").default,
          ]
      }
  ]
}

