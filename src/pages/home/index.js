import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Carousel,
  message,
  Icon,
  Card,
  Form,
  Divider,
  Popconfirm,
  Table,
  Button,
  Modal,
  Select,
  DatePicker,
  Input,
  Upload,
} from "antd";
import { actionCreators } from "./store";
import bg1 from "../../assets/sys_imgs/bg1.jpg";
import bg2 from "../../assets/sys_imgs/bg2.jpg";
import bg3 from "../../assets/sys_imgs/bg3.jpg";
import { withRouter } from "react-router-dom";
import axios from "../../axios";
import { baseURL } from "../../axios/baseURL.js";
// import baseURL from '../../axios/baseURL'
// import bg4 from '../../assets/sys_imgs/bg4.jpg';
// import bg5 from '../../assets/sys_imgs/bg5.png';
// import bg6 from '../../assets/sys_imgs/bg6.png';

import moment from "moment";

import "./index.less";

class Home extends Component {
  state = {
    Travelinformation: "",
    Companyrules: "",
    visibleedit: false,
    form: "",
    Siteticketontactwindow: "",
    flightqueryhotlinks: "", //航班查詢
    flightqueryhotling: "", //其他
    Itcontact: "",
  };
  componentDidMount() {
    // console.log(this.props,'this.props');
    this.props.login(this.props);
    this.documengtpages();
    this.newspages();
    this.sitepages();
    this.flightqueryhotlinks();
    // 请求版本号
    this.props.getWebVersion();
  }

  // 文檔頭
  documengtpages = () => {
    const urltitle = "/Home/GetSiteName";
    // 文檔頭
    axios
      .get({ url: urltitle })
      //成功返回
      .then((res) => {
        // console.log(res,'666');
        if (res.code === 1) {
          document.title = res.data.SiteName;
        } else {
          document.title = "機票管理系統";
        }
      })
      //失败返回
      .catch((error) => {
        // console.log(error);
        message.error("文檔頭請求失敗");
      });
  };
  // 首頁資訊信息请求
  newspages = () => {
    const urlnews = "Home/Page_News";
    axios
      .get({ url: urlnews })
      //成功返回
      .then((res) => {
        // console.log(res,'666');
        if (res.code === 1) {
          // 資訊
          this.setState({ Travelinformation: res.data.TravelInfo });
          // 規章制度
          this.setState({ Companyrules: res.data.RuleInfo });
        } else {
          // document.title="機票管理系統"
          message.error("首頁資訊请求失败");
        }
      })
      //失败返回
      .catch((error) => {
        // console.log(error);
        message.error("首頁資訊请求失败");
      });
  };

  // 各site聯繫窗口
  sitepages = () => {
    const urlnews = "Home/Site_Contact";
    axios
      .get({ url: urlnews })
      //成功返回
      .then((res) => {
        // console.log(res,'666');
        if (res.code === 1) {
          this.setState({ Siteticketontactwindow: res.data });
        } else {
          message.error("首頁資訊请求失败");
        }
      })
      //失败返回
      .catch((error) => {
        // console.log(error);
        message.error("首頁資訊请求失败");
      });
  };

  // 航班查詢熱門鏈接
  flightqueryhotlinks = () => {
    const urlnews = "Home/Popular_Links";
    axios
      .get({ url: urlnews })
      //成功返回
      .then((res) => {
        // console.log(res,'666');
        if (res.code === 1) {
          this.setState({ flightqueryhotlinks: res.data.Link.Flight_Address });
          this.setState({ flightqueryhotling: res.data.Link.Others_Address });
          this.setState({ Itcontact: res.data.IT_Contact });
        } else {
          message.error("首頁資訊请求失败");
        }
      })
      //失败返回
      .catch((error) => {
        // console.log(error);
        message.error("首頁資訊请求失败");
      });
  };

  // 控制彈框頁面展示及操作
  seeblank = (value) => {
    window.sessionStorage.setItem("query", JSON.stringify(value));
    this.props.history.push({ pathname: "/homenews" });
  };

  handleCancels = () => {
    this.setState({
      visibleedit: false,
    });
  };

  handleOks = () => {
    this.setState({
      visibleedit: false,
    });
  };

  render() {
    const { TextArea } = Input;
    const Option = Select.Option;
    const {
      form,
      Siteticketontactwindow,
      Travelinformation,
      flightqueryhotlinks,
      flightqueryhotling,
      Itcontact,
    } = this.state;

    let testArr = [];
    let resultArr = [];
    // console.log(Siteticketontactwindow);
    for (let i = 0; i < Siteticketontactwindow.length; i++) {
      if (testArr.indexOf(Siteticketontactwindow[i].Site) === -1) {
        resultArr.push({
          Site: Siteticketontactwindow[i].Site,
          origin: [Siteticketontactwindow[i]],
        });
        testArr.push(Siteticketontactwindow[i].Site);
      } else {
        for (let j = 0; j < resultArr.length; j++) {
          if (resultArr[j].Site === Siteticketontactwindow[i].Site) {
            resultArr[j].origin.push(Siteticketontactwindow[i]);
            break;
          }
        }
      }
    }
    let arrs = resultArr.map((value, key) => {
      // console.log(value);
      return (
        <div className="contacts" key={key}>
          <p className="contacts-site">{value.Site}</p>
          {value.origin.map((value) => {
            // console.log(value);
            return (
              <div>
                <p className="contacts-name">{value.Name}</p>
                <p className="contacts-email">郵箱: {value.Mail}</p>
                <p className="contacts-phone">分機: {value.Value}</p>
              </div>
            );
          })}
        </div>
      );
    });
    // console.log(arrs);

    let testArrs = [];
    let resultArrs = [];
    // console.log(Travelinformation);
    for (let i = 0; i < Travelinformation.length; i++) {
      if (testArrs.indexOf(Travelinformation[i].Site) === -1) {
        resultArrs.push({
          Site: Travelinformation[i].Site,
          origin: [Travelinformation[i]],
        });
        testArrs.push(Travelinformation[i].Site);
      } else {
        for (let j = 0; j < resultArrs.length; j++) {
          if (resultArrs[j].Site === Travelinformation[i].Site) {
            resultArrs[j].origin.push(Travelinformation[i]);
            break;
          }
        }
      }
    }

    // console.log(testArrs,resultArrs,'元數據');
    let Plantinformation = resultArrs.map((value, key) => {
      // debugger
      // console.log(value);
      return (
        <div className="contactstitle" key={key}>
          <p className="site">{value.Site}</p>
          <div className="news">
            <ul className="news-listsas">
              {value.origin.map((item, index) => {
                // console.log(item);
                // debugger
                return (
                  <li key={index}>
                    <span
                      className="newsname"
                      title={item.Name}
                      onClick={() => {
                        this.seeblank(item);
                      }}
                    >
                      {item.Name}
                    </span>
                    {item.Address ? (
                      <a
                        href={
                          baseURL +
                          `/maintain/OpenExcel?path=${
                            item.Address
                          }&name=${item.Address.split("\\").pop()}`
                        }
                      >
                        <span className="updolueds">
                          {" "}
                          <Icon
                            style={{ color: "gray" }}
                            className="download"
                            type="paper-clip"
                          />{" "}
                        </span>{" "}
                      </a>
                    ) : (
                      ""
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    });

    // console.log(Plantinformation);

    // console.log(form,'wwwww');
    // const listnews=''
    // 出行资讯
    // const lists=this.state.Travelinformation && this.state.Travelinformation.map((value,key) => (<li  key={value.UniqueID}>
    //   <span className='newstime'>[{value.OTime} ~ {value.ETime}]</span>
    //   <span className='newsname' onClick={this.seeblank(value)}>{value.Name}</span>
    // {value.Address?   <a href={baseURL+`/maintain/OpenExcel?path=${value.Address}&name=${value.Address.split('\\').pop()}`}><span className='updolued'  >
    //  <Icon title='點擊下載文件'  style={{color:"purple"}} className='download' type="paper-clip" /></span></a>:''}
    //   </li>));

    // 公司规章
    const Company =
      this.state.Companyrules &&
      this.state.Companyrules.map((value) => (
        <li key={value.UniqueID}>
          <span
            className="newsname"
            title={value.Name}
            onClick={() => {
              this.seeblank(value);
            }}
          >
            {value.Name}
          </span>
          {value.Address ? (
            <a
              href={
                baseURL +
                `/maintain/OpenExcel?path=${
                  value.Address
                }&name=${value.Address.split("\\").pop()}`
              }
            >
              <span className="updolueds">
                {" "}
                <Icon
                  style={{ color: "gray" }}
                  className="download"
                  type="paper-clip"
                />{" "}
              </span>{" "}
            </a>
          ) : (
            ""
          )}
        </li>
      ));
    return (
      <div className="home">
        <div className="Plant-information">厂区资讯</div>
        {Plantinformation}
        {/* <p className='site siteone'>WZS</p>
        <div className="news">
          <ul className="news-listsas">
          {this.state.Travelinformation && this.state.Travelinformation.map((value,key) => (<li  key={value.UniqueID}>
           <span className='newsname' title={value.Name} onClick={()=>{this.seeblank(value)}}>{value.Name}</span>
          {value.Address?  <a href={baseURL+`/maintain/OpenExcel?path=${value.Address}&name=${value.Address.split('\\').pop()}`}><span  className='updolued'  >  
     <Icon title='點擊下載文件'  style={{color:"gray"}} className='download' type="paper-clip" /></span></a>:''}
      </li>))}
          </ul>
        </div> */}

        <p className="site-types">公司規章</p>
        <p className="sitess"></p>
        <ul className="vompany-rules">{Company}</ul>

        {/* 簽核工作盒子窗口 */}
        <div className="signoff-box">
          {/* 签核件数窗口 */}
          {/* <div className='signoff'>
          <p className='Signff'>簽核工作</p>
          <p className='signoff-six'><span>今日還有</span> <span >1</span> <span>件未簽核</span> </p>
          <p className='Signffbgc'></p>
          </div> */}
          {/* 各site联系窗口 */}
          <div className="Siteticketontactwindow">
            <h1 className="title">各Site票務聯繫窗口</h1>
            <div className="Siteticketontactwindow-Textscrolling">{arrs}</div>
          </div>

          {/* 航班查询熱門鏈接 */}
          <div className="flightqueryhotlinks-s">
            <h1 className="title">常用鏈接 </h1>
            <div className="flightqueryhotlinks-main">
              {flightqueryhotlinks
                ? flightqueryhotlinks.map((item, index) => {
                    return (
                      <a key={index} href={item.Value} target="_blank">
                        {item.Code}
                      </a>
                    );
                  })
                : ""}

              {flightqueryhotling
                ? flightqueryhotling.map((item, index) => {
                    return (
                      <a key={index} href={item.Value} target="_blank">
                        {item.Code}
                      </a>
                    );
                  })
                : ""}
              {/* <a href='https://flights.ctrip.com/international/search/' target="_blank">航班查詢</a>
         <a href='https://flights.ctrip.com/international/search/' target="_blank">航班查詢</a>
         <a href='https://flights.ctrip.com/international/search/' target="_blank">航班查詢</a>
         <a href='https://flights.ctrip.com/international/search/' target="_blank">航班查詢</a>
         <a href='https://flights.ctrip.com/international/search/' target="_blank">航班查詢</a> */}
            </div>
          </div>

          {/* IT联系窗口 */}
          <div className="Itcontact-window">
            <h1 className="title">IT聯繫窗口</h1>
            <div className="Itcontact-window-coinner">
              {Itcontact
                ? Itcontact.map((item, index) => {
                    return (
                      <div className="contacts" key={index}>
                        {/* <p className='contacts-site'>WZS</p>
               <p className='contacts-name'>Tom</p> */}
                        <p className="contacts-email">郵箱: {item.Code}</p>
                        <p className="contacts-phone">分機: {item.Value}</p>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>

        <Modal
          style={{ width: "700px" }}
          className="homemodals1"
          title="首頁詳情"
          visible={this.state.visibleedit}
          onOk={this.handleOks}
          onCancel={this.handleCancels}
        >
          <Form>
            <ul className="homemaddnewsdivstssul">
              <li>
                {" "}
                <i className="star"></i>
                <span>種類:</span>
                <Select
                  className="selectnei"
                  value={
                    form.Code
                      ? form.Code === "0"
                        ? "公司規章"
                        : form.Code === "1"
                        ? "出行資訊"
                        : ""
                      : ""
                  }
                  style={{ width: 200 }}
                ></Select>
              </li>
              <li>
                <i className="star"></i>
                <span>起止日期:</span>
                <DatePicker
                  className="DatePickertimes"
                  value={moment(
                    this.state.form.OTime ? this.state.form.OTime : "",
                    "YYYY-MM-DD"
                  )}
                />{" "}
                <span>~</span>
                <DatePicker
                  value={moment(
                    this.state.form.ETime ? this.state.form.ETime : "",
                    "YYYY-MM-DD"
                  )}
                />
              </li>
              <li>
                {" "}
                <i className="star"></i>
                <span>標題:</span>
                <Input
                  className="title"
                  value={this.state.form.Name}
                  ref={(form) => (this.name = form)}
                  placeholder="标题"
                />
              </li>
              <li>
                <i className="star"></i>
                <span>內容:</span>
                <TextArea
                  className="texteart"
                  value={this.state.form.Value}
                  ref={(form) => (this.value = form)}
                  rows={4}
                />
              </li>
              <li>
                <i className="star"></i>
                <span>附加檔案:</span>
                {form.Address ? (
                  <a
                    href={
                      baseURL +
                      `/maintain/OpenExcel?path=${
                        form.Address
                      }&name=${form.Address.split("\\").pop()}`
                    }
                  >
                    <span className="updolued">
                      <Icon
                        title="點擊下載文件"
                        style={{ color: "gray" }}
                        className="download"
                        type="paper-clip"
                      />
                      {form.Address.split("\\").pop()}
                    </span>
                  </a>
                ) : (
                  "暫無文件"
                )}
              </li>
            </ul>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    login(props) {
      dispatch(actionCreators.autoLogin(props));
    },
    getWebVersion(props) {
      dispatch(actionCreators.getWebVersion());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
