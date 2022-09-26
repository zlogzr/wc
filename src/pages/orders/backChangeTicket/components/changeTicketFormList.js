import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "../../../../components/card";
import { MergeCellsTable } from "../../../../components/table/index";
import { Tag, Checkbox, Button } from "antd";
import { actionCreators } from "../store";

class ChangeTicketFormList extends Component {
  render() {
    const { data1 } = this.props;
    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        align: "center",
        extraRender: (text) => (
          <div style={{ whiteSpace: "nowrap" }}>{text}</div>
        ),
      },
      {
        title: "航程類別",
        dataIndex: "category",
        align: "center",
        width: 80,
      },
      {
        title: "行程",
        dataIndex: "applyName",
        align: "center",
        children: [
          {
            title: "出發機場",
            dataIndex: "fromAirport",
            align: "center",
            width: 140,
          },
          {
            title: "到達機場",
            dataIndex: "arriveAirport",
            align: "center",
            width: 140,
          },
          { title: "航班", dataIndex: "flight", align: "center" },
          {
            title: "出發時間區間",
            dataIndex: "flyDateTo",
            align: "center",
            render: (text, record) => (
              <Tag color="red">
                {text + " " + record.flyStartTime + "~" + record.flyEndTime}
              </Tag>
            ),
          },
          {
            title: "选择",
            width: 50,
            dataIndex: "changeBacks",
            align: "center",
            render: (text, record) => (
              <Checkbox //因為不需要合併單元格，所以不需要寫好的公共的extraRender
                onChange={(e) => this.props.handleReturnBackTickets(e, record)}
              ></Checkbox>
            ),
          },
        ],
      },
      {
        title: "",
        dataIndex: "changeTicket",
        align: "center",
        extraRender: (text, record) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
            }}
          >
            <Button
              style={{
                fontSize: "14px",
                cursor: "pointer",
                backgroundColor: "#00698f",
                color: "#fff",
              }}
              onClick={() => this.props.ReturnhandleChangeTicketClick(record)}
            >
              取消
            </Button>
          </div>
        ),
      },
    ];

    const mergeItems = ["name", "category", "changeTicket"];
    const mergeAllItems = ["changeTicket"]
    return (
      <Card title="待改簽行程" className="flight-info">
        <MergeCellsTable
          data={data1}
          columns={columns}
          rowKey={data1.id}
          mergeItems={mergeItems}
          mergeAllItems={mergeAllItems}
        />
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return;
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleReturnBackTickets(e, record) {
      dispatch(actionCreators.ChangesbackTickets(e.target.checked, record));
    },
    ReturnhandleChangeTicketClick() {
      dispatch(actionCreators.ChangeshandlebackTickets());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeTicketFormList)
