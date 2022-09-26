import * as actionTypes from "./actionTypes";
import * as other from '../../detail/store/actionTypes';

const defaultState = {
    page: 1,
    title: '',
    category: 2,
    signFormListData: [],
    formData: [],
    flightData: [],
    newFlightData: [],
    originFlightData: [],
    signHistory: [],
    CertInfo: [],
    modiovde: false,
    modiovdes: false

};


/**
 *
 */
const currPage = (newState, { id }) => {
    newState.page = id;
    return newState;
}

const submitDatadqhCanel = (newState) => {
    newState.modiovde = false;
    return newState;
}

const submitDatadqhCanels = (newState) => {
    // debugger
    newState.modiovde = true;
    return newState;
}

// 点击驳回
const submitchanges = (newState, action) => {
    if (action.e === 'Y') {
        newState.modiovdes = true
    } else {
        newState.modiovdes = false
    }
    return newState
}
/**
 * 頁面初始化數據
 */
const pageData = (newState, { data }) => {
    // console.log(newState.page,data)
    if (newState.page == 1 && data.TobeSignFormList.length > 0) {
        newState.signFormListData = data.TobeSignFormList.map(v => ({
            formId: v.SequenceID,
            formName: v.FormName,
            serialId: v.SerialID,
            fillDate: v.ApplyDateTime,
            applyName: v.ApplyName,
            status: v.StepName
        })
        )
    } else if (newState.page == 2 && data.SignedFormList.length > 0) {
        newState.signFormListData = data.SignedFormList.map(v => ({
            formId: v.SequenceID,
            formName: v.FormName,
            serialId: v.SerialID,
            fillDate: v.ApplyDateTime,
            applyName: v.ApplyName,
            status: v.StepName
        })
        )
    } else if (newState.page == 3 && data.ConfirmList.length > 0) {
        // console.log(data.ConfirmList)
        newState.signFormListData = data.ConfirmList.map(v => ({
            formId: v.SequenceID,
            formName: v.FormName,
            serialId: v.SerialID,
            fillDate: v.ApplyDateTime,
            applyName: v.ApplyName,
            status: '待確認'
        }))
    } else {
        newState.signFormListData = [];
    }
    if (newState.signFormListData != []) {
        let temp = newState.signFormListData;
    }
    newState.modiovde = false
    newState.modiovdes = false
    return newState;
}
/**
 * 点击单号显示对应签核内容
 */
const formClick = (newState, { data, title }) => {

    //  console.log(data, title,'data, titledata, title');

    //  debugger

    newState.page = 2;
    newState.title = title;
    newState.category = data.category;
    newState.formData = { ...data.FormDetail[0], ...data.FlowDetail };
    newState.CertInfo = data.CertInfo;
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
    newState.signHistory = data.signHistory;
    return newState;
}
/**
 * 格式化航程信息顯示
 */
const formatFlightData = arr => {
    let flightArr = [];
    let k = 0;


    //  console.log(arr,'111111111111111');

    for (const v of arr) {
        let personInfo = {
            // empno: v.Empno,
            name: v.Chname,
            category: v.TripType === 'oneWay' ? '單程' : v.TripType === 'twoWay' ? '往返' : '多程',
        }
        for (const ele of v.Detail) {
            let obj = {
                key: k++,
                ...personInfo,
                // dateSection: ele.Astart + ' ~ ' + ele.Aend,
                dateSection: ele.FlyTime,
                fromAirport: ele.StartAirportName,
                arriveAirport: ele.EndAirportName,
                money: ele.Cost,  //9.17增加金额
                flyno: ele.FlyNo,   //增加航班号
                classtype: ele.ClassType,   //艙等
                travelname: ele.TravelName,
                remark: ele.remark    //備註
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

const signData = (newState, action) => {
    let temp = newState.signFormListData;
    let index = null;
    for (let i = 0, len = temp.length; i < len; i++) {
        if (temp[i].serialId === action.id) {
            index = i
        }
    }
    temp.splice(index, 1)
    newState.signFormListData = temp;
    return newState;
}

const confirm = (newState, action) => {
    // const yesorNo = 'Y'
    // console.log('data:' + data);
};

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        //判断当前是待签核页面还是已签核页面
        case actionTypes.CURR_PAGE:
            return currPage(newState, action);

        //頁面初始化數據
        case actionTypes.SIGN_PAGE_DATA:
            return pageData(newState, action);

        //返回form列表
        case actionTypes.GO_BACK:
            return goback(newState, action);

        //点击单号显示对应签核内容
        case actionTypes.FORMID_CLICK:
            return formClick(newState, action);

        case other.RELOAD_DATA:
            return signData(newState, action);

        //点击對應確認单号 確認
        case actionTypes.CONFIRM_PAGE:
            return confirm(newState, action);

        //關閉彈框
        case other.SIGN_PAGE_DATAOPEN:
            return submitDatadqhCanel(newState, action);
        //打開
        case other.SIGN_PAGE_DATACLONE:
            return submitDatadqhCanels(newState, action);

        //打開
        case actionTypes.SIGN_PAGE_DATAOPENCHANGES:
            return submitchanges(newState, action);

        default:
            return newState;
    }
}