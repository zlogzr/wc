
import React, { useState, useEffect  } from 'react';
import {  Select, Row, Col, Icon, DatePicker, Switch, TimePicker  } from "antd";

const Option = Select.Option;
const format = 'HH:mm';
const FlightItem = (props) => {
  const [startValue, setStartValue] = useState(null); //開始日期限制
  const [endValue, setEndValue] = useState(null); //結束日期限制

  const [count, setCount] = useState([]);
  /**
   * 限制时间填写
   */
 const disabledStartDate = (startValue) => {
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  const disabledEndDate = (endValue) => {
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  const onChange = (field, value) => {
    if(field === 'startValue'){
      setStartValue(value);
    }
    if(field === 'endValue'){
      setEndValue(value);
    }
  }

  const onStartChange = (value) => {
     onChange('startValue', value);
  }

  const onEndChange = (value) => {
     onChange('endValue', value);
  }
  // 模糊查询
  // let arr=[]
const placeFromOnserch = (value) => {
 
  const placeList = props.place;
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
    // if (value && !item.Code.includes(value) && !item.Area.includes(value) && !item.CityName.includes(value)&& !item.Value.includes(value)) {
    //   let arrsss=[{Area: "大陆",
    //   CityName: "上海",
    //   Code: "SHA",
    //   UniqueID: 14,
    //   Value: "請正確輸入"}]
    //   treeList.push(arrsss)
    // }
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

  
  setCount([...newArr])
  // arr=[...newArr]
 
  
}

  /**
   * 切换航程類別时重置時間限制
   */
  useEffect(() => {
   
    setStartValue(null);
    setEndValue(null);
  }, [props.changeLimitDate])

    const { form:{ getFieldDecorator}, category, place } = props;
    const options = count.map((item, v) => <Option value={item.Value} key={item.Code}>{item.Value}</Option>);
    const optionone = place.map((item, v) => <Option value={item.Value} key={item.Code}>{item.Value}</Option>);
  
    return(
      <div className="items" >
        <Row>
          <Col className="form-title"  span="3"></Col>
          <Col span="6">
            {getFieldDecorator('placeFrom')(
                 <Select size="small" 
                 showSearch  
                 onSearch={placeFromOnserch}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                //  onSearch={(value)=>{console.log('seacch',value);}} 
                //  filterOption={(input, option) =>
                //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // }
                 className="select" placeholder="出發機場">
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
          <Col span="1" className="place-line">
            {category === 'twoWay' && <Icon type="swap" />}
            {category === 'oneWay' && <Icon type="swap-right" />}
          </Col>
          <Col span="7" style={{marginLeft:"-18px"}}>
            {getFieldDecorator('placeTo')(
                 <Select size="small"
                 showSearch  
                 onSearch={placeFromOnserch}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                //  onSearch={(value)=>{console.log('seacch',value);}} 
                //  filterOption={(input, option) =>
                //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // }
                 className="select" placeholder="到達機場">
                  {
                     options.length>0?
                     options
                       :
                       optionone
                    // place.map(v => (
                    //   <Option key={v.Code}>{v.Value}</Option>
                    // ))
                  }
                 </Select>
              )}
          </Col>
        </Row>

        <Row>
          <Col className="form-title"  span="3"></Col>
          <Col span="6" style={{marginRight:'15px'}}>
            {getFieldDecorator('dateFrom')(
              <DatePicker
              className='departure-date'
              style={{width:'200px'}}
              disabledDate={ disabledStartDate}
              onChange={ onStartChange}
               size="small" 
               placeholder="出發日期"/>
            )}
          </Col>
          <Col span="5">
            {getFieldDecorator('timeFrom1')(
              <TimePicker format={format}  minuteStep={30} className="time" size="small" style={{width:'200px'}} placeholder="起飛時間區間: 開始"/>
            )}
          </Col>
          <Col className="form-title "  span="1">~</Col>
          <Col span="5">
            {getFieldDecorator('timeTo1')(
              <TimePicker style={{width:'200px'}} format={format} minuteStep={30} className="time" size="small" placeholder="起飛時間區間: 結束"/>
            )}
          </Col>
          {/* <Col className="form-title orderbus"  span="2">交通車:</Col>
          <Col span="1" className='closss'>
            {getFieldDecorator('carNeed1',{initialValue:false})(
               <Switch className="card-need1" size="small"  />
            )}
          </Col> */}
        </Row>

        {
          category === 'twoWay' &&
          <Row>
            <Col className="form-title" span="3"></Col>
            <Col span="6" style={{marginRight:'15px'}}>
              {getFieldDecorator('dateTo')(
                <DatePicker 
                disabledDate={ disabledEndDate}
                onChange={ onEndChange}
                size="small"
                style={{width:'200px'}} 
                placeholder="返回日期" />
              )}
            </Col>
            <Col span="5">
              {getFieldDecorator('timeFrom2')(
                <TimePicker format={format} className="time"  style={{width:'200px'}} size="small" minuteStep={30} placeholder="返回時間區間: 開始" />
              )}
            </Col>
            <Col className="form-title from-title-one" span="1">~</Col>
            <Col span="5">
              {getFieldDecorator('timeTo2')(
                <TimePicker format={format} className="time"  style={{width:'200px'}} size="small" minuteStep={30} placeholder="返回時間區間: 結束" />
              )}
            </Col>
            {/* <Col className="form-title orderbus" span="2">交通車:</Col>
            <Col span="1" className='closss' >
              {getFieldDecorator('carNeed2',{initialValue: false})(
                <Switch className="card-need" size="small" />
              )}
            </Col> */}
          </Row>
        }
        </div>
    )
}
  
export default FlightItem;