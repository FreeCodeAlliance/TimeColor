import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormInput from '../../../component/lib/form-input';
import { message, Button } from 'antd';
import {validate} from '../../../component/lib/validate';
//import {fetchRecords} from "../../../actions"
import {register, login} from "../../../actions/user"
import {masterLogin} from "../../../actions/master"
import Spin from '../../../component/lib/spin';
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
            message.warn("賬號格式不對")
            return true
        }
        if (validate("password", this.state.password )) {
            message.warn("密碼格式不對")
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
          if ( this.state.account === 'master') {
            message.warn("已被注冊")
            return true
          }
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

    handleMasterLogin = () => {
      const {dispatch} = this.props;
      dispatch(masterLogin(this.state['account'], this.state['password'])).then((result) => {
        if (result.response ) {
          if (result.response.errorCode)
            message.warn(result.response.errorCode)
          else {
            message.success('管理员登入成功');
            const {router} = this.props;
             router.replace("master");
          }
        } else {
          message.error('网络不佳');
        }
      });
    };

    handleLogin = () => {
      if ( this.isErrorcheckInput()) {
            return
        }
      if ("master" === this.state.account) {
          this.handleMasterLogin();
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
                        router.replace("home");
                }
            } else {
                message.error('網絡不佳');
            }
        });
    };

    render() {
        let {user, master} = this.props;
        const loading = user.loading || master.loading;
        return (
            <div className="authenticate-login">
                <div className="authenticate-login-content">
                    <p2 className="authenticate-login-title">No.组织系统v1.1</p2>
                    <img src={require('../../../icon/logo.jpg')}/>
                    <FormInput
                      key="1"
                      type="text"
                      name="mobile"
                      maxLength="11"
                      placeholder="請輸入賬號"
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
                      placeholder="密碼，至少六偉"
                      error={this.state.passwordError}
                      onChange={value => this.handleChange('password', value)}
                      onBlur={() => this.handleBlur('password')}
                      onKeyUp={this.onKeyUp}
                    />
                    <div className="authenticate-login-buttonPanel">
                        <Button
                            style={{height: '48px', fontSize: '20px', width: '26%'}}
                            onClick={this.handleRegister.bind(this)}
                        >注冊</Button>
                        <Button
                            onClick={this.handleLogin.bind(this)}
                            loading={loading}
                            style={{height: '48px', fontSize: '20px'}}
                            type="primary"
                            className="authenticate-login-buttonPanel-item"
                        >登入</Button>
                    </div>
                </div>
                <Spin animating={loading} type="system" isShade isTop whiteSpin />
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    const { user, master} = state;
    return {
        user,
        master
    };
})(Login);
