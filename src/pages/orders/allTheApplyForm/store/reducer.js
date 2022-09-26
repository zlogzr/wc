import * as actionTypes from "./actionTypes";

const defaultState = {
    page: 1,
    title: '',
    category: 1,
    signFormListData: [],
    formData: [],
    flightData: [],
    newFlightData: [],
    originFlightData: [],
    signHistory: [],
    

};


/**
 * 頁面初始化數據
 */
const pageData = (newState, { data, id }) => {
    let formList = [];
    if(id === '1'){
        formList = data.AllFormList;
    }
    if(id === '2'){
        formList = data.OngoingFormList;
    }
    // debugger
    // console.log(data, id)
    newState.signFormListData = formList.map(v => ({
       
        formId: v.SequenceID,
        formName: v.FormName,
        serialId: v.SerialID,
        fillDate: v.ApplyDateTime,
        applyName: v.ApplyName,
        passengers:v.Passengers , //实际乘机人
        endAirportname:v.EndAirportname,  //机票目的地
        ticketDate:v.TicketDate,  //机票日期
        status: v.StepName
    })
    )
    return newState;
}
/**
 * 頁面判斷ID
 */
const currPage = (newState, { id }) => {
    newState.page = id;
    return newState;
}
/**
 * 点击单号显示对应签核内容
 */
const formClick = (newState, { data, title }) => {
    newState.page = 2;
    newState.title = title;
    newState.category = data.category;
    newState.formData = { ...data.FlowDetail, ...data.FormDetail };
  
    //正常簽核內容
    if (data.category === 1) {
        newState.flightData = formatFlightData(data.TravelDetail);
    }
    //退改簽
    if (data.category === 2) {
        newState.originFlightData = formatFlightData(data.TravelDetail);
        newState.newFlightData = formatFlightData(data.newRepDetail);
    }
    //時效簽核
    if (data.category === 3) {

    }
    //newState.signHistory = data.signHistory;
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
            category: v.TripType === 'oneWay' ? '單程' : v.TripType === 'twoWay' ? '往返' : '多程',
        }
        for (const ele of v.Detail) {
            let obj = {
                key: k++,
                ...personInfo,
                dateSection: ele.Astart + ' ~ ' + ele.Aend,
                fromAirport: ele.StartAirportName,
                arriveAirport: ele.EndAirportName
            }
            flightArr.push(obj);
        }
    }
    return flightArr;
}
/**
 * 返回form列表
 */
const goback = (newState, action) => {
    newState.page = 1;
    return newState;
}

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        //頁面初始化數據
        case actionTypes.SIGN_PAGE_DATA:
            return pageData(newState, action);
        //判断当前是待签核页面还是已签核页面
        case actionTypes.CURR_PAGE:
            return currPage(newState, action);
        //返回form列表
        case actionTypes.GO_BACK:
            return goback(newState, action);

        //点击单号显示对应签核内容
        case actionTypes.FORMID_CLICK:
            return formClick(newState, action);

        default:
            return newState;
    }
}