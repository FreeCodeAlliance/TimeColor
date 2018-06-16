export default {
  childRoutes: [
      {
          path: 'zhupansi',
          getComponent(location,cb) {
              require.ensure([], require => {
                  cb(null, require('../zhupansi').default)
              },'home')
          },
      },
      {
          path: 'zhupansi',
          getComponent(location,cb) {
              require.ensure([], require => {
                  cb(null, require('../zhupansi').default)
              },'home')
          },
      },
      {
          path: 'shuangmian',
          getComponent(location,cb) {
              require.ensure([], require => {
                  cb(null, require('../shuangmian').default)
              },'home')
          },
      },
      {
          path: 'zonghelonghu',
          getComponent(location,cb) {
              require.ensure([], require => {
                  cb(null, require('../zonghelonghu').default)
              },'home')
          },
      },
  ]
}
