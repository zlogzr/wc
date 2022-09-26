import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Radio, Form, Input, Switch, Button, message } from "antd";
import PreviousFlight from './previousFlight';
import TravelQuoteResult from './travelQuoteResult';
import { actionCreators } from '../store'

const RadioGroup = Radio.Group;
class ChangeWaitAffirmFormList extends Component {

  

  componentWillUnmount() {//組件卸載
    this.props.showPage()
  }

  state = {
    value: 1,
    Amountdisplay:''
  }


  render() {
    const { previousFlightForm,
      travelQuoteResultForm,
      form: { getFieldDecorator },
      showPublicExpense,
      handleCheckSwitch,
      showCostExpense,
      handleCostChange,
      sendOut,ischange,isreturn } = this.props;
      // console.log(this.props,'ischange,isreturn');
      // console.log(ischange,isreturn ,'ischange,isreturn ');

      // console.log( showCostExpense,' showCostExpense,');

    //  console.log(this.props);
    // console.log(travelQuoteResultForm);
    
     if(this.props.isreturn === 'Y'){
      window.sessionStorage.setItem("returnchange",'退票費')
     } else  if(this.props.ischange === 'Y'){
      window.sessionStorage.setItem("returnchange",'改簽費')
     }

    //  console.log();

    return (
      <div className="orders-detail">
        <Row>
          <Col>
            < PreviousFlight data={previousFlightForm} />
          </Col>
        </Row>
        <Row>
          <Col className='form-title'>
          < TravelQuoteResult Amountdisplay={this.state.Amountdisplay}  data1={travelQuoteResultForm} />
          </Col>
        </Row>
       
        <Row>
          <Col className="form-title">
            {getFieldDecorator('category',
            {initialValue:isreturn==="Y" ? 1 : ischange==="Y" ? 2 :''})(
                <RadioGroup onChange={handleCheckSwitch} >
                    {isreturn==="Y"? <Radio  value={1}>退票</Radio> :<Radio disabled value={1}>退票</Radio>}

                  
                  {ischange==="Y"? <Radio  value={2}>改簽</Radio> :<Radio disabled value={2}>改簽</Radio>}
                  <Radio value={3}>不退改</Radio>
              </RadioGroup>
              )}
            
          </Col>
        </Row>
        {
          showPublicExpense &&
          <Row>
            <Col span="10">
              <br />
              <span style={{ verticalAlign: 'middle' }}>是否公費:&nbsp;&nbsp;</span>
              {getFieldDecorator('PublicExpense', {initialValue: true})(
                <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
              )}
            </Col>
          </Row>
        }
        {/* wks新增 */}
        {
          showCostExpense &&
          <Row>
            <Col span={10}>
              <br />
              <span style={{ verticalAlign: 'middle' }}>費用選擇:&nbsp;&nbsp;</span>
              {getFieldDecorator('PublicExpense',{initialValue: 'Y'})(
                 <Radio.Group onChange={handleCostChange}  >
                 {/* defaultValue="Y" */}
                     <Radio value="N">扣工薪</Radio>
                     <Radio value="Y">掛部門費用</Radio>
                 </Radio.Group>
              )}   
            </Col>
          </Row>
        }

        <Row>
          <Col className="form-title submain">
            <Button 
            className="submit-btn subbtn"
            onClick={sendOut.bind(this)}
            >送出</Button>
          </Col>
        </Row>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { previousFlightForm, travelQuoteResultForm, showPublicExpense, showCostExpense } = state.ordersReducer.changeWaitAffirmFormReducer;
  return { previousFlightForm, travelQuoteResultForm, showPublicExpense, showCostExpense }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showPage() {
      dispatch(actionCreators.goBackClick())
    },
    handleCheckSwitch(e) {
      dispatch(actionCreators.checkSwitch(e.target.value))
    },
    handleCostChange(e) {
      dispatch(actionCreators.costSwitch(e.target.value))
    },
    sendOut(){
     
      const that = this; //保存this方便提交成功之後跳轉頁面
      this.props.form.validateFields((err, values) => {
        if(!Object.values(values)[0]){
          message.warning('請選擇下方類別');
        }else{
          dispatch(actionCreators.sendOut(values, that))
        }
        
      });
  
    }

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ChangeWaitAffirmFormList))