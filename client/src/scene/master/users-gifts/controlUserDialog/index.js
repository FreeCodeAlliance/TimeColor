import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Modal, Radio, Button, message, Input, Icon } from 'antd';
import { connect } from "react-redux";
import './index.less'
import { giveGiftUser, userSignIn } from "../../../../actions/gift"
import {GIFT_DESC} from "../../../../constant/gift";

const RadioGroup = Radio.Group;
const giftsDesc = GIFT_DESC;

class ControlUserDialog extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func,
        userInfo: PropTypes.shape({}),
        visible: PropTypes.bool,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
        onGiveGift: PropTypes.func,
        onDelete: PropTypes.func,
        onUserSign: PropTypes.func,
        onUserUpdateName: PropTypes.func,
    };
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            fightTime: 3,
            giftIndex: 1,
            isVisible: true,
            userUpdateName: ""
        };
    }
    onDelete = (e) => {
        const { onDelete, userInfo } = this.props;
        if (onDelete) { onDelete(userInfo); }
    };
    onGiveGift = () => {
        const { dispatch, onGiveGift } = this.props;
        const { userInfo } = this.props;
        const { giftIndex } = this.state;
        // console.warn(userInfo.uid, userInfo.name, giftsDesc[giftIndex]);
        dispatch(giveGiftUser(userInfo.uid, userInfo.name, giftsDesc[giftIndex])).then((result) => {
            if (result.response && !result.response.errorCode) {
                message.success('发送成功')
            }
            else {
                message.error('网络不佳');
            }
        });
        if (onGiveGift) { onGiveGift() }
    };
    onGiftSelectChange = (e) => {
        this.setState({
            giftIndex: e.target.value,
        });
    };
    onTimesChange = (value) => {
        this.setState({ fightTime: value })
    };
    onUserSign = () => {
        const { dispatch, userInfo, onUserSign } = this.props;
        const { fightTime } = this.state;
        const times = userInfo.fightTimes + fightTime;
        dispatch(userSignIn(userInfo.uid, times)).then((result) => {
            if (result.response && !result.response.errorCode) {
                message.success('签到成功');
                //FIXME CACHE NATIVE ?
                if (onUserSign) { onUserSign(); }
            }
            else {
                message.error('网络不佳');
            }
        });
    };
    onUserUpdateName = () => {
        const { onUserUpdateName, userInfo } = this.props;
        const { userUpdateName } = this.state;
        if (onUserUpdateName) { onUserUpdateName(userInfo.uid, userUpdateName); }
    }
    onChangeUserName = (e) => {
        this.setState({ userUpdateName: e.target.value });
    }
    render() {
        const { visible, onCancel, userInfo } = this.props;
        const { userUpdateName } = this.state;
        return (
            <Modal
                title={userInfo.name}
                visible={visible}
                footer={null}
                closable
                maskClosable
                onCancel={onCancel}
            >
                <div className='userControlCell'>
                    <RadioGroup onChange={this.onGiftSelectChange} value={this.state.giftIndex}>
                        <Radio value={0} className="gift-level1">{GIFT_DESC[0]}</Radio>
                        <Radio value={1} className="gift-level2">{GIFT_DESC[1]}</Radio>
                        <Radio value={2} className="gift-level3">{GIFT_DESC[2]}</Radio>
                        <Radio value={3} className="gift-level1">{GIFT_DESC[3]}</Radio>
                        <Radio value={4} className="gift-level2">{GIFT_DESC[4]}</Radio>
                        <Radio value={5} className="gift-level3">{GIFT_DESC[5]}</Radio>
                    </RadioGroup>
                    <Button type="primary" onClick={this.onGiveGift}>记礼包</Button>
                </div>
                <div className='divLine' />
                <div className='userControlCell'>
                    <p>本周次数</p>
                    <InputNumber min={-4} max={4} defaultValue={this.state.fightTime} onChange={this.onTimesChange} />
                    <Button type="primary" onClick={this.onUserSign}>参战签到</Button>
                </div>
                <div className='divLine' />
                <div className='userControlCell'>
                    <Input
                        style={{width: "180px"}}
                        size="default"
                        placeholder="修改玩家姓名"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={userUpdateName}
                        onChange={this.onChangeUserName}
                        ref={node => this.userNameInput = node}
                    />
                    <Button type="primary" onClick={this.onUserUpdateName} disabled={userUpdateName.length <= 0} >玩家改名</Button>
                </div>
                <div className="dialog-footer">
                    <Button type="danger" onClick={this.onDelete}>删除用户及其礼包数据</Button>
                </div>
            </Modal>
        )
    }
}
export default connect()(ControlUserDialog);
