import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { actionCreators } from "../store";
import { Card } from "antd";
import { CommonTable } from "../../../components/table";

class BackAndChangeTicket extends Component {
 
  componentDidMount(){
    this.props.getPageData()
  }
  render(){
    let { backChangeList } =  this.props;
    // console.log(backChangeList,'backChangeList');
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
      title: '報價截止時間',
      dataIndex: 'QuoteTime',
    },{
      dataIndex: 'QuotePrice',
      render: (text, record) => (
        <Link 
        to={{pathname: '/travel-agency/back-change-ticket/detail', 
          search: `?formId=${record.SerialID}`}}
          onClick={(getState)=>{}}
        >開始報價</Link>
      )
    }];
    
    if(!backChangeList){
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
                QuotePrice:<span style={{color:'#dddddd'}}>——</span> 
              }]
      }
    return(
      <Card title="退改簽测试">
        <CommonTable 
         columns={columns}
         dataSource={backChangeList}
         rowKey={'SequenceID'}
        />
      </Card>
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
      dispatch(actionCreators.getBackAndChange())
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( BackAndChangeTicket )