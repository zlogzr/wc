import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actionCreators } from "../store";
import { Card } from "antd";
import { CommonTable } from "../../../components/table";
import { formatDate } from "../../../utils";

class QuotePrice extends Component {
  componentDidMount() {
    this.props.getPageData();
  }

  componentWillUnmount() {
    window.sessionStorage.removeItem("statuss");
  }

  render() {
    let { quotePrice } = this.props;

    let columns = [
      {
        title: "單號",
        dataIndex: "SequenceID",
      },
      {
        title: "表單名稱",
        dataIndex: "Name",
      },
      {
        title: "填單日期",
        dataIndex: "ApplyDatetime",
        render: (text) => formatDate(text, "-", true),
      },
      {
        title: "報價截止時間",
        dataIndex: "QuoteTime",
        render: (text) => formatDate(text, "-", true),
      },
      {
        title: "填單人",
        dataIndex: "ApplyName",
      },
      {
        dataIndex: "QuotePrice",
        render: (text, record) => (
          <Link
            to={{
              pathname: "/travel-agency/quote-price/detail",
              search: `?formId=${record.SerialID}`,
            }}
          >
            報價
          </Link>
        ),
      },
    ];
    console.log(quotePrice,'quotePrice');
    if (quotePrice.length === 0) {
      columns = [
        {
          title: "單號",
          dataIndex: "SequenceID",
        },
        {
          title: "表單名稱",
          dataIndex: "Name",
        },
        {
          title: "填單日期",
          dataIndex: "ApplyDatetime",
        },
        {
          title: "報價截止時間",
          dataIndex: "QuoteTime",
        },
        {
          title: "填單人",
          dataIndex: "ApplyName",
        },
        {
          dataIndex: "QuotePrice",
        },
      ];
      quotePrice = [
        {
          key: 1,
          SequenceID: <span style={{ color: "#dddddd" }}>——</span>,
          Name: <span style={{ color: "#dddddd" }}>——</span>,
          ApplyDatetime: <span style={{ color: "#dddddd" }}>——</span>,
          QuoteTime: <span style={{ color: "#dddddd" }}>——</span>,
          ApplyName: <span style={{ color: "#dddddd" }}>——</span>,
          QuotePrice: <span style={{ color: "#dddddd" }}>——</span>,
        },
      ];
    }
    return (
      <Card title="報價">
        <CommonTable
          columns={columns}
          dataSource={quotePrice}
          rowKey={quotePrice.key}
        />
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  const { quotePrice } = state.travelAgencyPlatformReducer;

  return {
    quotePrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPageData() {
      dispatch(actionCreators.getPageData());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(QuotePrice);
