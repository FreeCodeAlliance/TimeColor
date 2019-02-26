export default {
    childRoutes: [
        {
            path: 'gifts',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('../users-gifts').default)
                }, 'master')
            },
        }
    ]
}