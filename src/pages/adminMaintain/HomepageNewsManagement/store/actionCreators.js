import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import { CONTACTS, ADD_CONTACTS, UPDATE_CONTACTS, DELETE_CONTACTS } from "../../../../config/api";

/**
 * 获取页面数据
 */
const asyncGetPageData = data =>{
 
  return {
    type: actionTypes.PAGE_DATA,
    data
  }
}
export const getPageData = () => {
  return (dispatch) => {
    // const user_id = sessionStorage.getItem('userId');
    axios.get({url: 'Maintain/Info_Maintain'})
    .then(data => {
     
      if(data.code === 1){
        dispatch(asyncGetPageData(data))
      }else{
        message.warning("請求失敗")
      }
    })
    .catch(err => {
      message.error('獲取頁面數據出錯')
      
    })
  }
}
// export const getPageData = () => {
//   return (dispatch) => {
//     const user_id = sessionStorage.getItem('userId');
//     axios.get({url: CONTACTS, data: {user_id}})
//     .then(data => {
//      
//       if(data.code === 1){
//         dispatch(asyncGetPageData(data.data))
//       }else{
//         message.warning(data.message)
//       }
//     })
//     .catch(err => {
//       
//     })
//   }
// }
/**
 * 显示模态框
 */
export const addShow = () => ({type: actionTypes.SHOW_MODAL})
/**
 * 隐藏模态框
 */
export const hiddenModal = () => ({type: actionTypes.HIDDEN_MODAL})

/**
 * 区域新增
 */
export const areaData = data => {
  return {
    type: actionTypes.AREA_DATA,
    data
  }
}
/**
 *新聞數據改變時
 */
export const familyChange = data => {
  return {
    type: actionTypes.FAMILY_CHANGE,
    data
  }
}
/**
//  * 新增卡信息
//  */
export const addCardInfo = data => {
  return {
    type: actionTypes.ADD_CARD_INFO1,
    data
  }
}
/**
 * 新增新聞數據
 */
export const addFamilyInfo = (baseInfo, personInfo, cardInfo) => {
  const detail = cardInfo.map( v => {
    if(!('SignTime' in v)){ v.SignTime = null;}
    if(!('TaiwanTime' in v)){ v.TaiwanTime = null;}
    return v;
  })
  const data = {
    Empno: baseInfo.Empno,
    ChName: baseInfo.ChName,
    Deptcode: baseInfo.Deptcode,
    FaName: personInfo.familyName,
    Sex: personInfo.sex,
    Detail: detail
  }
  return dispatch => {
    axios.post({url: ADD_CONTACTS, data,})
    .then(data => {
      if(data.Code === 1){
        message.success('添加成功');
      }else{
        message.warning(data.message);
      }
    })
    .catch(err => {
      message.error('新增眷属失败')

      
    })
  }
}
/**
 * 删除
 */
export const deleteFamilyInfo = (baseInfo, value) => {

  let data = {
    UniqueID: value.UniqueID,
    User_ID: window.sessionStorage.getItem("userId")
  };
  return dispatch => {
    axios.post({url: 'Maintain/Info_Maintain_Delete',data})
    .then(data => {
      if(data.code === 1){
        message.success('删除成功');
        dispatch(getPageData())
      }else{
        message.warning(data.message);
      }
    })
    .catch(err => {
      message.error('删除失败')

      
    })
  }
} 
/**
 * 點擊编辑
 */
export const edit = data => ({
  type: actionTypes.EDIT,
  data
})
/**
 * 编辑成功
 */
export const edit_success = data => ({
  type: actionTypes.EDIT_SUCCESS,
  data
})
/**
 * 新增新聞
 */
export const syncAddCommonInfo = data => {
  return {
    type: actionTypes.ADD_COMMON_PEOPLE,
    data
  }
}
export const addCommonInfo = (userInfo, values, isEdit,datas) => {
  
  let data = {
    EmpNo: userInfo.Empno,
    ChName: userInfo.ChName,
    LinkEmpNo: values.empno,
    LinkChName: values.chName,
    LinkSex: values.sex,
    Country: values.nationality,
    CertType: values.cardCategory,
    CertNO: values.cardNo,
    CertName: values.name,
    // CertValidTime: values.validDate.format('YYYY-MM-DD')
  }
 
  'inTaiValidDate' in values ? data.TaiwanVaidTime = values.inTaiValidDate : data.TaiwanVaidTime = null;
  'taiwanTime' in values ? data.SignValidTime = values.taiwanTime : data.SignValidTime = null;
  let url;
  // url = isEdit? UPDATE_CONTACTS : ADD_CONTACTS; 
  // news
  url = isEdit? 'Maintain/Info_Maintain_Update' : 'Maintain/Info_Maintain_Add';  
  if(isEdit) data.UniqueID = sessionStorage.getItem('UniqueID');
  return dispatch => {
    axios.post({url, data})
    .then(res => {
      if(res.code === 1){
        if(isEdit){
          message.success('編輯成功');
          sessionStorage.removeItem('UniqueID');
          dispatch(edit_success(data));
        }else{
          message.success('新增成功');
          dispatch(getPageData());
          dispatch(syncAddCommonInfo(data));
        }
      }else{
        message.warning(res.message)
      }
    })
    .catch(err => {
      message.error('獲取頁面數據出錯')

      
    })
  }
}