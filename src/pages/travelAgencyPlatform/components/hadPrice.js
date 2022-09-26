import React from "react";
import Card from "../../../components/card";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { MergeCellsTable } from "../../../components/table";
import { Tag } from "antd";

// 9.10引入样式
import "./indexmode.less";
import { LOGIN } from "../../../config/api";

const HadPrice = ({
  hadQuote,
  handleQuotePriceClick,
  backChange,
  Quotedlist,
}) => {
  //  console.log(backChange,'backChangebackChangebackChange');
  const status = window.sessionStorage.getItem("statuss");
  let titles = "";
  status === "Return"
    ? (titles = "退票費")
    : status === "Change"
    ? (titles = "改簽費")
    : (titles = "報價");
  // console.log(titles);
  const columns1 = [
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
          title: titles,
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
    {
      dataIndex: "price",
      extraRender: (text, record) => (
        <a
          href="javascript:;"
          onClick={() => handleQuotePriceClick(record, true)}
        >
          修改
        </a>
      ),
    },
  ];

  const columns2 = [
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
        { title: "出發機場", dataIndex: "fromAirport", align: "center" },
        { title: "到達機場", dataIndex: "arriveAirport", align: "center" },
      ],
    },
    {
      dataIndex: "price",
      extraRender: (text, record) => (
        <a
          href="javascript:;"
          onClick={() => handleQuotePriceClick(record, true, record.key)}
        >
          查看
        </a>
      ),
    },
  ];

  const mergeItems = ["name", "gender", "category", "price"];
  console.log('hadQuote==========', hadQuote);
  hadQuote.forEach((v) => {
    if (v.placeFrom) {
      v.fromAirport = v.placeFrom;
      v.arriveAirport = v.placeTo;
    }
  });
  return (
    <Card title="已報價" className="Quoted">
      {hadQuote.length > 0 && (
        <MergeCellsTable
          data={hadQuote}
          // columns={backChange? columns2 : columns1}
          // 9.13修改 去掉点击查看后修改参数
          columns={columns1}
          rowKey={hadQuote.key}
          mergeItems={mergeItems}
        />
      )}
    </Card>
  );
};
const mapStateToProps = (state) => {
  const {
    hadQuote,
    backChange,
    Quotedlist,
  } = state.travelAgencyPlatformReducer;
  console.log("已报价列表", hadQuote, Quotedlist);
  return {
    hadQuote,
    backChange,
    Quotedlist,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleQuotePriceClick(formData, edit) {
      window.sessionStorage.setItem("empno", formData.empno);
      // console.log(formData,'formData');
      dispatch(actionCreators.quotePriceClick(formData, null, edit));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HadPrice);
