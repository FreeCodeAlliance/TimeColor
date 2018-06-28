export default {
    childRoutes: [
        {
            path: 'login',
            getComponent(location,cb) {
                require.ensure([], require => {
                    cb(null, require('../login').default)
                }, 'authenticate')
            },
        },
    ]
}