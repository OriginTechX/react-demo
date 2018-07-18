import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import PropTypes from 'prop-types';
import { saveFormData } from '@/store/home/action';

import Header from '@/components/header/header';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity'
import Alert from '@/components/alert/alert';
import './home.less';

class Home extends Component {
  static propTypes = {
    formData: PropTypes.object,
    saveFormData: PropTypes.func
  }
  state = {
    alertStatus: false,
    alertTip: ''
  }

  selectedProList = [];

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  
  componentWillMount() {
    this.initData(this.props);
  }
  

  // 初始化数据,获取已选择的商品
  initData = props => {
    this.selectedProList = [];
    props.proData.dataList.forEach(item => {
      if (item.selectStatus && item.selectNum) {
        this.selectedProList.push(item);
      }
    })
  }
  
  /**
   * 保存表单数据至redux
   * @param {string} type 数据类型 orderSum||name||phoneNo
   * @param {object} event 事件对象
   */
  handleInput = (type, event) => {
    let value = event.target.value;
    switch(type) {
      case 'orderSum':
        value = value.replace(/\D/g, '');
      break;
      case 'name':
      break;
      case 'phoneNo':
      break;
      default:;
    }
    this.props.saveFormData1(value, type)
  }
  handleSubmitForm = () => {
    const {orderSum, name, phoneNo} = this.props.formData;
    let alertTip = '';
    if (!orderSum.toString().length) {
      alertTip = '请填写金额';
    } else if (!name.toString().length){
      alertTip = '请填写姓名';
    } else if (!phoneNo.toString().length){
      alertTip = '请填写正确的手机号';
    } else {
      alertTip = '添加数据成功!'
    }
    this.setState({
      alertStatus: true,
      alertTip
    })
  }
  // 关闭弹窗
  handleCloseAlert = () => {
    this.setState({
      alertStatus: false,
      alertTip: ''
    })
  }
  render() {
    return (
      <main className="home-container">
        <Header title="首页" record />
        <p className="common-title">请录入您的信息</p>
        <form className="home-form">
          <div className="home-form-item">
            <span>销售金额:</span>
            <input 
              type="text" 
              placeholder="请输入订单金额" 
              value={this.props.formData.orderSum} 
              onChange={this.handleInput.bind(this, 'orderSum')}
            />
          </div>
          <div className="home-form-item">
            <span>客户姓名:</span>
            <input 
              type="text" 
              placeholder="请输入客户姓名" 
              value={this.props.formData.name}
              onChange={this.handleInput.bind(this, 'name')}
            />
          </div>
          <div className="home-form-item">
            <span>客户电话:</span>
            <input 
              type="text" 
              placeholder="请输入客户电话" 
              value={this.props.formData.phoneNo}
              onChange={this.handleInput.bind(this, 'phoneNo')}
            />
          </div>
        </form>
        <div>
          <p className="common-title">请选择销售的商品</p>
          <Link to="/production" className="common-select-btn">
            {
              this.selectedProList.length ? <ul className="selected-pro-list">
                {
                  this.selectedProList.map((item, index) => {
                    return <li className="selected-pro-item ellipsis" key={index}>
                      {item.product_name} x {item.selectNum}
                    </li>
                  })
                }
              </ul>:'选择产品'
            }
          </Link>
        </div>
        <TouchableOpacity className="submit-btn" text="提交" clickCallBack={this.handleSubmitForm} />
        <Alert alertStatus={this.state.alertStatus} alertTip={this.state.alertTip} closeAlert={this.handleCloseAlert} />
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    formData: state.formData,
    proData: state.proData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveFormData1: (value, type) => {
      dispatch(saveFormData(value, type))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);