import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Tag,Popconfirm } from "antd";

import { actionCreators } from "../store";

class SignFormLists extends Component {
   
  // handleCancel = (data) => {
  //   debugger
  //   const yesorNo = 'N'
  //     const serialId = data
      
    

  //     // console.log('data:' + data);
  //     this.props.handleConfirmModalClick(serialId,yesorNo)

  //   };
  //   confirm =(data) =>{
  //     debugger
  //     const yesorNo = 'Y'
  //     const serialId = data
  //     // console.log('data:' + data);
  //     this.props.handleConfirmModalClick(serialId,yesorNo)
  //   }

  render(){
    let columns = [{
      title: '單號',
      dataIndex: 'formId',
      align:"center",
      render: (text, record,) => (
        <Link 
        to={{pathname: '/sign/detail', 
          search: `?formId=${record.serialId}&formName=${record.formName}&id=${this.props.page}`}}
        >
          {text}
        </Link>
      )
    }, {
      title: '表單名稱',
      dataIndex: 'formName',
      align:"center"
    }, {
      title: '填單日期',
      dataIndex: 'fillDate',
      align:"center"
    }, {
      title: '填單人',
      dataIndex: 'applyName',
      align:"center"
    }, {
      title: '目前狀態',
      dataIndex: 'status',
      align:"center",
      // render: text => <Tag color="blue">{text}</Tag>
      // 9.16wks修改
      render: (_,record) =>{
        // console.log(record,'recordrecord');

      return  <Tag color="blue">{record.status}</Tag>

        // if(this.props.page !== '3'){
        //   return <Tag color="blue">{record.status}</Tag>
        // }else{
        //   return <Popconfirm
        //     // visible={visible}
        //     icon=''
        //     okText='確定'
        //     cancelText='駁回'
        //     onCancel={() => this.handleCancel(record.serialId)}
        //     onConfirm={() => this.confirm(record.serialId)}
        //     // okButtonProps={{ loading: confirmLoading }}
        //   >
        //     <Tag color="red" >{record.status}</Tag>
        //   </Popconfirm>
        // }
      }
    }]
      //  console.log(this.props.header,'--------'   待確認表單);

    let { signFormListData } = this.props;
    // console.log(signFormListData,'signFormListData','1111111');


    // 当为待确认表单页面时,去重
    if(this.props.header==='待確認表單'){
        
       signFormListData = signFormListData.filter((element,index,self)=>{
        return self.findIndex(x=>x.formId===element.formId) === index
        })

      // console.log(signFormListData,'signFormListData','22222');
    }



    if(signFormListData.length===0){
      columns = [{
        title: '單號',
        dataIndex: 'formId',
        align:"center",
        
      }, {
        title: '表單名稱',
        dataIndex: 'formName',
        align:"center"
      }, {
        title: '填單日期',
        dataIndex: 'fillDate',
        align:"center"
      }, {
        title: '填單人',
        dataIndex: 'applyName',
        align:"center"
      }, {
        title: '目前狀態',
        dataIndex: 'status',
        align:"center",
      }]
      
      signFormListData=[
        {
          key: 1,
          formId: '——',
          formName: '——',
          fillDate: '——',
          applyName: '——',
          status:'——' 
        }]
        
        // console.log(signFormListData,'signFormListData');
    }
    return(
      <Table 
      columns={columns}
      dataSource={signFormListData}
      pagination={{hideOnSinglePage: true}}
      // pagination={ true}
      bordered={true} 
      // rowKey={'formId'}
      rowKey={signFormListData.key}
      size="middle"
      />
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { signFormListData, page } = state.signReducer.applyTicketSignReducer;
  return{
    signFormListData, page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleConfirmModalClick(serialId,yesorNo){
      dispatch(actionCreators.ConfirmClick(serialId,yesorNo))
    },
   
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( SignFormLists )