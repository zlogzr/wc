import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message, Modal } from "antd";
import { getText, getArrText } from "../../../../utils";




/**
 * 獲取頁面數據
 */
const pageInitData = data => {
  return {
    type: actionTypes.PAGE_DATA,
    data,
  }
}
export const getPageInitData = () => {
  return (dispatch) => {
    let User_id = sessionStorage.getItem('userId');
    axios.get({ url: '/apply/Info_F001', data: { User_id } })
      .then(data => {
        // console.log(data,'2222');
        if (data.code === 1) {
          dispatch(pageInitData(data.Data));
        } else {
          message.warning(data.message);
        }
      })
      .catch(err => { message.warning('獲取頁面數據出錯'); console.log(err) })
  }
}


/**
 * 添加航程信息
 */
export const allFlightInfo = data => ({
  type: actionTypes.All_FLIGHT_INFO,
  data
})

/**
 * 选择差旅单号
 */
export const chailvChange = data => ({
  type: actionTypes.CHAILV_CHANGE,
  data
})

/**
 * 选择差旅单号對應不一樣的差旅信息
 */
 export const chailvChanges = data => ({
  type: actionTypes.CHAILV_CHANGES,
  data
})


/**
 * 选择类别
 */
export const categoryChange = data => ({
  type: actionTypes.CATEGORY_CHANGE,
  data
})

/**
 * 选择五年条款
 */
export const fantaiItemChange = data => ({
  type: actionTypes.SELECT_FIVE,
  data
})

/**
 * 选择区域
 */
export const areaChange = data => ({
  type: actionTypes.AREA_CHANGE,
  data,
})

/**
 * 上傳附件保存
 */
export const uploadFile = data => {
  return{
    type: actionTypes.UPLOAD_FILE_SUCCESS,
    data,
  }
 
}

/**
 * 提交時button顯示loading效果
 */
export const loading = () => ({
  type: actionTypes.COMMON_APPLY_SUBMIT_LOADING
})

/**
 * 提交表单
 */
const asyncSubmit = () => {
  return {
    type: actionTypes.COMMONAPPLY_SUBMIT_DATA
  }
}
export const submitForm = (values, flightInfo, category, pageData, HaveFile, file, that) => {
  let dataForm = formatSubmitData(values, flightInfo, category, pageData, HaveFile); //格式化提交數據
  // EndAirportName/StartAirportName 處理 10.11
  dataForm.detail.map(v=>{
    v.detail.map(item=>{
      if(item.EndAirportName){return item.EndAirportName}else {item.EndAirportName=item.EndAirportID}
      if(item.StartAirportName){return item.StartAirportName}else {item.StartAirportName=item.StartAirportID}

    })
  })
  
  let data = dataForm;
  // debugger
  // console.log(data,'还哈哈');
  if(HaveFile === 'Y'){
    let formData = new FormData();
    formData.append('data', JSON.stringify(dataForm));
    formData.append('file', file);
    data = formData;
   
  }
  return (dispatch) => {
    axios.post({ url:"/Apply/F001_Approve",data})
      .then(data => {
        // console.log(data,'000');
        if (data.code === 1) {
          Modal.info({
            title: '提交成功',
            onOk() {that.props.history.push('/orders/list/1')},
          });
          dispatch(asyncSubmit());
        } else {
          message.warning(data.message)
          // console.log(data);
        }
      })
      .catch(err => { message.warning('提交失敗'); console.log(err) })
  }
}

/**
 * 重置表单状态
 */
export const resetAllState = () => ({
  type: actionTypes.RESET_ALL_SITE,
})

/**
 * 格式化提交數據
 */
const formatSubmitData = (values, flightInfo, category, pageData, HaveFile) => {
  let isOk = 1;
  let ApplyID = pageData.userInfo[0].Empno;
  let ApplyName = pageData.userInfo[0].ChName;
  let Deptcode = pageData.userInfo[0].Deptcode;
  let formData = { ApplyID, ApplyName, Deptcode, HaveFile, ...values};
  formData.ChargeDept = Deptcode;
  delete formData.goToTaiwanCategory;
  //获取text文本
  let PlaceName = getText(values.PlaceID, pageData.area, 'Value');
  let categoryData = getArrText(category, pageData.category, 'Name');
  let TravelTypeID = categoryData.id;
  let TravelTypeName = categoryData.name;
  //隱藏欄位為空
  'VisaDate' in values? isOk=1 : formData.VisaDate = null;
  'ChailvSID' in values? isOk=1 : formData.ChailvSID = null;
  'FamilyName' in values? isOk=1 : formData.FamilyName = null;
  'FamilyShip' in values? isOk=1 : formData.FamilyShip = null;
  'FantaiSID' in values? isOk=1 : formData.FantaiSID = null;
  'chargeDept_cl' in values? formData.ChargeDept=values.chargeDept_cl : isOk=1;
  'chargeDept_lizi' in values? formData.ChargeDept=values.chargeDept_lizi : isOk=1;
  delete formData.chargeDept_cl;
  delete formData.chargeDept_lizi;
  if('VisaDate' in values){
    let VisaDate = values.VisaDate.format('YYYY-MM-DD');
    formData = {...formData, VisaDate};
  }
  if('goToTaiwanCategory' in values){
    let goToTaiwanCategory = getArrText(values.goToTaiwanCategory, pageData.ftszItem, 'ViceName');
    TravelTypeID = [...TravelTypeID,...values.goToTaiwanCategory];
    TravelTypeName = [...TravelTypeName,...goToTaiwanCategory.name];
  }
  TravelTypeID = TravelTypeID.join(',');
  TravelTypeName = TravelTypeName.join(',');
  formData = {...formData, TravelTypeID, TravelTypeName, PlaceName };

  //格式化機票信息
  let detail = formatFlightInfo(flightInfo);
  return {...formData, detail};
}

/**
 * 格式化機票信息
 */
const formatFlightInfo = flightInfo => {
  let arr = [];

// debugger

  for (let item of flightInfo) {
    let obj = {detail: []};
    obj.EmpNo = item.empno;
    obj.ChName = item.person;
    obj.Sex = item.gender;
    obj.TripType = item.category;
    let { detail } = item;
    if(item.category === "twoWay"){
      let obj1 = {
        StartAirportID:detail[0].placeFromText  ,
        StartAirportName: detail[0].placeFrom,
        EndAirportID: detail[0].placeToText,
        EndAirportName:detail[0].placeTo ,
        StartDate: detail[0].dateFrom,
        StartTime: detail[0].timeFrom1,
        Astart: detail[0].dateFrom + ' ' + detail[0].timeFrom1,
        EndDate: null,
        EndTime: detail[0].timeTo1,
        Aend: null,
        Car: detail[0].carNeed1,
      }
      let obj2 = {
        StartAirportID:detail[0].placeToText ,
        StartAirportName: detail[0].placeTo,
        EndAirportID:  detail[0].placeFromText,
        EndAirportName:detail[0].placeFrom,
        StartDate: detail[0].dateTo,
        StartTime: detail[0].timeFrom2,
        Astart: detail[0].dateTo + ' ' + detail[0].timeFrom2,
        EndDate: null,
        EndTime: detail[0].timeTo2,
        Aend: null,
        Car: detail[0].carNeed2,
      }
      obj.detail = [obj1, obj2];
    }else{
    //  let obj3 = {
    //     StartAirportID: detail[0].placeFrom,
    //     StartAirportName: detail[0].placeFromText,
    //     EndAirportID: detail[0].placeTo,
    //     EndAirportName: detail[0].placeToText,
    //     StartDate: detail[0].dateFrom,
    //     StartTime: detail[0].timeFrom1,
    //     Astart: detail[0].dateFrom + ' ' + detail[0].timeFrom1,
    //     EndDate: null,
    //     EndTime: detail[0].timeTo1,
    //     Aend: null,
    //     Car: detail[0].carNeed1,
    //   }
    //   obj.detail = [...obj.detail, obj3];
    obj.detail = detail.map(v =>({
        StartAirportID:v.placeFromText ,
        StartAirportName:v.placeFrom ,
        EndAirportID: v.placeToText,
        EndAirportName:v.placeTo ,
        StartDate: v.dateFrom,
        StartTime:v.timeFrom1,
        Astart: v.dateFrom + ' ' + v.timeFrom1,
        EndDate: null,
        EndTime:v.timeTo1,
        Aend: null,
        Car:v.carNeed1,
    }))
    }
    arr.push(obj);
  }
  return arr;
  
}

