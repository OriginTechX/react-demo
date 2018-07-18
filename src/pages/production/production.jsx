import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { is, fromJS } from 'immutable';
import { connect } from 'react-redux';
import { getProData, editPro, togSelectPro } from '@/store/production/action';
import Header from '@/components/header/header';
import './production.less';

class Production extends Component {
  static propTypes = {
    proData: PropTypes.object.isRequired,
    getProData: PropTypes.func.isRequired,
    editPro: PropTypes.func.isRequired,
    togSelectPro: PropTypes.func.isRequired
  }
  componentDidMount() {
    if (!this.props.proData.dataList.length) {
      this.props.getProData();
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }
  /**
   * 添加或删减商品,交由redux进行数据处理
   * @param index 编辑的商品索引
   * @param num 添加||删减的商品数量
   */
  handEdit = (index, num) => {
    let currentNum = this.props.proData.dataList[index].selectNum + num;
    if (currentNum < 0) {
      return
    }
    this.props.editPro(index, currentNum)
  }

  handleToggle = (index) => {
    this.props.togSelectPro(index)
  }
  
  render() {
    return (
      <main className="common-con-top">
        <Header title="首页" confirm />
        <section className="pro-list-con">
          <ul className="pro-list-ul">
            {
              this.props.proData.dataList.map((item, index) => {
                return <li className="pro-item" key={index}>
                  <div className="pro-item-select" onClick={this.handleToggle.bind(this, index)}>
                    <span className={`icon-xuanze1 pro-select-status ${item.selectStatus ? 'pro-selected': ''}`}></span>
                    <span className="pro-name">{item.product_name}</span>
                  </div>
                  <div className="pro-item-edit">
                    <span className={`icon-jian ${item.selectNum > 0 ? 'edit-active' : ''}`} onClick={this.handEdit.bind(this, index, -1)}></span>
                    <span className="pro-num">{item.selectNum}</span>
                    <span className="icon-jia" onClick={this.handEdit.bind(this, index, 1)}></span>
                  </div>
                </li>
              })
            }
          </ul>
        </section>
      </main>
    );
  }
}

/* const mapStateToProps = (state) => {
  return {
    proData: state.proData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProData: () => { // 这个getProData作为props传给此组件
      dispatch(getProData()) // 这个getProData只的就是action中的
    },
    editPro: (index, num) => {
      dispatch(editPro(index, num))
    },
    togSelectPro: (index) => {
      dispatch(togSelectPro(index))
    }
  }
} */

// export default connect(mapStateToProps,mapDispatchToProps)(Production);
export default connect(state => ({
  proData: state.proData
}), {
  getProData,
  togSelectPro,
  editPro
})(Production)
