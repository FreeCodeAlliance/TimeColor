import React, { Component } from 'react';

import {Table , Popconfirm} from 'antd';
import "./index.less"
import {connect} from "react-redux";
import {getUserList, userRecharge} from "../../../actions/master";
import {message} from "antd/lib/index";

class Rechange extends Component {
    constructor(props) {
        super(props);
        this.inputData =[];
    }

  componentWillMount() {
    //console.log("componentWillMount:", store.get('token'))
    window.addEventListener('resize', ()=>{});//Tood: reszie windows
    const { dispatch } = this.props;
    dispatch(getUserList())
  }

  handleRecharge(data, key) {
    const {dispatch} = this.props;
    dispatch(userRecharge(data.account, this.inputData[key])).then((result)=> {
      if (result.response ) {
        if (result.response.errorCode)
          message.warn(result.response.errorCode)
        else {
          message.success('充值成功');
          dispatch(getUserList())
        }
      }
    })
  }

  handleChange(key,evt){
    this.inputData[key] = evt.target.value
  }

  render() {
    const {userList, loading} = this.props;
    console.log('userList', userList);
    const columns = [{
        title: '账户',
        dataIndex: 'account',
    }, {
        title: '余额',
        dataIndex: 'quota',
    }, {
        title: '充值',
        dataIndex: 'recharge',
        render: (_,data,key) => (
            <span>
                  <input className="rechargeInput" type="number" onChange={this.handleChange.bind(this, key)}/>
                  <Popconfirm title="确定充值吗?" onConfirm={() => this.handleRecharge(data, key)}>
                    <a href="javascript:;">充值</a>
                  </Popconfirm>
            </span>
        )
    }];
    return(
        <div className="users-recharge-root">
            <h4 style={{textAlign:'center', backgroundColor:"#32CDFF", margin: 0, padding: "10px 0"}}>用户数据</h4>
            <Table columns={columns} dataSource={userList} size="small"  loading={loading} />
        </div>
    )
  }
}

export default connect((state, ownProps) => {
  const { master} = state;

  return {
    userList : master.userList,
    loading : master.loading
  };
})(Rechange);
