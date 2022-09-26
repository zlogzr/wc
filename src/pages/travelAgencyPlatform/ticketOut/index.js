import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { actionCreators } from "../store";
import { Card } from "antd";
import { CommonTable } from "../../../components/table";

class  TicketOut extends Component {

  // state={
  //   flag:false,
  //   flag1:false
  // }
 
  componentDidMount(){
    this.props.getPageData()
  }
  render(){
    let { ticketOutList1, ticketOutList2 } =  this.props;

    let arr=false;
    let arr1=false

    // console.log(ticketOutList1, ticketOutList2,'ticketOutList1, ticketOutList2');
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
      title: '出票日期',
      dataIndex: 'TicketTime',
    },
    {
      title: '填單人',
      dataIndex: 'ApplyName',
    },
    {
      dataIndex: 'QuotePrice',
      render: (text, record) => (
        <Link 
        to={{pathname: '/travel-agency/ticket-out/detail', 
          search: `?formId=${record.SerialID}&formName=${record.Name}`}}
        >查看</Link>
      )
    }
    ];

    let columns1 = [{
      title: '單號',
      dataIndex: 'SequenceID',
    }, {
      title: '表單名稱',
      dataIndex: 'Name',
    }, {
      title: '填單日期',
      dataIndex: 'ApplyDatetime',
    },{
      title: '出票日期',
      dataIndex: 'TicketTime',
    },
    {
      title: '填單人',
      dataIndex: 'ApplyName',
    },
    {
      dataIndex: 'QuotePrice',
    }
    ];
    if(ticketOutList1.length===0){
      // this.setState({
      //   falg:true
      // })
      arr=true;
        ticketOutList1=[
              {
                key: 1,
                SequenceID: <span style={{color:'#dddddd'}}>——</span>,
                Name: <span style={{color:'#dddddd'}}>——</span>,
                ApplyDatetime: <span style={{color:'#dddddd'}}>——</span>,
                TicketTime: <span style={{color:'#dddddd'}}>——</span>,
                QuotePrice:<span style={{color:'#dddddd'}}>——</span> ,
                ApplyName:<span style={{color:'#dddddd'}}>——</span> 
              }]
      }
      if(ticketOutList2.length===0){
        // this.setState({
        //   flag1:true
        // })
        arr1=true
        ticketOutList2=[
                {
                  key: 1,
                  SequenceID: <span style={{color:'#dddddd'}}>——</span>,
                  Name: <span style={{color:'#dddddd'}}>——</span>,
                  ApplyDatetime: <span style={{color:'#dddddd'}}>——</span>,
                  TicketTime: <span style={{color:'#dddddd'}}>——</span>,
                  QuotePrice:<span style={{color:'#dddddd'}}>——</span>,
                ApplyName:<span style={{color:'#dddddd'}}>——</span> 

                }]
        }
      // console.log(columns,'columns');
     
    return(
      <div>
        <Card title="已出票">
          <CommonTable
            columns={arr?columns1:columns}
            dataSource={ticketOutList1}
            rowKey={ticketOutList1.key}
          />
        </Card>
        <Card title="退改机票">
          <CommonTable
            columns={arr1?columns1:columns}
            dataSource={ticketOutList2}
            // rowKey={'SequenceID'}
            rowKey={ticketOutList1.key}
          />
        </Card>
      </div>
      
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { ticketOutList1, ticketOutList2 } = state.travelAgencyPlatformReducer;
  return{ticketOutList1, ticketOutList2}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData(){
      dispatch(actionCreators.getTicketOutList())
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( TicketOut )