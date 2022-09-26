import React, { Component } from 'react';
import { Button, Modal, Form, message } from "antd";
import { connect } from 'react-redux';
import { actionCreators } from "../store";
import Content from "./Content";

import './addnewpepole.less'

class AddNewPeople extends Component {
  render(){
    const { width, handleAddShow, handleAdd, form, showModal, handleHiddenModal } = this.props;
    return(
      <div className='Dependentsinformation' >
       <Button
       className='Dependentsinformationbtn'
        type="primary"
        onClick={handleAddShow.bind(this)}
       >
       新增
       </Button>

        <Modal
          destroyOnClose={true}
          className='Dependentsinformationmodal'
          title={this.props.isEdit ? '编辑' : '新增'}
          visible={showModal}
          onOk={handleAdd.bind(this)}
          onCancel={handleHiddenModal}
          okText="確定"
          cancelText="取消"
          width={width}
        >
          <Content form={form} />
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = ( state ) => {
  const { cardInfo, baseInfo, showModal, isEdit, editData, addCertInfo } = state.personInfoReducer.familyInfoMaintain;
  return { cardInfo, baseInfo, showModal, isEdit, editData, addCertInfo }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleAddShow(){
      this.props.form.resetFields();
      dispatch(actionCreators.addShow());
    },
    handleHiddenModal(){
      dispatch(actionCreators.hiddenModal())
    },
    handleAdd(){
      const { form, cardInfo, baseInfo, isEdit, editData, addCertInfo } = this.props;
      form.validateFields((err, values) => {
        console.log('values=====', values)
        if (!values.relation) {
          message.destroy()
          message.warning('请选择關係')
          return
        }
        if (!values.familyName) {
          message.destroy()
          message.warning('请输入眷屬姓名')
          return
        }
        if (!values.sex) {
          message.destroy()
          message.warning('请选择性别')
          return
        }
        if (!values.BirthDate) {
          message.destroy()
          message.warning('请选择出生日期')
          return
        }
        dispatch(actionCreators.addFamilyInfo(baseInfo, values, cardInfo, isEdit, editData, addCertInfo))
      })
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )(Form.create()(AddNewPeople))