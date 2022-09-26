import * as actionTypes from "./actionTypes";
import { message } from "antd";
const defaultState = {
  page: 1,
  category: 1,
  serialId: "",
  ticketOutFormListData: [],
  changeFormList: [],
  backChangeApplyForm: [],
  ticketOutSignList: [],
  ticketOutForm: [], //退改簽頁面數據接口总的单据
  changeTicketEdit: {},
  changeTicketOk: [],
  backTickets: [],
  backTicketss: [], //点击选择框退票用
  backTicketChanges: [], //点击选择框改签用
  remark: "",
  returnText: [], //退票渲染的页面值

  Returninfomian: [], //退票选择框数据
  Changeinfomian: [], //改签选择框数据
};

/**
 * 頁面初始化數據
 */
const getPageData = (newState, { data: { TravelDetail } }) => {
  newState.ticketOutForm = formatCompleteFlightData(TravelDetail).map(
    (v, index) => {
      v.id = index;
      return v;
    }
  );

  return newState;
};

// 组件关闭清空数据
const rejects = (newState) => {
  // newState.ticketOutForm=[]
  newState.changeTicketOk = [];
  newState.returnText = [];
  newState.backTicketss = [];
  newState.returnText = [];
  newState.Returninfomian = [];
  newState.Changeinfomian = [];
  newState.backTickets = [];
  newState.backTicketChanges = [];
  return newState;
};

/**
 * 格式化已报价航程信息顯示（因栏位名称不一样）欄位名稱不一樣，要根據實際情況進行調整
 */
const formatCompleteFlightData = (arr) => {
  if (arr.length === 0) {
    return arr;
  }

  let flightArr = [];
  arr.forEach((val) => {
    val.Price.forEach((item, index) => {
      let arr = {
        key: index,
        id: index,
        flyDate: item.FlyTime,
        fromAirport: item.StartAirport,
        arriveAirport: item.ArriveAirport,
        flight: item.FlyNo,
        money: item.Cost,
        uniqueId: item.UniqueID,
        repUniqueId: item.RepUID,
        empno: val.Empno,
        name: val.Chname,
        sex: val.Sex,
        category:
          val.TripType === "oneWay"
            ? "單程"
            : val.TripType === "twoWay"
              ? "往返"
              : "多程",
      };
      flightArr.push(arr);
    });
  });
  flightArr.forEach((item, index) => {
    item.key = index;
    item.id = index;
  });
  return flightArr;
};

// const arryshshf=(arr)=>{
//     let flightArr = [];
//     for (const v of arr) {
//         let personInfo = {
//             empno: v.Empno,
//             name: v.Chname,
//             sex: v.Sex,
//             category: v.TripType === 'oneWay' ? '單程' : v.TripType === 'twoWay' ? '往返' : '多程',
//         };
//         // debugger
//         flightArr = v.Price.map((item, index) => {
//             return {
//                 key: index,
//                 id: index,
//                 ...personInfo,
//                 flyDate: item.FlyTime,
//                 fromAirport: item.StartAirport,
//                 arriveAirport: item.ArriveAirport,
//                 flight: item.FlyNo,
//                 money: item.Cost,
//                 uniqueId: item.UniqueID,
//                 repUniqueId: item.RepUID
//             }
//         });
//     }
// }

/**
 * 点击单号显示对应签核内容
 */
const formClick = (newState, { data, title, SerialID }) => {
  newState.page = 2;
  newState.title = title;
  newState.category = data.category;
  newState.serialId = SerialID;
  return newState;
};

/**
 * 返回form列表
 */
const goback = (newState, action) => {
  newState.page = 1;
  return newState;
};

/**
 * 隱藏模態框
 */
const hiddenModal = (newState, action) => {
  newState.showModal = false;
  return newState;
};
/**
 * 退票
 */
const backTickets = (newState, { data, checked }) => {
  // debugger

  newState.returnText = newState.backTicketss.map((v, index) => {
    v.id = index;
    return v;
  });
  newState.backTickets = newState.returnText.map((v) => {
    return v.uniqueId;
  });
  newState.returnText.map((v, index) => {
    v.id = index;
    return v;
  });
  // //点击退票按钮后,原行程数据做清空处理
  let arr = [...newState.returnText];
  let idList = arr.map((item) => item.uniqueId);
  newState.ticketOutForm = newState.ticketOutForm
    .filter((item) => {
      return !idList.includes(item.uniqueId);
    })
    .map((v, index) => {
      v.id = index;
      return v;
    });
  newState.backTicketChanges = [];
  newState.ticketOutForm = newState.ticketOutForm.map((v, index) => {
    v.id = index;
    return v;
  });
  return newState;
};

/**
 * 选择票
 */
const backTicketss = (newState, { data, checked }) => {
  // debugger
  if (checked) {
    newState.backTicketss.push(data); //如果checked為true，那麼增加到數據裡面 退票用
    newState.backTicketChanges.push(data); //改签用
    // newState.backTicketss.forEach((item, index) => {
    //     item.id = index;
    // });
    newState.backTicketChanges = newState.backTicketChanges.map((item, index) => {
      return {
        ...item,
        id: index
      }
    })
    newState.backTicketChanges = newState.backTicketChanges.sort((a, b) => a.key - b.key)
    newState.backTicketss = newState.backTicketss.map((item, index) => {
      return {
        ...item,
        id: index
      }
    })
    newState.backTicketss = newState.backTicketss.sort((a, b) => a.key - b.key)
  } else if (!checked) {
    //如果checked為false，那麼删除该条数据
    // console.log(newState.backTicketss, '==-=-');
    // console.log(data, 'data');
    let arrs = [...newState.backTicketss];
    let arrslength = arrs.length;
    // let length=newState.backTicketss.length

    for (let i = 0; i < arrslength; i++) {
      if (arrs[i] !== undefined && arrs[i].uniqueId === data.uniqueId) {
        arrs.splice(i, 1); //删除下标为i的元素
      }
    }

    let arrss = [...newState.backTicketChanges];
    let arrsslengths = arrss.length;
    for (let a = 0; a < arrsslengths; a++) {
      if (arrss[a] !== undefined && arrss[a].uniqueId === data.uniqueId) {
        arrss.splice(a, 1); //删除下标为i的元素
      }
    }
    newState.backTicketss = arrs.map((item, index) => {
      return {
        ...item,
        id: index
      }
    }); //退票有
    newState.backTicketss = newState.backTicketss.sort((a, b) => a.key - b.key)
    newState.backTicketChanges = arrss.map((item, index) => {
      return {
        ...item,
        id: index
      }
    }); //改签有
    newState.backTicketChanges = newState.backTicketChanges.sort((a, b) => a.key - b.key)
  }
  return newState;
};

// 退票选择框
const ReturnbackTickets = (newState, { data, checked }) => {
  // debugger
  if (checked) {
    newState.Returninfomian.push(data);
  } else if (!checked) {
    let arrs = [...newState.Returninfomian];
    let arrslength = arrs.length;
    for (let i = 0; i < arrslength; i++) {
      if (arrs[i] !== undefined && arrs[i].uniqueId === data.uniqueId) {
        arrs.splice(i, 1); //删除下标为i的元素
      }
    }
    newState.Returninfomian = arrs.map((item, index) => {
      return {
        ...item,
        id: index
      }
    });
  }
  return newState;
};
//选中后点击退票按钮
const ReturnhandlebackTickets = (newState) => {
  // debugger
  newState.ticketOutForm = newState.ticketOutForm.concat(
    newState.Returninfomian
  );
  // //点击取消退票按钮后,选中数据做清除处理
  let arr1 = [...newState.Returninfomian];
  let idList = arr1.map((item) => item.uniqueId);
  newState.returnText = newState.returnText
    .filter((item) => {
      return !idList.includes(item.uniqueId);
    })
    .map((v, index) => {
      v.id = index;
      return v;
    });
  newState.backTicketss = newState.backTicketss
    .filter((item) => {
      return !idList.includes(item.uniqueId);
    })
    .map((v, index) => {
      v.id = index;
      return v;
    });
  newState.Returninfomian = [];

  newState.ticketOutForm = newState.ticketOutForm.map((v, index) => {
    v.id = index;
    return v;
  });
  newState.ticketOutForm = newState.ticketOutForm.sort((a, b) => a.key - b.key)

  newState.backTickets = newState.returnText.map((v) => {
    return v.uniqueId;
  });

  return newState;
};

// 改签选择框
const ChangesbackTickets = (newState, { data, checked }) => {
  // debugger
  if (checked) {
    newState.Changeinfomian.push(data);
  } else if (!checked) {
    let arrs = [...newState.Changeinfomian];
    let arrslength = arrs.length;
    for (var i = 0; i < arrslength; i++) {
      if (arrs[i] !== undefined && arrs[i].uniqueId === data.uniqueId) {
        arrs.splice(i, 1); //删除下标为i的元素
      }
    }
    newState.Changeinfomian = arrs.map((item, index) => {
      return {
        ...item,
        id: index
      }
    });
  }
  return newState;
};
//选中后点击改签按钮
const ChangeshandlebackTickets = (newState) => {
  newState.ticketOutForm = newState.ticketOutForm.concat(
    newState.Changeinfomian
  );
  // //点击取消退票按钮后,选中数据做清除处理
  let arr1 = [...newState.Changeinfomian];
  let idList = arr1.map((item) => item.uniqueId);
  newState.changeTicketOk = newState.changeTicketOk
    .filter((item) => {
      return !idList.includes(item.uniqueId);
    })
    .map((v, index) => {
      v.id = index;
      return v;
    });

  newState.backTicketChanges = newState.backTicketChanges
    .filter((item) => {
      return !idList.includes(item.uniqueId);
    })
    .map((v, index) => {
      v.id = index;
      return v;
    });

  newState.ticketOutForm = newState.ticketOutForm.map((v, index) => {
    v.id = index;
    return v;
  });
  newState.ticketOutForm = newState.ticketOutForm.sort((a, b) => a.key - b.key)
  return newState;
};

/**
 * 退票改簽模態框
 */

const changeTicketClick = (newState, action) => {
  if (newState.backTicketChanges.length === 0) {
    return newState;
  }
  let editFlightData = { detail: [] };
  newState.showModal = true;
  // newState.backTicketChanges.forEach((v, i) => {
  //   v.id = i;
  // });

  editFlightData.category = newState.backTicketChanges
    ? newState.backTicketChanges[0].category
    : "";

  editFlightData.detail = [...newState.backTicketChanges];
  //格式化
  editFlightData.detail = editFlightData.detail.map((v) => {
    // debugger
    //對日期字符串去掉兩遍空格
    let dateStr = v.flyDate.trim();
    // 日期與時間分離 2019/2/28 下午 06:32:00
    //獲取第一個空格以獲取日期
    let i = dateStr.indexOf(" ");
    v.flyDateTo = dateStr.substring(0, i);
    v.flyTimeTo = dateStr.substring(i);
    return v;
  });

  newState.changeTicketEdit = editFlightData;
  return newState;
};
//保存改簽數據
const changeTicketOk = (newState, action) => {
  // debugger

  // if(action.changeTicketOk){

  //     action.changeTicketOk.forEach(v=>{
  //         for(let k in v)
  //         {

  //             if (   k=== "flyEndTime") { let str = v[k].toString();v[k] = str.subString(0,5) + '00' }

  //         }
  //     })
  //   }
  // console.log(action.changeTicketOk,'4545454545');

  //獲取所有的已改簽keys
  // const keys = newState.changeTicketOk.map(v => (v.key));
  //第一次改簽數據
  // console.log(newState, action,'第一次改簽數據');
  // const arrFirst = action.changeTicketOk.filter((v) => (!keys.includes(v.key)));

  //重複改簽數據
  // const arrAgain = action.changeTicketOk.filter((v) => (keys.includes(v.key)));
  //把第一次退簽的添加到數組
  // newState.changeTicketOk = [...newState.changeTicketOk, ...arrFirst];
  //重複改簽的合併
  // newState.changeTicketOk = mergeChangeTicket(newState.changeTicketOk, arrAgain);
  newState.changeTicketOk = newState.changeTicketOk.concat(action.changeTicketOk)
  newState.changeTicketOk = newState.changeTicketOk.sort((a, b) => a.key - b.key)
  // //点击退票按钮后,原行程数据做清空处理
  let arr = [...newState.changeTicketOk];
  let idList = arr.map((item) => item.uniqueId);
  newState.ticketOutForm = newState.ticketOutForm
    .filter((item, key) => {
      return !idList.includes(item.uniqueId);
    })
    .map((v, index) => {
      v.id = index;
      return v;
    });
  // debugger

  newState.showModal = false;
  newState.backTicketss = [];
  newState.backTicketChanges = [];
  return newState;
};

//合併重複項
const mergeChangeTicket = (arr1, arr2) => {
  // debugger
  return arr1.map((v) => {
    for (const item of arr2) {
      if (v.key === item.key) {
        return { ...v, ...item };
      }
    }
    return v;
  });
};

//保存備註
const saveRemark = (newState, action) => {
  newState.remark = action.value.Remark;
  return newState;
};

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    //頁面初始化數據
    case actionTypes.PAGE_DATA:
      return getPageData(newState, action);

    //返回form列表
    case actionTypes.GO_BACK:
      return goback(newState, action);

    //点击单号显示对应签核内容
    case actionTypes.FORMID_CLICK:
      return formClick(newState, action);

    //点击单号显示对应签核内容
    case actionTypes.SHOW_LIST_PAGE:
      return goback(newState, action);
    //隱藏模態框
    case actionTypes.HIDDEN_MODAL:
      return hiddenModal(newState, action);
    //保存改簽數據
    case actionTypes.CHANGE_TICKET_OK:
      return changeTicketOk(newState, action);
    //退票改簽模態框
    case actionTypes.CHECK_DETAIL:
      return changeTicketClick(newState, action); //待退改簽查看

    //退票
    case actionTypes.GET_BACK_DATA:
      return backTickets(newState, action); //待退改簽查看

    //选择框
    case actionTypes.GET_BACK_DATAS:
      return backTicketss(newState, action); //选择框选中带退改签的票

    //退票
    case actionTypes.SAVE_REMARK:
      return saveRemark(newState, action); //待退改簽查看

    //退票取消选择框
    case actionTypes.GET_BACK_DATASRETURN:
      return ReturnbackTickets(newState, action);
    //选中后点击退票按钮
    case actionTypes.GET_BACK_DATASRETURNSS:
      return ReturnhandlebackTickets(newState, action);

    //改签取消选择框
    case actionTypes.GET_BACK_DATASCHANGES:
      return ChangesbackTickets(newState, action);
    //选中后点击改签取消按钮
    case actionTypes.GET_BACK_DATASCHANGESS:
      return ChangeshandlebackTickets(newState, action);

    //頁面初始化數據
    case actionTypes.PAGE_DATAS:
      return rejects(newState, action);

    default:
      return newState;
  }
};
