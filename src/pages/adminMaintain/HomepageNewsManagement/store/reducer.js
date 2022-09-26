import * as actionTypes from "./actionTypes";
const defaultState = {
   baseInfo: {},
   personData: [],
   personDataType:[],
   addPersonPageData:{
    country: [],
    cardCategory: [],
    // country: []
   },
   showModal: false,
   isEdit: false,
   editData: {},
   haveFamilyName: true,
   cardInfo: [],
};
/**
 * 頁面數據
 */
 const pageData = (newState, data) => {
    newState.personData = data.data.data.map((v,k) => ({
        key:k,
        OTime: v.OTime+"~"+v.ETime,
        // Code: v.Code? v.Code==="1"?"1昊":v.Code==="2"?"2HAO":""   : "",
        Code:  v.Code==="1"? '出行資訊' :  v.Code==="0"? "公司規章":"",
        Name: v.Name,
        TaiwanVaidTime:'',
        UniqueID:v.UniqueID,
        Value:v.Value

    }))
    newState.personDataType=data.data.type.map((v=>{
      return  v==="1"? '公司規章' :  v==="0"? "出行資訊":""
    }))

    return newState;
}

// const pageData = (newState, data) => {
//     newState.baseInfo = BaseInfo[0];
//     newState.addPersonPageData.cardCategory = CertType;
//     newState.addPersonPageData.country = Country;
//     newState.addPersonPageData.relation = RelationShip;
//     newState.personData = data;
//     if(newState.personData.length > 0){
//        
//         newState.personData = newState.personData.map( (v, k) => ({k, ...v}))
//     }
//     return newState;
// }

/**
 * 显示模态框
 */
const addShow = (newState, action) => {
    newState.showModal = true;
    newState.isEdit = false;
    newState.editData = {};
    newState.cardInfo = [];
    return newState;
}
/**
 * 隐藏模态框
 */
const hiddenModal = (newState, action) => {
    newState.showModal = false;
    return newState;
}
/**
 * 新聞改變時
 */
const familyChange = (newState, {data}) => {
    newState.cardInfo = [];
    if(data === ''){
        newState.haveFamilyName = true;
    }else{
        newState.haveFamilyName = false;
    }
    return newState;
}
/**
 * 新增卡信息
 */
const cardNewAdd = (newState, {data}) => {
    
    let obj = {
        CertType: data.cardCategory,
        CertNO: data.cardNo,
        CertName: data.name,
        CertTime: data.validDate.format('YYYY-MM-dd'),
        SignTime: data.signValidDate || null,
        TaiwanTime: data.inTaiValidDate || null,
    }
    newState.cardInfo.push(obj);
    return newState;
}
/**
 * 新增新聞
 */
const addCommonPeople = (newState, {data}) => {
    newState.showModal = false;
    newState.personData.push(data);
    if(newState.personData.length > 0){
        newState.personData = newState.personData.map( (v, k) => ({k, ...v}))
    }
    return newState;
}

/**
 * 编辑
 */
const edit = (newState, {data}) => {
    newState.editData = data;
    sessionStorage.setItem('UniqueID',data.UniqueID);
    newState.cardInfo = {

    };
    newState.isEdit = true;
    newState.showModal = true;
    return newState;
}
/**
 * 编辑成功
 */
const editSuccess = (newState, {data}) => {
    newState.personData.map(v => {
        if(v.UniqueID === data.UniqueID){
            v = Object.assign(v,data);
        }
    });
    newState.isEdit = true;
    newState.showModal = false;
    return newState;
}

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
       
        //頁面數據
        case actionTypes.PAGE_DATA:
            
            return pageData(newState, action);

        //显示模态框
        case actionTypes.SHOW_MODAL:
            return addShow(newState, action);

        //隐藏模态框
        case actionTypes.HIDDEN_MODAL:
            return hiddenModal(newState, action);

        //信息改變時
        case actionTypes.FAMILY_CHANGE:
            return familyChange(newState, action);

        //新增信息
        case actionTypes.ADD_CARD_INFO1:
            return cardNewAdd(newState, action);

        //新增新聞
        case actionTypes.ADD_COMMON_PEOPLE:
            return addCommonPeople(newState, action); 

        //编辑
        case actionTypes.EDIT:
            return edit(newState, action);

        //编辑成功
        case actionTypes.EDIT_SUCCESS:
            return editSuccess(newState, action);

        default:
            return newState;
    }
}