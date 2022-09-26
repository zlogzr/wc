import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, Button, Table } from "antd";
import { actionCreators } from "../store";
// import AuthMaintainTable from "../components/authMaintainTable";
import AuthquotTimetible from "../components/authquotTimetible";
import AddAuth from "../components/addAuth";
import NoAuthority from '../../../commonPages/noAuthority/index';
import Upload from '../../../components/upload'

class QuoteTimeMaintain extends Component {

  state = {
    columns: [
      { title: '報價回復時效', dataIndex: 'TypeName', align: 'center' },
      { title: '時間(H)', dataIndex: 'OTime', align: 'center', edit: true, type: 'input' },
      {
        dataIndex: 'Blud', align: 'center', render: (record) => (
          <span style={{ display: 'block', widht: 70, height: 30, cursor: 'pointer', color: '#3690cf' }} onClick={() => this.props.handleShowModalClick(record)}>編輯</span>
        )
      }
    ],
    authModalPageData: [
      { title: '報價回復時效', id: 'TypeName', type: 'input', props: { disabled: false } },
      { title: '時間(H)', id: 'NTime', type: 'number', props: { min: 0, step: 0.5 } },
      { title: '修改理由', id: 'Reason', type: 'textarea', props: { rows: 4 } },
    ],
  }
  componentWillMount() {
    const { columns } = this.state;
    // let len = columns;
  }
  componentDidMount() {
    this.props.getPageData();
  }
  render() {
    let { handleShowModalClick, showModal, rpaData, addAuthOk, handleHideModalClick, quoteTimeData, name, quoteTempData, saveAuth } = this.props;
    let { columns, authModalPageData } = this.state;

    if (quoteTimeData.length === 0) {

      quoteTimeData = [
        {
          key: 1,
          TypeName: '——',
          OTime: '——',
          Blud: '——',
        }]
    }
    return (
      <div>
        {
          !this.props.isAuthority &&
          <NoAuthority />
        }
        {
          this.props.isAuthority &&
          <Card title="報價回復維護">
            {/* 更換 */}
            <AuthquotTimetible
              tableData={quoteTimeData}
              columns={columns}
              saveAuth={saveAuth}
              scroll={{ x: 300 }}
              noFixed={true}
            />
          </Card>
        }
      </div>
    )
  }
  componentWillUnmount() {
    this.props.changeAuth();
  }

}

const mapStateToProps = (state) => {
  const { quoteTimeData, isAuthority, showModal, name, quoteTempData } = state.adminMaintainReducer;
  return {
    quoteTimeData, isAuthority, showModal, name, quoteTempData
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPageData() {
      dispatch(actionCreators.getQuoteTime())
    },
    handleShowModalClick(record) {
      // record.edit = false; //點擊編輯曹成的報錯
      dispatch(actionCreators.showModal())
      dispatch(actionCreators.quoteTimeEdit(record))
    },
    // handleHideModalClick(){
    //   this.refs.abc.resetFields();
    //   dispatch(actionCreators.hideModal())
    // },
    // addAuthOk(values){
    //   dispatch(actionCreators.editQuoteTime(values,this.props.quoteTempData))
    // },
    changeAuth() {
      dispatch(actionCreators.isAuthority(false))
      dispatch(actionCreators.changeBtnState(false))
    },
    // 新增
    saveAuth(row, table) {
      dispatch(actionCreators.editGetNetDatas(row))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuoteTimeMaintain)