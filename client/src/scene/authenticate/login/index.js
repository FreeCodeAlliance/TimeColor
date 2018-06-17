import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';
import FormInput from '../../../component/lib/form-input';
import LibButton from '../../../component/lib/button';
import { Button } from 'antd';
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
        loading: false
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
        this.setState({loading: true})
        const {dispatch} = this.props;
        dispatch(fetchRecords("u_456")).then((result) => {
            if (result.response && result.response.responseState) {
                message.success('登入成功');
                const {router} = this.props;
                router.replace("home");
            }
        });
    };

    render() {
        let {consumeRecords} = this.props;
        console.log("consumeRecords========", consumeRecords);

        return (
            <div className="authenticate-login">
                <div className="authenticate-login-content">
                    <img src={require("../../../icon/logo.png")} />
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
                    <div className="authenticate-login-buttonPanel">
                        <Button style={{height: '48px', fontSize: '20px'}}>注册</Button>
                        <Button
                            onClick={this.handleLogin.bind(this)}
                            loading={this.state.loading}
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