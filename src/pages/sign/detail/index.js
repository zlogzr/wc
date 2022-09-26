import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Card, Button } from "antd";
import { getUrlParam } from "../../../utils";
import TicketApplyFormInfo from "./components/ticketApplyFormInfo";
import TicketBackFormInfo from "./components/ticketBackFormInfo";
import SubmitPriceFormInfo from "./components/submitPriceFormInfo";
import FlightInfo from "./components/flightInfo";
import SignHistory from "./components/signHistory";
import SignOption from "./components/signOption";
import TicketBack from "./components/ticketBack";

// 9.17修改
import SignOptiondqh from "./components/signOptiondqh";

import Cardinfo from './components/cardinfo'


import './index.less';


class Detail extends Component {


  urlParam = this.props.location.search;



  showFormInfo = (category) => {
    const { formData, CertInfo } = this.props;
    //  console.log(CertInfo);
    //  console.log(formData);
    // console.log(formData,'formDataformDataformData');

    if (category === 1) {
      return (<div><TicketApplyFormInfo data={formData} />
        <Cardinfo CertInfo={CertInfo} />
      </div>);
    } else if (category === 2) {
      return <TicketBackFormInfo data={formData} />
    } else if (category === 3) {
      return <SubmitPriceFormInfo data={formData} />;
    } else {
      return null;
    }
  }
  showFlightInfo = (category) => {


    const { flightData, originFlightData, newFlightData } = this.props;

    // console.log(flightData, originFlightData, newFlightData,'flightData, originFlightData, newFlightData');
    if (category == 1) {
      return <FlightInfo data={flightData} />;
    } else if (category == 2) {
      return <TicketBack data1={originFlightData} data2={newFlightData} />
    } else {
      return null;
    }
  }

  componentDidMount() {
    // debugger
    const formId = getUrlParam(this.urlParam, 'formId');
    const formName = getUrlParam(this.urlParam, 'formName');
    this.props.formIdClick(formId, formName);
  }
  render() {
    // console.log(this.props,'-=-==-=');


    const { signHistory, signFormSubmit, signFormSubmitdqh, handleCancel, handleCancels, category, title, formData, CertInfo, modiovde, changes, modiovdes } = this.props;
    // console.log(modiovde,'modiovdemodiovde');
    const id = getUrlParam(this.urlParam, 'id');

    // console.log( this.props.formData.TypeName);

    if (this.props.formData.TypeName === '改簽申請') {
      window.sessionStorage.setItem("Refundchange", '改簽費')
    } else if (this.props.formData.TypeName === '退票申請') {
      window.sessionStorage.setItem('Refundchange', '金額')
    }

    return (
      <Card title={title} className="sign card">

        <Button className='retubtn' onClick={() => { window.history.go(-1) }} size="small" style={{ width: 70, height: 30 }}>返回</Button>
        {this.showFormInfo(category)}
        {this.showFlightInfo(category)}

        {
          id !== '3' && <SignHistory data={signHistory} />
        }

        {
          id === '1' &&
          <SignOption
            headerid={id}
            signFormSubmit={signFormSubmit.bind(this)}
            formId={formData.SerialID}

          />


        }

        {
          id === '3' &&
          <SignOptiondqh
            headerid={id}
            signFormSubmitdqh={signFormSubmitdqh.bind(this)}
            formId={formData.SerialID}
            modiovde={modiovde}
            handleCancel={handleCancel.bind(this)}
            handleCancels={handleCancels.bind(this)}
            changes={changes.bind(this)}
            modiovdes={modiovdes}
          />
        }


      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  const { formData, flightData, originFlightData, newFlightData, signHistory, category, title, CertInfo, modiovde, handleCancel, handleCancels, changes, modiovdes } = state.signReducer.applyTicketSignReducer;
  return { formData, flightData, originFlightData, newFlightData, signHistory, category, title, CertInfo, modiovde, handleCancel, handleCancels, changes, modiovdes }
}
const mapDispatchToProps = (dispatch) => {
  return {
    formIdClick(formId, formName) {
      dispatch(actionCreators.formIdClick(formId, formName))
    },
    signFormSubmit(form, formId) {

      // debugger

      const that = this;
      form.validateFields((err, values) => {
        if (!err) {
          dispatch(actionCreators.submitData({ values, formId, that }));
        }
      })
    },
    signFormSubmitdqh(form, formId) {
      const that = this;
      form.validateFields((err, values) => {
        if (!err) {
          dispatch(actionCreators.submitDatadqh({ values, formId, that }));
        }
      })
    },
    handleCancel() {
      // console.log('關閉');
      dispatch(actionCreators.handleCancel());  //關閉
    },
    handleCancels() {
      // console.log('打開');
      dispatch(actionCreators.handleCancels());  //打開
    },
    changes(form) {
      // debugger
      form.validateFields((err, values) => {
        if (!err) {
          dispatch(actionCreators.changes(values.result));  //点击驳回
        }
      })

    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail))