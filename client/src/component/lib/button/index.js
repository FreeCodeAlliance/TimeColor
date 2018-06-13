import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.less';

export default class Button extends PureComponent {
    static propTypes = {
        size: PropTypes.oneOf(['lg', 'sm']),
        title: PropTypes.string,
        className: PropTypes.string,
        disabledStyle: PropTypes.string,
        titleStyle: PropTypes.string,
        titleDisabledStyle: PropTypes.string,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
        inverse: PropTypes.bool,
        highlight: PropTypes.bool,
        border: PropTypes.bool,
    };
    static defaultProps = {
        size: 'lg',
        disabled: false,
        inverse: false,
        highlight: false,
        border: false,
    };
    onPress = () => {
        const { disabled, onClick } = this.props;
        if (disabled) return;
        if (onClick) onClick();
    };
    render() {
        const {
            size,
            title,
            disabled,
            disabledStyle,
            titleDisabledStyle,
            titleStyle,
            className,
            inverse,
            highlight,
            border,
        } = this.props;
        let buttonStyle = 'button-base';
        buttonStyle = size === 'sm' ? `${buttonStyle} button-sm` : buttonStyle;
        buttonStyle = inverse ? `${buttonStyle} button-inverse` : buttonStyle;
        buttonStyle = highlight ? `${buttonStyle} button-highlight` : buttonStyle;
        buttonStyle = disabled ? `${buttonStyle} button-disabled` : buttonStyle;
        buttonStyle = inverse && disabled ? `${buttonStyle} button-inverse-disabled` : buttonStyle;
        buttonStyle = border ? `${buttonStyle} button-border` : buttonStyle;
        buttonStyle = highlight && border ? `${buttonStyle} button-inverse-highlight` : buttonStyle;
        buttonStyle = border && disabled ? `${buttonStyle} button-inverse-border` : buttonStyle;
        buttonStyle = `${buttonStyle} ${className}`;
        buttonStyle = `${buttonStyle} ${disabledStyle}`;

        let titleStyleTemp = 'button-title-base';
        titleStyleTemp = size === 'sm' ? `${titleStyle} button-title-sm` : titleStyleTemp;
        titleStyleTemp = inverse ? `${titleStyleTemp} button-title-inverse` : titleStyleTemp;
        titleStyleTemp = highlight ? `${titleStyleTemp} button-title-highlight` : titleStyleTemp;
        titleStyleTemp = `${titleStyleTemp} ${titleStyle}`;
        titleStyleTemp = disabled ? `${titleStyleTemp} button-title-disabled` : titleStyleTemp;
        titleStyleTemp = inverse && disabled ?
            `${titleStyleTemp} button-title-inverse-disabled` : titleStyleTemp;
        titleStyleTemp = `${titleStyleTemp} ${titleDisabledStyle}`;

        return (
            <div
                onClick={this.onPress}
                className={buttonStyle}
            >
                {title && <p className={titleStyleTemp}>{title}</p>}
            </div>
        );
    }
}