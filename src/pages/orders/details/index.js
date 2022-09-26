import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Card,Button } from "antd";
import { getUrlParam } from "../../../utils";
import TicketApplyFormInfo from "./components/ticketApplyFormInfo";
import TicketBackFormInfo from "./components/ticketBackFormInfo";
import SubmitPriceFormInfo from "./components/submitPriceFormInfo";
import FlightInfo from "./components/flightInfo";
import SignHistory from "./components/signHistory";
import SignOption from "./components/signOption";
import TicketBack from "./components/ticketBack";

import './index.less';


class Detail extends Component { 

urlParam = this.props.location.search;

showFormInfo = (category) => {
  const { formData } = this.props;
    if(category === 1){
      return <TicketApplyFormInfo data={formData} />;
    }else if(category === 2){
      return <TicketBackFormInfo data={formData} />
    }else if(category === 3){
      return <SubmitPriceFormInfo data={formData} />;
    }else{
      return null;
    }
  }
showFlightInfo = (category) => {
  const { flightData, originFlightData, newFlightData } = this.props;
    if(category === 1){
      return <FlightInfo data={flightData} />;
    }else if(category === 2){
      return <TicketBack data1={originFlightData} data2={newFlightData} />
    }else{
      return null;
    }
  }

  componentDidMount(){
    const formId = getUrlParam(this.urlParam, 'formId');
    const formName = getUrlParam(this.urlParam, 'formName');
    const serialId = getUrlParam(this.urlParam, 'serialId');
    this.props.formIdClick(formId, formName, serialId);
  }
render(){
  const { signHistory, category, title, formData } = this.props;
  const id = getUrlParam(this.urlParam, 'id')
  return(
    <Card title={title} className="sign card">
        <Button className='retubtn' onClick={()=>{window.history.go(-1)}} size="small" style={{width:70,height:30}}>返回</Button>

      { this.showFormInfo(category) }
      { this.showFlightInfo(category) }
      <SignHistory data={signHistory} />
      {/* {
        id === '1' && 
        <SignOption 
        signFormSubmit={signFormSubmit}
        formId={formData.SequenceID} /> 
      }  */}
    </Card>
  )
}
    
}
  
const mapStateToProps = ( state ) => {
  const { formData, flightData, originFlightData, newFlightData, signHistory, category, title } = state.ordersReducer.detailsFormReducer;
  return{ formData, flightData, originFlightData, newFlightData, signHistory, category, title }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    formIdClick(formId, formName, serialId){
      dispatch(actionCreators.formIdClick(formId, formName, serialId))
    },
    signFormSubmit(form, formId){
      form.validateFields((err, values) => {
        if(!err){
          dispatch(actionCreators.submitData({values, formId}));
        }
      })
    }
  }
}
export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Detail ))