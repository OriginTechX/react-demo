import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TouchableOpacity extends Component {
  static propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    clickCallBack: PropTypes.func
  }
  handleTouchStart = () => {
    this.div.style.opacity = '0.3'
  }
  handleTouchEnd = () => {
    this.div.style.opacity = '1'
    this.props.clickCallBack();
  }
  render() {
    return (
      <div 
          className={`btn-con ${this.props.className}`}
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd} 
          ref={(div) => this.div = div}>
        {this.props.text || '确认'}
      </div>
    );
  }
}

export default TouchableOpacity;