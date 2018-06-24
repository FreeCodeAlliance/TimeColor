import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.less';
//import IconLink from '../component/IconLink'

//import * as Icon from "../icon"

import { getWindowSize } from '../actions';

class App extends Component {
    constructor(props) {
      super(props);
      this.state={}
    }

  componentDidMount() {
    const { dispatch } = this.props;
    const width = 1024;
    const height = 768;
    dispatch(getWindowSize(width, height));
  }

  render() {
    return (
      <div className="root">
          {this.props.children}
          {/*
              <div className="root-bottom">
                  <IconLink imageSrc={Icon.IC_RECORD} to="/authenticate" tips="authenticate"/>
                  <IconLink imageSrc={Icon.IC_HOME} to="/user" tips="home page"/>
              </div>
              */
          }
      </div>
    )
  }
}
//export default App;
export default connect((state, ownProps) => {
  const { windowSize} = state;
  return {
    windowWidth: windowSize.width,
  };
})(App);
