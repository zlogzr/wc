import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import { CONFIRM_RCLIST, ORDERS_CONFIRM_RCDETAIL, ORDERS_CONFIRM_RCDETAIL_REVIEW, ORDERS_CONFIRM_SUBMIT } from "../../../../config/api"

/**
 * 返回form列表
 */
export const goBackClick = data => ({
  type: actionTypes.GO_BACK
})

/**
 * 是否退改簽
 */
export const checkSwitch = data => ({
  type: actionTypes.CHECK_SWITCH,
  data
})

// wks新增
/**
 * 費用掛賬
 */
 export const costSwitch = data => ({
  type: actionTypes.COST_SWITCH,
  data
})

/**
 * 獲取頁面數據
 */
const asyncGetChangePageData = data => {
  return {
    type: actionTypes.GET_PAGE_DATA,
    data,
  }
}
export const getChangePageData = () => {
  return (dispatch) => {
    const User_id = sessionStorage.getItem('userId');
    axios.get({ url: CONFIRM_RCLIST, data: { User_id } })
      //  axios.get({ url: '/api/MyForm/Confirm_RCList.json'})
      .then(data => {
        if (data.code === 1) {
          dispatch(asyncGetChangePageData(data.Data));
        } else {
          message.warning(data.message);
        }
      })
      .catch(err => { message.warning('獲取頁面數據出錯'); console.log(err) })//catch傳的是then裡面的錯誤
  }
}

/**
* 点击单号显示对应签核内容
*/
const asyncFormWaitClick = (data, title) => ({
  type: actionTypes.FORM_CLICK,
  data,
  title
})
export const formWaitClick = (serialId, title,status) => {
  // debugger

  return dispatch => {
    const User_id = sessionStorage.getItem('userId');
    let Status=status==='待确认改签'?'Change':'Return'
    axios.get({ url: ORDERS_CONFIRM_RCDETAIL, data: { SerialID: serialId, User_id ,Status} })
      .then(data => {
        // console.log(data,'datas');
        if (data.code === 1) {
          dispatch(asyncFormWaitClick(data.Data, title));
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

// /**
//  * 離開頁面時重置為表單列表頁面
//  */
// export const showListPage = () => ({
//   type: actionTypes.SHOW_LIST_PAGE
// })


/**
 * 待退改簽查看
 */
const asyncCheckDetail = data => {
  return {
    type: actionTypes.CHECK_DETAIL,
    data,
  }
}
export const checkDetail = uid => {
  return (dispatch) => {
    axios.get({ url: ORDERS_CONFIRM_RCDETAIL_REVIEW, data: { RepUID: uid } })
      .then(data => {
        // console.log(data);
        if (data.code === 1) {
          dispatch(asyncCheckDetail(data.Data));
        } else {
          message.warning(data.message);
        }
      })
      .catch(err => { message.warning('獲取頁面數據出錯'); console.log(err) })//catch傳的是then裡面的錯誤
  }
}

/**
 * 隱藏modal
 */
export const hiddenModal = () => {
  return {
    type: actionTypes.HIDDEN_MODAL,
  }
}


/**
 * 提交
 */
export const sendOut = (values, that) => {

  return (dispatch, getState) => {
    const SerialID = getState().ordersReducer.changeWaitAffirmFormReducer.serialId;
    const data = {
      SerialID,
      ResultCode: values.category,
      // IsPublic: values.PublicExpense ? 'Y' : 'N',
      IsPublic: values.PublicExpense,
      User_id: sessionStorage.getItem('userId'),
      Site:sessionStorage.getItem('site'),
    }
    axios.post({ url: ORDERS_CONFIRM_SUBMIT, data })
      .then(res => {
        if (res.code === 1) {
          message.success(res.message);
          setTimeout( ()=>{ window.location.reload()}
           ,500
          )
          // that.props.history.replace('/orders/4')
         
        } else {
          message.error(res.message)
        }
      })
      .catch(err => {
        message.error('提交失敗')
        // console.log(err)
      })
  }
}