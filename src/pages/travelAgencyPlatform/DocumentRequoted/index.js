import React, { Component } from 'react';
import { Card,Table, Tag, message} from "antd";
import { Link } from "react-router-dom";

import axios from '../../../axios'



class DocumentRequoted extends Component {

  state = {
    WaitChooseTicketList:''
  }
  // 页面打开执行
  componentDidMount() {
    this.getpagedata()
  }

  // 获取页面数据请求
  getpagedata = () => {
    let data = sessionStorage.getItem("userId")
    let site = sessionStorage.getItem("site")
    axios.get({ url: 'MyForm/WaitReQuoteList', data: { User_ID: data,} })
      .then(data => {
        // console.log(data);
        this.setState({
          WaitChooseTicketList:data.Data.WaitChooseTicketList
        })
      })
      .catch(err => {
        message.error("獲取頁面數據出錯")
      })
  }

  handleEdit=(data)=>{
    // console.log(data);
      window.sessionStorage.setItem('strids',data.SerialID)
  }

  
  render() {
    const {WaitChooseTicketList}=this.state
    let columns = [{
      title: '單號',
      dataIndex: 'SequenceID',
      align:"center",
      render: (text, record,) => {
        if(text){
        
          // console.log(record);
         
          return (
            <Link 
            to={{pathname: '/orders/detail', 
              search: `?formId=${record.SerialID}`}}
              onClick={() => this.handleEdit({...record})}
            >
              {text}
            </Link>
          )
        }
      }
    }, {
      title: '表單名稱',
      dataIndex: 'FormName',
      align:"center"
    }, {
      title: '填單日期',
      dataIndex: 'ApplyDateTime',
      align:"center"
    }, {
      title: '填單人',
      dataIndex: 'ApplyName',
      align:"center"
    }, {
      title: '目前狀態',
      dataIndex: 'StepName',
      align:"center",
      render: (text,record) =>{
        // console.log(record,'recordrecord');
      return  <Tag color="blue">{text}</Tag>
      }
    }]

    return (
      <div>
         <Card
      title={'待重新報價單據'}
    >
      <Table 
      columns={columns}
      dataSource={WaitChooseTicketList}
      pagination={{hideOnSinglePage: true}}
      // pagination={ true}
      bordered={true} 
      
      rowKey={WaitChooseTicketList.key}
      size="middle"
      />
    </Card>
      
      </div>
    )
  }
}


export default DocumentRequoted