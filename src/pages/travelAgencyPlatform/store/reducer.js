import { LOGIN } from "../../../config/api";
import * as actionTypes from "./actionTypes";
import moment from "moment";

const defaultState = {
  submit_loading: false, //提交時btn loading
  formInfo: {},
  quotePrice: [],
  quoteTime: "", //报价截止时间
  serialId: "",
  flight: [],
  quoteStartData: [], //修改行程进去的值
  showModal: false,
  card: [],
  selectCard: {},
  company: [],
  selectCompany: {},
  cadastral: [],
  level: [],
  hobby: [],
  quoteFlightInfo: {},
  key: 0,
  againPrice: false,
  hadQuote: [],
  hadQuoteFormInfo: {},
  edit: false,
  baseInfo: [],
  Remarkss: "",
  quoteCompleteList: [], //已報價列表
  waitForTicketList: [], //待出票列表
  waitForTicketForm: {}, //待出票form信息
  waitForTicketDetailFlight: [], //待出票航程信息
  waitTicketOutUpload: [], // 出票 行程单附件

  ticketOutList1: [], //已出票列表
  ticketOutList2: [], //已出票列表
  ticketListDetail: [], //航程信息
  isBackChangeTicketOut: false, //是否是退改簽已出票
  ticketOutBackOrChange: "", // 是否是退票
  formInfo: {}, //已出票form信息
  backChangeForm: {}, //已出票退改簽form信息
  ticketNewListDetail: [], // 改簽后新行程信息
  fileDown: [],
  TtfileDown: {},
  cardinfo: [],

  backChangeList: [], //退改簽列表
  backChangeListDetail: [], //退改簽列表明細
  isWaitBackTicket: false, //是否是待退票
  backChange: false, //是否是退改簽
  backOrChange: "", //退票或者改簽
  change: false, //改簽報價顯示
  back: false, //退票報價顯示
  waitBackChangeUpload: [], //附件

  waitBackChangeTicketForm: [], //待退改簽form
  waitBackChangeTicketFlight: [], //待退改簽原行程
  waitChangeTicketNewFlight: [], //待改簽新行程

  travelAgencyInfo: {},

  //   9.7添加
  valuehseliatinfo: "", //表格9.7後加定位代碼,備註
  price: "",

  quonugugdd: "", //添加remark ipcord

  CertInfoall: [],

  Quotedlist: [], //已报价渲染数据
  CertInfo: [],
  modiovde: true, //待出票訂票確定彈框按鈕

  tickect: "", //退改簽明細行程單

  returnchangetickect: "", //待退票待改簽明細
};

/**
 * 頁面初始化數據
 */
const pageData = (newState, { data }) => {
  newState.quotePrice = data;
  return newState;
};
/**
 * 獲取報價數據
 */
const willQuotePage = (newState, { data, quoteTime, serialId }) => {
  // debugger
  // console.log(quoteTime,'quoteTime');
  // console.log(data, quoteTime, serialId,'data, quoteTime, serialId');
  const flight = formatFlightData(data.record);
  newState.againPrice = data.isa;
  newState.formInfo = data.head;
  newState.flight = flight;
  console.log("willQuotePage", flight, newState.flight);
  //   newState.flight.push(flight);
  newState.quoteTime = quoteTime;
  newState.serialId = serialId;
  return newState;
};
/**
 * 格式化航程信息顯示
 */
const formatFlightData = (arr) => {
  //   console.log(arr,'arr');
  let flightArr = [];
  let k = 0;
  for (const v of arr) {
    let personInfo = {
      empno: v.Empno,
      name: v.Chname,
      gender: v.Sex,
      category:
        v.TripType === "oneWay"
          ? "單程"
          : v.TripType === "twoWay"
            ? "往返"
            : "多程",
    };
    //   debugger
    for (const ele of v.Detail) {
      let obj = {
        key: k++,
        ...personInfo,
        dateSection: ele.Astart + " ~ " + ele.Aend,
        fromAirport: ele.StartAirportName,
        arriveAirport: ele.EndAirportName,
        flightNo: ele.FlyNo,
        money: ele.Cost,
        uniqueId: ele.UniqueID,
        level: ele.ClassType,

        repuid: ele.RepUID,

        timeStart: ele.FlyTime, //9.18修改
      };
      flightArr.push(obj);
    }
  }
  return flightArr;
};
/**
 * 点击报价       開始報價後的點擊報價
 */
const quoteStart = (newState, { res, data, sid, edit, backChange }) => {
  // console.log(newState, res, data, sid, edit, backChange)
  //退改簽部份
  newState.backChange = backChange ? true : false;
  res.IsReturn && res.IsReturn === "Y"
    ? (newState.back = true)
    : (newState.back = false);
  res.IsChange && res.IsChange === "Y"
    ? (newState.change = true)
    : (newState.change = false);
  //報價部份
  // edit ? newState.quoteStartData = getQuoteData(data, data.name, data.category, res.Price) :
  //     newState.quoteStartData = getQuoteData(newState.flight, data.name, data.category, res.Price);
  if (edit) {
    newState.quoteStartData = getQuoteData(
      newState.hadQuote,
      data.name,
      data.category,
      res.Price
    );
  } else {
    newState.quoteStartData = getQuoteData(
      newState.flight,
      data.name,
      data.category,
      res.Price
    );
  }
  newState.edit = edit;
  newState.showModal = true;
  newState.card = res.CertInfo;
  newState.CertInfoall = res.CertInfo;
  newState.company = res.VIPCard;
  newState.level = res.Berth;
  newState.hobby = res.Hobby;
  newState.baseInfo = res.BaseInfo;
  newState.cadastral = res.Cadastral;
  newState.Remarkss = res.Remark;
  newState.price = res.Price;
  return newState;
};
/**
 * 获取要报价数据
 */
const getQuoteData = (data, name, category, price) => {
  // console.log(data)
  let result = [];
  for (const v of data) {
    v.placeFrom = v.fromAirport;
    v.placeTo = v.arriveAirport;
    if (name === v.name && category === v.category) {
      result.push(v);
    }
  }

  if (price) {
    price.forEach((v, k) => {
      result[k][`level`] = v.ClassType;
      result[k][`ipcode`] = v.ipcode;
      result[k][`remark`] = v.remark;
      result[k][`flytime`] = v.FlyTime;
    });
  }
  // console.log(result,'result');
  return result;
};
const getSelectData = (arr, data, key) => {
  for (const v of arr) {
    if (v[key] === data) {
      return v;
    }
  }
  return null;
};
/**
 * 当报价或者航空公司时选择证件类型带出姓名，证件号码，有效期
 */
const cardAndCompanyChange = (newState, { data, id }) => {
  if (id === 1) {
    newState.selectCard = getSelectData(newState.card, data, "CertType");
  } else if (id === 2) {
    newState.selectCompany = getSelectData(newState.company, data, "Airlineid");
  }
  return newState;
};
/**
 * 填写航班号
 */
const flightNoChange = (newState, { data, k, form }) => {
  // debugger
  newState.quoteStartData[k].placeFrom = data.FromPlace;
  newState.quoteStartData[k].placeTo = data.ToPlace;
  newState.quoteStartData[k].timeStart = data.StartTime;

  // 9.18修改
  // newState.quoteStartData[k].timeStart = moment(data.StartTime, 'YYYY/MM/DD HH:mm:00');

  // form.setFieldsValue({
  //     ['placeFrom' + k]: data.FromPlace,
  //     ['placeTo' + k]: data.ToPlace,
  //     ['timeStart' + k]: moment(data.StartTime, 'YYYY/MM/DD HH:mm'),
  //   });
  return newState;
};
/**
 * 隱藏madal
 */
const hiddenModal = (newState, action) => {
  newState.showModal = false;
  return newState;
};
/**
 * 确定报价未送出
 */
const quoteOk = (newState, { data }) => {
  newState.quonugugdd = data;
  let arr = [];
  data.map((v, k) => {
    if (!v.flightNo) {
      arr.push(k);
    }
  });
  // debugger
  data.splice(arr[0], arr.length);
  let flight = newState.flight;
  let keys = []; // 報價的key
  let hadQuote = newState.hadQuote;
  let hadQuoteKeys = hadQuote.map((v) => v.key);
  newState.showModal = false;
  newState.quoteStartData.forEach((v, k) => {
    //已報價數據
    keys.push(v.key);
    let i = hadQuoteKeys.indexOf(v.key);
    console.log(
      "确定报价数据",
      newState.quoteStartData,
      hadQuote,
      hadQuoteKeys,
      i
    );
    if (i > -1) {
      newState.hadQuote[i] = { ...newState.hadQuote[i], ...data[k] };
    } else {
      newState.hadQuote.push({ ...v, ...data[k] });
    }
  });

  if (!newState.edit) {
    newState.flight = flight.filter((v, k) => !keys.includes(v.key)); //過濾掉已報價的數據
  } else {
    newState.hadQuote = getEditAndOriginData(hadQuote, newState.hadQuote);
  }

  // // 已报价展示数据
  // newState.Quotedlist.push(newState.hadQuote[newState.hadQuote.length - 1])
  // newState.Quotedlist = newState.Quotedlist.flat()
  // let newArr = []

  // newState.Quotedlist.forEach(item => {
  //     newArr.push(item.empno)
  // })
  // for (let id of newArr) {
  //     newState.Quotedlist = newState.Quotedlist.filter(item => {
  //         return id !== item.empno
  //     })
  // }
  newState.Quotedlist.forEach((v, i) => {
    if (v.placeFrom) {
      v.fromAirport = v.placeFrom;
      v.arriveAirport = v.placeTo;
    }
    v.key = i;
  });

  //     let obj = {};
  //   let peon = newState.Quotedlist.reduce((cur,next) => {
  //     obj[next.empno] ? "" : obj[next.empno] = true && cur.push(next);

  //     return cur;
  // },[])
  // console.log(peon);
  // if(newState.Quotedlist.length>=2){
  //     let aife=newState.Quotedlist.map(v=>{
  //        return v.empno
  //    })
  //    newState.Quotedlist= newState.Quotedlist.map((v,i)=>{
  //         if(v.empno!==aife[i]){
  //             return v
  //         }
  //    })
  // }

  return newState;
};
/**
 * 报价修改时，把原数据和修改的数据合并
 */
const getEditAndOriginData = (hadQuote, hadQuoteEdit) => {
  let result = [];
  for (let item of hadQuote) {
    for (const v of hadQuoteEdit) {
      if (item.key === v.key) {
        item = { ...item, ...v };
      }
    }
    result.push(item);
  }
  return result;
};
const submitLoading = (newState, action) => {
  newState.submit_loading = true;
  return newState;
};

const submitHideLoading = (newState, action) => {
  newState.submit_loading = false;
  return newState;
}

/**
 * 重置組件狀態
 */
const resetState = (newState, action) => {
  newState.hadQuote = [];
  newState.Quotedlist = [];
  newState.submit_loading = false;
  return newState;
};

/**
 * 獲取已報價頁面數據
 */
const quoteCompleteList = (newState, action) => {
  newState.quoteCompleteList = action.data;
  newState.quoteTime = action.data.QuoteTime;
  return newState;
};
/**
 * 獲取已報價頁面數據明細
 */
const hadQuotePageDetail = (newState, action) => {
  // debugger
  // console.log(newState, action,'獲取已報價頁面數據明細');
  newState.againPrice = action.data.isa;
  newState.quoteTime = action.quoteTime;
  newState.hadQuoteFormInfo = action.data.head;
  newState.hadQuote = formatCompleteFlightData(action.data.record);
  newState.serialId = action.serialId;
  return newState;
};
/**
 * 格式化已报价航程信息顯示（因栏位名称不一样）
 */
const formatCompleteFlightData = (arr) => {
  // console.log(arr,'格式化已报价航程信息顯示（因栏位名称不一样）');
  if (arr.length === 0) {
    return arr;
  }
  let flightArr = [];
  let k = 0;

  // debugger

  for (const v of arr) {
    // console.log(v,'v');
    let personInfo = {
      empno: v.Empno,
      name: v.Chname,
      gender: v.Sex,
      category:
        v.TripType === "oneWay"
          ? "單程"
          : v.TripType === "twoWay"
            ? "往返"
            : "多程",
    };
    for (const ele of v.Price) {
      // console.log(ele,'ele');
      let obj = {
        key: k++,
        ...personInfo,
        dateSection: ele.FlySection,
        //  起飛時間

        fromAirport: ele.StartAirport,
        arriveAirport: ele.ArriveAirport,
        flightNo: ele.FlyNo,
        money: ele.Cost,
        uniqueId: ele.UniqueID,
        // 9.9 15.10增加
        level: ele.ClassType, //艙位
        timeStart: ele.FlyTime, //起飛時間
        ipcode: ele.ipcode, //定位代碼
        remark: ele.remark, //備註
        repuid: ele.RepUID,
      };
      flightArr.push(obj);
    }
  }
  return flightArr;
};

/**
 * 獲取待出票列表
 */
const waitForTicket = (newState, action) => {
  newState.waitForTicketList = action.data;
  return newState;
};
/**
 * 獲取待出票明細
 */
const waitForTicketDetail = (newState, action) => {
  // debugger

  newState.waitForTicketDetailFlight = formatCompleteFlightData(
    action.data.record
  );
  newState.waitForTicketForm = action.data.head;
  newState.CertInfo = action.data.CertInfo;
  return newState;
};
/**
 * 上傳文件
 */
const uploadFile = (newState, action) => {
  debugger
  newState.waitTicketOutUpload = action.file;
  return newState;
};
/**
 * 已出票列表
 */
const ticketList = (newState, action) => {
  newState.ticketOutList1 = action.data.normal;
  newState.ticketOutList2 = action.data.abnormal;
  return newState;
};
/**
 * 已出票列表明細
 */
const ticketListDetail = (newState, action) => {
  newState.isBackChangeTicketOut = false;
  newState.ticketListDetail = formatCompleteFlightData(action.data.totalList);
  newState.formInfo = action.data.head;
  newState.fileDown = action.data.ticket;
  newState.cardinfo = action.data.CertInfo;
  return newState;
};
/**
 * 已出票退改簽列表明細
 */
const backChangeTicketOutDetail = (newState, action) => {
  newState.isBackChangeTicketOut = true;
  newState.formInfo = action.data.head;
  newState.ticketListDetail = formatCompleteFlightData(
    action.data.oldtotalList
  );
  newState.ticketNewListDetail = formatCompleteFlightData(
    action.data.newtotalList
  );
  newState.fileDown = action.data.ticket;
  newState.TtfileDown = action.data.Itinerary;
  return newState;
};

/**
 * 退改簽列表
 */
const backAndChangeTicket = (newState, action) => {
  newState.backChangeList = action.data;
  // console.log(newState.backChangeList)
  newState.isWaitBackTicket = action.id === 1 ? true : false;
  return newState;
};
/**
 * 退改簽列表明細
 */
const backAndChangeTicketDetail = (newState, action) => {
  // console.log(222222222, action.data.record)
  newState.flight = formatCompleteFlightData(action.data.record);
  newState.serialId = action.serialId;
  newState.tickect = action.data.Ticket;
  return newState;
};
//退改簽列表報價確定
const backChangeOk = (newState, { data, cost }) => {
  // debugger

  let flight = newState.flight;
  let keys = [];
  newState.valuehseliatinfo = data;
  newState.showModal = false;
  // console.log('2')
  newState.hadQuote = (newState.hadQuote.concat(newState.quoteStartData)).map((v, k) => {
    //已報價數據
    keys.push(v.key);
    // 初始值为data,修改退票上传金额后取反,9.6
    // if(data){

    // 9.14修改
    const obj = { ...v, ...data[k] };
    for (const key in obj) {
      const newKey = `${key}${k}`;
      let newCost = cost instanceof Array ? cost[k] : cost;
      if (!newCost) {
        newCost = {};
      }
      if (Object.hasOwnProperty.call(newCost, newKey)) {
        obj[key] = newCost[newKey];
        if (newCost[newKey] instanceof moment) {
          obj[key] = newCost[newKey].format("YYYY-MM-DD HH:mm:ss");
        }
      }
      // console.log(newKey)
    }
    return obj;
  });
  // if(data){
  //     return { ...data};
  // }
  // console.log('newState.edit', newState.edit, flight, keys)
  // if(!newState.edit){
  //     newState.flight = flight.filter((v, k) => !keys.includes(k));  //過濾掉已報價的數據
  // }
  // if (cost) {
  //     console.log('has data')
  //     newState.flight = [cost];
  // }
  // console.log(newState,'newState');
  // console.log(cost,data,'cost');
  return newState;
};

//退改簽列表報價確定
const waitBackChangeTicketListDetail = (newState, { data, serialId }) => {
  // debugger

  newState.waitBackChangeTicketForm = data.head;
  newState.returnchangetickect = data.Ticket;
  newState.serialId = serialId;
  if (newState.isWaitBackTicket) {
    newState.waitBackChangeTicketFlight = formatCompleteFlightData(data.record);
  } else {
    newState.waitBackChangeTicketFlight = formatCompleteFlightData(data.old);
    newState.waitChangeTicketNewFlight = formatCompleteFlightData(data.now);
  }

  return newState;
};

//退改簽列表報價確定
const waitBackChangeUpload = (newState, { file }) => {
  newState.waitBackChangeUpload = file;
  return newState;
};

const rejest = (newState) => {
  // debugger
  // newState.backChangeList=[];

  return newState;
};

/**
 * 旅行社信息
 */
const travelAgencyInfo = (newState, action) => {
  newState.travelAgencyInfo = action.data[0];
  return newState;
};
export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    //獲取帶報價列表
    case actionTypes.PAGE_DATA:
      return pageData(newState, action);

    //獲取報價數據
    case actionTypes.WILL_QUOTE_PAGE:
      return willQuotePage(newState, action);

    //点击报价
    case actionTypes.QUOTE_STATR:
      return quoteStart(newState, action);

    //当报价或者航空公司时选择证件类型带出姓名，证件号码，有效期
    case actionTypes.CARD_CHANGE:
      return cardAndCompanyChange(newState, action);

    //填写航班号
    case actionTypes.FLIGHT_NO_CHANGE:
      return flightNoChange(newState, action);

    //隱藏madal
    case actionTypes.HIDDEN_MODAL:
      return hiddenModal(newState, action);

    //确定报价
    case actionTypes.QUOTE_OK:
      return quoteOk(newState, action);

    //提交時loading效果
    case actionTypes.SUBMIT_LOADING:
      return submitLoading(newState, action);

    //隱藏提交的loading效果
    case actionTypes.SUBMIT_HIDE_LOADING:
      return submitHideLoading(newState, action);

    //重置組件狀態
    case actionTypes.RESET_STATE:
      return resetState(newState, action);

    /////////////////////////////////////////////////////////////////////////已報價
    //獲取已報價頁面數據
    case actionTypes.QUOTE_COMPLETE_LIST:
      return quoteCompleteList(newState, action);

    //獲取已報價頁面數據明细
    case actionTypes.HAD_QUOTE_PAGE_DETAIL:
      return hadQuotePageDetail(newState, action);

    /////////////////////////////////////////////////////////////////////////已報價
    //獲取待出票列表
    case actionTypes.WAIT_TICKET_OUT:
      return waitForTicket(newState, action);

    /////////////////////////////////////////////////////////////////////////待出票
    //獲取待出票明細
    case actionTypes.WAIT_FOR_TICKET_DETAIL:
      return waitForTicketDetail(newState, action);

    //上傳文件
    case actionTypes.UPLOAD_FILE:
      return uploadFile(newState, action);

    /////////////////////////////////////////////////////////////////////////已出票
    //已出票列表
    case actionTypes.TICKET_LIST:
      return ticketList(newState, action);

    //已出票列表明細
    case actionTypes.TICKET_OUT_DETAIL:
      return ticketListDetail(newState, action);

    //已出票退改簽列表明細
    case actionTypes.BACK_CHANGE_TICKET_OUT_DETAIL:
      return backChangeTicketOutDetail(newState, action);

    /////////////////////////////////////////////////////////////////////////退改簽
    //退改簽列表
    case actionTypes.BACK_CHANGE_TICKET_LIST:
      return backAndChangeTicket(newState, action);

    //退改簽列表明細
    case actionTypes.BACK_CHANGE_TICKET_LIST_DETAIL:
      return backAndChangeTicketDetail(newState, action);

    //退改簽列表報價
    case actionTypes.BACK_CHANGE_TICKET_QUOTE:
      return quoteStart(newState, action);

    //退改簽列表報價確定
    case actionTypes.BACK_CHANGE_OK:
      return backChangeOk(newState, action);

    //待退改簽列表明細
    case actionTypes.WAIT_BACK_CHANGE_TICKET_LIST_DETAIL:
      return waitBackChangeTicketListDetail(newState, action);

    //待退改簽上传
    case actionTypes.WAIT_BACK_CHANGE_UPLOAD:
      return waitBackChangeUpload(newState, action);

    //退改簽关闭数据清空
    case actionTypes.QUOTE_COMPLETEFK:
      return rejest(newState, action);

    //個人中心資料
    case actionTypes.TRAVEL_GENCY_INFO:
      return travelAgencyInfo(newState, action);

    default:
      return newState;
  }
};
