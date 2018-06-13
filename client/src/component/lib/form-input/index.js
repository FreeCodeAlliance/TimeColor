import React, { Component } from 'react';
import PropTypes from 'prop-types';

import theme from "../../../component/theme/theme"
import "./index.less"
export default class FormInput extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        inverse: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func,
        error: PropTypes.string,
        maxLength: PropTypes.string,
        value: PropTypes.string,
        onKeyUp: PropTypes.func,
    };
    static defaultProps = {
        maxLength: '30',
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(e) {
        const { onChange } = this.props;
        onChange.call(this, e.target.value);
    }

    handleBlur() {
        const { onBlur } = this.props;
        if (onBlur) {
            onBlur.call(this);
        }
    }

    render() {
        const { type, name, placeholder, error, inverse, maxLength, value, onKeyUp } = this.props;
        const color = inverse ? theme.text_color_normal : theme.text_color_inverse;
        //console.log(theme);
        return (
            <div className="form-item">
                <input
                    style={{ color }}
                    className="account-input"
                    type={type || 'text'}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    maxLength={maxLength}
                    onKeyUp={onKeyUp}
                />
                {error && <p className="input-error-text">{error}</p>}
            </div>
        );
    }

}