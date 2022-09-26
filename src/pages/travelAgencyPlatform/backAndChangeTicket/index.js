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
  componentWillUnmount(){
    this.props.rejest()
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
    },
    // {
    //   title: '報價截止時間',
    //   dataIndex: 'QuoteTime',
    // },
    {
      title: '目前狀態',
      dataIndex: 'Status',
    },{
      title: '填單人',
      dataIndex: 'ApplyName',
    },{
      dataIndex: 'QuotePrice',
      render: (text, record) => (
        <Link 
        to={{pathname: '/travel-agency/back-change-ticket/detail', 
          search: `?formId=${record.SerialID}&Status=${record.Status==='改簽待報價'?'Change':record.Status==='退票待報價'?'Return':''}`}}
          onClick={(getState)=>{}}
        >開始報價</Link>
      )
    }];

    if(backChangeList){
      backChangeList.forEach(item=>{
        // console.log(item);
        if(item.Status==='Change'){item.Status='改簽待報價'} else
        if(item.Status==='Return'){item.Status='退票待報價'}
        
      })
    }
    
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
      <Card title="退改簽">
        <CommonTable 
         columns={columns}
         dataSource={backChangeList}
         rowKey={backChangeList.key}
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
    },
    rejest(){
      dispatch(actionCreators.rejest())
    },
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( BackAndChangeTicket )