import React, { Component } from 'react';

import { Menu, Icon } from 'antd';

//import {Link } from 'react-router'
import "./index.less"
//require "../../lib/qrcode.min"
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
                      <tr>
                          <th>会员账号</th>
                          <th style={{float: "right"}}>dd3i6</th>
                      </tr>
                      <tr>
                          <td>盘类</td>
                          <td>D盘</td>
                      </tr>
                      <tr>
                          <td>可用额度</td>
                          <td>100</td>
                      </tr>
                      <tr>
                          <td>下注期数</td>
                          <td>0613101</td>
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
              <p>最新下注12比记录</p>
              <table border="1">
                  <tbody>
                      <tr>
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

    renderHeadNavigation() {
      return(
          <Menu
              style={{display: 'flex', justifyContent: 'space-around', backgroundColor: "#8adaf3"}}
              onClick={this.handleClick.bind(this)}
              selectedKeys={[this.state.current]}
              mode="horizontal"
          >
              <SubMenu title={<span><Icon type="smile" />时时彩</span>}>
                  <Menu.Item key="mode_xj">新疆</Menu.Item>
                  <Menu.Item key="mode_cq">重庆</Menu.Item>
              </SubMenu>
              <Menu.Item key="zhupansi" style={{marginLeft: 0}}>
                  <Icon type="select" />主盘势
              </Menu.Item>
              <Menu.Item key="shuangmian">
                  <Icon type="select" />双面盘口
              </Menu.Item>
              <Menu.Item key="zonghelonghu" >
                  <Icon type="select" />总和龙虎
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
            award-results
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
