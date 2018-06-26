import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import './index.less';

const loadingImage = [
  require('./img/loading01@1x.png'),
  require('./img/loading02@1x.png'),
  require('./img/loading03@1x.png'),
  require('./img/loading04@1x.png'),
];

export default class SpinSelf extends PureComponent {
  static propTypes = {
    animating: PropTypes.bool,
    type: PropTypes.oneOf(['system', 'custom']),
    isShade: PropTypes.bool,
    className: PropTypes.string,
    isTop: PropTypes.bool,
    whiteSpin: PropTypes.bool,
  };
  static defaultProps = {
    animating: false,
    isShade: false,
    isTop: false,
    whiteSpin: false,
    type: 'custom',
  };
  state = {
    imageIndex: -1,
  };
  componentWillMount() {
    const { type } = this.props;
    if (type === 'custom') {
      this.startLoading();
    }
  }
  componentWillReceiveProps(nextProps) {
    const { type, animating } = this.props;
    if (nextProps.animating && nextProps.animating !== animating && type === 'custom') {
      this.setState({ imageIndex: -1 });
    }
  }
  componentWillUnmount() {
    this.stopLoading();
  }
  startLoading = () => {
    this.state.imageIndex = -1;
    this.handler = global.setInterval(() => {
      let { imageIndex } = this.state;
      imageIndex += 1;
      if (imageIndex >= loadingImage.length) {
        imageIndex = 0;
      }
      this.setState({ imageIndex });
    }, 350);
  };
  stopLoading = () => {
    if (this.handler) {
      clearInterval(this.handler);
      this.handler = null;
    }
  };
  render() {
    const { animating, type, isShade, className, isTop, whiteSpin } = this.props;
    const { imageIndex } = this.state;
    const backgroundColor = isShade ? 'rgba(0, 0, 0, 0.2)' : 'transparent';
    const topClass = isTop ? 'spin-top' : '';
    const spinColorClass = whiteSpin ? 'spin-white' : '';
    if (animating) {
      return (
        <div className={`spin ${topClass} ${spinColorClass} ${className}`} style={{ backgroundColor }}>
          {type === 'custom' &&
          <img src={loadingImage[imageIndex]} alt="" />
          }
          {type === 'system' &&
          <Spin size="large" />
          }
        </div>
      );
    }
    return null;
  }
}
