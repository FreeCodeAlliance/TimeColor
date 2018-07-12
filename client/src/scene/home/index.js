import React, { Component } from 'react';

import { Menu, Icon, Modal, Table } from 'antd';
//import {Link } from 'react-router'
import "./index.less"
//import { Tabs } from 'antd';
//const TabPane = Tabs.TabPane;
import {connect} from "react-redux";
//import store from "store"
import {fetchMe, logout} from "../../actions/user";
import {fetchTodayLotteryRecords, getBetLogByIssue} from "../../actions/lottery";
//const SubMenu = Menu.SubMenu;
//var QRCode = require('qrcode.react');
//QRCode value="http://www.baidu.com" size={256}

class Home extends Component {
    state = {
        current: '',
        visibleModal: false,
        visibleDetailModal: false,
        queryCurrNo: "- -",
        queryCurrLotteryNumber: "- -",
        queryCurrWinResult: '- -'
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
  };

  handleBetDetail (data) {
    this.showBetDetailModel(data)
  }

  showBetDetailModel(data) {
    const {dispatch} = this.props;
    dispatch(getBetLogByIssue(data.issue))
    this.setState({visibleDetailModal: true,
                    queryCurrWinResult: data.win,
                    queryCurrNo: data.issue,
      queryCurrLotteryNumber:data.result.toString()});
  }

  renderBetDetailModal() {
    const {betLog} = this.props;
    console.log("================================>",betLog )
    const title = `${this.state.queryCurrNo} 期 購買記錄(還沒完善)`;
    return (
      <Modal
        title = {title}
        visible={this.state.visibleDetailModal}
        onCancel={()=>{this.setState({visibleDetailModal: false})}}
        footer={null}
      >
        <h4>本期中獎號碼: {this.state.queryCurrLotteryNumber}</h4>
        <h4>本期縂輸贏：{this.state.queryCurrWinResult}</h4>
        <p>購買記錄：</p>
        {betLog.tth !== undefined &&
        <div>
          <div>萬: {betLog.tth.toString()}</div>
          <div>千: {betLog.tho.toString()}</div>
          <div>百: {betLog.hun.toString()}</div>
          <div>十: {betLog.ten.toString()}</div>
          <div>個: {betLog.ind.toString()}</div>
          <div>大: {betLog.big}</div>
          <div>小: {betLog.small}</div>
        </div>
        }
      </Modal>
    )
  }
  renderModal() {
    const columns = [{
      title: '期號',
      dataIndex: 'issue',
    }, {
      title: '開獎號碼',
      dataIndex: 'result',
      render:(_, data, key) =>{
        return(
          <span key={key}>{data.result.toString()}</span>
        );
      }
    }, {
      title: '輸贏',
      dataIndex: 'win',
      render:(_,data) => {
        return(
          <span>
            {data.win !== null &&<span>{data.win}</span>}
            {data.win === null && <span>- -</span>}
          </span>
        );
      }
    },{
      title: '下注記錄',
      dataIndex: 'recharge',
      render: (_,data) => {
        return(
            <span>
              {data.win === null &&<span>沒下注</span>}
              {data.win !== null && <a onClick={this.handleBetDetail.bind(this, data)}>查看詳情</a>}
            </span>
          );
      }
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
         dispatch(fetchTodayLotteryRecords());
       }
    } else if (evt.key === 'exit') {
      const {router, dispatch} = this.props;
      dispatch(logout())
      router.replace('authenticate')
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
          <Menu.Item key="exit">
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
          {this.renderBetDetailModal()}
        </div>
    )
    }
}

export default connect((state, ownProps) => {
    const { user, lottery} = state;
    return {
        userInfo: user.userInfo,
        lotteryRecords: lottery.lotteryRecords,
        betLog: lottery.betLog,
        loading: lottery.loading,
        lotteryStatus: lottery.status
    };
})(Home);
