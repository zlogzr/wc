import React, { Component } from 'react';
import { Card, Form, Divider, Popconfirm, Table, message, Button, Modal, Select, DatePicker, Input, Upload, Icon } from "antd";

import axios from '../../../axios'
import './index.less'
import moment from 'moment';

import { MergeCellsTable } from "../../../components/table/mergeCellsTable";
import { LOGIN } from '../../../config/api';

// 引入无权限进入页面
import NoAuthority from './../../../commonPages/noAuthority/index';

class ceshi extends Component {
  constructor(props) {
    super(props)
    this.state = {
      AirportArea: '',
      personData: "",
      visible: false,
      visibleedit: false,
      Code: '',
      Name: "",
      Value: "",
      User_ID: window.sessionStorage.getItem("userId"),
      form: {},
      Deleteparameter: '',
      falg: true,
      flags: true,  //权限
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
    
    let value=this.state.Code
    
    if(value==='座位'){
      value='Seat'
    }else if(value==='艙等'){
      value='Berth'
    }else if (value==='國家'){
      value='Country'
    }else if (value==='喜好'){
      value='Dining'
    }

    const datas = {
      Code: this.state.Code,
      Value: this.state.Value,
      User_ID: this.state.User_ID
    }

 

    for (var i in datas) {
      if (datas[i] === '') {
      
        message.warning('请填写完整信息');
        return
      }
    }

    

    const formData = new FormData();
    formData.append('User_ID', this.state.User_ID);
    formData.append('Type', value);
    formData.append('Value', this.state.Value);
    //  formData.append('Value',this.state.Value);

    //  debugger

    axios.post({ url: 'Maintain/systemadd', data: formData, })
      .then(data => {
        
        if (data.code === 1) {
          // debugger
          message.success('添加成功');
          this.getpagedata();
         
        } else {
          message.error('添加失败');
        }
      })
      .catch(err => {
        message.error('添加失败', err);
        
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




  // 區域
  handleChange(e) {
   
    this.setState({
      Code: e
    })
  }

 
  // 新增輸入框
  changeinput(e) {
  
    this.setState({
      Value: e.target.value
    })
  }

  // 刪除拿到參數
  changeinpuonn = (values) => {
    
    const formData = new FormData();
    formData.append('Type', values.Code);
    axios.post({ url: 'Maintain/systemdetail', data: formData })
      .then(data => {
        
        if (data.code === 1) {
          data.data.forEach(item => {
           
            if (item.Name === values.Value) {

             this.setState({
              Deleteparameter:item.Code
             })

            }
          })
          formData.delete('Type')
        } else {
          message.warning('删除失败');
        }
      })
      .catch(err => {
        // console.log('刪除失败',err)
        message.error('删除失败');
      })
  }
  // 删除数据
  deleteFamilyInfo = (datas) => {
    // debugger
    const formData = new FormData();

    formData.append('User_ID', this.state.User_ID);
    formData.append('UniqueId', this.state.Deleteparameter);
    // debugger
    axios.post({ url: 'Maintain/systemedit', data: formData })
      .then(data => {
        // debugger
        // console.log(data,'删除回来的数据');
        if (data.code === 1) {
          message.success('删除成功');
          this.getpagedata()
        } else {
          message.warning('删除失败');
        }
      })
      .catch(err => {
        // console.log('刪除失败',err)
        message.error('删除失败');
      })
  }


  // 页面打开执行
  componentDidMount() {
    this.getpagedata()
  }

  // 获取页面数据请求
  getpagedata = () => {
    let data = sessionStorage.getItem("userId")
    let site = sessionStorage.getItem("site")
    // console.log(data,'data');
    axios.get({ url: 'Maintain/systemauth', data: { User_ID: data} })
      .then(data => {
       
        if (data.code === 1) {
         
          this.setState({
            personData: data.data.map((v, k) => ({
              key: k,
              Code: v.Code,
              Name: v.Name,
              Value: v.Value.split(','),
            }))
          })
         
        } else {
          this.setState({
            flags: false
          })
          message.error(data.message)
        }
      })
      .catch(err => {
        this.setState({
          flags: false
        })
        message.error('獲取頁面數據出錯')
      })
  }

  // 删除拿到code


  // 獲取下拉框數據
  getpagedataselect = (types) => {
    
    axios.get({ url: 'Maintain/systemdetail', data: { Type: types } })
      .then(data => {
        
        if (data.code === 1) {
         
          this.setState({

          })
          

        } else {
         
          message.error('請求失敗!')
        }
      })
      .catch(err => {
        message.error('請求數據出錯')
      })
  }


  render() {
    const { TextArea } = Input;
    const Option = Select.Option;
    // const { getFieldDecorator } = this.props.form;
    const { form, personData,flags } = this.state

// console.log(flags);
    // console.log(this.props);

    let columns1 = [
      // {title: '參數名', dataIndex: 'Code'},
      { title: '類別', dataIndex: 'Name',
      // render: (text, row, index) => {
      //   //  console.log(text, row, index);
      //   if (row.hb) {
      //     return {
      //       children: text,
      //       props: {
      //         rowSpan: row.row,
      //       },
      //     }
      //   } else {
      //     return {
      //       children: text,
      //       props: {
      //         rowSpan: 0,
      //       },
      //     }
      //   }
      // },
     },
      {
        title: '描述', dataIndex: 'Value',
      },
      {
        // title: '功能',
        dataIndex: 'TaiwanVaidTime',
        align: "center",
        render: (text, record, index) => (
          <span onClick={() => this.changeinpuonn(record)} >
            {/* <a href="javascript:;" onClick={() => this.showModal({...record, index})}>
                新增</a> */}
            {/* <Divider type="vertical" /> */}
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
    //  console.log(this.state.personData);
    let arr = []
    if (this.state.personData) {
      this.state.personData.forEach((value) => {
        value.Value.forEach((item, index) => {
          if (index === 0) {
            arr.push({
              'Code': value.Code,
              'Name': value.Name,
              'Value': item,
              hb: true,
              row: value.Value.length,
            })
          } else {
            arr.push({
              'Code': value.Code,
              'Name': value.Name,
              'Value': item
            })
          }
        })
      })
    }

    let arrs=[]
    if (this.state.personData) {
      this.state.personData.forEach((value) => {
          //  console.log(value);
           arrs.push(value.Name)
      })
    }
  // console.log(arrs,'arrs');
    // console.log(this.state.personData,'this.state.personDatathis.state.personData');
    // console.log(arr);
    return (
      <div>
        {/* 新增 */}
        <Modal
          style={{ width: "500px" }}
          className="ststempmodal1"
          title="新增"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <ul className='addnewsdivst'>
            <li> <span className='Code'> <i className='star'>*</i>類別:</span>

              <Select className="selectnei"
                onChange={this.handleChange.bind(this)}
                style={{ width: '280px' }} >
                {arrs? arrs.map((v, k) => {
                  return <Option value={v}>{v}</Option>
                }) : ''}
              </Select>
            </li>
            <li>  <span className='ename'><i className='star'>*</i>描述:</span>
              <Input className="title" placeholder="請輸入參數值" onChange={this.changeinput.bind(this)} />
            </li>
          </ul>
        </Modal>
        {
          !flags &&
          <NoAuthority></NoAuthority>
        }
        {
          flags &&  <Card
          className="family-info-maintain" title="系統參數維護" className='Frequentlyusedcontact-information'>
          <Button type="primary" className='addtable' onClick={this.showModal} style={{marginBottom:'10px'}}>
            新增
          </Button>
          <br />
          <Table
            dataSource={arr}
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