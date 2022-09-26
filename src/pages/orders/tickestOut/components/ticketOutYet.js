import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import Card from '../../../../components/card'
import { actionCreators } from '../store'

class TicketOutYet extends Component {

  componentWillMount() {
    this.props.getsPageData();
  }
  render() {
    //待報價頁面的表格
    let columns = [{
      title: '單號',
      dataIndex: 'sequenceId',
      align: "center",
      render: (text, record) => <a
        href="javascript:;"
        onClick={() => this.props.handleFormClick(record)}
      >{text}</a>

    }, {
      title: '表單名稱',
      dataIndex: 'fillFormName',
      align: "center"

    }, {
      title: '申請人',
      dataIndex: 'applyPerson',
      align: "center"

    }, {
      title: '填單日期',
      dataIndex: 'fillInDate',
      align: "center"
    }, {
      title: '目前狀態',
      dataIndex: 'status',
      align: "center"

    }, {
      title: '出票旅行社',
      dataIndex: 'travelAgency',
      align: "center"

    }];

    let columns1 = [{
      title: '單號',
      dataIndex: 'sequenceId',
      align: "center",
      render: (text, record) => <a
        href="javascript:;"
        onClick={() => this.props.handleFormClick(record)}
      >{text}</a>

    }, {
      title: '表單名稱',
      dataIndex: 'fillFormName',
      align: "center"

    }, {
      title: '申請人',
      dataIndex: 'applyPerson',
      align: "center"

    }, {
      title: '填單日期',
      dataIndex: 'fillInDate',
      align: "center"
    }, {
      title: '目前狀態',
      dataIndex: 'status',
      align: "center"

    }, {
      title: '出票旅行社',
      dataIndex: 'travelAgency',
      align: "center"

    }];

    let { ticketOutFormListData, changeTicketOutFormListData } = this.props;
    
    
    if(ticketOutFormListData.length===0){
      columns = [{
        title: '單號',
        dataIndex: 'sequenceId',
        align: "center",
       
      }, {
        title: '表單名稱',
        dataIndex: 'fillFormName',
        align: "center"
  
      }, {
        title: '申請人',
        dataIndex: 'applyPerson',
        align: "center"
  
      }, {
        title: '填單日期',
        dataIndex: 'fillInDate',
        align: "center"
      }, {
        title: '目前狀態',
        dataIndex: 'status',
        align: "center"
  
      }, {
        title: '出票旅行社',
        dataIndex: 'travelAgency',
        align: "center"
      }];
      ticketOutFormListData=[
        {
          key: 1,
          sequenceId: '——',
          fillFormName: '——',
          applyPerson: '——',
          fillInDate: '——',
          status:'——' ,
          travelAgency:'——'
        }]
    }
    if(changeTicketOutFormListData.length===0){
      let columns1 = [{
        title: '單號',
        dataIndex: 'sequenceId',
        align: "center",
      }, {
        title: '表單名稱',
        dataIndex: 'fillFormName',
        align: "center"
  
      }, {
        title: '申請人',
        dataIndex: 'applyPerson',
        align: "center"
  
      }, {
        title: '填單日期',
        dataIndex: 'fillInDate',
        align: "center"
      }, {
        title: '目前狀態',
        dataIndex: 'status',
        align: "center"
  
      }, {
        title: '出票旅行社',
        dataIndex: 'travelAgency',
        align: "center"
  
      }];
      changeTicketOutFormListData=[
        {
          key: 1,
          sequenceId: '——',
          fillFormName: '——',
          applyPerson: '——',
          fillInDate: '——',
          status:'——' ,
          travelAgency:'——'
        }]
    }
    return (
      <div className="orders">
        <Card title='正常已出票單據' >
          <Table
            rowKey='sequenceId'
            columns={columns}
            dataSource={ticketOutFormListData}
            bordered
            pagination={true} />
        </Card>
        <Card title='退改簽已出票單據' className='form-title'>
          <Table
            rowKey='sequenceId'
            columns={columns1}
            dataSource={changeTicketOutFormListData}
            bordered
            pagination={true} />
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { ticketOutFormListData, changeTicketOutFormListData } = state.ordersReducer.ticketsOutReducer;
  return { ticketOutFormListData, changeTicketOutFormListData }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getsPageData() {
      dispatch(actionCreators.getPageData())
    },
    handleFormClick(record) {
      dispatch(actionCreators.formClick(record))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TicketOutYet)