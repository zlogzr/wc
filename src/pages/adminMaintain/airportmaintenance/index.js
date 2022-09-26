import React, { Component } from 'react';
import { Card,Form, Divider, Popconfirm, Table,message ,Button,Modal,Select,DatePicker,Input,Upload,Icon} from "antd";

import axios from '../../../axios'
import './index.less'
import moment from 'moment';

// 引入无权限进入页面
import NoAuthority from './../../../commonPages/noAuthority/index';


class ceshi extends Component {
    constructor(props){
        super(props)
        this.state={
          AirportArea:'',
            personData:"",
            visible: false,
            visibleedit: false,
            Area:'',
            CityName:"",
            ParmCode:"",
            ParmValue:"",
            EName:"",
            User_ID:window.sessionStorage.getItem("userId"),
            form:{},
            flags:true,   //权限
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
    const datas={
      Area:this.state.Area,
      CityName:this.state.CityName,
      ParmCode:this.state.ParmCode,
      ParmValue:this.state.ParmValue,
    
      User_ID:this.state.User_ID
    }

    
    for(var i in datas) {
       if(datas[i]===''){
        message.warning('请填写完整信息');
        return
       }
   }

   datas.EName=this.state.EName;

  //  debugger

    axios.post({url: 'Maintain/Info_Airport_Add', data:datas,})
    .then(data => {
      if(data.code === 1){
        message.success('添加成功');
        this.getpagedata()
      }else{
        message.warning('添加失败');
      }
    })
    .catch(err => {
      message.error('添加失败',err);
    })
    // 弹框消失
    this.setState({
        visible: false,
      });
    
  }
  //添加弹框取消
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
// 编辑弹框确定
  handleOks = e => {
    const datas={
      Area: this.state.form.Area,
      CityName:this.state.form.CityName,
      ParmCode:this.state.form.ParmCode,
      ParmValue:this.state.form.ParmValue,
      // EName:this.state.form.EName,  //非必填項
      User_ID:this.state.User_ID,
      UniqueID:this.state.form.UniqueID,
  }
  
  // debugger
  for(var i in datas) {
     if(datas[i]===''){
      message.warning('请填写完整信息');
      return
     }}
     datas.EName=this.state.form.EName;
    axios.post({url: 'Maintain/Info_Airport_Update', data:datas,})
    .then(data => {
      if(data.code === 1){
        message.success('编辑成功');
        this.getpagedata()
      }else{
        message.warning('编辑失败');
      }
    })
    .catch(err => {
      message.error('编辑失败',err);
    })
    // 弹框消失
    this.setState({
        visibleedit: false,
      });
    
  }

//   编辑弹框取消
  handleCancels = e => {
    this.setState({
      visibleedit: false,
    });
    this.setState({
      form:{}
    })
  };

   // 區域
   handleChange(e) {
    
    this.setState({
      Area:e
    })
  }

  //城市名
  dateonChangeon(e) {             
   
    this.setState({
      CityName:e.target.value
    })
  }
  // 機場三字碼
  changeinput(e){
  
    this.setState({
      ParmCode:e.target.value
    })
  }
  // 機場名稱
  changetextarea(e){
   
    this.setState({
      ParmValue:e.target.value
    })
   
  }
  //英文名稱
  changenameinput(e){
   
    this.setState({
      EName:e.target.value
    })
  }

   // 编辑
    handleEdit=(data)=>{
      let datas=JSON.parse(JSON.stringify(data))
      
        this.setState({
            form:datas
        })
        
        this.setState({
            visibleedit:true
        })
 
    }
    // 删除数据
  deleteFamilyInfo=(datas)=>{
    
        let data={
            UniqueId:datas.UniqueID,
            User_ID:this.state.User_ID
        }
        axios.post({url: 'Maintain/Info_Airport_Delete', data})
    .then(data => {
      
      if(data.code === 1){
        message.success('删除成功');
        this.getpagedata()
      }else{
        message.warning('删除失败');
      }
    })
    .catch(err => {
      
      message.error('删除失败');
    })
    }
    // 页面打开执行
    componentDidMount(){ 
    this.getpagedata()
    }

    // 编辑更改数据
     // 區域
   handleChanges(e) {
   
    this.setState({
      ...this.state,
       form: {
       ...this.state.form,
       Area: e
       }
      })
  }
   //城市名
  dateonChangeons(e) {
   
    this.setState({
      ...this.state,
       form: {
       ...this.state.form,
       CityName: e.target.value
       }
      })
  }
  //  // 機場三字碼
  changeinputs(e) {
   
    this.setState({
      ...this.state,
       form: {
       ...this.state.form,
       ParmCode: e.target.value
       }
      })
  }
  // 機場名稱
  changetextareas(e){
   
    this.setState({
      ...this.state,
       form: {
       ...this.state.form,
       ParmValue: e.target.value
       }
      })
  }
  // 英文
  changeenameinputs(e){
    
    this.setState({
      ...this.state,
       form: {
       ...this.state.form,
       EName: e.target.value
       }
      })
    
  }

// 获取页面数据请求
getpagedata=()=>{
  let data=sessionStorage.getItem("userId")
  
    axios.get({url: 'Maintain/Info_Airport',data:{User_ID:data}})
    .then(data => {
  
      if(data.code === 1){
  
       this.setState({
        personData: data.data.map((v,k) => ({
            key:k,
            Area: v.Area,
            CityName:v.CityName,
            EName:v.EName ?v.EName :'——' ,
            ParmCode:v.ParmCode,
            ParmValue:v.ParmValue,
            UniqueID:v.UniqueID,
        }))
       })
       this.setState({
        AirportArea: data.area
      })

     
       
      }else{
        // message.warning("請求失敗")
        this.setState({
          flags: false
        })
        message.error('您沒有權限查看!')
      }
    })
    .catch(err => {
      message.error('獲取頁面數據出錯')
     
    })
}


render(){
    const { TextArea } = Input;
    const Option = Select.Option;
    // const { getFieldDecorator } = this.props.form;
   const {form,flags}=this.state

    
   
   
    let columns1 = [
      {title: '區域', dataIndex: 'Area'},
      {title: '城市名', dataIndex: 'CityName'},
      {title: '機場三字碼', dataIndex: 'ParmCode'}, 
      {title: '機場名稱', dataIndex: 'ParmValue'}, 
      {title: '英文名稱', dataIndex: 'EName'}, 
      {
        // title: '功能',
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
          style={{width:"500px"}}
          className="modal1"
          title="新增"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <ul className='addnewsdivst'>
          <li> <span className='area'> <i className='star'>*</i>區域:</span> 
          {/* <Input className="title" placeholder="請輸入國家"  /> */}
          <Select className="selectnei" 
        //  key={this.state.form.Code?this.state.form.Code:"公司規章"}
          // value={form.Code?form.Code:"公司規章"}

          onChange={this.handleChange.bind(this)}
          style={{ width: '252px' }} > 

          { this.state.AirportArea? this.state.AirportArea.map((v,k)=>{
              return   <Option value={v}>{v}</Option>
          }):'' }
          </Select>
          </li>
          <li>
          <span className='cityname'><i className='star'>*</i>城市名:</span> 
             <Input className="title" placeholder="請輸入城市名" onChange={this.dateonChangeon.bind(this)} />
          </li>
          <li>  <span><i className='star'>*</i>機場三字碼:</span> 
               <Input className="title" placeholder="請輸入機場三字碼" onChange={this.changeinput.bind(this)} />
          </li>
          <li>
          <span className='aroporename'><i className='star'>*</i>機場名稱:</span> 
                <Input className="title"  placeholder="請輸入機場名稱" onChange={this.changetextarea.bind(this)}/>
          </li>
          <li>
          <span className='ename'><i className='star'></i>英文名稱:</span> 
                <Input className="title" placeholder="請輸入英文名稱" onChange={this.changenameinput.bind(this)} />
             
          </li>
        </ul>
        </Modal>
      
        {/* 编辑 */}
        <Modal
        //   from={this.state.from}
          style={{width:"500px"}}
          className="modal1"
          title="编辑"
          visible={this.state.visibleedit}
          onOk={this.handleOks}
          onCancel={this.handleCancels}
        >
           <Form>
          <ul className='addnewsdivst'>
          <li> <span className='area'> <i className='star'>*</i>區域:</span> 
          {/* <Input className="title" value={this.state.form.Area} placeholder="請輸入國家" onChange={this.handleChanges.bind(this)} /> */}


          <Select className="selectnei" 
        //  key={this.state.form.Code?this.state.form.Code:"公司規章"}
        //   value={form.Code?form.Code:"公司規章"}
          value={this.state.form.Area}
          onChange={this.handleChanges.bind(this)}
          style={{ width: '252px' }} > 

          { this.state.AirportArea? this.state.AirportArea.map((v,k)=>{
              return   <Option value={v}>{v}</Option>
          }):'' }
          </Select>
          </li>
          <li>
          <span className='cityname'><i className='star'>*</i>城市名:</span> 
             <Input className="title" value={this.state.form.CityName} placeholder="請輸入城市名" onChange={this.dateonChangeons.bind(this)} />
          </li>

          <li>  <span><i className='star'>*</i>機場三字碼:</span> 
               <Input className="title" value={this.state.form.ParmCode} placeholder="請輸入機場三字碼" onChange={this.changeinputs.bind(this)} />
          </li>

          <li>
          <span className='aroporename'><i className='star'>*</i>機場名稱:</span> 
                <Input className="title" value={this.state.form.ParmValue}  placeholder="請輸入機場名稱" onChange={this.changetextareas.bind(this)}/>
          </li>

          <li>
          <span className='ename'><i className='star'></i>英文名稱:</span> 
                <Input className="title" value={this.state.form.EName} placeholder="請輸入英文名稱" onChange={this.changeenameinputs.bind(this)} />
             
          </li>
        </ul>
        </Form>
        </Modal>
        {
          !flags &&
          <NoAuthority></NoAuthority>
        }

        {
               flags &&  <Card 
                   title="機場信息維護"  className="family-info-maintain"  className='Frequentlyusedcontact-information'>
                   <Button type="primary" className='addtable' onClick={this.showModal} style={{marginBottom:'10px'}}>
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
        }
   
      </div>
    )
  }
}
  

export default ceshi