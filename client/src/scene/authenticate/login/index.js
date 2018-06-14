import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';
import FormInput from '../../../component/lib/form-input';
import Button from '../../../component/lib/button';

import {validate} from '../../../component/lib/validate';
import {fetchRecords} from "../../../actions"

import "./index.less"

class Login extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        loading: PropTypes.bool,
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

    handleBlur = (name) => {
        if (this.state[name].length === 0) return;
        const state = {};
        state[`${name}First`] = false;
        state[`${name}Error`] = validate(name, this.state[name]);
        this.setState(state);
    };

    handleLogin = () => {
        const {router} = this.props;
        //router.push("user");
        router.replace("user");
        //message.loading('登入中...');
        //setTimeout(() =>{message.destroy();},500);
        //const {dispatch} = this.props;
        //dispatch( fetchRecords("u_456")); //fixme: test api request

    }
    render() {
        return (
            <div className="authenticate-login">
                <div className="authenticate-login-content">
                    <FormInput
                      key="1"
                      type="tel"
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
                    <Button
                      key="3"
                      inverse
                      title="登录"
                      className="authenticate-login-button"
                      onClick={this.handleLogin}
                    />
                </div>
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    const { consumeRecords} = state;
    return {
        consumeRecords
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