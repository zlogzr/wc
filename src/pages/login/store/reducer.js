import * as actionTypes from "./actionTypes";
const defaultState = {
    login: false,
    loading: false,

    domain:[{
        value:'WKSCN',  
       },{
        value:'WZSCN',
       }],
       domainSelectData:'',
};

/**
 * 登陆成功
 */
const loginSuccess = (newState, action) => {
  newState.login = true;
  newState.loading = false;
  return newState;
}

/**
 * loading
 */
const loading = (newState, action) => {
    newState.loading = true;
    return newState;
}

/**
 * 登陸失敗
 */
const loginFail = (newState, action) => {
    newState.loading = false;
    return newState;
}

// 網域選擇
const domainSelect = (newState, action) => {
    newState.domainSelectData = action.data;
    return newState;
}


export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    console.log(action.type, "执行");
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(newState, action);

        case actionTypes.LOADING:
            return loading(newState, action);

        case actionTypes.LOGIN_FAIL:
            return loginFail(newState, action);

        case actionTypes.DOMAIN_SELECT:
                return domainSelect(newState, action);

        default:
            break;
    }
    return newState;
    
}