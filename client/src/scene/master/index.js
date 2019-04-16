import React, { Component } from 'react';

import {Menu,Icon } from 'antd';
import {connect} from "react-redux";
import './index.less'

class MasterHome extends Component {
    state = {
        current: 'gifts',
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
                onClick={this.handleClick.bind(this)}
                selectedKeys={[this.state.current]}
                //defaultSelectedKeys={[this.state.current]}
                defaultSelectedKeys={['gifts']}
                defaultOpenKeys={['gifts']}
                mode="horizontal"
            >
                <Menu.Item key="gifts" >
                    组织人员统计
                </Menu.Item>
                {/*<Menu.Item key="recharge" style={{marginLeft: 0}}>*/}
                    {/*<Icon type="pay-circle-o" />成员DKP*/}
                {/*</Menu.Item>*/}
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
