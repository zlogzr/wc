import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import { HAD_SIGN_DETAIL, WAIT_FOR_SIGN_SUBMIT , CONFIRMED_LIST_SNBMIT} from "../../../../config/api";

/**
 * 返回form列表
 */
export const goBackClick = () => ({
  type: actionTypes.GO_BACK
})

/**
 * 点击单号显示对应签核内容
 */
const asyncFormIdClick = (data, title) => {
  return {
    type: actionTypes.FORMID_CLICK,
    data,
    title
  }
}
export const formIdClick = (id, title) => {
  return dispatch => {
    axios.get({url: HAD_SIGN_DETAIL, data: {SerialID: id}})
    .then(data => {
      // console.log(data,'dadaadad');
      // debugger
      if (data.code === 1) {
        dispatch(asyncFormIdClick(data.Data, title));
      } else {
        message.warning(data.message);
      }
    })
    .catch(err => {
      message.warning('請求數據時錯誤')
      // console.log(err)
    })
  }
}

const formChange = id => {
  return {
    type:actionTypes.RELOAD_DATA,
    id
  }
}

/**
 * 待签核提交數據
 */
const asyncSubmitData = () => ({
  type: actionTypes.SUBMIT_SUCCESS
})
export const submitData = ({values, formId, that}) => {
  //  debugger
  let data = {
    sFormSerialID: formId,
    sSignerID: sessionStorage.getItem('userId'),
    sResultID: values.result,
    sResultName: values.result === 1? '同意' : '駁回',
    sComment: values.suggestion ? values.suggestion : ''
  }
  return dispatch => {
    axios.post({url: WAIT_FOR_SIGN_SUBMIT, data})
    .then(data => {
      if(data.code === 1){
        // console.log( that);
        that.props.history.replace('/sign/list/1');
        // dispatch(formChange(data.sFormSerialID))
        dispatch(asyncSubmitData())
      }else{
        that.props.history.replace('/sign/list/1');
        message.info(data.message)
      }
    })
    .catch(err => {
      message.warning('請求數據時錯誤')
      // console.log(err)
    })
  }
}

/**
 * 待确认单据提交數據
 */
 const asyncSubmitDatas = () => ({
  type: actionTypes.SUBMIT_SUCCESSDQH
})
export const submitDatadqh = ({values, formId, that}) => {
// debugger


let url=CONFIRMED_LIST_SNBMIT

  let  serialID= formId;
  let User_id=sessionStorage.getItem('userId');
  let  yerOrNo= values.result;

  // debugger
  return dispatch => {
    axios.get({url:`${url}?SerialID=${serialID}&Empno=${User_id}&yesOrNo=${yerOrNo}`})
    .then(data => {
      if(data.code === 1){
        if(yerOrNo === 'Y'){
          message.success('确认成功')
        }else if(yerOrNo === 'N'){
          message.success('驳回成功')
        }
        // console.log( that);
        that.props.history.replace('/sign/list/3');
        // dispatch(formChange(data.sFormSerialID))
        dispatch(asyncSubmitDatas())
      }else{
        that.props.history.replace('/sign/list/3');
        message.info(data.message)
      }
    })
    .catch(err => {
      message.warning('請求數據時錯誤')
      // console.log(err)
    })
  }
}


// 關閉彈框
const submitDatadqhCanel=()=>{
  return {
    type: actionTypes.SIGN_PAGE_DATAOPEN,
  }
}
export const handleCancel=()=>{
  return dispatch=>{
    dispatch(submitDatadqhCanel())
  }
}

// 打開彈框
 const submitDatadqhCanels=(e)=>{
  return {
    type: actionTypes.SIGN_PAGE_DATACLONE,
  }
}

export const handleCancels=()=>{
  // debugger
  return dispatch=>{
    dispatch(submitDatadqhCanels())
  }
}


// 点击驳回不弹框
// 關閉彈框
const submitchanges=(e)=>{
  return {
    type: actionTypes.SIGN_PAGE_DATAOPENCHANGES,
    e
  }
}
export const changes=(e)=>{
  // debugger
  return dispatch=>{
    dispatch(submitchanges(e))
  }
}