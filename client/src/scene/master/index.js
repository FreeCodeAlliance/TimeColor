import React, { Component } from 'react';

import {Menu,Icon } from 'antd';
//const SubMenu = Menu.SubMenu;
//import "./index.less"
export default class MasterHome extends Component {
    state = {
        current: '',
    };

    constructor(props) {
        super(props);
        this.state = {tab: 1};
        this.data = [];
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });

        const {router} = this.props;
        let routerStr = `/master/${e.key}`
        router.push(routerStr);
    };

    renderMaserHeadNavigation() {
        return(
            <Menu
                style={{backgroundColor: "#6fe6ee"}}
                onClick={this.handleClick.bind(this)}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <Menu.Item key="recharge" style={{marginLeft: 0}}>
                    <Icon type="select" />用户充值
                </Menu.Item>
                <Menu.Item key="point">
                    用户下分
                </Menu.Item>
                <Menu.Item key="setting" >
                    开奖设置
                </Menu.Item>
            </Menu>
        );
    }

    render() {
        return(
            <div className="master-home-root">
                {this.renderMaserHeadNavigation()}
                {this.props.children}
            </div>
        )
    }
}