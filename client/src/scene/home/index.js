import React, { Component } from 'react';

import { Menu, Icon, Modal, Table } from 'antd';
//import {Link } from 'react-router'
import "./index.less"
//import { Tabs } from 'antd';
//const TabPane = Tabs.TabPane;
import {connect} from "react-redux";
//import store from "store"
import {fetchMe} from "../../actions/user";
import {fetchtodayLotteryRecords} from "../../actions/lottery";
//const SubMenu = Menu.SubMenu;
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

  handleModelCancel = (e) => {
    console.log(e);
    this.setState({
      visibleModal: false,
    });
  }


  renderModal() {
    const columns = [{
      title: '期號',
      dataIndex: 'no',
    }, {
      title: '開獎號碼',
      dataIndex: 'res',
      render:(_, data, key) =>{
        return(
          <span key={key}>{data.res.toString()}</span>
        );
      }
    }, {
      title: '輸贏',
      dataIndex: 'result',
      render:() =>(
        <span>0</span>
      )
    },{
      title: '下注記錄',
      dataIndex: 'recharge',
      render: (_,data,key) => (
        <span>
          <a href="javascript:;">查看詳情</a>
        </span>
      )
    }];
    const {lotteryRecords, loading} = this.props;
    return(
      <Modal
        title="开奖记录"
        visible={this.state.visibleModal}
        onCancel={this.handleModelCancel}
        footer={null}
      >
        <Table
            key="records"
            columns={columns}
            dataSource={lotteryRecords}
            size="small"
            loading={loading}
            pagination={{ pageSize: 8 }}
        />
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

  handleFooterNavigation(evt) {
    if (evt.key === 'lotteryRecords') {
       this.setState({visibleModal: !this.state.visibleModal })
        const {lotteryRecords, dispatch} = this.props;
       if (lotteryRecords && lotteryRecords.length < 1) {
         dispatch(fetchtodayLotteryRecords());
       }
    }
  }

  renderBottomNavigation() {
      return(
        <Menu
          onClick={this.handleFooterNavigation.bind(this)}
          style={{width:"auto"}}
          mode="horizontal"
          theme="dark"
          defaultSelectedKeys={['-1']}
          selectedKeys={["-1"]}
        >
          <Menu.Item key="lotteryRecords">
            <Icon type="database" />今日開獎記錄
          </Menu.Item>
          <Menu.Item key="3">
            退出
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
    const { user, lottery} = state;
    return {
        userInfo: user.userInfo,
        lotteryRecords: lottery.lotteryRecords
    };
})(Home);
