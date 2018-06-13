import Login from '../login'
import Authenticate from '../../authenticate'
export default {
    path: 'authenticate',
    component: Authenticate,
    //indexRoute: {component: Example1},
    indexRoute: { onEnter: (nextState, replace) => replace('/authenticate/login') },
    childRoutes: [
        {path: 'login', component: Login},
    ]
}