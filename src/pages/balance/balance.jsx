import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import Header from '@/components/header/header';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';
import Alert from '@/components/alert/alert';
import API from '@/api/api';
import './balance.less';

class BrokeRage extends Component {
  state = {
    applyNum: '', // 输入的值
    alertStatus: false,
    alertTip: '',
    balance: {
      balance: 0
    }
  }
  componentDidMount() {
    this._initData();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }
  
  _initData = async () => {
    try {
      let result = await API.getBalance();
      console.log(result)
      this.setState({
        balance: result
      })
    } catch(err) {
      console.log(err);
    }
  }
  handleSubmitForm = () => {
    let alertTip;
    if (!this.state.applyNum) {
      alertTip = '请输入提现金额';
    } else if (parseFloat(this.state.applyNum) > this.state.balance.balance) {
      alertTip = '申请金额不能大于余额';
    } else {
      alertTip = '申请提现成功';
    }
    this.setState({
      alertStatus: true,
      alertTip,
      applyNum: ''
    })
  }
  handleCloseAlert = () => {
    this.setState({
      alertStatus: false,
      alertTip: ''
    })
  }
  handleInput = (event) => {
    let value = event.target.value;
    this.setState({
      applyNum: value
    })
  }
  render() {
    return (
      <main className="home-container">
        <Header title="提现" record />
        <section className="broke-main-content">
          <p className="broke-header">
            您可提现金额为:¥ {this.state.balance.balance}
          </p>
          <form className="broke-form">
            <p>请输入提现金额(元)</p>
            <p>¥  <input type="text" value={this.state.applyNum} onInput={this.handleInput} placeholder="0.00"/>
            </p>
          </form>
          <TouchableOpacity className="submit-btn" text="申请提现" clickCallBack={this.handleSubmitForm} />
        </section>
        <Alert 
          alertStatus={this.state.alertStatus}
          alertTip={this.state.alertTip}
          closeAlert={this.handleCloseAlert}
        />
      </main>
    );
  }
}

export default BrokeRage;