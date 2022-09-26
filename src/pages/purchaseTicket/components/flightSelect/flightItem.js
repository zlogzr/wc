import React, { Component } from 'react';
import { Select, Row, Col, Icon, DatePicker, Switch, TimePicker, TreeSelect } from "antd";
import moment from 'moment'


const Option = Select.Option;
const format = 'HH:mm';
class FlightItem extends Component {
  state = {
    startValue: null,
    endValue: null,
    personcearch: false,
    arr: [],
    value: ''
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
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  // onSearch = (value) => {
  //   console.log('onSearch', value);
  // }



  /**
   * 切换时重置state
   */
  componentWillReceiveProps(props) {
    if (this.props.category !== props.category) {
      this.setState({ startValue: null, endValue: null })
    }
  }

  // placeFromOnserch = (value) => {
  //   console.log(this.props);
  //   console.log(value)
  //   const placeList = this.props.place;
  //   let treeList = [];
  //   placeList.forEach((P) => {

  //     // 先去过滤大陆
  //     // 在过滤城市
  //     // 再过滤机场
  //     if (P.Area.includes(value)) {
  //       this.setState({ personcearch: true })
  //       const treeNode = {}
  //       const hasPlace = treeList.find((T) => T.Area == P.Area);
  //       if (!hasPlace) {
  //         treeNode.Area = P.Area;
  //         treeNode.City = [];
  //         placeList.forEach((PL) => {
  //           if (!treeNode.City.find(TC => TC.CityName == PL.CityName) && treeNode.Area == PL.Area) {
  //             const CityNode = { CityName: PL.CityName };
  //             CityNode.air = placeList.filter(_PL => _PL.CityName === CityNode.CityName);
  //             treeNode.City.push(CityNode)
  //           }
  //         })
  //         treeList.push(treeNode);
  //       }
  //     }
  //   })
  //   // 过滤城市
  //   if (treeList.length <= 0) {
  //     placeList.forEach((P) => {
  //       if (P.CityName.includes(value)) {
  //         const treeNode = {}
  //         const hasCity = treeList.find((T) => T.City.CityName == P.CityName);
  //         if (!hasCity) {
  //           treeNode.Area = P.Area;
  //           treeNode.City = P.CityName;
  //           treeNode.air = placeList.filter(_PL => _PL.CityName === P.CityName);
  //           treeList.push(treeNode)
  //         }
  //       }
  //     })
  //   }
  //   // 过滤机场
  //   if (treeList.length <= 0) {
  //     // treeList = placeList.filter((PL) => PL.Value.includes(value));
  //     placeList.forEach((P) => {
  //       if (P.Value.includes(value)) {
  //         const treeNode = {}
  //         const hasCity = treeList.find((T) => T.Value == P.Value);
  //         if (!hasCity) {
  //           treeNode.Area = P.Area;
  //           treeNode.City = P.CityName;
  //           treeNode.Value = P.Value;
  //           treeNode.air = placeList.filter(_PL => _PL.Value === P.Value);
  //           treeList.push(treeNode)
  //         }
  //       }
  //     })
  //   }

  //   // 过滤机场三字码
  //   if (treeList.length <= 0) {
  //     placeList.forEach((P) => {
  //       if (P.Code.includes(value)) {
  //         const treeNode = {}
  //         const hasCity = treeList.find((T) => T.Code == P.Code);
  //         if (!hasCity) {
  //           treeNode.Area = P.Area;
  //           treeNode.City = P.CityName;
  //           treeNode.Value = P.Code;
  //           treeNode.air = placeList.filter(_PL => _PL.Code === P.Code);
  //           treeList.push(treeNode)
  //         }
  //       }
  //     })
  //   }

  //   // console.log('treeList', treeList);
  //   // console.log( this.state.arr);

  //   this.setState({ arr: treeList })
  // }

  
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
    this.setState({ arr: JSON.parse(JSON.stringify(newArr)) })
    // setTimeout(() => {  }, 0)
  }


  render() {
    let { form: { getFieldDecorator }, category, place } = this.props;

    const { TreeNode } = TreeSelect;
    // console.log(place);
    const { personcearch, arr } = this.state


    // console.log(arr, '修改后的arr');
    // console.log(place);

    const options = arr.map((item, v) => <Option value={item.Value} key={item.Code}>{item.Value}</Option>);
    const optionone = place.map((item, v) => <Option value={item.Value} key={item.Code}>{item.Value}</Option>);

    // console.log(options.length);

    // 助理单反行程订票
    return (
      <div className="items" >
        <Row>
          <Col className="form-title" span="3"></Col>
          <Col span="6">
            {getFieldDecorator('placeFrom')(

              <Select size="small" style={{ width: "180px" }}
                showSearch
                onSearch={this.placeFromOnserch}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                // filterOption={(input, option) =>
                //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // }
                className="select" placeholder="出發機場" disabled={false}>
                {/* {options} */}
                {
                 options.length>0?
                 options
                   :
                   optionone
                }
              </Select>

              //    <TreeSelect size="small" style={{ width: "180px" }}
              //    showSearch
              //    onSearch={this.placeFromOnserch}
              //    className="select" placeholder="到達機場" disabled={false}>
              //    {
              //     arr.length>0?
              //     arr.map((item,v)=>{
              //       return   <TreeNode value={item.Value + '1111'} title={item.Value + '1111'} key={item.UniqueID}/>
              //     })

              //      :
              //      place.map((v,i) => (
              //       <TreeNode value={v.Value} title={v.Value} key={v.UniqueID}/>
              //     ))
              //    }
              //  </TreeSelect>
              // <TreeSelect size="small"
              //   showSearch={true}
              //   onSearch={this.placeFromOnserch}
              //   treeDefaultExpandAll
              //   style={{ width: "180px" }} className="select" placeholder="出發機場" >
              //   {
              //     // 数据情况渲染所有
              //     arr.length > 1 ?
              //       arr.map(item => {
              //         return <TreeNode value={item.Area} title={item.Area} key={item.Area} >
              //           {item.City.length > 1 && item.air === false ?
              //             item.City.map(val => {
              //               return <TreeNode value={val.CityName} title={val.CityName} key={val.CityName} >
              //                 {val.air.map(v => {
              //                   return <TreeNode value={v.Value} title={v.Value} key={v.value} />
              //                 })}
              //               </TreeNode>
              //             })
              //             :

              //             item.City.length > 1 && item.air.length >= 1 ?
              //               item.air.map(val => {
              //                 return <TreeNode value={val.Value} title={val.Value} key={val.Code} />

              //               })
              //               :
              //               item.air.length >= 1 ?
              //                 item.air.map(val => {
              //                   return <TreeNode value={val.Value} title={val.Value} key={val.Code} />

              //                 })
              //                 :
              //                 <TreeNode value={item.Value} title={item.Value} key={item.value} />}
              //         </TreeNode>
              //       })
              //       //  :
              //       //  arr.map(v=>{
              //       //   return <TreeNode value={v.Value} title={v.Value} key={v.value} >
              //       //       {v.air.map(val=>{
              //       //       return  <TreeNode value={val.Value} title={val.Value} key={val.value} />
              //       //       })}
              //       //         </TreeNode>
              //       //   })

              //       :
              //       arr.length === 1 ?
              //         <TreeNode value={arr[0].Area} title={arr[0].Area} key={arr[0].Area} >

              //           {arr[0].City.length >= 1 && arr[0].air === false ?

              //             arr[0].City.map((v, i) => {
              //               return <TreeNode value={v.CityName} title={v.CityName} key={i}>
              //                 {v.air.map((val, inx) => {

              //                   return <TreeNode value={val.Value} title={val.Value} key={inx} />
              //                 })}
              //               </TreeNode>
              //             })
              //             :

              //             //  arr[0].City.length>1 && arr[0].air.length>=1?  
              //             //  arr[0].air.map(val=>{
              //             //   return  <TreeNode value={val.Value} title={val.Value} key={val.Code} />

              //             //   })
              //             // :

              //             arr[0].air.map((v, i) => {
              //               return <TreeNode value={v.Value} title={v.Value} key={i}>
              //                 {/* {v.arr.map((val,inx)=>{

              //      return <TreeNode value={val.Value} title={val.Value} key={inx} />
              //         })} */}
              //               </TreeNode>
              //             })
              //           }
              //         </TreeNode>


              //         :
              //         place.map(v => {
              //           return <TreeNode value={v.Value} title={v.Value} key={v.Code} />
              //         })
              //   }

              // </TreeSelect>
            )}
          </Col>
          <Col span="1" className="place-line" style={{ marginRight: '-17px' }} disabled={false}>
            {category === 'twoWay' && <Icon type="swap" />}
            {category === 'oneWay' && <Icon type="swap-right" />}
          </Col>
          <Col span="7">
            {getFieldDecorator('placeTo')(
              <Select size="small" style={{ width: "180px" }}
                showSearch
                //  onSearch={(value)=>{console.log('seacreh',value);}} 
                // filterOption={(input, option) =>
                //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // }
                onSearch={this.placeFromOnserch}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                className="select" placeholder="到達機場" disabled={false}>
                {
                  // place.map(v => (
                  //   <Option key={v.Code}>{v.Value}</Option>
                  // ))
                  options.length>0?
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
            {/* {initialValue:moment('2019-05-12','YYYY-MM-DD')} */}
            {getFieldDecorator('dateFrom',)(
              <DatePicker
                disabledDate={this.disabledStartDate}
                onChange={this.onStartChange}
                size="small"
                style={{ width: "180px" }}
                placeholder="出發日期"
                format='YYYY-MM-DD'
                disabled={false}
              />
            )}
          </Col>
          <Col span="5">
            {getFieldDecorator('timeFrom1')(
              <TimePicker format={format} style={{ width: "180px" }} className="time Takeofftimeinterval" size="small" minuteStep={30} placeholder="起飛時間區間: 開始"
                disabled={false}
              />
            )}
          </Col>
          <Col className="form-title" style={{ marginLeft: "-18px" }} span="1">~</Col>
          <Col span="5">
            {getFieldDecorator('timeTo1')(
              <TimePicker format={format} style={{ width: "180px" }} className="time Takeofftimeinterval" size="small" minuteStep={30} placeholder="起飛時間區間: 結束"
                disabled={false}
              />
            )}
          </Col>
          {/* <Col className="form-title"  span="2">交通車:</Col>
          <Col span="2">
            {getFieldDecorator('carNeed1',{initialValue:false})(
               <Switch className="card-need1" size="small"  disabled={false}/>
            )}
          </Col> */}
        </Row>

        {
          category === 'twoWay' &&
          <Row>
            <Col className="form-title" span="3"></Col>
            <Col span="6">
              {getFieldDecorator('dateTo')(
                <DatePicker
                  disabledDate={this.disabledEndDate}
                  onChange={this.onEndChange}
                  size="small"
                  style={{ width: "180px" }}
                  placeholder="返回日期" format='YYYY-MM-DD'
                  disabled={false}
                />
              )}
            </Col>
            <Col span="5">
              {getFieldDecorator('timeFrom2')(
                <TimePicker format={format} minuteStep={30} className="time Takeofftimeinterval" style={{ width: "180px" }} size="small" placeholder="返回時間區間: 開始"
                  disabled={false}
                />
              )}
            </Col>
            <Col className="form-title" style={{ marginLeft: "-18px" }} span="1">~</Col>
            <Col span="5">
              {getFieldDecorator('timeTo2')(
                <TimePicker format={format} minuteStep={30} className="time Takeofftimeinterval" style={{ width: "180px" }} size="small" placeholder="返回時間區間: 結束"
                  disabled={false}
                />
              )}
            </Col>
            {/* <Col className="form-title" span="2">交通車:</Col>
            <Col span="2">
              {getFieldDecorator('carNeed2',{initialValue: false})(
                <Switch className="card-need" size="small" 
                  disabled={false}
                />
              )}
            </Col> */}
          </Row>
        }

      </div>
    )
  }
}

export default FlightItem;