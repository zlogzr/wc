import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, message } from 'antd';
import QuotingPeople from "./quotingPeople";
import QuotingFlight from "./quotingFlight";
import BackChangeTicket from './backChangeTicket';
import { actionCreators } from '../store';

import './quotingFlight.less'

class QuoteStart extends Component {
  state={
    newmain:''
  }
  componentWillUnmount(){
    this.props=''
  }
  render(){
    const { showModal, handleHiddenModal, handleQuoteOk, backChange, back, change,Remarkss } = this.props;
    return(
      <Modal
      title="開始報價"
      visible={showModal}
      onOk={handleQuoteOk.bind(this, backChange, change)}
      onCancel={handleHiddenModal}
      width={1000}
      centered={true}
      className='Quotationpop-upbtn'
      >
        <div className="quote-start-info">
          <QuotingPeople Remarkss={Remarkss}  />
          {/* {
            back &&
            <BackChangeTicket ref="backChangeTicketCorst" back={back} change={change} />
          } */}

           {/* 9.9增加  */}
           {/* {Remarkss&&<div>備註:{Remarkss}</div>} */}
           {
            back &&
            <QuotingFlight ref="backChangeTicketCorst" back={back} change={change} />
          }
         
          {
            (change || !backChange) &&
            <QuotingFlight ref="quotingFlight" change={change} />
          }
          
        </div>
      </Modal>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { showModal, quoteStartData, backChange,showOk, back, change,valuehseliatinfo,Remarkss } = state.travelAgencyPlatformReducer;
  return{ showModal, quoteStartData, backChange,showOk, back, change,valuehseliatinfo,Remarkss}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleHiddenModal(){
      dispatch(actionCreators.hiddenModal())
    },
    // 確定報價
    handleQuoteOk(backChange, change){
      let cost, error, changeTicket,arrs;
      // 分為退改簽和待報價兩種情況
      if(backChange){

        if(backChange===true&& change===false){
        this.refs.backChangeTicketCorst.validateFields((err, values) => {
          if(err){
            message.warning("请填写完整信息");
            error = true;
            return;
          }
          cost = values;
           })
         }
        if(change){
          this.refs.quotingFlight.validateFields((err, values) => {
            if(err){
              message.warning("请填写完整信息");
              error = true;
              return;
            }
            changeTicket = values;
            })
          }
        if(!error){
          setTimeout(() => {
            dispatch(actionCreators.backChangeOk(changeTicket, cost))
            this.forceUpdate()
          })
        }
      }
      else {
        this.refs.quotingFlight.validateFields((err, values) => {
          if(err){
            message.warning("请填写完整信息")
            return;
          }
          dispatch(actionCreators.quoteOk(values))
        })
      } 
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( QuoteStart )