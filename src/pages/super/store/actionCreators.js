import axios from "../../../axios";
import { LOGIN_123 } from "../../../config/api";
import { message } from "antd";
import { actionTypes } from "./index";
export const login = (history, values, category) => {
  // console.log(history, values, category,"action.dispatch");
  const formData = new FormData();
  formData.append('Account', new Buffer(values.userName).toString('base64'));
  formData.append('Password', new Buffer(values.passWord).toString('base64'));
  formData.append('Target', new Buffer(values.target).toString('base64'));
  return dispatch => {
    const url = LOGIN_123;
    dispatch({type: actionTypes.LOADING});  //启用loading效果
    axios.post({url, data: formData})
    .then(res => {
      if(res.code === 1){
        sessionStorage.setItem('user', res.data.Name);   
        sessionStorage.setItem('userId', res.data.User_id);  
        sessionStorage.setItem('category', 'staff');   
        sessionStorage.setItem('Index','1');
        dispatch({type: actionTypes.LOGIN_SUCCESS});
        history.push('/'); 
      }else{
        dispatch({type: actionTypes.LOGIN_FAIL}); //去掉loading
        message.warning(res.message)
      } 
    })
    .catch(err => {
      dispatch({type: actionTypes.LOGIN_FAIL}); //去掉loading
      message.warning('请求出错');
      // console.log(err)
    })
  }
}