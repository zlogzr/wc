import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form,Select,DatePicker,Input,Upload,message, Button, Icon ,Table} from "antd";
import moment from 'moment';

import './index.less'
import axios from "../../../../axios";

const Option = Select.Option;

class Addcardinfo extends Component {
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
    message.error("獲取頁面數據出錯")
   
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
  }
  // Input标题
  changeinput(e){
   
    this.datas.Name=e.target.value
  }
  // 文本框
  changetextarea(e){
  
    this.datas.Value=e.target.value
  }

  render(){
    const { addPersonPageData:{cardCategory}, form: {getFieldDecorator }, handleCardNewAdd, haveFamilyName, cardInfo, isCommonPeople, isEdit }= this.props;

    const cardNames = cardCategory&& cardCategory.map(({Value}) => (<Option value={Value} key={Value}>{Value}</Option>));
    
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
    
    let showEditInfo = {};
    //如果是编辑的话显示编辑数据
    let editData = this.props.editData || {};
    
    if(isEdit){
      showEditInfo = {
        Code_edit: editData.Code,
        Otime_edit: editData.OTime?{initialValue: editData.OTime.substring(0,10)} : {},
        Ntime_edit: editData.OTime?{initialValue: editData.OTime.substring(12,21)} : {},
        Name_edit: editData.Name,
        
        Value_edit: editData.Value,
        // signValidDate_edit: editData.SignValidTime,
      }
    }else{
      showEditInfo = {
        Code_edit: null,
        OTime_edit: {},
        NTime_edit: {},
        Name_edit: null,
        Value_edit: null,
        // signValidDate_edit: null,
      }
    }
    return(

      <div>
        
        <ul className='addnewsdivst'>
          <li>  <i className='star'>*</i><span>種類:</span>
          {getFieldDecorator('Code', {initialValue: showEditInfo.Code_edit})(
         <Select className="selectnei"  style={{ width: 200 }} onChange={this.handleChange.bind(this)}> 
          <Option value="公司規章">公司規章</Option>
          <Option value="出行資訊">出行資訊</Option>
          </Select> )}
          
          </li>
          <li>
          
          <i className='star'>*</i><span>起止日期:</span>
          {getFieldDecorator('OTime', {...showEditInfo.OTime_edit})(
          <DatePicker className='DatePickertimes' onChange={this.dateonChangeon.bind(this)} /> )}
           <span>~</span> 
         
           {getFieldDecorator('NTime', {...showEditInfo.NTime_edit})(
            <DatePicker onChange={this.dateonChangeoff.bind(this)} /> )}
          </li>
          <li> <i className='star'>*</i><span>標題:</span> 
          {getFieldDecorator('Name', {initialValue: showEditInfo.name_edit})(
               <Input className="title" placeholder="Basic usage" onChange={this.changeinput.bind(this)} />   )}
          </li>
          <li>  
                <i className='star'>*</i><span>內容:</span> 
                {getFieldDecorator('Value', {initialValue: showEditInfo.Value_edit})(
                <TextArea className="texteart" rows={4} onChange={this.changetextarea.bind(this)}/> )}
          </li>

          <li>
                <i className='star'></i><span>附加檔案:</span> 
                <Upload className='uplaod' {...propsss}>
                <Button>
                 <Icon type="upload" /> 選擇文件上傳
               </Button>
               </Upload>
          </li>
         
        </ul>
        {
              cardInfo.length > 0 &&
              <Table
                columns={this.state.columns}
                dataSource={cardInfo}
                pagination={{ hideOnSinglePage: true }}
                bordered={true}
                rowKey={'CertType'}
                size="small"
              />
            }
      </div>
    )
  }
}

export default Addcardinfo