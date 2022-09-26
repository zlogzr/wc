import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Card, Divider, Popconfirm, Table,message } from "antd";
import AddNewPeople from "./components/addNewPeople";
// import store from './store'
import './index.less'


class HomepageNewsManagement extends Component {

componentDidMount(){
    this.props.getPageData()
}
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
   
    return(
      <Card 
      className="family-info-maintain" title="首頁新聞維護" className='Frequentlyusedcontact-information'>
        <AddNewPeople
          width={700}
        />
        <br/>
        <Table
          dataSource={personData}
          columns={columns1}
          rowKey='k'
          bordered
          pagination={true}
        />
      </Card>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { personData, baseInfo } = state.adminMaintainReducer2.homepageNewsManagementReducer;
  return {personData, baseInfo}  
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData(){
      dispatch(actionCreators.getPageData())
    },
    deleteFamilyInfo(baseInfo, data){
     
      dispatch(actionCreators.deleteFamilyInfo(baseInfo, data))
    },
    handleEdit(data){
      
      dispatch(actionCreators.edit(data))
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( HomepageNewsManagement )