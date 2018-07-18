import * as home from './action-type';

//action creators
export const saveFormData = (value, datatype) => {
  return {
    type: home.SAVE_FORMDATA,
    value,
    datatype
  }
}