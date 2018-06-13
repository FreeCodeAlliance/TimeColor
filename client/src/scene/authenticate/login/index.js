import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FormInput from '../../../component/lib/form-input';
import Button from '../../../component/lib/button';

import {validate} from '../../../component/lib/validate';

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

    handleChange = (name, value) => {
        const state = {};
        state[name] = value;
        console.log(this.state[`${name}First`]);
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
        console.log(router);
        //router.push("user");
        router.replace("user");
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

export default connect()(Login);