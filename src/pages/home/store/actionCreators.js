import axios from "../../../axios/";
import * as actionTypes from "./actionTypes";
import { EMPNO_OUTNAME, GET_WEB_VERSION } from "../../../config/api";
import CryptoJS from "crypto-js/core";
import Base64 from "crypto-js/enc-base64";

let index = null;
if (!sessionStorage.getItem("Index")) {
  sessionStorage.setItem("Index", "0");
  if (window.location.hash.includes("?")) {
    window.location.reload(true);
  }
} else {
  index = sessionStorage.getItem("Index");
}
export const canAutoLogin = () => {
  return {
    type: actionTypes.AUTO_LOGIN,
  };
};

export const autoLogin = (props) => {
  if (props.location.search) {
    let data = props.location.search.slice(1);
    // console.log(data);
    if (index === "0") {
      stringify(data, props);
    }
  }
  return (dispatch) => {
    dispatch(canAutoLogin());
  };
};
const stringify = (data, props) => {
  let arr = data.split("&");
  let user = null;
  let id = null;
  if (arr[0]) user = Base64.parse(arr[0].slice(2));
  if (arr[1]) id = Base64.parse(arr[1].slice(2));
  if (!sessionStorage.getItem("userId")) {
    sessionStorage.setItem("userId", id.toString(CryptoJS.enc.Utf8));
  }
  if (!sessionStorage.getItem("user")) {
    sessionStorage.setItem("user", user.toString(CryptoJS.enc.Utf8));
  }
  sessionStorage.setItem("category", "staff");
  sessionStorage.setItem("Index", "1");
  if (arr[2]) {
    props.history.replace("/sign");
  } else {
    props.history.replace("/home");
  }
};

// 获取版本号
export const asyncGetVersion = (data) => {
  return {
    type: actionTypes.GET_WEB_VERSION,
    data,
  };
};

export const getWebVersion = (props) => {
  return (dispatch) => {
    axios
      .get({ url: GET_WEB_VERSION })
      .then((res) => {
        console.log("getWebVersion", res);
        dispatch(asyncGetVersion(res.data));
      })
      .catch((err) => {});
  };
};
