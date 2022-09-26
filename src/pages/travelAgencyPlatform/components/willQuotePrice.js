import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../../../components/card";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { MergeCellsTable } from "../../../components/table";
import QuoteStart from "./quoteStart";
import { Tag, Button } from "antd";
import { getUrlParam } from "../../../utils";

import { baseURL } from "../../../axios/baseURL";

// 引入當前樣式,修改返回上一頁接口
import "./willQuoteprice.less";

const WillQuotePrice = ({
  data,
  handleQuotePriceClick,
  backChange,
  category,
  location,
  tickect,
}) => {
  // console.log(data,data.key,'waitBackChangeTicketFlight');

  const columns = [
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
      dataIndex: "applyName",
      align: "center",
      children:
        category !== "backChangeTicketQuote"
          ? [
              {
                title: "出發時間區間",
                dataIndex: "dateSection",
                align: "center",
              },
              { title: "出發機場", dataIndex: "fromAirport", align: "center" },
              {
                title: "到達機場",
                dataIndex: "arriveAirport",
                align: "center",
              },
              {
                title: "金額",
                dataIndex: "money",
                align: "center",
                render: (text) => (
                  <Tag color="red">{text === 0 ? "" : text}</Tag>
                ),
              },
            ]
          : [
              { title: "起飛時間", dataIndex: "timeStart", align: "center" },
              { title: "出發機場", dataIndex: "fromAirport", align: "center" },
              {
                title: "到達機場",
                dataIndex: "arriveAirport",
                align: "center",
              },
            ],
    },
    {
      dataIndex: "price",
      extraRender: (text, record) => (
        <a
          href="javascript:;"
          onClick={() => {
            const serialId = getUrlParam(location.search, "formId");
            handleQuotePriceClick(record, serialId, category);
          }}
        >
          報價
        </a>
      ),
    },
  ];
  //  console.log(tickect);
  const mergeItems = ["gender", "name", "category", "price"];
  const status = sessionStorage.getItem("statuss");
  let title = "";
  status === "Return"
    ? (title = "退票報價")
    : status === "Change"
    ? (title = "改簽報價")
    : (title = "報價");
  return (
    <Card title={title} className="card">
      <Button
        className="retubtn"
        onClick={() => {
          window.history.go(-1);
          window.sessionStorage.removeItem("statuss");
        }}
        size="small"
        style={{ width: 70, height: 30 }}
      >
        返回
      </Button>
      <MergeCellsTable
        data={data}
        columns={columns}
        rowKey={data.key}
        mergeItems={mergeItems}
      />
      {title !== "報價" ? (
        <p
          style={{ marginTop: "10px", marginBottom: "0px" }}
          className="updeloed"
        >
          {tickect ? <span>原行程單:</span> : ""}
          {tickect ? (
            <a
              download="'+fileName+'"
              href={
                baseURL +
                `/maintain/OpenExcel?path=${tickect.FilePath}&name=${tickect.OFileName}`
              }
            >
              <span className="updolueds"> {tickect.OFileName} </span>{" "}
            </a>
          ) : (
            ""
          )}
        </p>
      ) : (
        ""
      )}
      <QuoteStart />
    </Card>
  );
};

const mapStateToProps = (state) => {
  const {
    quotePrice,
    flight,
    backChange,
    quoteTime,
    tickect,
  } = state.travelAgencyPlatformReducer;
  // console.log(state.travelAgencyPlatformReducer,'state.travelAgencyPlatformReducer');
  return {
    quotePrice,
    flight,
    backChange,
    quoteTime,
    tickect,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleQuotePriceClick(formData, serialId, category, quoteTime) {
      window.sessionStorage.setItem("empno", formData.empno);
      console.log('formData, serialId, category, quoteTime=====', formData, serialId, category, quoteTime);
      // 點擊報價
      // console.log(formData, serialId, category,quoteTime,'formData, serialId,a, category,quoteTime 點擊報價');
      if (category !== "backChangeTicketQuote") {
        dispatch(actionCreators.quotePriceClick(formData, serialId, quoteTime));
      }
      if (category === "backChangeTicketQuote") {
        dispatch(actionCreators.backChangeTicketQuote(formData, serialId));
      }
    },
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WillQuotePrice)
);
