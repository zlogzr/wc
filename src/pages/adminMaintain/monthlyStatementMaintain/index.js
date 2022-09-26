import React, { Component } from 'react';
import { connect } from "react-redux"; // eslint-disable-next-line
import { Card, Button,Icon,Col, DatePicker} from "antd";
// import moment from 'moment';
import { actionCreators } from "../store";
import NoAuthority from '../../../commonPages/noAuthority/index';
import Upload from '../../../components/upload';

// @Form.create();
class monthlyStatementMaintain extends Component  {

  state = {
    fileList:[],
    deleteMonthDate:'',
  }


componentDidMount(){
  this.props.getPageData();
}
onChange = (field, value) => {
  
  this.setState({
    [field]: value,
  });
} 

DeleteDateChange = (value) => {
  this.onChange('deleteMonthDate', value);
 
}

render(){
    // const { getFieldDecorator } = this.props.form;
    const { handleUpload,handleConfirmUpload,monthlyFile} = this.props;
    const monthFormat  = 'YYYYMM';

    return (
      <div>
        {
          !this.props.isAuthority && 
          <NoAuthority />
        }
        {
          this.props.isAuthority &&
          <Card title="月結報表">
        <Button type="primary" style={{marginRight:30}} href = 'http://10.66.21.28:81/Sample/template.xls'>
        <Icon type="download" /> 下載模板
        </Button>
        <Upload success={handleUpload}/>         
         {
             this.props.showMonthlyBtn && 
             <Button
             type='primary'
             style={{marginTop:10,marginBottom:10}}
             onClick={() => handleConfirmUpload(monthlyFile)}
          >確定</Button>
           }

         <Col span={5}>
         <DatePicker   picker="month" onChange={this.DeleteDateChange} size="small" format={monthFormat} placeholder="请选择日期"/>
            </Col>
      <Button type="primary" style={{marginRight:30}}>
        <Icon type="delete" />刪除模板
        </Button>

          </Card>



        }
 
      </div>
    )
  }  

}

const mapStateToProps = (state) => {
  const { monthlyStatement ,isAuthority ,showMonthlyBtn ,monthlyFile} = state.adminMaintainReducer;
  return {
    monthlyStatement, isAuthority ,showMonthlyBtn,monthlyFile
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPageData(){
      dispatch(actionCreators.getMonthlyStatement())//暫用公里維護頁面權限 後台沒寫
    },
    handleUpload(file){
      dispatch(actionCreators.saveMonthlyUpLoadFile(file))
    },
    handleConfirmUpload(file){
      dispatch(actionCreators.uploadMonthlyStatementFile(file))
    },

    handleShowModalClick(){
      this.refs.abc.resetFields();
      dispatch(actionCreators.showModal())
    },
    handleHideModalClick(){
      dispatch(actionCreators.hideModal())
    },
   
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(monthlyStatementMaintain)