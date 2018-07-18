import * as pro from './action-type';
import Immutable from 'immutable';

let defaultState = {
  /**
   * 商品数据
   * @type {Array}
   * example: [{
   *    product_id: 1, 商品ID
   *    product_name: 'PaiBot', 商品名称
   *    product_price: 2000, 商品金额
   *    commission: 200, 佣金
   *    selectStatus: false, 是否选择
   *    selectNum: 0, 选择数量
   * }]
   */

   dataList: []
}

export const proData = (state = defaultState, action) => {
  let imuDataList,imuItem;
  switch (action.type) {
    case pro.GET_PRODUCTION:
      return {...state, ...action}
    case pro.TOGGLE_SELECT:
      imuDataList = Immutable.List(state.dataList); //List 数组
      imuItem = Immutable.Map(state.dataList[action.index]); //Map 对象
      imuItem = imuItem.set('selectStatus', !imuItem.get('selectStatus'));
      imuDataList= imuDataList.set(action.index, imuItem);
      return {...state, ...{dataList: imuDataList.toJS()}};
    case pro.EDIT_PRODUCTION:
    imuDataList = Immutable.List(state.dataList);
    imuItem = Immutable.Map(state.dataList[action.index]);
    imuItem = imuItem.set('selectNum', action.selectNum);
    imuDataList = imuDataList.set(action.index, imuItem);
    // redux必须返回一个新的state
    return {...state, ...{dataList: imuDataList.toJS()}};
    case pro.CLEAR_SELECTED:
      imuDataList = Immutable.fromJS(state.dataList);
      for (let i = 0; i < state.dataList.length; i++) {
        imuDataList = imuDataList.update(i, item => {
          item = item.set('selectStatus', false);
          item = item.set('selectNum', 0);
          return item;
        })
      }
      return {...state, ...{dataList: imuDataList.toJS()}};
    default:
      return state;
  }
}