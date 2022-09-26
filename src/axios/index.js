import JsonP from 'jsonp'
import axios from 'axios'
// import { hahaha } from "../utils";
import { message } from 'antd';
import {baseURL} from "./baseURL";
import { LOGIN,LOGIN_123 } from "../config/api";

const TiMEOUT = 10000;

var ajax = axios.create({
    baseURL: baseURL,
    withCredentials: true,        //9.16wzs为false
    timeout: TiMEOUT,
  })
export default class Axios{
    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function(err,response){
                if(response.status === 'success'){
                    resolve(response);
                }else{
                    reject(response.message);
                }
            })
        })
    }

    // 发送 GET 请求
    static get(options){
        return new Promise((resolve,reject)=>{
            ajax({
                url:options.url,
                method:'get',
                withCredentials:true,
                params:options.data || '',
                loading:options.loading
            }).then((response)=>{
                if(response.status === 200){
                        resolve(response.data);
                }else{
                    reject(response.data);
                }
            }).catch(err=>{
                message.error('error : 請求錯誤',2);

            })
        })
    }

    // 发送 POST 请求
    static post(options){
        return new Promise((resolve,reject)=>{
            ajax({
                method: 'post',
                url: options.url,
                data: formatPostData(options.data, options.format) || '',
                loading:options.loading,
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                timeout: options.timeout || TiMEOUT,
                // timeout: TiMEOUT,

            }).then((response)=>{
                if(response.status === 200){
                        resolve(response.data);
                }else{
                    reject(response.data);
                }
            }).catch(err=>{
                reject(err)
            });
        })
    }
}


// 添加请求拦截器
ajax.interceptors.request.use(function (config) {

    if(!new RegExp(`^(${LOGIN})$|^(${LOGIN_123})$`).test(config.url))
    {
        let user = sessionStorage.getItem('user');
        let userId = sessionStorage.getItem('userId');
        if(!(user && userId)){
            window.location.hash = '/home';
            sessionStorage.removeItem('user');
        }
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 添加响应拦截器
ajax.interceptors.response.use(function (response) {
    if(response.data.code === 2){
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('category');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('site');
        window.location.hash = '/';
    }
    return response

  }, function (error) {
    return Promise.reject(error);
  });


/**
 * 格式化post提交數據
 * @param {object} data
 */
const formatPostData = (data, format) => {
    let formData = new FormData();
    if(data instanceof FormData){
        return data;
    }
    if(typeof data === 'object' && !format){
        data = JSON.stringify(data);
        formData.append('data', data);
    }else if(typeof data === 'object'){
        for (const v of Object.keys(data)) {
            if(typeof data[v] === 'object'){
                formData.append(v, JSON.stringify(data[v]));
            }else{
                formData.append(v, data[v]);
            }
        }
    }
    return formData;
}

