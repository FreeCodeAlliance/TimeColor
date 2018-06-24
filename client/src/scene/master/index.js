import React, { Component } from 'react';

import {Menu,Icon } from 'antd';
import {connect} from "react-redux";

class MasterHome extends Component {
    state = {
        current: 'setting',
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
                    <Icon type="pay-circle-o" />用户充值
                </Menu.Item>
                <Menu.Item key="setting" >
                  <Icon type="setting" /> 开奖设置
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
export default connect()(MasterHome);