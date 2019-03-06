import React, { Component } from 'react';
import { isArray } from 'lodash';
import {Tabs , Popconfirm, Button, Modal, message} from 'antd';
import "./index.less"
import {connect} from "react-redux";
import GroupViewer from './group';

const TabPane = Tabs.TabPane;
class Home extends Component {
    constructor(props) {
        super(props);
        this.inputData =[];
        this.state = {
            userInfo: {},
        }
    }
    componentWillMount() {
        // const { dispatch } = this.props;
        // dispatch(getGiftUserList());
        // dispatch(getUserGifts());
    }

    render() {
        return(
            <div className="home-root">
                <Tabs type="card">
                    <TabPane tab="礼包统计" key="1">
                        <div className="user-container">
                            {this.props.children}
                        </div>
                    </TabPane>
                    <TabPane tab="组织战常用阵容" key="2">
                        <GroupViewer />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default connect((state, ownProps) => {
    const { giftUser, giftsDetail } = state;
    return {
        usersInfo : giftUser.usersInfo,
        gifts: giftsDetail.userGifts,
        loading : giftUser.loading
    };
})(Home);
