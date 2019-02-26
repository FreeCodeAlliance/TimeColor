import React,  { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal, Input } from 'antd';
import {connect} from "react-redux";
import './index.less'
const dialogPos = {top : 20};

class AddUserDialog extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func,
        visible: PropTypes.bool,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
    };
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            fightTime: 0,
        };
    }
    onChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
    };
    onChangeFightTime = (e) => {
        this.setState({ fightTime: e.target.value });
    };
    onOk = () => {
        const { onOk } = this.props;
        const { userName, fightTime } = this.state;
        if(onOk){ onOk(userName, fightTime); }
    };
    render() {
        const { visible, onOk, onCancel } = this.props;
        return (
            <Modal
                title="增加新成员(名字不可重复)"
                visible={visible}
                onOk={this.onOk}
                onCancel={onCancel}
            >
                <Input
                    placeholder="玩家姓名"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    // suffix={suffix}
                    value={this.state.userName}
                    onChange={this.onChangeUserName}
                    // ref={node => this.userNameInput = node}
                />
                <div className= "timeInput">
                    <Input
                        placeholder="初始参战次数"
                        // suffix={suffix}
                        value={this.state.fightTime}
                        onChange={this.onChangeFightTime}
                        // ref={node => this.userNameInput = node}
                    />
                </div>
            </Modal>
        )
    }
}

export default connect()(AddUserDialog);