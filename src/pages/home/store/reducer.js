import * as actionTypes from "./actionTypes";
const defaultState = {
  info: null,
  webVersion: "",
};

const loginInfo = (newState, action) => {
  return newState;
};

const getWebVersion = (newState, action) => {
  newState.webVersion = action.data.version;
  return newState;
};

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case actionTypes.GET_PROJECT_NAME:
      return newState;
    case actionTypes.AUTO_LOGIN:
      return loginInfo(newState, action);

    case actionTypes.GET_WEB_VERSION: // 获取版本号
      return getWebVersion(newState, action);
    default:
      break;
  }
  return newState;
};
