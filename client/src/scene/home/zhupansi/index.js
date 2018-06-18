import React, { Component } from 'react';
import "./index.less"

import FormInput from '../../../component/lib/form-input';
import Button from '../../../component/lib/button';

export default class Zhupansi extends Component {
  constructor(props) {
    super(props);
    this.state = {tab: 1, value: 0};
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
      const data = [3.45, 3.45, 3.45, 3.45, 3.43];
      return (
          <table border="1" style={{width: "100%"}}>
              <tbody>
                  <tr>
                      <th colSpan="6" style={{backgroundColor: "#d3adf7"}}>主盘势</th>
                  </tr>
                  <tr style={{backgroundColor: "#c5c5c5"}}>
                      <th>号码</th>
                      <th>赔率</th>
                      <th>选取</th>
                      <th>号码</th>
                      <th>赔率</th>
                      <th>选取</th>
                  </tr>
                  {
                      data.map((value, key)=>{
                          return (
                              <tr>
                                  <th>{key*2}</th>
                                  <th>{value}</th>
                                  <th>  </th>
                                  <th>{key*2+1}</th>
                                  <th>{value}</th>
                                  <th>  </th>
                              </tr>
                          )
                      })
                  }
              </tbody>
          </table>
      );
  }

  renderDaxiaoDansuan() {
      return(
          <table border="1" style={{width: "100%"}}>
              <tbody>
                  <tr style={{backgroundColor: "#c5c5c5"}}>
                      <th colSpan="1">  </th>
                      <th colSpan="1">大</th>
                      <th colSpan="1">小</th>
                      <th colSpan="1">单</th>
                      <th colSpan="1">双</th>
                      <th colSpan="1">合</th>
                      <th colSpan="1">质</th>
                  </tr>
                  <tr>
                      <th colSpan="1">万OXXXX</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                  </tr>
                  <tr>
                      <th colSpan="1">千XOXXX</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                  </tr>
                  <tr>
                      <th colSpan="1">百XXOXX</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                  </tr>
                  <tr>
                      <th colSpan="1">十XXXOX</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                  </tr>
                  <tr>
                      <th colSpan="1">个XXXXO</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                      <th colSpan="1">1.98</th>
                  </tr>
              </tbody>
          </table>
      );

  }
  renderTouzhuPanel() {
      return (
          <div className="touzhuPanel">
              <p>金额</p>
              <input type="number" name="points" min="1" max="100" />
              <button>确定</button>
              <button>取消</button>
          </div>
      )
  }
  render() {
    //let tab = this.state.tab;
    //let floatView = `floatView-${tab}`
    return (
      <div className="zhupansi-content">
          {this.renderTitle()}
          {this.renderHaoPeilvXuanlv()}
          {this.renderDaxiaoDansuan()}
          {this.renderTouzhuPanel()}
      </div>
    );
  }
}
