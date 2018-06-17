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
      <div className="zhupansi-content">
          <table border="1" style={{width: "50%"}}>
              <tbody>
              <tr>
                  <th>号码</th>
                  <th>赔率</th>
                  <th>选取</th>

              </tr>
              </tbody>
          </table>
      </div>
    );
  }
}