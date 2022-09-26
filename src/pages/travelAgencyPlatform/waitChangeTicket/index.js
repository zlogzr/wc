import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { actionCreators } from "../store";
import { Card, Tag } from "antd";
import { CommonTable } from "../../../components/table";

class  WaitChangeTicket extends Component {
 
  componentDidMount(){
    this.props.getPageData()
  }
  render(){
    let { backChangeList } =  this.props;
    // console.log(backChangeList);
    let columns = [{
      title: '單號',
      dataIndex: 'SequenceID',
    }, {
      title: '表單名稱',
      dataIndex: 'Name',
    }, {
      title: '填單日期',
      dataIndex: 'ApplyDatetime',
    },{
      title: '狀態',
      dataIndex: 'Status',
      render: text => <Tag color="green">{text}</Tag>
    }, {
      title: '填單人',
      dataIndex: 'ApplyName',
    },{
      dataIndex: 'QuotePrice',
      render: (text, record) => (
        <Link 
        to={{pathname: '/travel-agency/wait-back-ticket-detail', 
          search: `?formId=${record.SerialID}&formName=${record.Name}&id=2`}}
        >改簽</Link>
      )
    }];
    if(backChangeList.length===0){
    columns = [{
        title: '單號',
        dataIndex: 'SequenceID',
      }, {
        title: '表單名稱',
        dataIndex: 'Name',
      }, {
        title: '填單日期',
        dataIndex: 'ApplyDatetime',
      },{
        title: '狀態',
        dataIndex: 'Status',
        
      }, {
        title: '填單人',
        dataIndex: 'ApplyName',
      },{
        dataIndex: 'QuotePrice',
      }];
      backChangeList=[
            {
              key: 1,
              SequenceID: <span style={{color:'#dddddd'}}>——</span>,
              Name: <span style={{color:'#dddddd'}}>——</span>,
              ApplyDatetime: <span style={{color:'#dddddd'}}>——</span>,
              Status: <span style={{color:'#dddddd'}}>——</span>,
              QuotePrice:<span style={{color:'#dddddd'}}>——</span> ,
              ApplyName:<span style={{color:'#dddddd'}}>——</span> 
            }]
    }
    return(
      <div>
        <Card title="待改签">
          <CommonTable
            columns={columns}
            dataSource={backChangeList}
            rowKey={backChangeList.key}
          />
        </Card>
      </div>
      
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { backChangeList } = state.travelAgencyPlatformReducer;
  return{backChangeList}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData(){
      dispatch(actionCreators.getWaitBackTicketList(2))
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( WaitChangeTicket )