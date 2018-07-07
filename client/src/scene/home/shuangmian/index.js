import React, { Component } from 'react';

import "./index.less"

export default class Shuangmian extends Component {
    constructor(props) {
      super(props);
      this.state = {isShowDialog : false};
    }


  handleClickItem() {
    this.setState({isShowDialog : true})
  }

  handleClickDialog() {
    this.setState({isShowDialog : false})
  }

  renderItem(v) {
    return (
      <div key ={v} className="trainItem" >
        <div onClick={this.handleClickItem.bind(this)}>
          {v}
        </div>
      </div>
    );

  }

  renderDialog() {
    return (
      <div className="dialog" onClick={this.handleClickDialog.bind(this)}>
        this is dialog
      </div>
    );
  }

  render() {
    let data = [];
    for (let k = 2; k<=20; k++) {
      data.push(k);
    }
    return (
      <div className="trainRoot">
        {
          /*
        {this.state.isShowDialog && this.renderDialog()}
        {data.map( (v, k) => this.renderItem(v))}
           */
        }
        另一個玩法（还未实现）
      </div>
    );
  }
}