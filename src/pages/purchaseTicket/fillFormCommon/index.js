import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Form,
  Select,
  Radio,
  Checkbox,
  Row,
  Col,
  Input,
  Button,
  message,
  DatePicker,
  Tag,
  Alert
} from "antd";
import { compose } from "../../../utils";
import { actionCreators } from "./store";
import CategorySelect from "./components/categorySelect";
import { FillFlight } from "../../../components/flightSelect";
import Upload from "../../../components/upload";

import "./index.less";

const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const Textarea = Input.TextArea;

let vaInfo = ''

class FillFormCommon extends Component {
  state = {
    file: null,
    haveFile: "N",
    chinaflag1: false,
    chinaflag2: false,
    chinaflag3: false,
    objeces: [],
    // pyshuyuinfo:''
    feshineinfo: "", // 管理状态
    vaInfo: '', // 假卡信息
  };

  /**
   * 显示单号状态
   */
  showDanhaoStatus = (status) => {
    if (status == 1) {
      return <Tag color="green">签核完成</Tag>;
    }
    if (status == 0) {
      return <Tag color="green">正在签核中</Tag>;
    }
    return null;
  };

  uploadSuccess = (file) => {
    this.setState({ file, haveFile: "Y" });
  };

  componentDidMount() {
    this.props.getPageData();
  }
  componentWillUnmount() {
    this.props.resetAllState();
  }
  fantaiChange = value => {
    let List = this.props.pageData.danhao.FantaiInfo.filter(item => item.SequenceId === value)
    vaInfo = List[0].LeaveFromDate + ' ~ ' + List[0].LeaveToDate
  }
  render() {
    const {
      form: { getFieldDecorator, validateFields },
      pageData: {
        category,
        ftszItem,
        area,
        danhao,
        chailvChargeDept,
        pyshuyuinfo,
        people,
        flightPlace,
        timeLimit,
      },
      flightInfo,
      allFlightInfo,
      handleChailvChange,
      handleCategoryChange,
      showChailvItem,
      showFantaiItem,
      showFantaiItems,
      showChailv,
      showJiNanFanGuoItem,
      showLiziItem,
      showUpload,
      handleFantaiItemChange,
      handleAreaChange,
      showVildDate,
      categoryData,
      loading,
      submitForm,
    } = this.props;
    const {
      haveFile,
      objeces,
      chinaflag1,
      chinaflag2,
      chinaflag3,
    } = this.state;
    let boo = categoryData.some(item => item === 'Q2')
    if (!boo) {
      vaInfo = ''
    }
    //航程选择页面数据
    const flightPageData = { persons: people, place: flightPlace };
    //返台述職選項
    const ftszItem_ = ftszItem.map((v, i) => (
      <Checkbox key={i} value={v.ViceCode}>
        {v.ViceName}
      </Checkbox>
    ));

    //區域
    const area_ = area.map((v, i) => {
      // if(v.Value ){
      //  }
      return (
        <Radio key={i} value={v.Code}>
          {v.Value}
        </Radio>
      );
    });

    // console.log(area_)
    //单号1  差旅單號
    const danhao1 =
      danhao.ChaiLv &&
      danhao.ChaiLv.map((v) => (
        <Option key={v.Code} value={v.Code}>
          {v.Code}
          {this.showDanhaoStatus(v.Name)}
        </Option>
      ));

    let arrs = [];
    danhao.TripInfo &&
      danhao.TripInfo.map((v, i) => {
        // debugger
        if (v.Subno === pyshuyuinfo) {
          arrs.push(v);
        }
      });
    // console.log(area);
    // console.log(arrs);
    // console.log(
    //   this.state
    // );

    let as = "";
    area.map((v) => {
      // debugger
      if (arrs.length !== 0) {
        if (arrs[0].Area === "中国" && v.Value === "大陸") {
          return (as = v.Code);
        } else if (arrs[0].Area === "台湾" && v.Value === "臺灣") {
          return (as = v.Code);
        } else if (arrs[0].Area !== "中国" && arrs[0].Area !== "台湾") {
          return (as = "Abroad");
        }
      } else {
        as = "";
      }
    });
    // console.log(as);
    // if(as){
    //   this.setState({chinaflag1:true})
    // }

    //差旅信息
    const TripInfo1 =
      danhao.TripInfo &&
      danhao.TripInfo.map((v, i) => {
        // debugger
        if (v.Subno === pyshuyuinfo) {
          // this.setState({objeces:v})
          if (!v.TwoWay) {
            return (
              <Row className="TripInfo1" style={{ margin: "0" }} key={i}>
                <Col className="TripInfo1box">
                  <Col>
                    {v.OneWayTime.substring(0, v.OneWayTime.length - 3)}
                  </Col>
                  <Col>{v.OneWay}</Col>
                </Col>
              </Row>
            );
          } else if (!v.ThreeWay) {
            return (
              <Row className="TripInfo1" style={{ margin: "0" }} key={i}>
                <Col className="TripInfo1box">
                  <Col>
                    {v.OneWayTime.substring(0, v.OneWayTime.length - 3)}
                  </Col>
                  <Col>{v.OneWay}</Col>
                </Col>
                <Col className="TripInfo1box">
                  <Col>
                    {v.TwoWayTime.substring(0, v.TwoWayTime.length - 3)}
                  </Col>
                  <Col>{v.TwoWay}</Col>
                </Col>
              </Row>
            );
          } else if (!v.FourWay) {
            return (
              <Row className="TripInfo1" style={{ margin: "0" }} key={i}>
                <Col className="TripInfo1box">
                  <Col>
                    {v.OneWayTime.substring(0, v.OneWayTime.length - 3)}
                  </Col>
                  <Col>{v.OneWay}</Col>
                </Col>
                <Col className="TripInfo1box">
                  <Col>
                    {v.TwoWayTime.substring(0, v.TwoWayTime.length - 3)}
                  </Col>
                  <Col>{v.TwoWay}</Col>
                </Col>
                <Col className="TripInfo1box">
                  <Col>
                    {v.ThreeWayTime.substring(0, v.ThreeWayTime.length - 3)}
                  </Col>
                  <Col>{v.ThreeWay}</Col>
                </Col>
              </Row>
            );
          } else if (!v.FiveWay) {
            return (
              <Row className="TripInfo1" style={{ margin: "0" }} key={i}>
                <Col className="TripInfo1box">
                  <Col>
                    {v.OneWayTime.substring(0, v.OneWayTime.length - 3)}
                  </Col>
                  <Col>{v.OneWay}</Col>
                </Col>
                <Col className="TripInfo1box">
                  <Col>
                    {v.TwoWayTime.substring(0, v.TwoWayTime.length - 3)}
                  </Col>
                  <Col>{v.TwoWay}</Col>
                </Col>
                <Col className="TripInfo1box">
                  <Col>
                    {v.ThreeWayTime.substring(0, v.ThreeWayTime.length - 3)}
                  </Col>
                  <Col>{v.ThreeWay}</Col>
                </Col>
                <Col className="TripInfo1box">
                  <Col>
                    {v.FourWayTime.substring(0, v.FourWayTime.length - 3)}
                  </Col>
                  <Col>{v.FourWay}</Col>
                </Col>
              </Row>
            );
          } else if (!v.SixWay) {
            return (
              <Row className="TripInfo1" style={{ margin: "0" }} key={i}>
                <Col className="TripInfo1box">
                  <Col>
                    {v.OneWayTime.substring(0, v.OneWayTime.length - 3)}
                  </Col>
                  <Col>{v.OneWay}</Col>
                </Col>
                <Col className="TripInfo1box">
                  <Col>
                    {v.TwoWayTime.substring(0, v.TwoWayTime.length - 3)}
                  </Col>
                  <Col>{v.TwoWay}</Col>
                </Col>
                <Col className="TripInfo1box">
                  <Col>
                    {v.ThreeWayTime.substring(0, v.ThreeWayTime.length - 3)}
                  </Col>
                  <Col>{v.ThreeWay}</Col>
                </Col>
                <Col className="TripInfo1box">
                  <Col>
                    {v.FourWayTime.substring(0, v.FourWayTime.length - 3)}
                  </Col>
                  <Col>{v.FourWay}</Col>
                </Col>
                <Col className="TripInfo1box">
                  <Col>
                    {v.FiveWayTime.substring(0, v.FiveWayTime.length - 3)}
                  </Col>
                  <Col>{v.FiveWay}</Col>
                </Col>
              </Row>
            );
          } else {
            return (
              <Row className="TripInfo1" style={{ margin: "0" }} key={i}>
                <Col className="TripInfo1box">
                  <Col>
                    {v.OneWayTime.substring(0, v.OneWayTime.length - 3)}
                  </Col>
                  <Col>{v.OneWay}</Col>
                </Col>
                <Col className="TripInfo1box">
                  <Col>
                    {v.TwoWayTime.substring(0, v.TwoWayTime.length - 3)}
                  </Col>
                  <Col>{v.TwoWay}</Col>
                </Col>
                <Col className="TripInfo1box">
                  <Col>
                    {v.ThreeWayTime.substring(0, v.ThreeWayTime.length - 3)}
                  </Col>
                  <Col>{v.ThreeWay}</Col>
                </Col>
                <Col className="TripInfo1box">
                  <Col>
                    {v.FourWayTime.substring(0, v.FourWayTime.length - 3)}
                  </Col>
                  <Col>{v.FourWay}</Col>
                </Col>
                <Col className="TripInfo1box">
                  <Col>
                    {v.FiveWayTime.substring(0, v.FiveWayTime.length - 3)}
                  </Col>
                  <Col>{v.FiveWay}</Col>
                </Col>
                <Col className="TripInfo1box">
                  <Col>
                    {v.SixWayTime.substring(0, v.SixWayTime.length - 3)}
                  </Col>
                  <Col>{v.SixWay}</Col>
                </Col>
              </Row>
            );
          }
        }
      });
    //单号2
    const danhao2 =
      danhao.FanTai &&
      danhao.FanTai.map((v) => (
        <Option key={v.Code} value={v.Code}>
          {v.Code} {this.showDanhaoStatus(v.Name)}
        </Option>
      ));

    //规则
    const rules = {
      rules: [{ required: true }],
    };
    // const areaRules = {
    //   initialValue: showFantaiItem ? 'TW' : '',
    //   rules: [{ required: true, }],
    // }
    const areaRules = {
      rules: [{ required: true }],
      initialValue: showFantaiItem ? "TW" : as,
    };
    return (
      <div className="fill-form-common">
        <Row>
          <Col className="form-title" span="3">
            類別:
          </Col>
          <Col span="21">
            <CategorySelect
              getFieldDecorator={getFieldDecorator}
              data={category}
              onChecked={handleCategoryChange}
            />
          </Col>
        </Row>

        {showChailvItem && (
          <Row className="title">
            <Col className="form-title" span="3">
              差旅單號:
            </Col>
            <Col span="7">
              {getFieldDecorator(
                "ChailvSID",
                rules
              )(
                <Select
                  className="select"
                  size="small"
                  onChange={handleChailvChange}
                >
                  {danhao1}
                </Select>
              )}
            </Col>
            <Col className="form-title" span="2">
              掛賬部門:
            </Col>
            <Col span="9">
              {getFieldDecorator("chargeDept_cl", {
                initialValue: chailvChargeDept,
              })(<Input className="select" size="small" disabled />)}
            </Col>
          </Row>
        )}

        {showChailvItem && (
          <Row className="title">
            <Col className="form-title" span="3">
              差旅信息:
            </Col>
            {TripInfo1}
          </Row>
        )}

        {showFantaiItem && (
          <div>
            <Row>
              <Col className="form-title" span="3">
                返台述職類型:
              </Col>
              <Col span="7">
                {getFieldDecorator(
                  "goToTaiwanCategory",
                  rules
                )(
                  <CheckboxGroup onChange={handleFantaiItemChange}>
                    {ftszItem_}
                  </CheckboxGroup>
                )}
              </Col>
            </Row>

            <Row>
              <Col className="form-title" span="3">
                返台述单:
              </Col>
              <Col span="5">
                {getFieldDecorator(
                  "FantaiSID",
                  rules
                )(
                  <Select className="select" size="small" onChange={this.fantaiChange}>
                    {danhao2}
                  </Select>
                )}
              </Col>
              <Col className="form-title" span="3">
                假卡信息:
              </Col>
              <span style={{ fontSize: '14px' }}>{vaInfo}</span>
            </Row>
          </div>
        )}

        {showJiNanFanGuoItem && (
          <Row>
            <Col className="form-title" span="3">
              眷屬姓名:
            </Col>
            <Col span="7">
              {getFieldDecorator("FamilyName", rules)(<Input size="small" />)}
            </Col>
            <Col className="form-title" span="3">
              與本人關係:
            </Col>
            <Col span="7">
              {getFieldDecorator("FamilyShip", rules)(<Input size="small" />)}
            </Col>
          </Row>
        )}

        {showUpload && (
          <Row>
            <Col className="form-title" span="3">
              上傳證明文件:
            </Col>
            <Col span="7">
              <Upload success={this.uploadSuccess} />
            </Col>
          </Row>
        )}

        {showLiziItem && (
          <Row>
            <Col className="form-title" span="3">
              掛賬部門:
            </Col>
            <Col span="7">
              {getFieldDecorator(
                "chargeDept_lizi",
                rules
              )(<Input size="small" />)}
            </Col>
          </Row>
        )}

        <Row>
          <Col className="form-title" span="3">
            區域:
          </Col>
          <Col span="7">
            {getFieldDecorator(
              "PlaceID",
              areaRules
            )(
              <RadioGroup
                onChange={handleAreaChange}
              // disabled={showChailv ? showFantaiItem : ""}
              >
                {area_}
              </RadioGroup>
            )}
          </Col>
        </Row>

        {showVildDate && (
          <Row>
            <Col className="form-title" span="3">
              簽證有效期:
            </Col>
            <Col span="7">
              {getFieldDecorator(
                "VisaDate",
                rules
              )(<DatePicker style={{ width: "200px" }} size="small" />)}
            </Col>
          </Row>
        )}

        <FillFlight
          addFlightInfo={allFlightInfo}
          flightPageData={flightPageData}
          timeLimit={timeLimit}
        />

        <Row>
          <Col className="form-title" span="3">
            備註:
          </Col>
          <Col style={{ width: "73%" }} span="17">
            {getFieldDecorator(
              "Remark",
              rules
            )(<Textarea className="remark"></Textarea>)}
          </Col>
        </Row>
        <Row className="submintrow">
          <Col className="form-title" span="3"></Col>
          <Col span="17" className="submita">
            <Button
              className="submit-btn"
              loading={loading}
              onClick={submitForm.bind(
                this,
                validateFields,
                flightInfo,
                categoryData,
                this.props.pageData,
                haveFile
              )}
            >
              提交
            </Button>
          </Col>
        </Row>
        <Row style={{ paddingBottom: '20px' }}>
          <Col offset="3" style={{ width: "74%" }}>
            <Alert
              message={
                <div style={{ padding: '10px 0' }}>
                  <span>
                    備註：機票申請提交後，<Tag color="red">1小時</Tag>內，您會收到廠商<Tag color="red" style={{ marginLeft: '5px' }}>中標待確認通知</Tag>，屆時，請注意查收郵件!
                  </span>
                  <br />
                </div>
              }
              type="info"
              closable
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    pageData,
    flightInfo,
    showChailvItem,
    showFantaiItem,
    showFantaiItems,
    showChailv,
    showJiNanFanGuoItem,
    showLiziItem,
    showUpload,
    handleAreaChange,
    showVildDate,
    categoryData,
    loading,
  } = state.fillFormReducer.fillFormCommonReducer;
  return {
    pageData,
    flightInfo,
    showChailvItem,
    showFantaiItem,
    showFantaiItems,
    showChailv,
    showJiNanFanGuoItem,
    showLiziItem,
    showUpload,
    handleAreaChange,
    showVildDate,
    categoryData,
    loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPageData() {
      dispatch(actionCreators.getPageInitData());
    },
    allFlightInfo(data) {
      dispatch(actionCreators.allFlightInfo(data));
    },
    handleChailvChange(v) {
      dispatch(actionCreators.chailvChange(v));
      dispatch(actionCreators.chailvChanges(v));
    },
    handleCategoryChange(data) {
      dispatch(actionCreators.categoryChange(data));
    },
    handleFantaiItemChange(data) {
      dispatch(actionCreators.fantaiItemChange(data));
    },
    handleAreaChange(e) {
      dispatch(actionCreators.areaChange(e.target.value));
    },
    uploadSuccess(file) {
      dispatch(actionCreators.uploadFile(file));
    },
    submitForm(validateFields, flightInfo, category, pageData, HaveFile, file) {
      // debugger
      const that = this;
      validateFields((err, values) => {
        // console.log(values);
        // console.log(err);
        console.log(category);
        if (err) {
          if (!err.Remark) {
            message.warning("请填写完整信息再提交");
            return;
          }
        }

        if (category.length === 0) {
          message.warning("请选择类别");
          return;
        } else {
          switch (category[0]) {
            case "Q1": // 出差
              if (!values.ChailvSID) {
                message.warning('請勾選差旅單號');
                return;
              }
              //區域
              if (!values.PlaceID) {
                message.warning('請選擇區域');
                return;
              }
              break;
            case "Q2": //返台休假
              if (!values.FantaiSID) {
                message.warning('請勾選返台述單');
                return;
              }
              break;
            default:
              break;
          }
        }

        if (flightInfo.length === 0) {
          message.warning("请填写航程信息");
          return;
        }
        // dispatch(actionCreators.loading());    //如申请失败,loading一直在转,暂时取消,10.11修改
        dispatch(
          actionCreators.submitForm(
            values,
            flightInfo,
            category,
            pageData,
            HaveFile,
            this.state.file,
            that
          )
        );
      });
    },
    resetAllState() {
      dispatch(actionCreators.resetAllState());
    },
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  Form.create()
)(FillFormCommon);
