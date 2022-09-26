import * as actionTypes from "./actionTypes";
const defaultState = {
    page: 1,
    category: 1,
    serialId: '',
    changeTicketList:[],
    travelQuoteResultForm:[],   //旅行社報價結果有退票,有改签
    //旅行社報價結果
    previousFlightForm: [],
    showModal: false,
    changeDetail: [],
    changePrice: '',
    returnPrice: '',
    showPublicExpense: false,
    showCostExpense: true,
    site:'',
    ischange: '', 
    isreturn: ''
};


/**
 * 頁面初始化數據
 */
const getChangePageData = (newState, {data:{RCList}}) => {
    // console.log(RCList);
    newState.site = sessionStorage.getItem('site');
    // console.log(newState.site)
    newState.changeTicketList = RCList.map(v => ({
        sequenceId: v.SequenceID, 
        serialId: v.SerialID,
        fillFormName: v.FormName, 
        applyPerson: v.ApplyName, 
        fillInDate: v.ApplyDateTime,
        status: v.StepName,
        travelAgency:v.ToBeSignedName
      })
    )
    return newState;
}
/**
 * 点击单号显示对应签核内容
 */
const formWaitClick = (newState, {data, title}) => {
    // debugger
    // console.log(newState,data, title,'点击单号显示对应签核内容');
    newState.page = 2;
    newState.ischange=data.ischange;  //为Y为改签
    newState.isreturn=data.isreturn;  //为Y为改签
    newState.title = title;
    newState.serialId = data.SerialID;
    newState.previousFlightForm = formatCompleteFlightData(data.TravelDetail);
    newState.travelQuoteResultForm = formatCompleteFlightData(data.newtotalList);
    // console.log(newState,'565654545454');
return newState;
}
/**
 * 点击是否退改簽顯示是否工費
 */
// const checkSwitch = (newState, {data}) => {
//         newState.category = data;
//         if(data === 2 || data === 1){
//             newState.showPublicExpense = true;
//         }else{
//             newState.showPublicExpense = false;
//         }
//     return newState;
// }

// wks新增
const checkSwitch = (newState, {data}) => {
    // console.log(data,'datazhuangtai');
    newState.category = data;
    if((data === 2 || data === 1) && newState.site === 'WKS' ){
        newState.showPublicExpense = true;
        newState.showCostExpense = false;
    }else if((data === 2 || data === 1) && newState.site === 'WZS'){
        newState.showCostExpense = true;
        newState.showPublicExpense = false;
    }else if(data === 3){newState.showCostExpense = false;}
    else{
        newState.showCostExpense = true;
        newState.showPublicExpense = false;
    }

   return newState;
}

/**
 * 点击是否退改簽顯示是否工費
 */
 const costSwitch = (newState, {data}) => {
    // console.log(data)

   // newState.category = data;
   // if((data === 2 || data === 1) && newState.site === 'WKS' ){
   //     newState.showPublicExpense = true;
   //     newState.showCostExpense = false;
   //     console.log(1)
   // }else if((data === 2 || data === 1) && newState.site === 'WZS'){
   //     newState.showCostExpense = true;
   //     newState.showPublicExpense = false;
   //     console.log(2)
   // }else{
   //     newState.showCostExpense = false;
   //     newState.showPublicExpense = false;
   // }
return newState;
}


/**
* 返回form列表
*/
const goback = (newState, action) => {
    newState.page = 1;
    return newState;
}

/**
 * 格式化航程信息顯示
 */
const formatFlightData = arr => {
    let flightArr = [];
    let k = 0;
    for (const v of arr) {
        let personInfo = {
            empno: v.Empno,
            name: v.Chname,
            category: v.TripType === 'oneWay'? '單程' : v.TripType === 'twoWay'? '往返' : '多程',
        }
        for (const ele of v.Detail) {
            let obj = {
                key: k++,
                ...personInfo,
                dateSection: ele.Astart + ' ~ ' + ele.Aend,
                fromAirport: ele.StartAirportName,
                arriveAirport: ele.EndAirportName,
                flightNo: ele.FlyNo,
                money: ele.Cost,
                uniqueId: ele.UniqueID
            }
            flightArr.push(obj);
        }
    }
    return flightArr;
  }

/**
 * 格式化已报价航程信息顯示（因栏位名称不一样）
 */
const formatCompleteFlightData = arr => {
    if(arr.length === 0){
        return arr;
    }
    let flightArr = [];
    let k = 0;
    for (const v of arr) {
        let personInfo = {
            empno: v.Empno,
            name: v.Chname,
            sex: v.Sex,
            category: v.TripType === 'oneWay'? '單程' : v.TripType === 'twoWay'? '往返' : '多程',
        }
        for (const ele of v.Price) {
            let obj = {
                key: k++,
                ...personInfo,
                dateSection: ele.FlyTime,
                fromAirport: ele.StartAirport,
                arriveAirport: ele.ArriveAirport,
                flightNo: ele.FlyNo,
                money: ele.Cost,
                uniqueId: ele.UniqueID,
                repUID: ele.RepUID,
                IsReturn:ele.IsReturn,
                IsChange:ele.IsChange,
            }
            flightArr.push(obj);
        }
    }
    return flightArr;
  }

  /**
   * 待退改簽查看
   */

   const checkDetail = (newState, action) => {
    // console.log( newState.changeDetail)
    newState.showModal = true;
    newState.changeDetail = formatChangFlight(action.data.changeDetail);
    newState.changePrice = action.data.ChangePrice[0].Value;
    newState.returnPrice = action.data.ReturnPrice[0].Value;
    return newState;
 }
/**
   * 待退改簽查看格式化
   */
 const formatChangFlight = arr => {
     if(arr.length === 0){
        return arr;
     } 
     let result = arr.map((v, i) => ({
         ...v, dateSection: v.Astart + '~' + v.Aend, key: i
     }))
     return result;
 }

 /**
  * 隱藏模態框
  */
const hiddenModal = (newState, action) => {
    newState.showModal = false;
    return newState;
}
export default (state = defaultState, action)  => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        //頁面初始化數據
        case actionTypes.GET_PAGE_DATA:
            return getChangePageData(newState, action);

        //返回form列表
        case actionTypes.GO_BACK:
            return goback(newState, action);

        //点击单号显示对应签核内容
        case actionTypes.FORM_CLICK:
            return formWaitClick(newState, action);

        //点击单号显示对应签核内容
        case actionTypes.SHOW_LIST_PAGE:
            return goback(newState, action);

        //待退改簽查看
        case actionTypes.CHECK_DETAIL:
            return checkDetail(newState, action);//待退改簽查看

        //隱藏模態框
        case actionTypes.HIDDEN_MODAL:
            return hiddenModal(newState, action);
        //顯示是否工費
        case actionTypes.CHECK_SWITCH:
            return checkSwitch(newState, action);

         // 顯示費用掛賬
         case actionTypes.COST_SWITCH:
            return costSwitch(newState, action);
            
        default:
            return newState;
    }
}