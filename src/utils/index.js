
/**
 * 获取cookie
 */
    export function getCookie(cookieName){
        let arr1 = document.cookie.split(';');
        for (let value of arr1) {
            let arr2 = value.split('=');
            if(arr2[0].trim() ===cookieName){
                return new Buffer(arr2[1],'base64').toString()  //解码
            }
        }
        return null;
    }

/**
 * 删除cookie
 */
    export function deleteCookie(cookieName){
        let exp = new Date();
        exp.setTime(exp.getTime() -1);
        let val = getCookie(cookieName);
        document.cookie = `${cookieName}=${val};expires=${exp.toUTCString()}`;
    }

/**
 * 格式化时间
 */
    export const formatDate = (d, flag = '-', hasTime) => {
        // d = d.replace(/[\u4e00-\u9fa5]+/g, '');
        const date = new Date(d);
        if(date.toString() === 'Invalid Date'){
            return null
        }
        const year = date.getFullYear();
        const month = date.getMonth()+1 > 9? date.getMonth()+1 : '0' + (date.getMonth()+1);
        const day = date.getDate() > 9? date.getDate() : '0' + (date.getDate());
        const hours = date.getHours() > 9? date.getHours() : '0' + (date.getHours());
        const minutes = date.getMinutes() > 9? date.getMinutes() : '0' + (date.getMinutes());
        const seconds = date.getSeconds() > 9? date.getSeconds() : '0' + (date.getSeconds());  
        if(hasTime){
            return  year + flag + month + flag + day + ' ' + hours + ':' + minutes + ':' + seconds
        }else{
            return  year + flag + month + flag + day;
        }
    }

/**
 * 组合函数
 */
    export const compose = (...funcs) => component => {
        if (funcs.lenght === 0) {
          return component;
        }
        const last = funcs[funcs.length - 1];
        return funcs.reduceRight((res, cur) => cur(res), last(component));
      };

/**
 * 返回单个的栏位页面文本值
 */
export const getText = (code, arr, name) => {
    for (const v of arr) {
      if(Object.values(v).includes(code)){
        return v[name];
      }
    }
    return null;
  }
  
  /**
   * 将栏位的key和value的方式返回
   */
export const getArrText = (codeArr, arr, codeName) => {
    let id = codeArr;
    let name = [];
    for (const v of codeArr) {
      name.push(getText(v, arr, codeName));
    }
    return { id, name }
  }

/**
 * 获取url参数
 */
export const getUrlParam = (params, key) => {
    let paramStr = params;
    if(params.indexOf('?') === 0){
        paramStr = params.slice(1);
    }
    let paramArr = paramStr.split('&');
    for (let v of paramArr) {
        let vArr = v.split('=');
        if(vArr[0] === key){
            return decodeURIComponent(vArr[1]);
        }
    }
    return null;
}

/**
 * excel
 */
export const exportExcel = (excelTitle,data,successFcu) => {
    let str = excelTitle ? excelTitle.join(',') + '\n' : '';
    for (let i = 0; i < data.length; i++) {
        for (let item in data[i]) {
            str += `${data[i][item] + '\t'},`;
        }
        str += '\n';
    }
    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
    let elink = document.createElement('a');
    elink.download = "xxx.xls";
    elink.style.display = 'none';
    elink.innerText = 'download'
    elink.href = uri;
    document.body.appendChild(elink);
    elink.click();
    document.body.removeChild(elink);
    if(successFcu && successFcu.prototype === 'function'){
        successFcu();
    }
}
