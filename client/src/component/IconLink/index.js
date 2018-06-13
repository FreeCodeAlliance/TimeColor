import React, { Component } from 'react';
import {Link } from 'react-router'

import "./index.less"

export default class IconLink extends Component {
  static defaultProps ={
    tips: "this is tips",
    to: '/user',
    imageSrc: require("./home.png")
  };

  constructor(props) {
    super(props);
    this.state = {tips: false};

  }

  handleMouseOver = (key, e) => {
    this.setState({tips: true});
  }

  handleMouseOut  = (key, e) => {
    this.setState({tips: false});
  }

  renderTips() {
    const {tips} = this.props;
    return (
      <div className="tips">
        {tips}
      </div>

    );
  }

  render() {
    const { imageSrc , to} = this.props;
    return (
      <Link className="mainLink" to={to}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
      >
        <img className="mainIcon" src={imageSrc}/>
        { this.state.tips === true && this.renderTips()}
      </Link>
    );
  }

}

