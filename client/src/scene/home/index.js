import React, { Component } from 'react';

import { Menu, Icon } from 'antd';
//import {Link } from 'react-router'
import "./index.less"
//require "../../lib/qrcode.min"
//import { Tabs } from 'antd';
//const TabPane = Tabs.TabPane;
import {Modal, Button} from 'antd';
import {connect} from "react-redux";
import store from "store"
import {fetchMe} from "../../actions/user";

const SubMenu = Menu.SubMenu;
//var QRCode = require('qrcode.react');
//QRCode value="http://www.baidu.com" size={256}

class Home extends Component {
    state = {
        current: '',
        visibleModal: false,
    };
    componentWillMount() {
      //console.log("componentWillMount:", store.get('token'))
      window.addEventListener('resize', ()=>{});//Tood: reszie windows
      const { dispatch } = this.props;
      dispatch(fetchMe())
    }

    componentWillUnmount(){
      window.removeEventListener('resize', ()=>{});
    }

  handleClick = (e) => {
    //console.log('click ', e);
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

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visibleModal: false,
    });
  }

  handleCancel = (e) => {
    //console.log(e);
    this.setState({
      visibleModal: false,
    });
  }
  renderModal() {
    return(
      <Modal
        title="开奖记录"
        visible={this.state.visibleModal}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <p>详细记录1...</p>
        <p>详细记录2...</p>
        <p>详细记录3...</p>
      </Modal>
    );
  }


    renderHeadNavigation() {
      return(
          <Menu
              onClick={this.handleClick.bind(this)}
              selectedKeys={[this.state.current]}
              mode="horizontal"
              theme="dark"
              style={{border: "2px black solid"}}
          >
              <Menu.Item key="zhupansi" style={{marginLeft: 0}}>
                  <Icon type="select" />重慶時時彩
              </Menu.Item>
              <Menu.Item key="shuangmian">
                  新疆時時彩
              </Menu.Item>
            {/*
                <Menu.Item key="zonghelonghu" >
                  总和龙虎
              </Menu.Item>
            */}
          </Menu>
      );
    }

  renderBottomNavigation() {
      return(
        <Menu
          style={{width:"auto"}}
          defaultSelectedKeys={['-1']}
          mode="horizontal"
          theme="dark"
        >
          <Menu.Item key="2">
            <span>開獎結果</span>
          </Menu.Item>
          <Menu.Item key="3">
            <span>下注記錄</span>
          </Menu.Item>
        </Menu>
      );
    }

    render() {
    //let data = {id:666 ,name: "shenl", age:23};
    return (

        <div className="user">
          <div className="user-header">
            {this.renderHeadNavigation()}
          </div>
          <div className="user-content">
            {this.props.children}
          </div>
          <div className="user-footer">
            {this.renderBottomNavigation()}
          </div>
          {this.renderModal()}
        </div>
    )
    }
}

export default connect((state, ownProps) => {
    const { user} = state;
    return {
        userInfo: user.userInfo
    };
})(Home);
