import * as actionTypes from "./actionTypes";
import axios from "../../../../axios";
import { message } from "antd";

const defaultState = {
    baseInfo: {},
    personData: [],
    addPersonPageData:{
     country: [],
     cardCategory: [],
     country: []
    },
    showModal: false,
    isEdit: false,
    editData: {},
    haveFamilyName: true,
    cardInfo: [],
 };


      // const user_id = sessionStorage.getItem('userId');
      axios.get({url: 'Maintain/Info_Maintain'})
      .then(data => {
        
        if(data.code === 1){
            defaultState.personData=data.data.Info
        }else{
          message.warning(data.message)
        }
      })
      .catch(err => {
        
      })
    


 export default function countReducer (preState = defaultState, action) {
   
    // if(preState===0) preState=0
    // 从action对象中获取 :type,data
    const { type, data } = action
    switch (type) {
  
      case "increment":  //如果是加
        return preState + data
      case "decrenent":  //如果是减
        return preState - data
      case "incrementodd":  //如果是奇数加
        return preState + data
      case "incrementasync":  //如果是异步加
        return preState + data
      default:
        return preState
    }
  }

