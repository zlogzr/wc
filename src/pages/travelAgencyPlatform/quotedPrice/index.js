import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { actionCreators } from "../store";
import { Card } from "antd";
import { CommonTable } from "../../../components/table";
import { formatDate } from '../../../utils/'

class QuotePriceComplete extends Component {
 
  componentDidMount(){
    this.props.getPageData()
  }
  render(){
    let { quoteCompleteList } =  this.props;
    for(let i = 0 ,len=quoteCompleteList.length;i< len;i++){
      quoteCompleteList[i].ApplyDatetime = formatDate(quoteCompleteList[i].ApplyDatetime,'-',true);
      quoteCompleteList[i].QuoteTime = formatDate(quoteCompleteList[i].QuoteTime,'-',true);
    }
    let columns = [
      { title: '單號', dataIndex: 'SequenceID',}, 
      { title: '表單名稱', dataIndex: 'Name',}, 
      { title: '填單日期', dataIndex: 'ApplyDatetime',},
      { title: '報價截止時間', dataIndex: 'QuoteTime', },
      { title: '目前狀態', dataIndex: 'Status', },
      { title: '填單人', dataIndex: 'ApplyName', },
      { dataIndex: 'QuotePrice',
        render: (text, record) => (
        <Link 
        to={{pathname: '/travel-agency/quote-price-complete/detail', 
          search: `?formId=${record.SerialID}`,
          state: {quoteTime: record.QuoteTime}}
           }
        >查看報價</Link>
       )
     }
    ];
    if(quoteCompleteList.length===0){
      columns = [
        { title: '單號', dataIndex: 'SequenceID',}, 
        { title: '表單名稱', dataIndex: 'Name',}, 
        { title: '填單日期', dataIndex: 'ApplyDatetime',},
        { title: '報價截止時間', dataIndex: 'QuoteTime', },
        { title: '目前狀態', dataIndex: 'Status', },
        { title: '填單人', dataIndex: 'ApplyName', },
        { dataIndex: 'QuotePrice'}
      ];
      quoteCompleteList=[
        {
          key: 1,
          SequenceID: <span style={{color:'#dddddd'}}>——</span>,
          Name: <span style={{color:'#dddddd'}}>——</span>,
          ApplyDatetime: <span style={{color:'#dddddd'}}>——</span>,
          QuoteTime: <span style={{color:'#dddddd'}}>——</span>,
          Status:<span style={{color:'#dddddd'}}>——</span> ,
          QuotePrice:<span style={{color:'#dddddd'}}>——</span>,
          ApplyName:<span style={{color:'#dddddd'}}>——</span>
        }]
    }
    return(
      <Card title="已報價">
        <CommonTable 
         columns={columns}
         dataSource={quoteCompleteList}
         rowKey={'SequenceID'}
         size="big"
        />
      </Card>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { quoteCompleteList } = state.travelAgencyPlatformReducer;
  return{quoteCompleteList}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData(){
      dispatch(actionCreators.getCompletePageData())
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( QuotePriceComplete )