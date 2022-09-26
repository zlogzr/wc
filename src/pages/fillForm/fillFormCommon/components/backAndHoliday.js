import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Checkbox, Radio, Button, Upload, Icon, Input, DatePicker   } from "antd";
import { actionCreators } from "../store";
import { compose } from "../../../../utils";
// import hComponent from "../../components/hComponent";

import Flight from '../../components/flightSelect';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Option } = Select;
class BackAndHoliday extends Component {


  getFlightInfo = (value) => {
    this.props.getFlightInfo(value);
  }

componentWillUnmount(){
  this.props.resetAllState();
}

  render(){
    const { 
      form: {getFieldDecorator}, 
      handleCategoryChange,
      showFtsz_formid,
      showOther,
      showFiveUpload,
      handleOtherChange,
      showVisaDate,
      hanldAreaSelect,
      isAssistant,
      showFtszNameAndRelationship,
      pageData,
    } = this.props;
    const { 
      ftszItem,
      danhao,
      area,
      userInfo,
      peoples,
      flightPlace,
      category2,
      chargeDept
    } = pageData;
    //类别
    const category_ = category2.map(v => (<Checkbox value={v.categoryCode} key={v.categoryCode}>{v.categoryName}</Checkbox>));
    //返台述职子项
    const ftszItem_ = ftszItem.map(v => (<Checkbox value={v.parmCode} key={v.parmCode}>{v.parmValue}</Checkbox>));
    //区域
    const area_ = area.map(v => (<Radio value={v.ParmCode} key={v.ParmCode}>{v.ParmValue}</Radio>));
     //返台述职单号
    const danhao2_ = danhao.FanTai && danhao.FanTai.map(v => (<Option value={v.ParmCode} key={v.ParmCode}>{v.ParmValue}</Option>));
      //挂账部门
    const chargeDept_ = chargeDept.map(v => (<Option value={v} key={v}>{v}</Option>));
    //航程数据
    const flightData = {peoples, flightPlace, userInfo};
    
    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 8
      },
    };
    return(
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="類別"
        >
          {getFieldDecorator('category', {
            rules: [{
              required: true, message: '請選擇類別',
            }],
          })(
            <CheckboxGroup onChange={handleCategoryChange}>
              {category_}
            </CheckboxGroup>
          )}
        </FormItem>

        {
          showOther && 
          <div className="ftsz-other">
            <div className="linebox" style={{left: 237}}>
              <div className="line"></div>
            </div>
            <FormItem
              {...formItemLayout}
              wrapperCol={{span: 9, offset: 2}}
              colon={false}
              label=" "
            >
              {getFieldDecorator('other-list', {
                rules: [{
                  required: true, message: '請選擇子項',
                }],
              })(
                <CheckboxGroup onChange={handleOtherChange}>
                  {ftszItem_}
                </CheckboxGroup>
              )}
            </FormItem>
            {
               showFiveUpload &&
               <div className="five-upload" style={{left: 460}}>
               {getFieldDecorator('five-upload', {
                   rules: [{
                     required: true, message: '請上傳附件',
                   }],
                 })(
                   <Upload>
                     <Button size="small">
                       <Icon type="upload" /> Upload
                     </Button>
                   </Upload>
                 )}
               </div>
            }
            </div>
        }    

         {
          showFtszNameAndRelationship &&
          <div>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator('withName', {
                rules: [{
                  required: true, message: '請填寫姓名',
                }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="關係"
            >
              {getFieldDecorator('withRelationship', {
                rules: [{
                  required: true, message: '請填寫與本人關係',
                }],
              })(
                <Input />
              )}
            </FormItem>
          </div>
        }
           

        {
          showFtsz_formid &&
          <FormItem
            {...formItemLayout}
            label="返台述職單號"
          >
            {getFieldDecorator('ftsz_formid', {
              rules: [{
                required: true, message: '請選擇返台述職單號',
              }],
            })(
              <Select>
                {danhao2_}
              </Select>
            )}
          </FormItem>
        }

        <FormItem
          {...formItemLayout}
          label="區域"
        >
          {getFieldDecorator('area', {
            rules: [{
              required: true, message: '請選擇區域',
            }],
          })(
            <RadioGroup onChange={hanldAreaSelect}>
              {area_}
            </RadioGroup>
          )}
        </FormItem>

        {
          showVisaDate && 
          <FormItem
            {...formItemLayout}
            label="簽證有效期"
          >
            {getFieldDecorator('visaDate', {
              rules: [{
                required: true, message: '請選擇簽證有效期',
              }],
            })(
              <DatePicker size="small" />
            )}
          </FormItem>
        }

        <Flight 
        form={this.props.form} 
        getFlightInfo={this.getFlightInfo} 
        isAssistant={isAssistant}
        pageData={flightData}/>

        <FormItem {...formItemLayout} label="掛賬部門">
        {getFieldDecorator('gz_dept',
        {initialValue: chargeDept[0]},
        {
              rules: [{
                required: true, message: '請選擇掛賬部門',
              }],
            })(
              <Select>
                {chargeDept_}
              </Select>
            )}
      </FormItem>

      <FormItem {...formItemLayout} label="備註">
        {getFieldDecorator('mark', {
              rules: [{
                required: true, message: '請填寫備註',
              }],
            })(
              <TextArea />
            )}
      </FormItem>

      <FormItem {...formItemLayout} label=" " colon={false}>
        <Button type="primary" htmlType="submit">提交</Button>
      </FormItem>

      </Form>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { 
    showCc_formid, 
    showFtsz_formid, 
    showOther, 
    showFiveUpload, 
    showVisaDate,  
    flightInfo, 
    isAssistant,
    showFtszNameAndRelationship,
    pageData } = state.fillFormReducer.fillFormCommonReducer;
  return{ 
    showCc_formid, 
    showFtsz_formid, 
    showOther, 
    showFiveUpload, 
    showVisaDate,  
    flightInfo, 
    isAssistant,
    showFtszNameAndRelationship,
    pageData }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleFlightChange(e){
      dispatch(actionCreators.flightChange(e.target.value));
    },
    handleCategoryChange(value){
      dispatch(actionCreators.categoryChange(value));
    },
    handleOtherChange(value){
      dispatch(actionCreators.otherChange(value))
    },
    resetAllState(){
      dispatch(actionCreators.resetState());
    },
    hanldAreaSelect(e){
      dispatch(actionCreators.areaSelect(e.target.value));
    },
    getFlightInfo(value){
      dispatch(actionCreators.flightInfo(value))
    }

  }
}
// export default connect( mapStateToProps, mapDispatchToProps )( Form.create()(BusinessTripAndBack) );
export default compose(
  connect( mapStateToProps, mapDispatchToProps ),
  Form.create()
)(BackAndHoliday);