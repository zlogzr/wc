import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";

/**
 * 获取页面数据
 */
const getData = (dispatch, cb) => {
  const User_id = sessionStorage.getItem('userId');
  // const Site=sessionStorage.getItem('site');
  axios.get({url: '/maintain/UserInfo', data:{ User_id }})
    .then(data => {
      if(data.code === 1){
        dispatch(cb(data.data))
      }else{
        message.warning(data.message)
      }
    })
    .catch(err => {
      // console.log('獲取頁面數據出錯',err)
      message.error('獲取頁面數據出錯')
    })
}
/**
 * 页面初始化数据
 */
const asyncGetPageData = data =>{
  return {
    type: actionTypes.PAGE_DATA,
    data
  }
}
export const getPageData = () => {
  return (dispatch) => {
    getData(dispatch, asyncGetPageData)
  }
}

/**
 * 选择区域
 */
export const areaData = data => {
  return {
    type: actionTypes.AREA_DATA,
    data
  }
}

/**
 * 添加公司卡号
 */
const asyncAddCompanyAndCard = data => {
  return {
    type: actionTypes.ADD_COMPANY_AND_CARD,
    data
  }
}
export const addCompanyAndCard = (companyInfo, card, empno, name) => {
  return (dispatch) => {
    let data = {Empno: empno, Chname: name, Airlineid: companyInfo.value, Airlinename: companyInfo.text, CardNo: card};
    axios.post({url: '/maintain/UserInfo_VIPCard_Add', data})
    .then(data => {
      if(data.code === 1){
        getData(dispatch, asyncGetPageData)
      }else{
        message.warning('添加会员卡号失败')
      }
    })
    .catch(err => {
      // console.log('添加会员卡号失败',err)
      message.error('添加会员卡号失败')
    })
  }
}

/**
 * 删除卡号
 */
const asyncDeleteCompanyAndCard = (i) => {
  return {
    type: actionTypes.DEL_COMPANY_CARD,
    i
  }
}
export const deleteCompanyAndCard = (i, uniqueid) => {
  return dispatch => {
    let data = {UniqueId: uniqueid}
    axios.post({url:'/maintain/UserInfo_VIPCard_Delete', data})
    .then(data => {
      if(data.code === 1){
        dispatch(asyncDeleteCompanyAndCard(i))
      }else{
        message.warning('删除会员卡号失败');
      }
    })
    .catch(err => {
      // console.log(err)
      message.error(err)
    })
  }
}

export const seatChange = data => {
  return {
    type: actionTypes.SITE_CHANGE,
    data
  }
}

export const hobbyChange = data => {
  return {
    type: actionTypes.HOBBY_CHANGE,
    data
  }
}
// wks新增
export const phoneChange = data => {
  return {
    type: actionTypes.PHONE_CHANGE,
    data
  }
}

export const nameChange = data => {
  return {
    type: actionTypes.NAME_CHANGE,
    data
  }
}

export const birthDateChange = data => {
  return {
    type: actionTypes.BIRTHDATE_CHANGE,
    data
  }
}

export const remarkChange = data => {
  return {
    type: actionTypes.REMARK_CHANGE,
    data
  }
}

/**
 * 添加證件信息
 */
export const cardNewAdd = (values, empno, name) => {
  return dispatch => {
    // console.log(values)
    let data = {
      Empno:empno, 
      Chname: name, 
      CertName: values.name,
      CertType: values.cardCategory, 
      CertNO: values.cardNo, 
      CertValidTime: values.validDate.format('YYYY-MM-DD HH:mm:ss'),
      SignValidTime: values.signValidDate, 
      TaiwanValidTime: values.inTaiValidDate
    }
    axios.post({url:'/maintain/UserInfo_CertInfo_Add', data})
    .then(data => {
      if(data.code === 1){
        getData(dispatch, asyncGetPageData);
        message.info('新增成功')
      }else{
        message.warning(data.message);
      }
    })
    .catch(err => {
      // console.log(err)
      message.error(err)
    })
  }
}
/**
 * 刪除個人證件信息
 */
export const deleteInfo = (uid, empno) => {
  return dispatch => {
    let data = {UID: uid, Empno: empno}
    axios.post({url:'/maintain/UserInfo_CertInfo_Delete', data})
    .then(data => {
      if(data.code === 1){
        getData(dispatch, asyncGetPageData);
      }else{
        message.warning(data.message);
      }
    })
    .catch(err => {
      // console.log(err)
      message.error(err)
    })
  }
}

/**
 * 个人喜好保存
 */
export const personHobbySave = (empno, name, areaSelectData,seatSelectData,birthDate, hobbySelectData,phone, remark = '') => {


  const data = {Empno: empno, Chname: name, Country: areaSelectData, SeatType: seatSelectData,BirthDate:birthDate, FoodType: hobbySelectData,Phone:phone, Remark: remark};
  return (dispatch) => {
    axios.post({url: '/maintain/UserInfo_Hobby', data })
    .then(data => {
      if(data.code === 1){
        message.success('保存成功')
      }else{
        message.warning(data.message)
      }
    })
    .catch(err => {
      // console.log('保存失败2',err)
      message.error('保存失败')
    })
  }
}