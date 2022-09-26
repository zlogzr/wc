import React, { Component } from 'react';
import { Select, Row, Col, Icon, DatePicker, Switch, TimePicker } from "antd";
import './FillForAssistant.less'

const Option = Select.Option;
let id = 1;
const format = 'HH:mm';

class FlightItemForMany extends Component {
  state={
    arr:[]
  }


  //添加航程
   add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(++id);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }
  //刪除航程
   remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }


  // 模糊查询
 placeFromOnserch = (value) => {
    // console.log(value)
    const placeList = this.props.place;
    let treeList = [];
    placeList.forEach(item => {
      if (item.Area.includes(value)) {
        treeList.push(item)
      }
      if (item.CityName.includes(value)) {
        treeList.push(item)
      }
      if (item.Value.includes(value)) {
        treeList.push(item)
      }
      if (item.Code.includes(value)) {
        treeList.push(item)
      }
      if(!item.Area.includes(value) && !item.CityName.includes(value) && !item.Value.includes(value) && !item.Code.includes(value)){
        let ares={Area: "456",
        CityName: "89896545",
        Code: "wpwpwppw",
        UniqueID: 999,
        Value: "请输入符合条件的值"}
        let adds={}
        treeList.push(adds)
        return
      }
    })
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

    // console.log(treeList);
    // console.log(newArr);
    // this.setState({ arr: [] })
    this.setState({

      arr:JSON.parse(JSON.stringify(newArr))
    })
    // setTimeout(() => {  }, 0)
  }

  render(){
    let { form: { getFieldDecorator, getFieldValue },place } =this.props;
    getFieldDecorator('keys', { initialValue: [1] });
    const {arr}=this.state
    const keys = getFieldValue('keys');
    const options = arr.map((item, v) => <Option value={item.Value} key={item.Code}>{item.Value}</Option>);
    const optionone = place.map((item, v) => <Option value={item.Value} key={item.Code}>{item.Value}</Option>);
    return (
      <div>
        {
          keys.map((k, i) => {
            return (
              <div key={i}>
                <div className="items" >
                  <div className="line-kuang">
                    <div className="xuhao">{i + 1}</div>
                    <span className="close">
                      <Icon type="close" onClick={() => this.remove(k)} />
                    </span>
                  </div>
                  <Row>
                    <Col className="form-title" span="3"></Col>
                    <Col span="6">
                      {getFieldDecorator('placeFrom_' + k)(
                        <Select size="small" style={{ width: '180px' }}
                          showSearch
                          onSearch={this.placeFromOnserch}
                          defaultActiveFirstOption={false}
                          showArrow={false}
                          filterOption={false}
                          //   filterOption={(input, option) =>
                          //    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          //  }
  
                          className="select" placeholder="出發機場">
                          {
                            // props.place.map((v) => (
                            //   <Option key={v.Code}>{v.Value}</Option>
                            // ))
                            options.length > 0 ?
                              options
                              :
                              optionone
                          }
                        </Select>
                      )}
                    </Col>
                    <Col span="1" style={{ marginRight: '-16px' }} className="place-line">
                      <Icon type="swap-right" />
                    </Col>
                    <Col span="7">
                      {getFieldDecorator('placeTo_' + k)(
                        <Select size="small" style={{ width: '180px' }}
                          showSearch
                          //  onSearch={(value)=>{console.log('seacreh',value);}} 
                          // filterOption={(input, option) =>
                          //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          // }
                          onSearch={this.placeFromOnserch}
                          defaultActiveFirstOption={false}
                          showArrow={false}
                          filterOption={false}
                          className="select" placeholder="到達機場">
                          {
                            // place.map(v => (
                            //   <Option key={v.Code}>{v.Value}</Option>
                            // ))
                            options.length > 0 ?
                            options
                            :
                            optionone
                          }
                        </Select>
                      )}
                    </Col>
                  </Row>
  
                  <Row>
                    <Col className="form-title" span="3"></Col>
                    <Col span="6">
                      {getFieldDecorator('dateFrom_' + k)(
                        <DatePicker size="small" style={{ width: '180px' }} placeholder="出發日期" format="YYYY-MM-DD" />
                      )}
                    </Col>
                    <Col span="4">
                      {getFieldDecorator('timeFrom1_' + k)(
                        <TimePicker format={format} style={{ width: '180px' }} minuteStep={30} className="time" size="small" placeholder="起飛時間區間: 開始" />
                      )}
                    </Col>
                    <Col className="form-title" style={{ marginLeft: '24px' }} span="1">~</Col>
                    <Col span="5">
                      {getFieldDecorator('timeTo1_' + k)(
                        <TimePicker format={format} style={{ width: '180px' }} minuteStep={30} className="time" size="small" placeholder="起飛時間區間: 結束" />
                      )}
                    </Col>
                    {/* <Col className="form-title"  span="2">交通車:</Col>
                    <Col span="1">
                      {getFieldDecorator('carNeed_'+k, {initialValue: false})(
                         <Switch className="card-need1" size="small"  />
                      )}
                    </Col> */}
                  </Row>
  
                </div>
              </div>
            )
          })
        }
        <Row>
          <Col offset="2">
            <div className="add-flight-btn" onClick={this.add}><Icon type="plus" />添加航程</div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default FlightItemForMany;