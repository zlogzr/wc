import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd'
import { actionCreators } from '../store'

class ChangeTicketList extends Component {

  componentWillMount() {
    this.props.getChangePageData();
  }
  render() {
    //待報價頁面的表格
    let columns = [{
      title: '單號',
      dataIndex: 'sequenceId',
      align: "center",
      render: (text, record) => <a
        href="javascript:;"
        onClick={() => this.props.handleFormWaitClick(record.serialId, record.formName,record.status)}
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

    let { changeTicketList } = this.props;
    if(changeTicketList.length===0){
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
      changeTicketList=[
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
      <div className="travel-agency-platform">
        <Table
          rowKey='sequenceId'
          columns={columns}
          dataSource={changeTicketList}
          bordered
          pagination={false}
        />

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { changeTicketList } = state.ordersReducer.changeWaitAffirmFormReducer;
  return { changeTicketList }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getChangePageData() {
      dispatch(actionCreators.getChangePageData())
    },
    handleFormWaitClick(serialId, name,status) {
      dispatch(actionCreators.formWaitClick(serialId, name,status))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeTicketList)