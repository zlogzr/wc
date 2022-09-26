// import reducer from './reducer';
// import * as actionTypes from './actionTypes';
// import * as actionCreators from './actionCreators';

// export {reducer, actionTypes, actionCreators};

// 该文件用于暴露store

import { createStore } from 'redux'


// 引入为count组件服务的
import countReducer from './reducer'

export default createStore(countReducer)