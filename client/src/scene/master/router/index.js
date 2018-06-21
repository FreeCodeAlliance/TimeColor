export default {
    childRoutes: [
        {
            path: 'recharge',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('../users-recharge').default)
                }, 'master')
            },
        },
        {
            path: 'setting',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('../master-setting').default)
                }, 'master')
            },
        },
    ]
}