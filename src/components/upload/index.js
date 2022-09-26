import React, { Component } from "react";
import { Upload, Button, Icon, message, Modal } from "antd";

import "./index.less";

class EfUpload extends Component {
  state = {
    fileList: [],
    visible: false,
    flag: false,
    filename: "",
  };

  // modal=()=>{
  //   return <div>

  //   </div>
  // }

  /**
   * 上傳文件
   */
  onUpload = (file) => {
    this.setState({
      filename: file.name,
    });
    this.setState(
      {
        fileList: [file],
      },
      () => {
        const formData = new FormData();
        formData.append("file", file);
        this.props.success(file);
      }
    );
    return false;
  };

  onPreview = (file) => {
    if (window.FileReader) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      //监听文件读取结束后事件
      reader.onloadend = function(e) {
        const a = document.createElement("a"); // 创建a标签
        a.setAttribute("download", file.name); // download属性
        a.setAttribute("href", e.target.result); // href链接
        a.click();
        if (e.target.result) {
          message.info("文件下载成功");
        }
      };
    }
  };

  /**
   * 移除文件   size="large"
   */
  onRemove = (file) => {
    this.setState((state) => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
  };

  handleOk = () => {
    this.setState({
      flag: true,
    });
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { fileList } = this.state;
    const uploadProps = {
      name: "file",
      headers: {
        authorization: "authorization-text",
      },
      onPreview: this.onPreview,

      onRemove: this.onRemove,
      beforeUpload: this.onUpload,
      fileList,
    };
    return (
      <span className="uploaddesong">
        <Upload {...uploadProps}>
          <Button className="Km-maintenance-upload" type="primary">
            <Icon type="upload" /> 點擊上傳
          </Button>
        </Upload>
        <Modal
          className="filename"
          title="打開郵件附件"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p className="tite">請只打開來自可靠源的附件</p>
          <p className="filess">
            <span>附件:</span>&nbsp;&nbsp;{this.state.filename}
          </p>

          <p> {this.state.flag}</p>
        </Modal>
      </span>
    );
  }
}

export default EfUpload;
