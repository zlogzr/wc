import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from "../store";
import { Form, message } from "antd";
import AddCardInfo from '../../components/addCard';
import PersonInfo from "./personInfo";

class Content extends Component {
  render() {
    const styleHr = { backgroundColor: 'rgb(241, 242, 243)', margin: '30px 0', border: 'none', height: 5 }
    const { handleCardNewAdd, cardInfo, haveFamilyName, addPersonPageData, form } = this.props;
    return (
      <div>
        <PersonInfo
          form={this.props.form} />
        <hr style={styleHr} />
        <AddCardInfo
          form={form}
          cardInfo={cardInfo}
          handleCardNewAdd={handleCardNewAdd}
          addPersonPageData={addPersonPageData}
          haveFamilyName={haveFamilyName}
        />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  const { cardInfo, haveFamilyName, addPersonPageData } = state.personInfoReducer.familyInfoMaintain;
  return {
    cardInfo, haveFamilyName, addPersonPageData
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleCardNewAdd(form) {
      form.validateFields((err, values) => {
        if (values.cardCategory === '身份證') {
          var pattern = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
          let flag = pattern.test(values.cardNo)
          if (!flag) {
            message.warning('請正確輸入身份證格式');
            return
          }
        }
        for (const v of Object.values(values)) {
          if (!v) {
            message.warning('请填而写完整信息');
            return;
          }
        }
        dispatch(actionCreators.addCardInfo(values));
      });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Content))