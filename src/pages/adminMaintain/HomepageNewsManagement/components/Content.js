import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form,Select,DatePicker,Input,Upload,message, Button, Icon } from "antd";
import AddCardInfo from './addCard';
import PersonInfo from "./personInfo";

import './index.less'
import axios from "../../../../axios";



class Content extends Component {
  constructor(props) {
    super(props);
     this.state={
      type:'',
        Code:"",
        Name:'',
        Value:'',
        OTime:'',
        ETime:'',
        User_ID: window.localStorage.getItem("userId"),
     }
    }
componentDidMount(){
  axios.get({url: 'Maintain/Info_Maintain'})
  .then(data => {
    if(data.code === 1){
      let add=data.type
      add=add.map((v)=>{
        return (v==="1"? '公司規章' :  v==="0"? "出行資訊":"")
      })
      this.setState({
        type:add
      })
    }else{
      message.warning("請求失敗")
    }
  })
  .catch(err => {
    message.error('獲取頁面數據出錯')
    
  })
}

  datas={
  Code:"",
  Name:'',
  Value:'',
  OTime:'',
  ETime:'',
  User_ID: window.sessionStorage.getItem("userId"),
}

  // 选择框
  handleChange(value) {
    
    if(value==="公司規章"){value="1"}else if(value==='出行資訊'){value="0"}
    
    this.datas.Code=value
     
   
  }
  // 开始时间
  dateonChangeon(date, dateString) {
    
    this.datas.OTime=dateString
    

  }
  // 结束时间
  dateonChangeoff(date, dateString) {
  
    this.datas.NTime=dateString
    // this.setState({
    
    //     ETime:dateString
      
    // })
  }
  // Input标题
  changeinput(e){
    
    this.datas.Name=e.target.value
    // this.setState({
    
    //     Name:e.target.value
      
    // })
  }
  // 文本框
  changetextarea(e){
    
    this.datas.Value=e.target.value
    // this.setState({
      
    //     Value:e.target.value
      
    // })
    
  }

  render(){
    const { cardInfo, haveFamilyName, addPersonPageData, form, editData, isEdit,persondata } = this.props;
   
    // const { Option } = Select;
    // const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    const { TextArea } = Input;
    const Option = Select.Option;
    const propsss = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    // const {type}=this.state
    return(
      <div>
        {/* <ul className='addnewsdivst'>
          <li>  <i className='star'>*</i><span>種類:</span> 
         <Select className="selectnei"  style={{ width: 200 }} onChange={this.handleChange.bind(this)}> 
          <Option value="公司規章">公司規章</Option>
          <Option value="出行資訊">出行資訊</Option>
          </Select>
          </li>
          <li>
          <i className='star'>*</i><span>起止日期:</span> 
          <DatePicker className='DatePickertimes' onChange={this.dateonChangeon.bind(this)} /> <span>~</span>  <DatePicker onChange={this.dateonChangeoff.bind(this)} />

          </li>
          <li> <i className='star'>*</i><span>標題:</span> 
               <Input className="title" placeholder="Basic usage" onChange={this.changeinput.bind(this)} />
          </li>
          <li>
                <i className='star'>*</i><span>內容:</span> 
                <TextArea className="texteart" rows={4} onChange={this.changetextarea.bind(this)}/>
          </li>
          <li>
                <i className='star'></i><span>附加檔案:</span> 
                <Upload className='uplaod' {...propsss}>
                <Button>
                 <Icon type="upload" /> 選擇文件上傳
               </Button>
               </Upload>
          </li>
        </ul> */}
        {/* <PersonInfo 
        form={this.props.form} /> */}
        {/* <hr style={styleHr}/> */}
        <AddCardInfo
          form={form}
          cardInfo={cardInfo}
          addPersonPageData={addPersonPageData}
          haveFamilyName={haveFamilyName}
          editData={editData}
          isEdit={isEdit}
          isCommonPeople={true}
        />
      </div>
    )
  }
}
const mapStateToProps = ( state ) => {
  const { cardInfo, haveFamilyName, addPersonPageData, editData, isEdit,datas } = state.adminMaintainReducer2.homepageNewsManagementReducer;
  return{
    cardInfo, haveFamilyName, addPersonPageData, editData, isEdit,datas
  }
}
export default connect( mapStateToProps, null )(Form.create()(Content))