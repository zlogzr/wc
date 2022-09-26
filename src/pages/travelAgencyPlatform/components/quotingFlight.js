import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from "../../../components/card";
import { Select, Table, Input, InputNumber, DatePicker,Form, } from "antd";
import { actionCreators } from '../store';
import moment from 'moment';

class QuotingFlight extends Component {
  // TextArea =Input.TextArea
  
  render(){
    const {TextArea}=Input
  const { quoteStartData, level,price, handleFlightNoChange, quoteFlightInfo, change, form: {getFieldDecorator } } = this.props;
  let status= window.sessionStorage.getItem("statuss")

  let monery=''
  status==='Return'?monery='退票費(￥)': status==='Change'?monery='改簽費(￥)':monery='金額(￥)'

  

  let flag=''
  status==='Return'?flag=true: flag=false

  let flasgs=''
  status==='Return'?flasgs=true: status==='Change'?flasgs=true :flasgs=false

  // console.log(flasgs,'-=-=-');
  // status===''?flasgs=true:status==='Return'?flasgs=true: status==='Change'?flasgs=true :flasgs=false

  let money=''
  status===''?money=true:money=false

  // 改签时起飛時間为空
  let ticketchangesflag=''
  status==='Change'?ticketchangesflag=true: ticketchangesflag=false


  let columns = [{
    title: '出发時間區間',
    // dataIndex: 'dateSection',
    dataIndex: 'dateSection',
    align:"center",
  },
  //  {
  //   title: '出發機場',
  //   dataIndex: 'fromAirport',
  //   align:"center",
  // }, {
  //   title: '到達機場',
  //   dataIndex: 'arriveAirport',
  //   align:"center",
  // },
  {
    title: '航班號',
    dataIndex: 'flightNo',
    align:"center",
    render: (text, record) => (
      getFieldDecorator('flightNo'+record.key,
      {
        initialValue:status==='Change'?"": text,
        rules: [{ required: true, message: '请輸入航班號' }],
      })(
        <Input disabled={flag} />  
        // onBlur={handleFlightNoChange.bind(this, record.key)}
      ))
  },
  {
    title: '起飛機場',
    dataIndex: 'placeFrom',
    align:"center",
    render:(text, record) => (
      getFieldDecorator('placeFrom'+record.key,
      {
        initialValue: text || '',
        rules: [{ required: true, message: '起飛機場不能為空' }],
      })(
        <Input disabled='false' />   
      ))
  },{
    title: '到達機場',
    dataIndex: 'placeTo',
    align:"center",
    render:  (text, record) => (
      getFieldDecorator('placeTo'+record.key,
      {
        initialValue: text || '',
        rules: [{ required: true, message: '到達機場不能為空' }],
      })(
        <Input  disabled='false' />
      ))
    },
  {
      title: '艙等',
      dataIndex: 'level',
      align:"center",
      render: (text, record) => (
        getFieldDecorator('level'+record.key,
        {
          rules: [{ required: true, message: '艙等不能為空' }],
          initialValue: text ? text : record[`level${record.key}`],
      })(
        <Select disabled={flag} style={{ width: 100 }} >
          {
            level.map(v => (<Select.Option key={v.Value}>{v.Value}</Select.Option>))
          }
        </Select>
      )
      )
  },{
    title: '起飛時間',
    dataIndex: 'timeStart',
    // 9.8修改
    // dataIndex: 'flytime',
    align:"center",
    render: (text, record) => {
      // let value = text? 'initialValue' : 'other';
      // let value =Takeofftime===''?Takeofftime: text;

      let value=ticketchangesflag?'':text?'initialValue' : 'other';
      
      return getFieldDecorator('timeStart'+record.key,
      {
        [value]: moment(text, 'YYYY-MM-DD HH:mm:00'),
        rules: [{ required: true, message: '起飛時間不能為空' }],
      })(
          <DatePicker 
          disabled={flag}
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          placeholder="選擇時間"
          style={{ minWidth: '150px' }}
        />
      )
    }
  }];

  if(change===true || change===false){
    const money = {
      title: monery,
      dataIndex: 'money',
      align:"center",
      render: (text, record) => {
        return getFieldDecorator('money'+record.key,
        {
          rules: [{ required: true, message: '金額不能為空' }],
          // initialValue:text || ''
          initialValue: flasgs? 0 : (text || '')
        })(
          <InputNumber
            formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            style={{ width: 150 }}
          />
        )
      }
    }
    columns.push(money);
  }
  const extra = [
    {
      title:'定位代碼',
      dataIndex:'ipcode',
      align:'center',
      render:(text,record)=>{
        return getFieldDecorator('ipcode'+record.key,  
        {
          initialValue:(status==='Return'||status==='Change')?'':text || ''
        }
      )(
          // <Input disabled={flag} />
          <Input />

        )
      }
    },
    {
      title:'備注',
      dataIndex:'remark',
      align:'center',
      render:(text,record)=>{
        return getFieldDecorator('remark'+record.key,
        {
          initialValue:(status==='Return'||status==='Change')?'':text || ''
         }
      )(
          // <TextArea title={text} style={{width:'200px',height:'50px'}} disabled={flag} />
          <TextArea title={text} style={{width:'200px',height:'50px'}}  />

        )
      }
    }
  ]
  
  // console.log(
  //   quoteStartData
  // );

  extra.forEach(item=> columns.push(item))
    return(
      <Card title="行程">
        <Table 
        columns={columns}
        dataSource={quoteStartData}
        rowKey={quoteStartData.key}
        bordered
        onRow={this.onRow}
        size="middle"
        pagination={false}
        scroll={{x:1500}}
         />
      </Card>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const {  quoteStartData, level, quoteFlightInfo,price } = state.travelAgencyPlatformReducer;
  // console.log(quoteStartData);
  return{quoteStartData, level, quoteFlightInfo,price}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleFlightNoChange(k, e){
      if(k>1){
        if(k % 2){
          k=1
        }
        else{
          k=0
        }
      }
      // console.log(k)
      dispatch(actionCreators.flightNoChange(e.target.value, k, this.props.form))
    }
  }
}
export default Form.create()(connect( mapStateToProps, mapDispatchToProps )( QuotingFlight) );