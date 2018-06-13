import Users from '../scene/users'
import userRouter from "../scene/users/router"
import authenticateRouter from "../scene/authenticate/router"
import App from "../scene/mainScene"
//import Authenticate from "../scene/authenticate"

export const routes = {
  path: '/',
  //onEnter,
  component: App,
  indexRoute:{onEnter: (nextState, replace) => replace('/authenticate')},
  childRoutes: [
    authenticateRouter,
    userRouter,
    // { path: 'Users', component: Users },
    //require('../scene/users/router'),
  ]
}

/*
 module.exports = {
 childRoutes: [
 {
 path: '/',
 onEnter,
 getComponent(nextState, cb) {
 cb(null, require('../../components/main'));
 },
 indexRoute: { onEnter: (nextState, replace) => replace('/home') },
 childRoutes: [
 require('../../components/scenes/home-kids/router/index.web'),
 require('../../components/scenes/course-kids/router/index.web'),
 require('../../components/scenes/service-kids/router/index.web'),
 // require('../../components/scenes/mine/router'),
 // require('../../components/scenes/home/system-message-page/router'),
 ],
 },
 {
 path: 'authenticate',
 getComponent(nextState, cb) {
 require.ensure([], (require) => {
 cb(null, require('../../components/scenes/authenticate'));
 }, 'authenticate');
 },
 indexRoute: { onEnter: (nextState, replace) => replace('/authenticate/home') },
 childRoutes: [
 require('../../components/scenes/authenticate/router'),
 ],
 },
 ],
 };
 */
