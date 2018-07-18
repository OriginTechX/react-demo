import * as pro from './action-type';
import API from '@/api/api';

// 初始化获取商品数据,保存至redux
export const getProData = () => {
  // 返回函数,异步dispatch
  return async dispatch => {
    try {
      let result = await API.getProduction();
      result.map(item => {
        item.selectStatus = true;
        item.selectNum = 0;
        return item;
      })
      dispatch({
        type: pro.GET_PRODUCTION,
        dataList: result
      })
    } catch(err) {
      console.log(err);
    }
  }
}

// 选择商品
export const togSelectPro = index => {
  return {
    type: pro.TOGGLE_SELECT,
    index
  }
}

// 编辑商品
export const editPro = (index, selectNum) => {
  return {
    type: pro.EDIT_PRODUCTION,
    index,
    selectNum
  }
}

// 清空选择
export const clearSelected = () => {
  return {
    type: pro.CLEAR_SELECTED
  }
}