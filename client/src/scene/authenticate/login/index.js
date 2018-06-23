import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormInput from '../../../component/lib/form-input';
import { message, Button } from 'antd';
import {validate} from '../../../component/lib/validate';
//import {fetchRecords} from "../../../actions"
import {register, login} from "../../../actions/user"

import "./index.less"

class Login extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        installationId: PropTypes.string,
    };

    state = {
        account: '',
        accountError: null,
        accountFirst: false,
        password: '',
        passwordError: null,
        passwordFirst: false,
    };
    componentWillMount() {
        message.config({
            top: 10,
            duration: 3,
            maxCount: 1
        });
    }

    handleChange = (name, value) => {
        const state = {};
        state[name] = value;
        if (!this.state[`${name}First`]) {
            state[`${name}Error`] = validate(name, value);
        } else {
            state[`${name}Error`] = null;
        }
        this.setState(state);
    };

    isErrorcheckInput() {
        if (validate("account", this.state.account)) {
            message.warn("账号格式不对")
            return true
        }
        if (validate("password", this.state.password )) {
            message.warn("密码格式不对")
            return true
        }
        return null
    }

    handleBlur = (name) => {
        if (this.state[name].length === 0) return;
        const state = {};
        state[`${name}First`] = false;
        state[`${name}Error`] = validate(name, this.state[name]);
        this.setState(state);
    };

    handleRegister = () => {
        if ( this.isErrorcheckInput()) {
            return
        }
        const {dispatch} = this.props;
        dispatch(register(this.state['account'], this.state['password'])).then((result) => {
            if (result.response) {
                if (result.response.errorCode)
                    message.warn(result.response.errorCode)
                else {
                    message.success('注册成功');
                }
            }
            else {
                message.error('网络不佳');
            }
        });
    };

    handleLogin = () => {
        if ( this.isErrorcheckInput()) {
            return
        }
        const {dispatch} = this.props;
        dispatch(login(this.state['account'], this.state['password'])).then((result) => {
            if (result.response ) {
                if (result.response.errorCode)
                    message.warn(result.response.errorCode)
                else {
                    message.success('登入成功');
                    const {router} = this.props;
                    if ("15080312967" === this.state.account) {
                        router.replace("master");
                    } else {
                        router.replace("home");
                    }

                }
            } else {
                message.error('网络不佳');
            }
        });
    };

    render() {
        let {user} = this.props;
        return (
            <div className="authenticate-login">
                <div className="authenticate-login-content">
                    <img src={require("../../../icon/logo.png")} />
                    <FormInput
                      key="1"
                      type="text"
                      name="mobile"
                      maxLength="11"
                      placeholder="请输入账号"
                      value={this.state.account}
                      error={this.state.accountError}
                      onChange={value => this.handleChange('account', value)}
                      onBlur={() => this.handleBlur('account')}
                    />
                    <FormInput
                      key="2"
                      type="password"
                      name="password"
                      maxLength="12"
                      placeholder="密码，至少六位"
                      error={this.state.passwordError}
                      onChange={value => this.handleChange('password', value)}
                      onBlur={() => this.handleBlur('password')}
                      onKeyUp={this.onKeyUp}
                    />
                    <div className="authenticate-login-buttonPanel">
                        <Button
                            style={{height: '48px', fontSize: '20px', width: '26%'}}
                            onClick={this.handleRegister.bind(this)}
                        >注册</Button>
                        <Button
                            onClick={this.handleLogin.bind(this)}
                            loading={user.loading}
                            style={{height: '48px', fontSize: '20px'}}
                            type="primary"
                            className="authenticate-login-buttonPanel-item"
                        >登入</Button>
                    </div>

                </div>
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    const { user} = state;
    return {
        user
    };
})(Login);

/*
 export default connect((state, ownProps) => {
 const { consumeRecords} = state;
 return {
 consumeRecords
 };
 })(ConsumeRecord);
 */