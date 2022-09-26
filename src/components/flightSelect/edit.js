import React, { Component } from "react";
import {
  Select,
  Row,
  Col,
  Icon,
  DatePicker,
  Switch,
  TimePicker,
  Input,
  Radio,
} from "antd";
import moment from "moment";

const Option = Select.Option;
const format = "HH:mm";
class Edit extends Component {
  state = {
    startValue: null,
    endValue: null,
    arr: [],
  };
  /**
   * 限制时间填写
   */
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = (value) => {
    this.onChange("startValue", value);
  };

  onEndChange = (value) => {
    this.onChange("endValue", value);
  };

  /**
   * 切换时重置state
   */
  componentWillReceiveProps(props) {
    if (this.props.category !== props.category) {
      this.setState({ startValue: null, endValue: null });
    }
  }

  // 模糊查询
  placeFromOnserch = (value) => {
    const placeList = this.props.place;
    let treeList = [];
    placeList.forEach((item) => {
      if (item.Area.includes(value)) {
        treeList.push(item);
      }
      if (item.CityName.includes(value)) {
        treeList.push(item);
      }
      if (item.Value.includes(value)) {
        treeList.push(item);
      }
      if (item.Code.includes(value)) {
        treeList.push(item);
      }
      if (
        !item.Area.includes(value) &&
        !item.CityName.includes(value) &&
        !item.Value.includes(value) &&
        !item.Code.includes(value)
      ) {
        let ares = {
          Area: "456",
          CityName: "89896545",
          Code: "wpwpwppw",
          UniqueID: 999,
          Value: "请输入符合条件的值",
        };
        let adds = {};
        treeList.push(adds);
        return;
      }
    });
    // treeList.air = placeList.filter(_PL => _PL.Code === P.Code);
    let newArr = [];
    let obj = {};
    for (let i = 0; i < treeList.length; i++) {
      //将arr[i].id作为对象属性进行判断
      if (!obj[treeList[i].Value]) {
        newArr.push(treeList[i]);
        obj[treeList[i].Value] = true;
      }
    }

    this.setState({ arr: JSON.parse(JSON.stringify(newArr)) });
    // setTimeout(() => {  }, 0)
  };

  render() {
    const {
      form: { getFieldDecorator },
      editData: { person, detail, category },
      place = [],
      isChangeTicket = false,
    } = this.props;
    const { arr } = this.state;
    const options = arr.map((item, v) => (
      <Option value={item.Value} key={item.Code}>
        {item.Value}
      </Option>
    ));
    const optionone = place.map((item, v) => (
      <Option value={item.Value} key={item.Code}>
        {item.Value}
      </Option>
    ));
    // debugger
    return (
      <div>
        <Row>
          <Col className="form-title" span="3">
            乘機人:
          </Col>
          <Col span="7">
            {getFieldDecorator("person_edit", { initialValue: person })(
              <Input size="small" disabled={isChangeTicket} />
            )}
          </Col>
        </Row>

        <Row>
          <Col className="form-title flight-select" span="3">
            航程類型:
          </Col>
          <Col span="7">
            <Radio.Group defaultValue={category}>
              <Radio.Button disabled value="oneWay">
                單程
              </Radio.Button>
              <Radio.Button disabled value="twoWay">
                往返
              </Radio.Button>
              <Radio.Button disabled value="manyWay">
                多程
              </Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <div className="items">
          <Row>
            <Col className="form-title" span="3"></Col>
            <Col span="6">
              {getFieldDecorator("placeFrom_edit", {
                initialValue: detail.placeFrom,
              })(
                <Select
                  size="small"
                  className="select"
                  placeholder="出發機場"
                  showSearch
                  onSearch={this.placeFromOnserch}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  disabled={isChangeTicket}
                >
                  {options.length > 0 ? options : optionone

                  // place.map(v => (
                  //   <Option key={v.Code}>{v.Value}</Option>
                  // ))
                  }
                </Select>
              )}
            </Col>
            <Col span="1" className="place-line">
              <Icon type="swap" />
            </Col>
            <Col span="7">
              {getFieldDecorator("placeTo_edit", {
                initialValue: detail.placeTo,
              })(
                <Select
                  size="small"
                  className="select"
                  placeholder="到達機場"
                  showSearch
                  onSearch={this.placeFromOnserch}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  disabled={isChangeTicket}
                >
                  {// place.map(v => (
                  //   <Option key={v.Code}>{v.Value}</Option>
                  // ))
                  options.length > 0 ? options : optionone}
                </Select>
              )}
            </Col>
          </Row>

          <Row>
            <Col className="form-title" span="3"></Col>
            <Col span="5">
              {getFieldDecorator("dateFrom_edit", {
                initialValue: moment(detail.dateFrom),
              })(
                <DatePicker
                  disabledDate={this.disabledStartDate}
                  onChange={this.onStartChange}
                  size="small"
                  placeholder="出發日期"
                />
              )}
            </Col>
            <Col span="4">
              {getFieldDecorator("timeFrom1_edit", {
                initialValue: moment(detail.timeFrom1, "HH:mm"),
              })(
                <TimePicker
                  format={format}
                  className="time"
                  size="small"
                  placeholder="起飛時間區間: 開始"
                />
              )}
            </Col>
            <Col className="form-title" span="1">
              ~
            </Col>
            <Col span="4">
              {getFieldDecorator("timeTo1_edit", {
                initialValue: moment(detail.timeTo1, "HH:mm"),
              })(
                <TimePicker
                  format={format}
                  className="time"
                  size="small"
                  placeholder="起飛時間區間: 結束"
                />
              )}
            </Col>
            {/* <Col className="form-title" span="2">交通車:</Col>
            <Col span="5">
              {getFieldDecorator('carNeed1_edit', { initialValue: detail.carNeed1 === 'Y'?true:false })(
                <Switch className="card-need1" size="small"  disabled={isChangeTicket} />
              )}
            </Col> */}
          </Row>

          {category === "twoWay" && (
            <Row>
              <Col className="form-title" span="3"></Col>
              <Col span="5">
                {getFieldDecorator("dateTo_edit", {
                  initialValue: moment(detail.dateTo),
                })(
                  <DatePicker
                    disabledDate={this.disabledEndDate}
                    onChange={this.onEndChange}
                    size="small"
                    placeholder="返回日期"
                  />
                )}
              </Col>
              <Col span="4">
                {getFieldDecorator("timeFrom2_edit", {
                  initialValue: moment(detail.timeFrom2, "HH:mm"),
                })(
                  <TimePicker
                    format={format}
                    className="time"
                    size="small"
                    placeholder="返回時間區間: 開始"
                  />
                )}
              </Col>
              <Col className="form-title" span="1">
                ~
              </Col>
              <Col span="4">
                {getFieldDecorator("timeTo2_edit", {
                  initialValue: moment(detail.timeTo2, "HH:mm"),
                })(
                  <TimePicker
                    format={format}
                    className="time"
                    size="small"
                    placeholder="返回時間區間: 結束"
                  />
                )}
              </Col>
              {/* <Col className="form-title " span="2">交通車:</Col>
              <Col span="5">
                {getFieldDecorator('carNeed2_edit', {initialValue: detail.carNeed1 === 'Y'?true:false, valuePropName: 'checked' })(
                  <Switch className="card-need" size="small" />
                )}
              </Col> */}
            </Row>
          )}
        </div>
      </div>
    );
  }
}

export default Edit;
