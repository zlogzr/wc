import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Card, Divider, Popconfirm, Table,message } from "antd";

// import store from './store'
import './index.less'
// 用於獲取rudux中的狀態
// import store  from  './store'


export default class Houtai extends Component {

  // componentDidMount(){
  //   // store.subscribe(()=>{
  //   //   this.setState({})
  //   // })
 
  // }
// componentDidMount(){
//     // this.props.getPageData()   
// }
render(){
    let { personData, deleteFamilyInfo, baseInfo, handleEdit } = this.props;
    
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
            <a href="javascript:;" onClick={() => handleEdit({...record, index})}>編輯</a>
            <Divider type="vertical" />
            <Popconfirm 
              title="確定要刪除嗎?" 
              onConfirm={() => deleteFamilyInfo(baseInfo, record)} 
              onCancel={null} 
              okText="是" 
              cancelText="否">
            <a href="javascript:;">刪除</a>
            </Popconfirm>
          </span>
        ),
      },
    ]
    personData=[
        {
            key: 1,
            OTime: '——',
            Code: '——',
            Name: '——',
            TaiwanVaidTime: '——',
            
          }
    ]
    return(
      <Card 
      className="family-info-maintain" title="首頁新聞維護" className='Frequentlyusedcontact-information'>
        <br/>
        <Table
          dataSource={personData}
          columns={columns1}
          rowKey='k'
          bordered
          pagination={false}
        />
      </Card>
    )
  }
}
  
