
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
      getComponent(location,cb) {
          require.ensure([], require => {
              cb(null, require('../scene/home').default)
          },'home')
      },
      indexRoute: { onEnter: (nextState, replace) => replace('/home/zhupansi') },
      childRoutes: [
          require("../scene/home/router").default,
      ]
    },
    {
      path: 'master',
      getComponent(location,cb) {
          require.ensure([], require => {
              cb(null, require('../scene/master').default)
          },'home')
      },
      indexRoute: { onEnter: (nextState, replace) => replace('/master/setting') },
      childRoutes: [
          require("../scene/master/router").default,
      ]
    },
  ]
}

