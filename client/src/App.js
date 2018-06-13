import React, { Component } from 'react';
import { Router, hashHistory } from 'react-router'
import { routes } from './routers'
import { Provider } from 'react-redux';

import './App.css';

import store from './store/configStore' //FIXME: on exsited getState()??
//import rootReducer from "./reducers";
//let store = createStore(rootReducer);

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return(
			<Provider store={store}>
				 <Router history={hashHistory} routes = {routes}/>
			</Provider>
		);
	}
}

