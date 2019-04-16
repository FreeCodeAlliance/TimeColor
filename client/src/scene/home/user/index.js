import React, { Component } from 'react';
import { isArray } from 'lodash';
import {Table ,Modal} from 'antd';
import "./index.less"
import {connect} from "react-redux";
import {getGiftUserList, getUserGifts} from "../../../actions/gift";
import {GIFT_COLOR, GIFT_SCORE} from "../../../constant/gift";

const giftScore = GIFT_SCORE;
const giftColor = GIFT_COLOR;
class Home extends Component {
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
        const { dispatch } = this.props;
        dispatch(getGiftUserList());
        dispatch(getUserGifts());
    }

    handleChange(key,evt){
        this.inputData[key] = evt.target.value
    }
    handleCreateUser = () => {
        this.setState({ addUserDialog: true})
    };
    onClosePersonalGiftDialog = () => {
        this.setState({ personalDetailModel: false});
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
                user.score = user.fightTimes !== 0 ? (this.getUserGiftsScore(user.uid) / user.fightTimes).toFixed(2) : 0
            }
        }
        usersInfo.sort( (o1, o2)=> {
            if ( o1.score - o2.score === 0) {
                return o2.fightTimes - o1.fightTimes;
            }
            return o1.score - o2.score;
        })
    }
    showUserGifts(evt, user) {
        const currGiftsInfo = this.getUserGiftsById(user.uid);
        this.setState({personalDetailModel: true, currGiftsInfo, currUser: user});
        let e = evt || window.event;
        if ( e && e.stopPropagation ){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
    }

    renderModal() {
        const { currGiftsInfo, currUser } = this.state;
        const {loading} = this.props;
        const title = currUser ? `${currUser.name}礼包详情` : '礼包详情';
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
        }];
        return(
            <Modal
                title={title}
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
                title: '玩家',
                dataIndex: 'name',
            },
            {
                title: '总战次',
                dataIndex: 'fightTimes',
            },
            {
                title: '得包/出战比',
                dataIndex: 'score',
                render: (_,data,key) => {
                    return (
                        <span key={key}>
                            {`${data.score}=>`}
                            <a onClick={(e) => { this.showUserGifts(e, data) }}>查看详情</a>
                        </span>
                    )
                }
            }
        ];
        if (loading) {
            return (
                <div className="user-Loading">
                    <p>Loading...</p>
                </div>
            );
        }
        return(
            <div className="gifts-users">
                {
                    isArray(usersInfo) &&
                    <Table
                        key="users"
                        columns={columns}
                        dataSource={usersInfo}
                        size="small"
                        loading={loading}
                    />
                }
                {this.renderModal()}
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
