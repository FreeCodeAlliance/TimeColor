
export const routes = {
  path: '/',
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

