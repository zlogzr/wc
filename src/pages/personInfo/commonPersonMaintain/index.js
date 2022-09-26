import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Card, Divider, Popconfirm, Table } from "antd";
import AddNewPeople from "./components/addNewPeople";



import './index.less'

class FamilyInfoMaintain extends Component {

componentDidMount(){
  this.props.getPageData()
}
  render(){
    let { personData, deleteFamilyInfo, baseInfo, handleEdit } = this.props;
    // console.log(personData,'2222');
    let columns1 = [
      {title: '姓名', dataIndex: 'LinkChName'},
      {title: '國籍', dataIndex: 'Country'},
      {title: '證件類型', dataIndex: 'CertType'},
      {title: '證件號碼', dataIndex: 'CertNO'},
      {
        title: '簽注有效期',
        dataIndex: 'SignValidTime',
        align:"center",
        render: text => text? <span>{text}</span> : <span style={{color: '#ddd'}}>———</span>
      }, 
      {
        title: '入臺許可證有效期',
        dataIndex: 'TaiwanVaidTime',
        align:"center",
        render: text => text? <span>{text}</span> : <span style={{color: '#ddd'}}>———</span>
      }, 
      {
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
    if(personData.length===0){
      columns1 = [
        {title: '姓名', dataIndex: 'LinkChName'},
        {title: '國籍', dataIndex: 'Country'},
        {title: '證件類型', dataIndex: 'CertType'},
        {title: '證件號碼', dataIndex: 'CertNO'},
        {
          title: '簽注有效期',
          dataIndex: 'SignValidTime',
          align:"center",
          render: text => text? <span>{text}</span> : <span style={{color: '#ddd'}}>———</span>
        }, 
        {
          title: '入臺許可證有效期',
          dataIndex: 'TaiwanVaidTime',
          align:"center",
          render: text => text? <span>{text}</span> : <span style={{color: '#ddd'}}>———</span>
        }, 
        {
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
      ];
      personData=[
        {
          key: 1,
          LinkChName: '——',
          Country: '——',
          CertType: '——',
          CertNO: '——',
          SignValidTime:'——' ,
          TaiwanVaidTime:'——'
        }]
    }
    return(
      <Card className="family-info-maintain" title="常用联系人信息" className='Frequentlyusedcontact-information'>
        <AddNewPeople
          width={900}
        />
        <br/>
        <Table
          dataSource={personData}
          columns={columns1}
          rowKey='k'
          bordered
          pagination={false}
        />
      </Card>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { personData, baseInfo } = state.personInfoReducer.commonPeopleMaintain;
  return{personData, baseInfo}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData(){
      dispatch(actionCreators.getPageData())
    },
    deleteFamilyInfo(baseInfo, data){
      // console.log(baseInfo, data,'baseInfo, data 成功的');
      dispatch(actionCreators.deleteFamilyInfo(baseInfo, data))
    },
    handleEdit(data){
      // console.log(data,'编辑data');
      dispatch(actionCreators.edit(data))
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( FamilyInfoMaintain )