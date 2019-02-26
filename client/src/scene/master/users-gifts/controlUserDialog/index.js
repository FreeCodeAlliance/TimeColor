import React,  { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Modal, Radio, Button, message } from 'antd';
import {connect} from "react-redux";
import './index.less'
import { giveGiftUser, userSignIn } from "../../../../actions/gift"

const RadioGroup = Radio.Group;

const giftsDesc = ["传说", "精英", "英雄"];

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
    };
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            fightTime: 3,
            giftIndex: 1,
            isVisible: true,
        };
    }
    onDelete = (e) => {
        const { onDelete, userInfo } = this.props;
        if(onDelete){ onDelete(userInfo); }
    };
    onGiveGift = () => {
        const { dispatch, onGiveGift } = this.props;
        const { userInfo } = this.props;
        const { giftIndex } = this.state;
        // console.warn(userInfo.uid, userInfo.name, giftsDesc[giftIndex]);
        dispatch( giveGiftUser(userInfo.uid, userInfo.name, giftsDesc[giftIndex] )).then((result) => {
            if (result.response && !result.response.errorCode) {
                 message.success('发送成功')
            }
            else {
                message.error('网络不佳');
            }
        });
        if (onGiveGift) {onGiveGift()}
    };
    onGiftSelectChange = (e) => {
        this.setState({
            giftIndex: e.target.value,
        });
    };
    onTimesChange = (value) => {
        this.setState({ fightTime: value  })
    };
    onUserSign = () => {
        const { dispatch, userInfo, onUserSign } = this.props;
        const { fightTime } = this.state;
        const times = userInfo.fightTimes + fightTime;
        console.warn(userInfo.uid, times);
        dispatch( userSignIn(userInfo.uid, times)).then((result) => {
            if (result.response && !result.response.errorCode) {
                message.success('签到成功');
                //FIXME CACHE NATIVE ?
                if (onUserSign) { onUserSign();}
            }
            else {
                message.error('网络不佳');
            }
        });
    };
    render() {
        const { visible, onCancel, userInfo } = this.props;
        return (
            <Modal
                title={userInfo.name}
                visible={visible}
                footer={null}
                closable
                maskClosable
                onCancel={onCancel}
            >
                <div>
                    <RadioGroup onChange={this.onGiftSelectChange} value={this.state.giftIndex}>
                        <Radio value={0} className="gift-level1">传说</Radio>
                        <Radio value={1} className="gift-level2">英雄</Radio>
                        <Radio value={2} className="gift-level3">精英</Radio>
                    </RadioGroup>
                    <Button type="primary" onClick={this.onGiveGift}>发送礼包</Button>
                </div>
                <div className='userSignInContent'>
                    <InputNumber min={-3} max={3} defaultValue={this.state.fightTime} onChange={this.onTimesChange} />
                    <Button type="primary" onClick={this.onUserSign}>参战签到</Button>
                </div>
                <div className= "dialog-footer">
                    <Button type="danger" onClick={this.onDelete}>删除用户</Button>
                </div>
            </Modal>
        )
    }
}
export default connect()(ControlUserDialog);