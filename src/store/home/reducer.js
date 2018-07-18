import * as home from './action-type';

// reducer
let defaultState = {
  orderSum: '', // 金额
  name: '', // 姓名
  phoneNo: '' // 手机号
}

export const formData = (state = defaultState , action = {}) => {
  switch(action.type){
    case home.SAVE_FORMDATA:
      return {...state, ...{[action.datatype]: action.value}};
    default:
      return state;
  }
}