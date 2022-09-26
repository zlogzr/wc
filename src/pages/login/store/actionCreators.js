import axios from "../../../axios";
import { LOGIN,LOGIN_123 } from "../../../config/api";
import { message } from "antd";
import { actionTypes } from "./index";
export const login = (history, values, category) => {
  // console.log(history, values, category,'565656555');
  const formData = new FormData();
  formData.append('Account', new Buffer(values.userName).toString('base64'));
  formData.append('Password', new Buffer(values.passWord).toString('base64'));
  // console.log(formData,'formData');
  return dispatch => {
    let url = null;
    if(category==='staff'){url = LOGIN}
    else if(category==='travel'){
      url = LOGIN_123
    }
    dispatch({type: actionTypes.LOADING});  //启用loading效果
    axios.post({url, data: formData})
    .then(res => {
      // console.log(res,'res');
      if(res.code === 1){
        sessionStorage.setItem('user', res.data.Name);   //保存登陆者姓名
        sessionStorage.setItem('userId', res.data.User_id);   //保存登陆者工号
        sessionStorage.setItem('category',category );   //保存登陆者類型
        sessionStorage.setItem('token',res.data.token );   //保存登陆者token
        dispatch({type: actionTypes.LOGIN_SUCCESS});
        // console.log(history.push,'546464');
        history.push('/'); //成功之后跳转到首页
      }else{
        dispatch({type: actionTypes.LOGIN_FAIL}); //去掉loading
        message.warning(res.message)
      }
    })
    .catch(err => {
      dispatch({type: actionTypes.LOGIN_FAIL}); //去掉loading
      message.error('请求出错');
      // console.log(err)
    })
  }
}

export const domainSelect = data => {
  return {
    type: actionTypes.DOMAIN_SELECT,
    data
  }
}