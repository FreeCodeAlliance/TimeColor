import React, { Component } from 'react';
import "./index.less"

export default class Zhupansi extends Component {
  constructor(props) {
    super(props);
    this.state = {tab: 1};
  }

  renderTitle() {
      const data = [6,5,5,3,5];
      return (
          <div className="zps-title">
              <div className="zps-title-panel1">
                    <p>重庆时时彩:</p>
                    <p style={{color:'#e62727'}}>今日输赢</p>
                    <p style={{color:'blue'}}>0.0</p>
              </div>
              <div className="zps-title-panel2">
                  <p>123456期开奖结果:</p>
                  {
                      data.map((v) => {
                          return (
                            <div className="zps-title-panel2-circle">
                                {v}
                            </div>
                          );
                      })
                  }
              </div>
              <div className="zps-title-panel3">
                  <p style={{color:'green'}}>04</p>
                  <p>期</p>
                  <p>距离封盘</p>
                  <p style={{color:'#e6695a'}}>00:06</p>
                  <p>距离开奖</p>
                  <p style={{color:'#e6695a'}}>00:11</p>
              </div>
          </div>
      );
  }

  renderHaoPeilvXuanlv() {
      const data = [3.45, 3.45, 3.45,
                    3.45, 3.45, 3.45,
                    3.45, 3.45, 3.45,];
      return (
          <table border="1" style={{width: "100%"}}>
              <tbody>
              <tr>
                  <th colSpan="6">主盘势</th>
              </tr>
              <tr>
                  <th>号码</th>
                  <th>赔率</th>
                  <th>选取</th>
                  <th>号码</th>
                  <th>赔率</th>
                  <th>选取</th>
              </tr>
              <tr>
                  <th>0</th>
                  <th>赔率</th>
                  <th>选取</th>
                  <th>号码</th>
                  <th>赔率</th>
                  <th>选取</th>
              </tr>
              <tr>
                  <th>号码</th>
                  <th>赔率</th>
                  <th>选取</th>
                  <th>号码</th>
                  <th>赔率</th>
                  <th>选取</th>
              </tr>
              </tbody>
          </table>
      );
  }
  render() {
    //let tab = this.state.tab;
    //let floatView = `floatView-${tab}`
    return (
      <div className="zhupansi-content">
          {this.renderTitle()}
          {this.renderHaoPeilvXuanlv()}
      </div>
    );
  }
}