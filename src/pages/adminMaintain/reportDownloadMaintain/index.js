import React, { Component } from 'react';
import { connect } from "react-redux"; // eslint-disable-next-line
import { Card, Button,Upload,Icon} from "antd";
import { actionCreators } from "../store";
// import AuthMaintainTable from "../components/authMaintainTable";
// import AddAuth from "../components/addAuth";
import NoAuthority from '../../../commonPages/noAuthority/index';

class ReportDownloadMaintain extends Component  {

  state = {
    fileList:[]
  }
/**
   * 上傳文件
   */
 onUpload = file => {
  this.setState({
    fileList: [file],
  }, () => {
    const formData = new FormData();
    formData.append('file', file);
    this.props.success(file);
  });
  return false;
}

/**
   * 移除文件   size="large"
   */
 onRemove = file => {
  this.setState((state) => {
    const index = state.fileList.indexOf(file);
    const newFileList = state.fileList.slice();
    newFileList.splice(index, 1);
    return {
      fileList: newFileList,
    };
  });
}


componentDidMount(){
  this.props.getPageData();
}
  
  render(){
    const { fileList } = this.state;
    const uploadProps = {
      name: 'file',
      headers: {
        authorization: 'authorization-text',
      },
      onRemove: this.onRemove,
      beforeUpload: this.onUpload,
      fileList
    }


    return (
      <div>
        {
          !this.props.isAuthority && 
          <NoAuthority />
        }
        {
          this.props.isAuthority &&
          <Card title="扣工資報表">
            <Upload {...uploadProps}>
        <Button  type="primary">
          <Icon type="upload" /> 點擊上傳
        </Button>
      </Upload>
          </Card>
        }
 
      </div>
    )
  }  

}

const mapStateToProps = (state) => {
  const { reportDownData ,isAuthority ,showModal } = state.adminMaintainReducer;
  return {
    reportDownData, isAuthority ,showModal
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPageData(){
      dispatch(actionCreators.getReportDown())//暫用公里維護頁面權限 後台沒寫
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
export default connect(mapStateToProps, mapDispatchToProps)(ReportDownloadMaintain)