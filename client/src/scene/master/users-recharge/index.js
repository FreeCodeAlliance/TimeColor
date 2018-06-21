import React, { Component } from 'react';

import {Table, Button } from 'antd';
import "./index.less"

export default class Home extends Component {
    state = {
        data: '',
    };

    constructor(props) {
        super(props);
        this.state = {tab: 1};

        this.data = [];
        for (let k=1; k<=15; k++){
            let info = {
                key: `${k}`,
                account: '用户名称',
                money: `${k}`,
                recharge: 'yes',
            }
            this.data.push(info);
        }

    }

    handleRecharge(p1, p2) {
        console.log(p1, p2)
    }

    render() {
        const columns = [{
            title: '账户',
            dataIndex: 'account',
        }, {
            title: '余额',
            dataIndex: 'money',
        }, {
            title: '充值',
            dataIndex: 'recharge',
            render: (p1,p2) => (
                <span>
                       <Button
                           type="primary"
                           size="small"
                           onClick={this.handleRecharge.bind(this, p1, p2)}
                       >充值</Button>
                </span>
            )
        }];
        return(
            <div className="users-recharge-root">
                <h4 style={{textAlign:'center', backgroundColor:"#32CDFF", margin: 0, padding: "10px 0"}}>用户数据</h4>
                <Table columns={columns} dataSource={this.data} size="small"  loading={false} />
            </div>
        )
    }
}