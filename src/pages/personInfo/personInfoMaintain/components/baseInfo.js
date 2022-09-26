import React from 'react';
import { connect } from 'react-redux';
import { Select, Input, Button, DatePicker, message } from "antd";
import { actionCreators } from "../store";
import { formatDate } from "../../../../utils";

import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

const BaseInfo = ({ baseInfo, areaSelect, phoneChange, handleSeatChange, handleRemarkChange, birthDateChange, nameChange, handleHobbyChange, personHobbySave }) => {
  // console.log(baseInfo,';;;;');
  const { dept, empno, name, enName, ziDeng, hireDate, birthDate, sex, phone, eMail, areaData, seat, eat, areaSelectData, seatSelectData, hobbySelectData, remark, hobby } = baseInfo;
  const areas = areaData && areaData.map(v => (<Select.Option value={v.Value} key={v.Value}>{v.Value}</Select.Option>));
  const seatOption = seat.map(v => (<Option value={v.Value} key={v.Value}>{v.Value}</Option>));
  const eatOption = eat.map(v => (<Option value={v.Value} key={v.Value}>{v.Value}</Option>));
  return (
    <div className="person-info">
      <div>
        <b>部門:</b><span>{dept}</span>
        <b>工號:</b><span>{empno}</span>
        <b>姓名:</b> <span><Input size="small" style={{ width: '130px' }} maxLength={11} placeholder="请输入您的姓名" onChange={nameChange} value={name} />  </span>
        <b>英文名:</b><span className="en-length">{enName}</span>
      </div>
      <div>
        <b>職等:</b><span>{ziDeng}</span>
        <b>入職日期:</b> <span>{hireDate ? formatDate(hireDate) : ""}</span>
        {/* <b>出生日期:</b> <span>{formatDate(birthDate)}</span> */}
        {/* 9.13 获取日期为1970.1.1为时间戳第一天,暂时先禁用 */}
        <b>出生日期:</b> <span style={{ paddingLeft: '7px' }}>
          {<DatePicker size="small" style={{ width: '130px' }} maxLength={11} onChange={birthDateChange} format="YYYY-MM-DD" allowClear={false} value={moment(birthDate, 'YYYY-MM-DD')} />}


          {/* value={moment(birthDate, 'YYYY-MM-DD')} */}
        </span>
      </div>
      <div>
        <b>性別:</b><span>{sex} </span>
        <b>手機號:</b> <Input size="small" style={{ width: '130px' }} maxLength={11} placeholder="请输入您的手机号" onChange={phoneChange} value={phone} />
        {/* <span>{phone} </span> */}
        <b>E-Mail:</b> <span>{eMail}</span>
      </div>
      <div>
        <b>國籍:</b>
        <Select className="area" size="small" onChange={areaSelect} value={areaSelectData} >
          {areas}
        </Select>
      </div>
      <div>
        <b>座位喜好:</b>
        <Select
          className="select"
          size="small"
          onChange={handleSeatChange}
          value={seatSelectData}
        >
          {seatOption}
        </Select>
        <b>飲食愛好:</b>
        <Select
          className="select"
          size="small"
          onChange={handleHobbyChange}
          value={hobbySelectData}
        >
          {eatOption}
        </Select>
      </div>
      <div><b className="clearfix" style={{ float: 'left' }}>備註:</b>
        <TextArea
          className="textArea clearfix"
          onChange={handleRemarkChange}
          value={remark}
        /></div>
      <div className="submit-btn">
        <Button onClick={() => personHobbySave(empno, name, areaSelectData, seatSelectData, birthDate, hobbySelectData, phone, remark)}>保存</Button>
      </div>
    </div>
  )

}


const mapStateToProps = (state) => {
  const { baseInfo, areaSelectData, seatSelectData, hobbySelectData } = state.personInfoReducer.personInfoMaintain;
  return { baseInfo, areaSelectData, seatSelectData, hobbySelectData }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleSeatChange(value) {
      dispatch(actionCreators.seatChange(value))
    },
    handleHobbyChange(value) {
      dispatch(actionCreators.hobbyChange(value))
    },
    handleRemarkChange(e) {
      dispatch(actionCreators.remarkChange(e.target.value))
    },
    phoneChange(e) {
      // console.log(e.target)
      dispatch(actionCreators.phoneChange(e.target.value))
    },
    nameChange(e) {
      // console.log(e.target.value)
      dispatch(actionCreators.nameChange(e.target.value))
    },
    birthDateChange(date, dateString) {
      // console.log(date, dateString)
      dispatch(actionCreators.birthDateChange(dateString))
    },
    personHobbySave(empno, name, areaSelectData, seatSelectData, birthDate, hobbySelectData, phone, remark) {
    
      let aareaSelectData = areaSelectData;
      let iphone = phone;
      // 手機號驗證
      var myreg = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/;
      if (!myreg.test(iphone)) {
        message.warning('請填寫正確的手機號');
        return;
      }
      
      if (aareaSelectData && iphone) {
        dispatch(actionCreators.personHobbySave(empno, name, areaSelectData, seatSelectData, birthDate, hobbySelectData, phone, remark));
      } else if (!aareaSelectData) {
        message.warning('請選擇國籍')
      } else if (!iphone) {
        message.warning('請輸入手機號')
      }

      // dispatch(actionCreators.personHobbySave(empno, name, areaSelectData,seatSelectData,birthDate, hobbySelectData,phone, remark));
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BaseInfo)