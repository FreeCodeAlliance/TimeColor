import React, { Component } from 'react';
import "./index.less"

export default class Zhupansi extends Component {
  constructor(props) {
    super(props);
    this.state = {tab: 1};
  }

  render() {
    //let tab = this.state.tab;
    //let floatView = `floatView-${tab}`;
    return (
      <div className="balanceRoot">
          zhupansi
      </div>
    );
  }
}