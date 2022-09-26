import React, { Component } from 'react';
import { Card, Form, Divider, Popconfirm, Table, message, Button, Modal, Select, DatePicker, Input, Upload, Icon } from "antd";

import UploadT from '../../../components/upload';

import axios from '../../../axios'
import './index.less'
import moment from 'moment';

// 引入无权限进入页面
import NoAuthority from './../../../commonPages/noAuthority/index';


class ceshi extends Component {

  state = {
    personData: "",
    visible: false,
    visibleedit: false,
    Code: '',
    Name: "",
    Value: "",
    OTime: "",
    ETime: "",
    User_ID: window.sessionStorage.getItem("userId"),
    form: {},
    otime: "",
    etime: "",
    file: '',
    files: '',
    flags: true,  //权限
  }

  // 新增弹框
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  //添加弹框确定
  handleOk = e => {

    const datas = {
      Code: this.state.Code,
      Name: this.state.Name,
      Value: this.state.Value,
      OTime: this.state.OTime,
      ETime: this.state.ETime,
      User_ID: this.state.User_ID,
      Site: sessionStorage.getItem("site")
    }
    for (var i in datas) {
      if (datas[i] === '') {
        
        message.warning('请填写完整信息');
        return
      }
    }
    let formData = new FormData();
    formData.append('data', JSON.stringify(datas));
    formData.append('file', this.state.file);
    axios.post({ url: 'Maintain/Info_Maintain_Add', data: formData ,timeout:300000})
      .then(data => {
        
        if (data.code === 1) {
          message.success('添加成功');
          this.getpagedata()
        } else {
          message.warning('添加失败111');
        }
      })
      .catch(err => {
       
        message.error('新增失败')
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
    
    const datas = {
      Code: this.state.form.Code === "出行資訊" ? '1' : this.state.form.Code === "公司規章" ? "0" : "",
      Name: this.state.form.Name,
      Value: this.state.form.Value,
      OTime: this.state.form.OTime,
      ETime: this.state.form.ETime,
      User_ID: this.state.User_ID,
      UniqueID: this.state.form.UniqueID,
    }
   
    for (var i in datas) {
      if (datas[i] === '') {
       
        message.warning('请填写完整信息');
        return
      }
    }
   

    let formData = new FormData();
    formData.append('data', JSON.stringify(datas));
    formData.append('file', this.state.files);

    axios.post({ url: 'Maintain/Info_Maintain_Update', data: formData, timeout:300000})
      .then(data => {
       
        if (data.code === 1) {
          message.success('编辑成功');
          this.getpagedata()
        } else {
          message.warning('编辑失败');
        }
      })
      .catch(err => {
      
        message.error("编辑失败")
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
      form: {}
    })
  };

  // 选择框
  handleChange(value) {
   
    this.setState({
      Code: value
    })
    
  }
  // 开始时间
  dateonChangeon(date, dateString) {
    this.setState({
      OTime: dateString
    })
  }
  // 结束时间
  dateonChangeoff(date, dateString) {
    this.setState({
      ETime: dateString
    })
  }
  // Input标题
  changeinput(e) {
    this.setState({
      Name: e.target.value
    })
  }
  // 文本框
  changetextarea(e) {
    this.setState({
      Value: e.target.value
    })
  }
  // 编辑
  handleEdit = (data) => {
    let datas = JSON.parse(JSON.stringify(data))
    datas.OTime = data.OTime.substr(0, 10)
    datas.ETime = data.OTime.substr(11, 21)
    
    this.setState({
      form: datas
    })
    this.setState({
      visibleedit: true
    })
  }
  // 删除数据
  deleteFamilyInfo = (datas) => {
    let data = {
      UniqueId: datas.UniqueID,
      User_ID: this.state.User_ID
    }
    axios.post({ url: 'Maintain/Info_Maintain_Delete', data })
      .then(data => {
       
        if (data.code === 1) {
          message.success('删除成功');
          this.getpagedata()
        } else {
          message.warning('删除失败');
        }
      })
      .catch(err => {
        message.error('新增失败');
      })
  }
  // 页面打开执行
  componentDidMount() {
    this.getpagedata()
  }

  // 编辑更改数据
  // 选择框
  handleChanges(value) {
    if (value === "1") { value = "公司規章" } else if (value === '0') { value = "出行資訊" }
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
    
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        OTime: dateString
      }
    })
  }
  // 结束时间
  dateonChangeoffs(date, dateString) {
    
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        ETime: dateString
      }
    })
  }
  // Input标题
  changeinputs(e) {

    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        Name: e.target.value
      }
    })

  }
  // 文本框
  changetextareas(e) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        Value: e.target.value
      }
    })
  }

  // 获取页面数据请求
  getpagedata = () => {
    let data = sessionStorage.getItem("userId")
    let site = sessionStorage.getItem("site")
    axios.get({ url: 'Maintain/Info_Maintain', data: { User_ID: data, Site: site } })
      .then(data => {
      
        if (data.code === 1) {
          let arr1 = data.data.RuleInfo;
          let arr2 = data.data.TravelInfo
          let arr3 = arr1.concat(arr2)
         
          this.setState({
            personData: arr3.map((v, k) => ({
              key: k,
              OTime: v.OTime + "~" + v.ETime,
              // Code: v.Code? v.Code==="1"?"1昊":v.Code==="2"?"2HAO":""   : "",
              Code: v.Code === "1" ? '出行資訊' : v.Code === "0" ? "公司規章" : "",
              Name: v.Name,
              TaiwanVaidTime: '',
              UniqueID: v.UniqueID,
              Value: v.Value
            }))
          })

        } else {
          // message.warning("請求失敗")
          this.setState({
            flags: false
          })
          message.error("您沒有權限查看!")
        }
      })
      .catch(err => {
        message.error("獲取頁面數據出錯")
      })
  }

  uploadFile = (file) => {
    
    this.setState({
      file: file
    })
  }

  uploadFiles = (file) => {
  
    this.setState({
      files: file
    })
  }
  render() {
    const { TextArea } = Input;
    const Option = Select.Option;

    const { form, flags } = this.state
    
    let columns1 = [
      { title: '種類', dataIndex: 'Code' },
      { title: '起止日期', dataIndex: 'OTime' },
      { title: '標題', dataIndex: 'Name' },
      {
        // title: '功能',
        dataIndex: 'TaiwanVaidTime',
        align: "center",
        render: (text, record, index) => (
          <span>
            <a href="javascript:;" onClick={() => this.handleEdit({ ...record, index })}>
              編輯</a>
            <Divider type="vertical" />
            <Popconfirm
              title="確定要刪除嗎?"
              onConfirm={() => this.deleteFamilyInfo(record)}
              onCancel={null}
              okText="是"
              cancelText="否">
              <a href="javascript:;">刪除</a>
            </Popconfirm>
          </span>
        ),
      },
    ]

    return (
      <div>
        {/* 新增 */}
        <Modal
          style={{ width: "700px" }}
          className="modals1"
          title="新增"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <ul className='addnewsdivstssul'>
            <li>  <i className='star'>*</i><span>種類:</span>
              <Select className="selectnei" style={{ width: 200 }} onChange={this.handleChange.bind(this)}>
                <Option value="0" lable="公司規章">公司規章</Option>
                <Option value="1" lable="出行資訊">出行資訊</Option>
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
              <TextArea className="texteart" rows={4} onChange={this.changetextarea.bind(this)} />
            </li>
            <li>
              <i className='star'></i><span>附加檔案:</span>
              <UploadT className='uplaod' success={this.uploadFile} />
              {/* <Upload className='uplaod' {...propsss}>
                <Button>
                 <Icon type="upload" /> 選擇文件上傳
               </Button>
               </Upload> */}
            </li>
          </ul>
        </Modal>

        {/* 编辑 */}
        <Modal
          //   from={this.state.from}
          style={{ width: "700px" }}
          className="modals1"
          title="编辑"
          visible={this.state.visibleedit}
          onOk={this.handleOks}
          onCancel={this.handleCancels}
        >
          <Form>
            <ul className='addnewsdivstssul'>
              <li>  <i className='star'>*</i><span>種類:</span>

                <Select className="selectnei"
                  //  key={this.state.form.Code?this.state.form.Code:"公司規章"}
                  value={form.Code ? form.Code : "公司規章"}
                  style={{ width: 200 }} onChange={this.handleChanges.bind(this)}>
                  <Option value="公司規章">公司規章</Option>
                  <Option value="出行資訊">出行資訊</Option>
                </Select>
              </li>
              <li>
                <i className='star'>*</i><span>起止日期:</span>
                <DatePicker className='DatePickertimes'

                  value={moment((this.state.form.OTime ? this.state.form.OTime : ""), 'YYYY-MM-DD')}
                  onChange={this.dateonChangeons.bind(this)} /> <span>~</span>
                <DatePicker
                  value={moment((this.state.form.ETime ? this.state.form.ETime : ""), 'YYYY-MM-DD')}

                  onChange={this.dateonChangeoffs.bind(this)} />

              </li>
              <li> <i className='star'>*</i><span>標題:</span>
                <Input className="title" value={this.state.form.Name} ref={(form) => (this.name = form)} placeholder="标题" onChange={this.changeinputs.bind(this)} />
              </li>
              <li>
                <i className='star'>*</i><span>內容:</span>
                <TextArea className="texteart" value={this.state.form.Value} ref={(form) => (this.value = form)} rows={4} onChange={this.changetextareas.bind(this)} />
              </li>
              <li>
                <i className='star'></i><span>附加檔案:</span>
                <UploadT className='uplaod' success={this.uploadFiles} />
                {/* <Upload className='uplaod' {...propsss}>
                <Button>
                 <Icon type="upload" /> 選擇文件上傳
               </Button>
               </Upload> */}


              </li>
            </ul>
          </Form>
        </Modal>
        {
          !flags &&
          <NoAuthority></NoAuthority>
        }
        {
           flags &&<Card
            title="资讯維護" className="family-info-maintain" className='Frequentlyusedcontact-information'>
            <Button type="primary" className='addtables' onClick={this.showModal} style={{marginBottom:'10px'}}>
              新增
            </Button>
            <br />
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