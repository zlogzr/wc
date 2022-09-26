import React, { Component } from 'react';
import { Card,Form, Divider, Popconfirm, Table,message ,Button,Modal,Select,DatePicker,Input,Upload,Icon} from "antd";

import axios from '../../../axios'
import './index.less'
import moment from 'moment';


class ceshi extends Component {
    constructor(props){
        super(props)
        this.state={
            personData:"",
            visible: false,
            visibleedit: false,
            Code:'',
            Name:"",
            Value:"",
            OTime:"",
            ETime:"",
            User_ID:window.sessionStorage.getItem("userId"),
            form:{},
            otime:"",
            etime:""
            }
    }
 // 新增弹框
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

//添加弹框确定
  handleOk = e => {
    // console.log(e);
    
    const datas={
        Code:this.state.Code,
        Name:this.state.Name,
        Value:this.state.Value,
        OTime:this.state.OTime,
        ETime:this.state.ETime,
        User_ID:this.state.User_ID
    }
    for(var i in datas) {
       if(datas[i]===''){
          //  console.log(i,":",datas[i]);
        message.warning('请填写完整信息');
        return
       }
   
   }
    axios.post({url: 'Maintain/Info_Maintain_Add', data:datas,})
    .then(data => {
        // console.log(data,'添加回来的数据');
      if(data.code === 1){
        message.success('添加成功');
        this.getpagedata()
      }else{
        message.warning('添加失败');
      }
    })
    .catch(err => {
      message.error('新增失敗')
      // console.log('新增失败',err)
    })
    // 弹框消失
    this.setState({
        visible: false,
      });
    
  }
  //添加弹框取消
  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };
// 编辑弹框确定
  handleOks = e => {
    // console.log(e);
    const datas={
      Code:this.state.form.Code==="出行資訊"? '1' :  this.state.form.Code==="公司規章"? "0":"",
      Name:this.state.form.Name,
      Value:this.state.form.Value,
      OTime:this.state.form.OTime,
      ETime:this.state.form.ETime,
      User_ID:this.state.User_ID,
      UniqueID:this.state.form.UniqueID,
  }
  for(var i in datas) {
     if(datas[i]===''){
        //  console.log(i,":",datas[i]);
      message.warning('请填写完整信息');
      return
     }}
    axios.post({url: 'Maintain/Info_Maintain_Update', data:datas,})
    .then(data => {
        // console.log(data,'编辑回来的数据');
      if(data.code === 1){
        message.success('编辑成功');
        this.getpagedata()
      }else{
        message.warning('编辑失败');
      }
    })
    .catch(err => {
      message.error('編輯失敗')
      // console.log('编辑失败',err)
    })
    // 弹框消失
    this.setState({
        visibleedit: false,
      });
    
  }

//   编辑弹框取消
  handleCancels = e => {
    // console.log(e);
    this.setState({
      visibleedit: false,
    });
    this.setState({
      form:{}
    })

    // console.log(this.state);
  };

   // 选择框
   handleChange(value) {
    // console.log(`selected ${value}`);
    if(value==="公司規章"){value="1"}else if(value==='出行資訊'){value="0"}
    // console.log(value);
    this.setState({
        Code:value
    })
  }
  // 开始时间
  dateonChangeon(date, dateString) {
    // console.log(date, dateString);
    // console.log(this,'111');
    this.setState({
        OTime:dateString
    })
  }
  // 结束时间
  dateonChangeoff(date, dateString) {
    // console.log(date, dateString);
    this.setState({
            ETime:dateString
    })
  }
  // Input标题
  changeinput(e){
    // console.log(`input `,e.target.value);
    this.setState({
        Name:e.target.value
    })
  }
  // 文本框
  changetextarea(e){
    // console.log(`textarea`,e.target.value);
    this.setState({
        Value:e.target.value
    })
    // console.log(this.state);
  }
   // 编辑
    handleEdit=(data)=>{
      let datas=JSON.parse(JSON.stringify(data))
      datas.OTime=data.OTime.substr(0,10)
      datas.ETime=data.OTime.substr(11,21)
        // console.log(datas,'ddaa');
        this.setState({
            form:datas
        })
        // this.setState({
        //   otime:this.state.form.OTime
        // })
        this.setState({
            visibleedit:true
        })
  // console.log(this.state);
    }
    // 删除数据
    deleteFamilyInfo=(datas)=>{
        let data={
            UniqueId:datas.UniqueID,
            User_ID:this.state.User_ID
        }
        axios.post({url: 'Maintain/Info_Maintain_Delete', data})
    .then(data => {
        // console.log(data,'删除回来的数据');
      if(data.code === 1){
        message.success('删除成功');
        this.getpagedata()
      }else{
        message.warning('删除失败');
      }
    })
    .catch(err => {
      // console.log('新增失败',err)
      message.error('新增失敗')
    })
    }
    // 页面打开执行
    componentDidMount(){
    // axios.get({url: 'Maintain/Info_Maintain'})
    // .then(data => {
    //   console.log(data,'新聞頁面獲取數據');
    //   if(data.code === 1){
    //    console.log(data,'day');
    //    this.setState({
    //     personData: data.data.map((v,k) => ({
    //         key:k,
    //         OTime: v.OTime+"~"+v.ETime,
    //         // Code: v.Code? v.Code==="1"?"1昊":v.Code==="2"?"2HAO":""   : "",
    //         Code:  v.Code==="1"? '出行資訊' :  v.Code==="0"? "公司規章":"",
    //         Name: v.Name,
    //         TaiwanVaidTime:'',
    //         UniqueID:v.UniqueID,
    //         Value:v.Value
    //     }))
    //    })
       
    //   }else{
    //     message.warning("請求失敗")
    //   }
    // })
    // .catch(err => {
    //   console.log('獲取頁面數據出錯',err)
    // })
    this.getpagedata()
    }

    // 编辑更改数据
     // 选择框
   handleChanges(value) {
    // console.log(`selected ${value}`);
   
    
    if(value==="1"){value="公司規章"}else if(value==='0'){value="出行資訊"}
    // console.log(value);
    
  
    this.setState({
      ...this.state,
       form: {
       ...this.state.form,
        Code: value
       }
      })
  }
  // 开始时间
  dateonChangeons(date, dateString) {
    // console.log(date, dateString);
    // console.log(this,'111');
    this.setState({
      ...this.state,
       form: {
       ...this.state.form,
       OTime: dateString
       }
      })
    // this.setState({
    //     form:{
    //       OTime: dateString
    //     }
    // })
  }
  // 结束时间
  dateonChangeoffs(date, dateString) {
    // console.log(date, dateString);
    this.setState({
      ...this.state,
       form: {
       ...this.state.form,
       ETime: dateString
       }
      })
    // this.setState({
    //   form:{
    //         ETime:dateString
    //   }
    // })
  }
  // Input标题
  changeinputs(e){
    // console.log(`input `,e.target.value);
    this.setState({
      ...this.state,
       form: {
       ...this.state.form,
       Name: e.target.value
       }
      })
    // this.setState({
    //   form:{
    //     Name:e.target.value
    //   }
    // })
  }
  // 文本框
  changetextareas(e){
    // console.log(`textarea`,e.target.value);
    this.setState({
      ...this.state,
       form: {
       ...this.state.form,
       Value: e.target.value
       }
      })
    // this.setState({
    //   form:{
    //     Value:e.target.value
    //   }
    // })
    // console.log(this.state);
  }

// 获取页面数据请求
getpagedata=()=>{
    axios.get({url: 'Maintain/Info_Maintain'})
    .then(data => {
      // console.log(data,'新聞頁面獲取數據');
      if(data.code === 1){
    //    console.log(data,'day');
       this.setState({
        personData: data.data.map((v,k) => ({
            key:k,
            OTime: v.OTime+"~"+v.ETime,
            // Code: v.Code? v.Code==="1"?"1昊":v.Code==="2"?"2HAO":""   : "",
            Code:  v.Code==="1"? '出行資訊' :  v.Code==="0"? "公司規章":"",
            Name: v.Name,
            TaiwanVaidTime:'',
            UniqueID:v.UniqueID,
            Value:v.Value
        }))
       })
       
      }else{
        message.warning("請求失敗")
      }
    })
    .catch(err => {
      // console.log('獲取頁面數據出錯',err)
      message.error("獲取頁面數據出錯")
    })
}
render(){
    const { TextArea } = Input;
    const Option = Select.Option;
    // const { getFieldDecorator } = this.props.form;
   const {form}=this.state

    const propsss = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            // console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
    
    // console.log(this.props);
   
    let columns1 = [
      {title: '起止日期', dataIndex: 'OTime'},
      {title: '種類', dataIndex: 'Code'},
      {title: '標題', dataIndex: 'Name'}, 
      {
        title: '功能',
        dataIndex: 'TaiwanVaidTime',
        align:"center",
        render: (text, record, index) => (
          <span>
            <a href="javascript:;" onClick={() => this.handleEdit({...record, index})}>
                編輯</a>
            <Divider type="vertical" />
            <Popconfirm 
              title="確定要刪除嗎?" 
              onConfirm={() => this.deleteFamilyInfo( record)} 
              onCancel={null} 
              okText="是" 
              cancelText="否">
            <a href="javascript:;">刪除</a>
            </Popconfirm>
          </span>
        ),
      },
    ]
   
    return(
        <div> 
        {/* 新增 */}
        <Modal
          style={{width:"700px"}}
          className="modal1"
          title="新增"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <ul className='addnewsdivst'>
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
        </ul>
        </Modal>
      
        {/* 编辑 */}
        <Modal
        //   from={this.state.from}
          style={{width:"700px"}}
          className="modal1"
          title="编辑"
          visible={this.state.visibleedit}
          onOk={this.handleOks}
          onCancel={this.handleCancels}
        >
           <Form>
          <ul className='addnewsdivst'>
          <li>  <i className='star'>*</i><span>種類:</span> 
         
         <Select className="selectnei" 
        //  key={this.state.form.Code?this.state.form.Code:"公司規章"}
          value={form.Code?form.Code:"公司規章"}
          style={{ width: 200 }} onChange={this.handleChanges.bind(this)}> 
          <Option value="公司規章">公司規章</Option>
          <Option value="出行資訊">出行資訊</Option>
          </Select>
          </li>
          <li>
          <i className='star'>*</i><span>起止日期:</span> 
          <DatePicker className='DatePickertimes' 
          
          value={moment((this.state.form.OTime?this.state.form.OTime:""), 'YYYY-MM-DD')}
          onChange={this.dateonChangeons.bind(this)} /> <span>~</span> 
           <DatePicker
              value={moment((this.state.form.ETime?this.state.form.ETime:""), 'YYYY-MM-DD')}  
       
            onChange={this.dateonChangeoffs.bind(this)} />

          </li>
        
          {/* {moment(this.state.form.OTime.substring(0,10), 'YYYY-MM-DD') } */}
         {/* {(this.state.form.OTime?this.state.form.OTime.substr(0,3):"")} */}
         
          <li> <i className='star'>*</i><span>標題:</span> 
               <Input className="title" value={this.state.form.Name} ref={(form) => (this.name = form)} placeholder="标题" onChange={this.changeinputs.bind(this)} />
          </li>
          <li>
                <i className='star'>*</i><span>內容:</span> 
                <TextArea className="texteart" value={this.state.form.Value} ref={(form) => (this.value = form)} rows={4} onChange={this.changetextareas.bind(this)}/>
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
        </Form>
        </Modal>
      <Card 
      className="family-info-maintain" title="首頁新聞維護" className='Frequentlyusedcontact-information'>
        <Button type="primary" className='addtable' onClick={this.showModal}>
          新增
        </Button>
        <br/>
        <Table
          dataSource={this.state.personData}
          columns={columns1}
          rowKey='index'
          bordered
          pagination={true}
        />
      </Card>
      </div>
    )
  }
}
  

export default ceshi