import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FormInfo from "../components/formInfo";
import Card from "../../../components/card";
import { actionCreators } from "../store";
import { getUrlParam } from "../../../utils";
import { Tag, Button, Icon, Modal } from "antd";
import { MergeCellsTable } from "../../../components/table";
import Upload from "../../../components/upload";
import CertInfos from "./cardinfo";

import "./index.less";
class WaitForTicketDetail extends Component {
  getData = (id, data) => {
    for (let v of data) {
      if (v.SerialID === id) {
        return v;
      }
    }
    return null;
  };

  state = {
    modiovde: false,
    uploadFile: null,
  };

  formData = {};
  componentDidMount() {
    const formid = getUrlParam(this.props.location.search, "formId");
    const formData = this.getData(formid, this.props.waitForTicketList);
    this.props.getWaitForTicketDetail(formData, this.props.history);
    this.formData = formData;
  }
  // 打開彈窗提示
  handleCancellogin = () => {
    this.setState({ modiovde: true });
  };
  // 關閉彈窗提示
  handleCancel = () => {
    this.setState({ modiovde: false });
  };
  // 获取上传文件
  handleUploadFile = (file) => {
    this.setState({ uploadFile: file });
  };

  render() {
    const columns = [
      //   {
      //   title: '工號',
      //   dataIndex: 'empno',
      //   align:"center",
      // },
      {
        title: "姓名",
        dataIndex: "name",
        align: "center",
      },
      {
        title: "性別",
        dataIndex: "gender",
        align: "center",
      },
      {
        title: "航程類別",
        dataIndex: "category",
        align: "center",
      },
      {
        title: "行程",
        align: "center",
        children: [
          { title: "起飛時間", dataIndex: "timeStart", align: "center" },
          { title: "出發機場", dataIndex: "fromAirport", align: "center" },
          { title: "到達機場", dataIndex: "arriveAirport", align: "center" },
          { title: "航班", dataIndex: "flightNo", align: "center" },
          {
            title: "金額",
            dataIndex: "money",
            align: "center",
            render: (text) => (
              <Tag color="red">
                {`￥ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Tag>
            ),
          },
        ],
      },
    ];
    const {
      waitForTicketList,
      waitForTicketDetailFlight,
      uploadFile,
      handleWaitForTicketOk,
      history,
      waitForTicketForm,
      handleWaitForTicketGiveUp,
      CertInfo,
      submit_loading,
    } = this.props;
    const { modiovde } = this.state;
    const mergeItems = ["empno", "name", "gender", "category"];
    return (
      <div>
        <FormInfo data={waitForTicketForm} />
        <CertInfos CertInfo={CertInfo} />
        <Card title="明細" className="card">
          <Button
            className="retubtn"
            onClick={() => {
              window.history.go(-1);
            }}
            size="small"
            style={{ width: 70, height: 30 }}
          >
            返回
          </Button>
          <MergeCellsTable
            data={waitForTicketDetailFlight}
            columns={columns}
            rowKey={waitForTicketDetailFlight.key}
            mergeItems={mergeItems}
          />
          <div style={{ marginTop: 30 }}>
            <span style={{ color: "red" }}>*</span> 上傳行程單: &nbsp; &nbsp;
            &nbsp;
            <Upload success={this.handleUploadFile} />
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              style={{ marginRight: 30, width: "100px" }}
              type="primary"
              onClick={this.handleCancellogin}
            >
              確定
            </Button>

            <Button
              type="primary"
              style={{ marginRight: 30, width: "100px" }}
              loading={submit_loading}
              onClick={() => handleWaitForTicketGiveUp(this.formData, history)}
            >
              放棄出票
            </Button>
          </div>
        </Card>
        <Modal
          className="Madovinfopino"
          title="機票及證件信息"
          visible={modiovde}
          // onOk={() => signFormSubmitdqh(form, formId)}
          confirmLoading={submit_loading}
          onOk={() =>
            handleWaitForTicketOk(this.formData, this.state.uploadFile, history)
          }
          onCancel={this.handleCancel}
        >
          <p>請確認機票預訂姓名、證件信息是否與證件上信息一致</p>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    waitForTicketList,
    waitForTicketDetailFlight,
    waitForTicketForm,
    CertInfo,
    submit_loading,
  } = state.travelAgencyPlatformReducer;
  return {
    waitForTicketList,
    waitForTicketDetailFlight,
    waitForTicketForm,
    CertInfo,
    submit_loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWaitForTicketDetail(formData, history) {
      dispatch(actionCreators.getWaitForTicketDetail(formData, history));
    },
    handleWaitForTicketOk(form, file, history) {
      dispatch(actionCreators.waitForTicketOk(form, file, history));
    },
    handleWaitForTicketGiveUp(form, history) {
      dispatch(actionCreators.waitForTicketGiveUp(form, history));
    },
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WaitForTicketDetail)
);
