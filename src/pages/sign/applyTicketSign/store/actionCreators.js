import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import { WAIT_FOR_SIGN_LIST, WAIT_FOR_SIGN_DETAIL, WAIT_FOR_SIGN_SUBMIT, HAD_SIGN_LIST,WAIT_CONFIRMED_LIST,CONFIRMED_LIST_SNBMIT } from "../../../../config/api";


/**
 * 
 */
export const currPage = id => ({
  type: actionTypes.CURR_PAGE,
  id
})

/**
 * 獲取頁面數據
 */
const asyncGetPageData = data => {
  return {
    type: actionTypes.SIGN_PAGE_DATA,
    data,
  }
}
export const getPageData = id => {
  // const url = id === '1'?  WAIT_FOR_SIGN_LIST : id === '2'? HAD_SIGN_LIST : WAIT_FOR_SIGN_LIST;

  var url = '';
  if(id === '1'){
    url = WAIT_FOR_SIGN_LIST
  }else if(id === '2'){
    url = HAD_SIGN_LIST
  }else if( id === '3'){
    url = WAIT_CONFIRMED_LIST
  }else{
    url = WAIT_FOR_SIGN_LIST
  }

  const User_id = sessionStorage.getItem('userId');
  return (dispatch) => {
    axios.get({ url:`${url}?a=${Math.random()}`, data: {User_id}})
      .then(data => {
        if (data.code === 1) {
          dispatch(asyncGetPageData(data.Data));
        } else {
          message.warning(data.message);
        }
      })
      .catch(err => { message.warning('獲取頁面數據出錯'); console.log(err) })
  }
}

/**
 * 返回form列表
 */
export const goBackClick = data => ({
  type: actionTypes.GO_BACK
})

/**
 * 点击单号显示对应签核内容
 */
const asyncFormIdClick = (data, title) => ({
  type: actionTypes.FORMID_CLICK,
  data,
  title
})
export const formIdClick = (id, title) => {
  // debugger
  return dispatch => {
    axios.get({url: WAIT_FOR_SIGN_DETAIL, data: {SerialID: id}})
    .then(data => {
      // console.log(data);
      if (data.code === 1) {
        dispatch(asyncFormIdClick(data.Data, title));
      } else {
        message.warning(data.message);
      }
    })
    .catch(err => {
      message.warning('請求數據時錯誤');
      // console.log(err)
    })
  }
}

/**
 * 提交數據
 */
const asyncSubmitData = () => ({
  type: actionTypes.SUBMIT_SUCCESS
})
// export const submitData = values => {
//   let data = {
//     sFormSerialID: values.formId,
//     sSignerID: '',
//     ResultID: values.result,
//     ResultName: values.result === 1? '同意' : '駁回',
//     sComment: values.suggestion
//   }
//   return dispatch => {
//     axios.post({url: WAIT_FOR_SIGN_SUBMIT, data,})
//     .then(data => {
//       if(data.code === 1){
//         dispatch(asyncSubmitData());

//       }else{
//         message.info(data.message);
//       }
//     })
//     .catch(err => {
//       message.warning('請求數據時錯誤')
//       console.log(err)
//     })
//   }
// }


// 9.16 wks添加
const asyncConfirm = (data, serialid) => ({
  type: actionTypes.CONFIRM_PAGE,
  data,
})
export const ConfirmClick = (serialid,YesOrNo,that) => {

  // debugger
  
  var url = CONFIRMED_LIST_SNBMIT;
  var serialID = serialid;
  var YesOrNo1 = YesOrNo
  const User_id = sessionStorage.getItem('userId');
  // const id='3';
  return dispatch => {
    axios.get({url:`${url}?SerialID=${serialID}&Empno=${User_id}&yesOrNo=${YesOrNo1}`})
    .then(data => {
      if (data.code === '1') {
        dispatch(asyncConfirm(data.Data));
        if(YesOrNo1 === 'Y'){
          message.success('确认成功')
        }else if(YesOrNo1 === 'N'){
          message.success('驳回成功')
        }
        window.location.reload()
      } else {
        message.warning(data.message);
      }
    })
    // .catch(err => {
    //   message.warning('請求數據時錯誤')
    //   // console.log(err)
    // })
  }
}

// 關閉彈框
 const submitDatadqhCanel=()=>{
  return {
    type: actionTypes.SIGN_PAGE_DATAOPEN,
  }
}
export const ConfirmClicks=()=>{
  return dispatch=>{
    dispatch(submitDatadqhCanel())
  }
}

// 打開彈框
 const submitDatadqhCanels=()=>{
  return {
    type: actionTypes.SIGN_PAGE_DATACLONE,
  }
}

export const ConfirmClickss=()=>{
  return dispatch=>{
    dispatch(submitDatadqhCanels())
  }
}