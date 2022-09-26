import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, Tag, Checkbox } from "antd";
import { actionCreators } from "../store";
import Card from "../../../../components/card";
import { MergeCellsTable } from "../../../../components/table/index";
import ChangeBackModal from "../components/changeBackModal";

class BackChangeApplyForm extends Component {
  render() {
    const mergeItems = ["name", "category", "changeTicket"];
    // 需要merge成一行的列
    const mergeAllItems = ["changeTicket"];
    const { data, showModal, hiddenModal, ticketOutForm } = this.props;

    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        align: "center",
        wdith: 60,
        style: { whiteSpace: "nowrap" },
        extraRender: (text) => (
          <div style={{ whiteSpace: "nowrap" }}>{text}</div>
        ),
      },
      //  {
      //   title: '工號',
      //   dataIndex: 'empno',
      //   align: "center",
      // },
      {
        title: "航程類別",
        dataIndex: "category",
        align: "center",
        width: 80,
        extraRender: (text) => (
          <div style={{ whiteSpace: "nowrap" }}>{text}</div>
        ),
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
            width: 110,
          },
          {
            title: "到達機場",
            dataIndex: "arriveAirport",
            align: "center",
            width: 110,
          },
          { title: "航班", dataIndex: "flight", align: "center" },
          {
            title: "起飛時間",
            dataIndex: "flyDate",
            align: "center",
            width: 150,
          },
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
          {
            title: "选择",
            dataIndex: "changeBacks",
            align: "center",
            width: 50,
            render: (text, record) => (
              <Checkbox // 因為不需要合併單元格，所以不需要寫好的公共的extraRender
                onChange={(e) => this.props.handleChangeBackTickets(e, record)}
              ></Checkbox>
            ),
          },
        ],
      },
      {
        title: "",
        dataIndex: "changeTicket",
        align: "center",
        width: 80,
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
                marginBottom: "20px",
                backgroundColor: "#00698f",
                color: "#fff",
              }}
              onClick={() => this.props.handleChangeBackTicket(record)}
            >
              退票
            </Button>
            <Button
              style={{
                fontSize: "14px",
                cursor: "pointer",
                backgroundColor: "#00698f",
                color: "#fff",
              }}
              onClick={() =>
                this.props.handleChangeTicketClick(
                  record,
                  this.props.ticketOutForm
                )
              }
            >
              改簽
            </Button>
          </div>
        ),
      },
    ];

    return (
      <Card title="原行程" className="flight-info">
        <MergeCellsTable
          data={data}
          columns={columns}
          mergeItems={mergeItems}
          mergeAllItems={mergeAllItems}
          // scroll={{ x: 1300 }}
        />
        <Modal //退票改簽點擊的模態框
          title="改簽窗口"
          visible={showModal} //對話框是否可見
          width={1200}
          onCancel={hiddenModal}
          footer={null}
        >
          <ChangeBackModal data={data} hiddenModal={hiddenModal} />
        </Modal>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    showModal,
    ticketOutForm,
  } = state.ordersReducer.backChangeTicketReducer;
  // console.log(ticketOutForm)
  return { showModal, ticketOutForm };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeTicketClick(record, allTickets) {
      //allTickets是獲取單程多程往返的所有數據 //改签
      dispatch(actionCreators.changeTicketClick(record, allTickets));
      // dispatch(actionCreators.backTicketss())//根據checked判斷是否選中当前票
    },
    hiddenModal() {
      dispatch(actionCreators.hiddenModal());
    },
    handleChangeBackTicket(e, record) {
      //record代表獲取一整行的數據  //退票
      dispatch(actionCreators.backTickets()); //根據checked判斷是否選中退票
    },
    handleChangeBackTickets(e, record) {
      //record代表獲取一整行的數據,点击选择框 //改签
      // debugger
      console.log('e.target.checked, record===', e.target.checked, record);
      dispatch(actionCreators.backTicketss(e.target.checked, record)); //根據checked判斷是否選中当前票
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackChangeApplyForm);
