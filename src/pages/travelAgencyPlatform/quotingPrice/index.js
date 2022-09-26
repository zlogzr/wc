import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import FormInfo from "../components/formInfo2";
import WillQuotePrice from "../components/willQuotePrice";
import HadPrice from "../components/hadPrice";
import { getUrlParam } from "../../../utils";
import { Button } from "antd";
import { formatDate } from "../../../utils/";
import { LOGIN } from "../../../config/api";

class QuotingPrice extends Component {
  /**
   * 獲取參數中的單號
   */
  getData = (id, data) => {
    for (const v of data) {
      if (v.SerialID === id) {
        return v;
      }
    }
    return null;
  };
  /**
   * 取消报价
   */
  handleQuoteCancel() {
    this.props.history.push("/travel-agency/quote-price");
  }
  componentDidMount() {
    const { quotePrice, location } = this.props;
    const formid = getUrlParam(location.search, "formId");
    const formData = this.getData(formid, quotePrice);
    console.log("QuotingPrice:", this.props);
    this.props.getData(formData);
  }
  componentWillUnmount() {
    //重置組件狀態
    this.props.resetState();
  }
  render() {
    const {
      formInfo,
      flight,
      handleQuoteComplete,
      submit_loading,
      Quotedlist,
      tickect,
    } = this.props;
    // console.log(flight,'flightflightflightflight');
    // console.log(Quotedlist,'QuotedlistQuotedlist');
    return (
      <div>
        <FormInfo title="單號信息" data={formInfo} category={1} />
        <WillQuotePrice title="報價" data={flight} tickect={tickect} />
        <HadPrice title="已報價" data={flight} />
        {/* <HadPrice title="已報價" data={Quotedlist} /> */}
        <div
          className="submit-btns"
          style={{
            textAlign: "center",
            marginTop: "15px",
            marginBottom: "30px",
          }}
        >
          <Button
            className="cancel-btn"
            type="default"
            style={{ width: "120px", marginRight: "10px" }}
            onClick={this.handleQuoteCancel.bind(this)}
          >
            取消
          </Button>
          <Button
            type="primary"
            onClick={handleQuoteComplete.bind(this)}
            style={{ width: "120px", marginRight: "10px" }}
            loading={submit_loading}
          >
            報價結束,送出
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    formInfo,
    quotePrice,
    flight,
    submit_loading,
    Quotedlist,
    tickect,
  } = state.travelAgencyPlatformReducer;
  return {
    formInfo,
    quotePrice,
    flight,
    submit_loading,
    Quotedlist,
    tickect,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getData(formData) {
      dispatch(actionCreators.getWillQuote(formData));
    },
    resetState() {
      dispatch(actionCreators.resetState());
    },
    handleQuoteComplete() {
      const that = this;
      dispatch(actionCreators.quoteComplete(that));
    },
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(QuotingPrice)
);
