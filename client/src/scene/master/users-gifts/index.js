import React, { Component } from 'react';
import { isArray } from 'lodash';
import {Table , Popconfirm, Button, Modal, message} from 'antd';
import "./index.less"
import {connect} from "react-redux";
import {getGiftUserList, createGiftUser, removeGiftRecord,
    removeGiftUser, getUserGifts, userUpadteName} from "../../../actions/gift";
import AddUserDialog from './addUserDialog'
import ControlUserDialog from './controlUserDialog'

const giftScore = {
    "传说": 4,
    "英雄": 3,
    "精英": 2,
};
const giftColor = {
    "传说": {color: 'gold'},
    "英雄": {color: 'rebeccapurple'},
    "精英": {color: 'deepskyblue'},
};

class UsersGifts extends Component {
    constructor(props) {
        super(props);
        this.inputData =[];
        this.state = {
            addUserDialog: false,
            userInfoDialog: false,
            currGiftsInfo: [],
            personalDetailModel: false,
            userInfo: {},
        }
    }
    componentWillMount() {
        this.refresh();
    }

    componentWillReceiveProps(nextProps) {
        // const { usersInfo  } = this.props;
        // const {usersInfo: NextUserInfo } = nextProps;
    }
    refresh = () => {
        const { dispatch } = this.props;
        dispatch(getGiftUserList());
        dispatch(getUserGifts());
    };
    handleChange(key,evt){
        this.inputData[key] = evt.target.value
    }
    handleCreateUser = () => {
        this.setState({ addUserDialog: true})
    };
    onAddUserOK = (userName, fightTime) => {
        const { dispatch } = this.props;
        this.setState({ addUserDialog: false});
        dispatch(createGiftUser( userName, fightTime)).then((resp) => {
            if(resp.response && resp.response.errorCode) {
                message.error(resp.errorCode);
                return;
            }
            message.success('添加成功');
            dispatch(getGiftUserList())
        });
    };
    onUserUpdateName = (uid, name) => {
        const { dispatch } = this.props;
        //userInfoDialog: true userUpadteName
        dispatch(userUpadteName(uid, name)).then((resp) => {
            if(resp.response && resp.response.errorCode) {
                message.error(resp.errorCode);
                return;
            }
            message.success('修改成功');
            dispatch(getGiftUserList())
        });

    };
    onCloseControlDialog = () => {
        this.setState({ userInfoDialog: false});
    };
    onClosePersonalGiftDialog = () => {
        this.setState({ personalDetailModel: false});
    };
    onDeleteUser = (info) => {
        const { dispatch } = this.props;
        this.setState({ personalDetailModel: false});
        const { uid } = info;
        dispatch(removeGiftUser(uid)).then((resp) => {
            if(resp.response && resp.response.errorCode) {
                message.error(resp.errorCode);
                return;
            }
            message.success('删除成功');
            dispatch(getUserGifts())
        });
    };
    onUserSign = () => {
        const { dispatch } = this.props;
        dispatch(getGiftUserList())
        this.onCloseControlDialog();
    };
    controlUser = (record)=> {
        this.setState({
            userInfo: record,
            userInfoDialog: true
        });
    };
    getUserGiftsById(userId) {
      const { gifts } = this.props;
      const userGifts = [];
        if (gifts && gifts.length > 0) {
            gifts.map((value, key)=>{
                if (value.userId === userId) {
                    const { uid, giftQuality, date} = value;
                    userGifts.push({ uid, giftQuality, date});
                }
            });
        }
     return userGifts;
    };
    getUserGiftsScore(userId) {
        const userGifts = this.getUserGiftsById(userId);
        let score = 0;
        userGifts.map((v) => {
            score = score + giftScore[v.giftQuality];
        });
        return score;
    };

    sortUserInfo() {
        const { usersInfo } = this.props;
        for (let k = 0; k<=usersInfo.length; k++) {
            const user = usersInfo[k];
            if (user) {
                user.score = (this.getUserGiftsScore(user.uid) / user.fightTimes).toFixed(2);
            }
        }
        usersInfo.sort( (o1, o2)=> {
            return o1.score - o2.score;
        })
    }
    showUserGifts(evt, userId) {
        const currGiftsInfo = this.getUserGiftsById(userId);
        this.setState({personalDetailModel: true, currGiftsInfo});
        let e = evt || window.event;
        if ( e && e.stopPropagation ){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
    }
    handleRemoveGiftRecordDetail = (giftRecord) => {
        console.warn(giftRecord);
        const { dispatch } = this.props;
        dispatch(removeGiftRecord(giftRecord.uid)).then((resp) => {
            if(resp.response && resp.response.errorCode) {
                message.error(resp.errorCode);
                return;
            }
            message.success('删除成功');
            this.setState({personalDetailModel: false});
            dispatch(getGiftUserList());
            dispatch(getUserGifts());
        });
    };

    renderModal() {
        const { currGiftsInfo } = this.state;
        const {loading} = this.props;
        const columns = [{
            title: '礼包类型',
            dataIndex: 'giftQuality',
            render:(_, data, key) =>{
                return(
                    <span key={key} style={giftColor[data.giftQuality]}>{data.giftQuality}</span>
                );
            }
        }, {
            title: '日期',
            dataIndex: 'date',
            render:(_, data, key) =>{
                return(
                    <span key={key}>{data.date.slice(0, 10)}</span>
                );
            }
        },{
            title: '点击删除',
            render: (_,data) => {
                return(
                    <span>
                         <a onClick={ (e)=> { this.handleRemoveGiftRecordDetail(data) } }>删除记录</a>
                    </span>
                );
            }
        }];
        return(
            <Modal
                title="礼包详情"
                visible={this.state.personalDetailModel}
                onCancel={this.onClosePersonalGiftDialog}
                footer={null}
            >
                <Table
                    key="records"
                    columns={columns}
                    dataSource={currGiftsInfo}
                    size="small"
                    loading={loading}
                    pagination={{ pageSize: 8 }}
                />
            </Modal>
        );
    }

    render() {
        const {usersInfo, loading } = this.props;
        this.sortUserInfo();
        const columns = [
            {
                title: 'ID',
                dataIndex: 'uid',
            },
            {
                title: '玩家',
                dataIndex: 'name',
            },
            {
                title: '总战次',
                dataIndex: 'fightTimes',
            },
            {
                title: '得包率',
                dataIndex: 'score',
                render: (_,data,key) => {
                    return (
                        <span key={key}>
                            {`${data.score}=>`}
                            <a onClick={(e) => { this.showUserGifts(e, data.uid) }}>查看详情</a>
                        </span>
                    )
                }
            }
        ];
        return(
            <div className="gifts-users">
                <div className="gifts-users-head">
                    <Button
                        type="primary"
                        icon="usergroup-add"
                        onClick={this.handleCreateUser}
                    >添加新玩家
                    </Button>
                </div>
                {
                    isArray(usersInfo) &&
                    <Table
                        key="users"
                        columns={columns}
                        dataSource={usersInfo}
                        size="small"
                        loading={loading}
                        onRow={(record) => {
                            return {
                                onClick: (event) => { this.controlUser(record)},       // 点击行
                                onDoubleClick: (event) => {},
                                onContextMenu: (event) => {},
                                onMouseEnter: (event) => {},  // 鼠标移入行
                                onMouseLeave: (event) => {}
                            };
                        }}
                    />
                }
                <AddUserDialog
                    visible={this.state.addUserDialog}
                    onOk={this.onAddUserOK}
                    onCancel={() => this.setState({ addUserDialog: false})}
                />
                <ControlUserDialog
                    visible={this.state.userInfoDialog}
                    userInfo={this.state.userInfo}
                    onCancel={this.onCloseControlDialog}
                    onGiveGift={ ()=>{  this.refresh(); this.onCloseControlDialog()}}
                    onDelete={this.onDeleteUser}
                    onUserSign={this.onUserSign}
                    onUserUpdateName={this.onUserUpdateName}
                    
                />
                {this.renderModal()}
            </div>
        )
    }
}

export default connect((state, ownProps) => {
    //giveGiftUser giftsDetail
    const { giftUser, giftsDetail } = state;
    return {
        usersInfo : giftUser.usersInfo,
        gifts: giftsDetail.userGifts,
        loading : giftUser.loading
    };
})(UsersGifts);
