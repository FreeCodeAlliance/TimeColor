import Login from '../login'
import Authenticate from '../../authenticate'
export default {
    childRoutes: [
        {
            path: 'login',
            //component: Login
            getComponent(location,cb) {
                require.ensure([], require => {
                    cb(null, require('../login').default)
                }, 'authenticate')
            },
        },
    ]
}