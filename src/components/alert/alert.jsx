import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './alert.less';

class Alert extends Component {
  static propTypes = {
    alertTip: PropTypes.string.isRequired,
    alertStatus: PropTypes.bool.isRequired,
    closeAlert: PropTypes.func.isRequired
  }
  FirstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
  }
  handleConfirm = () => {
    this.props.closeAlert()
  }
  render() {
    return (
      <ReactCSSTransitionGroup
        component={this.FirstChild}
        transitionName="alert"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {
          this.props.alertStatus && <div className="alert-con">
            <div className="alert-context">
              <div className="alert-content-detail">
                {this.props.alertTip}
              </div>
              <TouchableOpacity 
                className="confirm-btn"
                clickCallBack={this.handleConfirm}
              />
            </div>
          </div>
        }
      </ReactCSSTransitionGroup>
    );
  }
}

export default Alert;