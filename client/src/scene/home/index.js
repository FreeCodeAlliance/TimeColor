import React, { Component } from 'react';

import { Menu, Icon } from 'antd';
//import {Link } from 'react-router'
import "./index.less"
//require "../../lib/qrcode.min"
//import { Tabs } from 'antd';
//const TabPane = Tabs.TabPane;
import { Button } from 'antd';<Button type="primary">Primary</Button>
const SubMenu = Menu.SubMenu;
//var QRCode = require('qrcode.react');
//QRCode value="http://www.baidu.com" size={256}

export default class Home extends Component {
    state = {
        current: '',
    };
    handleClick = (e) => {
        console.log('click ', e);
        if (e.key.indexOf('mode') >= 0){
            return
        }
        this.setState({
            current: e.key,
        });

        const {router} = this.props;
        let routerStr = `/home/${e.key}`
        router.push(routerStr);
    };

    renderUserInfo() {
      return (
          <div className="user-info">
              <p>皇冠国际</p>
              <table border="0">
                  <tbody>
                      <tr style={{backgroundColor: "#3FC3EE", borderRadius: "5px"}}>
                          <th>会员账号</th>
                          <th style={{float: "right"}}>dd3i6</th>
                      </tr>
                      <tr>
                          <td>盘类</td>
                          <td style={{float: "right"}} >D盘</td>
                      </tr>
                      <tr style={{backgroundColor: "#eeb938"}}>
                          <td>可用额度</td>
                          <td style={{float: "right"}}>100</td>
                      </tr>
                      <tr>
                          <td>下注期数</td>
                          <td style={{float: "right"}}>0613101</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      );
    }

    renderAwardRecods() {
      const data = [1, 2, 3, 8, 5];
      return (
          <div className="award-record">
              <p>最新下注记录</p>
              <table border="1">
                  <tbody>
                      <tr style={{backgroundColor: "#3FC3EE"}}>
                          <th>时间</th>
                          <th>内容</th>
                          <th>赔率</th>
                          <th>金额</th>
                      </tr>
                      {data.map((v, k)=>{
                          return (
                              <tr key={k}>
                                  <td>1</td>
                                  <td>2</td>
                                  <td>3</td>
                                  <td>4</td>
                              </tr>
                          )
                      })}
                  </tbody>
              </table>
          </div>
      );
    }

    renderResults() {
        const data = [1, 2, 3, 8, 5];
        return(
            <div >
                <p className="award-results-title">【重庆时时彩】</p>
                <p className="award-results-title">开奖结果</p>
                <div style={{display: 'flex', justifyContent: 'space-around', margin: '8px 0'}}>
                    <button size="small">号码</button>
                    <button size="small">大小</button>
                    <button size="small">单双</button>
                    <button size="small">质合</button>
                </div>
                <table border="1" style={{width: '100%'}}>
                    <tbody>
                    <tr style={{backgroundColor: "#3FC3EE"}}>
                        <th>期数</th>
                        <th>万</th>
                        <th>千</th>
                        <th>百</th>
                        <th>十</th>
                        <th>个</th>
                    </tr>
                    {data.map((v, k)=>{
                        return (
                            <tr key={k}>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
    // style={{display: 'flex', justifyContent: 'space-around', backgroundColor: "#8adaf3"}}
    renderHeadNavigation() {
      return(
          <Menu
              style={{backgroundColor: "#6fe6ee"}}
              onClick={this.handleClick.bind(this)}
              selectedKeys={[this.state.current]}
              mode="horizontal"
          >
              <SubMenu title={<span><Icon type="smile" />时时彩</span>}>
                  <Menu.Item key="mode_xj">新疆</Menu.Item>
                  <Menu.Item key="mode_cq">重庆</Menu.Item>
              </SubMenu>
              <Menu.Item key="zhupansi" style={{marginLeft: 0}}>
                  主盘势<Icon type="select" />
              </Menu.Item>
              <Menu.Item key="shuangmian">
                  双面盘口
              </Menu.Item>
              <Menu.Item key="zonghelonghu" >
                  总和龙虎
              </Menu.Item>
          </Menu>
      );
    }

    render() {
    //let data = {id:666 ,name: "shenl", age:23};
    return (
      <div className="user">
        <div className="user-leftPanel">
            {this.renderUserInfo()}
            {this.renderAwardRecods()}
          <div className="award-results">
              {this.renderResults()}
          </div>
        </div>
        <div className="user-rightPanel">
            <div >
                {this.renderHeadNavigation()}
            </div>
          {this.props.children}
        </div>
      </div>
    )
    }
}
