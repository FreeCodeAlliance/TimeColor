export default {
  childRoutes: [
      {
          path: 'user',
          getComponent(location,cb) {
              require.ensure([], require => {
                  cb(null, require('../user').default)
              },'home')
          },
      },
  ]
}
