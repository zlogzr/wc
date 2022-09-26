import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { Tag, Button } from "antd";
import FormInfo from "../components/formInfo2";
import { actionCreators } from "../store";
import { getUrlParam } from "../../../utils";
import { MergeCellsTable } from "../../../components/table";
import Card from "../../../components/card";
import Upload from "../../../components/upload";
import { LOGIN } from "../../../config/api";

import { baseURL } from "../../../axios/baseURL";

import "./index.less";

class WaitBackTicketDetail extends Component {
  id = 1;
  componentDidMount() {
    const serialid = getUrlParam(this.props.location.search, "formId");
    this.id = getUrlParam(this.props.location.search, "id");
    this.props.getWaitBackTicketDetail(serialid, this.id);
  }
  render() {
    const {
      waitBackChangeTicketForm,
      waitBackChangeTicketFlight,
      uploadSuccess,
      isWaitBackTicket,
      waitChangeTicketNewFlight,
      waitBackChangeSubmit,
      returnchangetickect,
      submit_loading,
    } = this.props;

    const title1 = isWaitBackTicket ? "退票費" : "改簽費";
    const columns = [
      // {title: '工號',dataIndex: 'empno',align:"center",  },
      { title: "姓名", dataIndex: "name", align: "center" },
      { title: "性別", dataIndex: "gender", align: "center" },
      { title: "航程類別", dataIndex: "category", align: "center" },
      {
        title: "行程",
        dataIndex: "categorysss",
        align: "center",
        children: [
          { title: "起飛時間", dataIndex: "timeStart", align: "center" },
          { title: "出發機場", dataIndex: "fromAirport", align: "center" },
          { title: "到達機場", dataIndex: "arriveAirport", align: "center" },
          { title: "航班", dataIndex: "flightNo", align: "center" },
          {
            title: title1,
            dataIndex: "money",
            align: "center",
            render: (text) => <Tag color="red">{`￥ ${text}`}</Tag>,
          },
        ],
      },
    ];

    const columnss = [
      // {title: '工號',dataIndex: 'empno',align:"center",  },
      { title: "姓名", dataIndex: "name", align: "center" },
      { title: "性別", dataIndex: "gender", align: "center" },
      { title: "航程類別", dataIndex: "category", align: "center" },
      {
        title: "行程",
        dataIndex: "categorysss",
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
            render: (text) => <Tag color="red">{`￥ ${text}`}</Tag>,
          },
        ],
      },
    ];

    const columnsss = [
      // {title: '工號',dataIndex: 'empno',align:"center",  },
      { title: "姓名", dataIndex: "name", align: "center" },
      { title: "性別", dataIndex: "gender", align: "center" },
      { title: "航程類別", dataIndex: "category", align: "center" },
      {
        title: "行程",
        dataIndex: "categorysss",
        align: "center",
        children: [
          { title: "起飛時間", dataIndex: "timeStart", align: "center" },
          { title: "出發機場", dataIndex: "fromAirport", align: "center" },
          { title: "到達機場", dataIndex: "arriveAirport", align: "center" },
          { title: "航班", dataIndex: "flightNo", align: "center" },
          {
            title: "退票費",
            dataIndex: "money",
            align: "center",
            render: (text) => <Tag color="red">{`￥ ${text}`}</Tag>,
          },
        ],
      },
    ];
    const mergeItems = ["gender", "name", "category"];
    const title = isWaitBackTicket ? "待退票明細" : "原出票明細";

    return (
      <div>
        <FormInfo data={waitBackChangeTicketForm[0]} />

        <Card title={title} className="card">
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
            formone={true}
            data={waitBackChangeTicketFlight}
            columns={title === "待退票明細" ? columnsss : columnss}
            rowKey={waitBackChangeTicketFlight.key}
            mergeItems={mergeItems}
          />
          <p
            style={{ marginTop: "10px", marginBottom: "0px" }}
            className="updeloed"
          >
            {returnchangetickect ? <span>原行程單:</span> : ""}
            {returnchangetickect ? (
              <a
                download="'+fileName+'"
                href={
                  baseURL +
                  `/maintain/OpenExcel?path=${returnchangetickect.FilePath}&name=${returnchangetickect.OFileName}`
                }
              >
                <span className="updolueds">
                  {" "}
                  {returnchangetickect.OFileName}{" "}
                </span>{" "}
              </a>
            ) : (
              ""
            )}
          </p>
        </Card>
        {!isWaitBackTicket && (
          <Card title="改簽報價明細">
            <MergeCellsTable
              formone={true}
              data={waitChangeTicketNewFlight}
              columns={columns}
              rowKey={waitChangeTicketNewFlight.key}
              mergeItems={mergeItems}
            />
          </Card>
        )}

        <div className="upload-file">
          憑證:&nbsp;
          <Upload success={uploadSuccess} />
        </div>
        <div className="submit-btn">
          <Button
            type="primary"
            loading={submit_loading}
            onClick={waitBackChangeSubmit.bind(this, this.id)}
            style={{ width: "100px" }}
          >
            确定
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    waitBackChangeTicketForm,
    waitBackChangeTicketFlight,
    isWaitBackTicket,
    waitChangeTicketNewFlight,
    returnchangetickect,
    submit_loading,
  } = state.travelAgencyPlatformReducer;
  return {
    waitBackChangeTicketForm,
    waitBackChangeTicketFlight,
    isWaitBackTicket,
    waitChangeTicketNewFlight,
    returnchangetickect,
    submit_loading
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getWaitBackTicketDetail(serialid, id) {
      dispatch(actionCreators.getWaitBackTicketDetail(serialid, id));
    },
    uploadSuccess(file) {
      // debugger
      dispatch(actionCreators.waitBackChangeUpload(file));
    },
    waitBackChangeSubmit(id) {
      dispatch(actionCreators.waitBackChangeSubmit(this.props.history, id));
    },
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(WaitBackTicketDetail);
