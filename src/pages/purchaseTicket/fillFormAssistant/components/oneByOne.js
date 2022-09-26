import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Checkbox, Row, Col, Input, DatePicker, Card, Button, message, notification } from "antd";
import { compose, formatDate } from "../../../../utils";
import { actionCreators } from "../store";

import moment from 'moment';

import '../index.less'

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.item;
class OneByOne extends Component {
    state = {
        showSTH: false,
        cardainfo: '',  //证件信息
        chaiLv: '',    //
        chaiLvbm: '',    //差旅单号匹配挂账部门
    }
    handleSelectIsfant = (e) => {

    }

    render() {
        const { form: { getFieldDecorator },
            pageData: { ftszItem, country, certType },
            showCc_formid,
            showFtsz_formid,
            showJnfg_formid,
            handleAddFlightClick,
            handleBlurOutName,
            personInfo,
            CertInfo,
            ChaiLv,
            FanTai,
            flightCategory,
            showVisaDate,
            cardainfo,  //证件信息
            chaiLvbm,    //差旅单号匹配挂账部门
            handleSelectIsTW,
            handleSelectIs,
            cardinfosomeflag, //默认不显示所有证件信息
            info, //国籍手机号
        } = this.props;

        const formItemLayout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 8
            },
        };
        //返台述職選項
        const ftszItem_ = ftszItem.map(v => (<Checkbox key={v.ViceCode} value={v.ViceCode}>{v.ViceName}</Checkbox>));
        const country_ = country.map(v => (<Option key={v.Value} value={v.Value}>{v.Value}</Option>));
        const certType_ = certType.map(v => (<Option key={v.Code} value={v.Value}>{v.Value}</Option>)); //證件類型
        // console.log(certType_);
        //差旅单号
        const chainfo = ChaiLv.map(v => {
            return <Option key={v.Code} value={v.Code}>{v.Code}</Option>
        })
        //返台单号
        const chainfofant = FanTai.map(v => {
            return <Option key={v.Code} value={v.Code}>{v.Code}</Option>
        })
        //校驗規則
        const config = {
            rules: [{ required: true, message: '必填' }],
        };
        const configgenter = {
            rules: [{ required: true, message: '必填' }],
            initialValue: personInfo.Sex
        };
        return (
            <Form onSubmit={handleAddFlightClick.bind(this)}>
                <Card >
                    <Row className="row" style={{ margin: '0px' }}>
                        <Col span="3" className="assistant-titile"><span className="request-star">*</span>乘機人工號:&nbsp;</Col>
                        <Col span="6">
                            {getFieldDecorator('empno_a', config)(
                                <Input
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            handleBlurOutName.bind(this)()
                                            e.preventDefault()
                                        }
                                    }}
                                    type="text"
                                    style={{ width: '200px' }}
                                    autoComplete='off'
                                    className="select"
                                    onBlur={handleBlurOutName.bind(this)}
                                />
                            )}
                            <Input type="text" style={{ display: 'none' }} />
                        </Col>
                        <Col span="3" className="assistant-titile"><span className="request-star" ></span>  乘機人姓名:&nbsp;</Col>
                        <Col span="4" style={{ marginTop: "4px", }}>
                            {getFieldDecorator('person_a', { initialValue: personInfo.ChName })(
                                <span style={{ fontSize: '14px' }}>{personInfo.ChName}</span>
                                // <Input autoComplete='off' className="select" disabled />
                            )}
                        </Col>
                        <Col span="3" className="assistant-titile"><span className="request-star"></span>乘機人性別:&nbsp;</Col>
                        <Col span="4" style={{ marginTop: "4px", }}>
                            {getFieldDecorator('sex_a', { initialValue: personInfo.Sex })(
                                <span style={{ fontSize: '14px' }}>{personInfo.Sex}</span>
                                // <Select className="select" >
                                //     <Option value="男">男</Option>
                                //     <Option value="女">女</Option>
                                // </Select>
                            )}
                        </Col>

                    </Row>
                    <Row className="row" style={{ margin: '0px' }}>
                        <Col span="3" className="assistant-titile"><span className="request-star"></span>所屬部門:&nbsp;</Col>
                        <Col span="6" style={{ marginTop: "4px", }}>
                            {getFieldDecorator('dept_a', { initialValue: personInfo.Deptcode })(
                                <span style={{ fontSize: '14px' }}>{personInfo.Deptcode}</span>
                            )}

                            {/* {getFieldDecorator('dept_a', { initialValue: personInfo.Deptcode })(
                                <Input autoComplete='off' className="select" disabled />
                                // <Input disabled  />
                            )} */}
                        </Col>

                        <Col span="3" className="assistant-titile"><span className="request-star"></span> 國籍:&nbsp;</Col>
                        <Col span="4" style={{ marginTop: "4px", }}>
                            <span style={{ fontSize: '14px' }}>{info ? info.Code : ''}</span>
                            {/* {getFieldDecorator('nationality_a', config)(
                                <Select style={{ width: 160 }} >
                                    {country_}
                                </Select>
                            )} */}
                        </Col>

                        <Col span="3" className="assistant-titile"><span className="request-star"></span>  手機號:&nbsp;</Col>
                        <Col span="5" style={{ marginTop: "4px", }}>
                            <span style={{ fontSize: '14px' }}>{info ? info.Value : ''}</span>
                            {/* {getFieldDecorator('phone_a', config)(
                                <Input style={{ width: 160 }} autoComplete='off' />
                            )} */}
                        </Col>
                    </Row>
                    {
                        showCc_formid &&
                        <Row className="row" style={{ margin: '0px' }}>
                            <Col span="3" className="assistant-titile"><span className="request-star">*</span> 差旅單號:&nbsp;</Col>
                            <Col span="6">
                                {getFieldDecorator('cc_formid', config)(
                                    // <Input autoComplete='off'  className="select" />
                                    <Select style={{ width: '200px' }} onChange={handleSelectIs.bind(this)}>
                                        {chainfo}
                                    </Select>
                                )}
                            </Col>
                            <Col span="2" style={{ marginLeft: '38px' }} className="assistant-titile"><span className="request-star"></span>掛賬部門:&nbsp;</Col>
                            <Col span="5" style={{ marginTop: "4px", }}>
                                {getFieldDecorator('gz_dept', { initialValue: chaiLvbm.Value })(
                                    <span style={{ fontSize: '14px' }}>{chaiLvbm.Value}</span>
                                    // <Input autoComplete='off' />
                                )}
                            </Col>
                        </Row>
                    }
                    {
                        showFtsz_formid &&
                        <div>
                            <Row className="row" style={{ margin: '0px' }}>
                                <Col span="3" className="assistant-titile"><span className="request-star">*</span>返台述職類型:&nbsp;</Col>
                                <Col span="7">
                                    {getFieldDecorator('ftSequenId', config)(
                                        //增加的onchange事件是為了在index頁面點擊判斷點擊的為哪一項,然後不同頁面傳輸數據要用this.props
                                        <CheckboxGroup onChange={this.props.handeleFiveSelect}>
                                            {ftszItem_}
                                        </CheckboxGroup>
                                    )}

                                </Col>
                            </Row>
                            <Row className="row" style={{ margin: '0px' }}>
                                <Col span="3" className="assistant-titile"><span className="request-star">*</span>返台述職單號:&nbsp;</Col>
                                <Col span="7">
                                    {getFieldDecorator('ftSequenId1', config)(
                                        // <Input autoComplete='off'  className="select" />
                                        <Select style={{ width: '200px' }} onChange={this.handleSelectIsfant.bind(this)}>
                                            {chainfofant}
                                        </Select>
                                    )}
                                </Col>
                            </Row>
                        </div>
                    }
                    {
                        showJnfg_formid &&
                        <Row className="row">
                            <Col span="3" className="assistant-titile"><span className="request-star">*</span>眷屬姓名:&nbsp;</Col>
                            <Col span="7">
                                {getFieldDecorator('familyName', config)(
                                    <Input autoComplete='off' />
                                )}
                            </Col>
                            <Col span="3" className="assistant-titile"><span className="request-star">*</span>與本人關係:&nbsp;</Col>
                            <Col span="7">
                                {getFieldDecorator('familyGuanxi', config)(
                                    <Input autoComplete='off' />
                                )}
                            </Col>
                        </Row>
                    }
                    {
                        showVisaDate &&

                        <Row className="row">
                            <Col span="3" className="assistant-titile"><span className="request-star">*</span> 簽證有效期:&nbsp;</Col>
                            <Col span="5">
                                {getFieldDecorator('visaDate', {
                                    rules: [{
                                        required: true, message: '請選擇簽證有效期',
                                    }],
                                })(
                                    <DatePicker format="YYYY-MM-DD" placeholder="簽證有效期" />
                                )}
                            </Col>
                        </Row>
                    }
                    {
                        this.state.showSTH &&

                        <Row className="row">
                            <Col span="5" className="assistant-titile"><span className="request-star">*</span> 入台許可證有效期:&nbsp;</Col>
                            <Col span="5">
                                {getFieldDecorator('visaDate', {
                                    rules: [{
                                        required: true, message: '請選擇入台許可證有效期',
                                    }],
                                })(
                                    <DatePicker format="YYYY-MM-DD" placeholder="入台許可證有效期" />
                                )}
                            </Col>
                        </Row>
                    }
                    {CertInfo.map((v, i) => {
                        return <div className="onbyonepersontitle" key={i}>
                            <div className='Certificate-types' >
                                <b>證件類型:</b>
                                <span>{v.CertType}</span>
                            </div>
                            <div>
                                <b>證件姓名:</b><span>{v.CertName}</span>
                            </div>
                            <div>
                                <b>證件號碼:</b><span>{v.CertNO}</span>
                            </div>
                            <div>
                                <b>有效期:</b>{v.CertValidTime ? <span> {formatDate(v.CertValidTime)}</span> : <span>&nbsp; —— ——</span>}
                            </div>

                        </div>
                    })}
                    <Row>
                        <Col className="form-title" span="3"></Col>
                        <Col span="17">
                            <Button
                                className="submit-btn"
                                htmlType="submit"
                            >確定</Button>
                            <Button
                                className="submit-reset"
                                htmlType="button"
                                onClick={this.props.resetAllState.bind(this)}
                            >重置</Button>
                        </Col>
                    </Row>
                </Card>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    const {
        pageData,
        personInfo,
        flightCategory,
        CertInfo,
        ChaiLv,
        FanTai,
        cardainfo,  //证件信息
        chaiLvbm,    //差旅单号匹配挂账部门
        cardinfosomeflag,//默认不显示所有证件信息
        info, //国籍手机号

    } = state.fillFormReducer.fillFormAssistantReducer;
    return {
        pageData,
        personInfo,
        flightCategory,
        CertInfo,
        ChaiLv,
        FanTai,
        cardainfo,  //证件信息
        chaiLvbm,    //差旅单号匹配挂账部门
        cardinfosomeflag, //默认不显示所有证件信息
        info, //国籍手机号

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPageData() {
            dispatch(actionCreators.getPageInitData());   //获取页面数据
        },
        async handleAddFlightClick(e) {
            e.preventDefault()
            await this.props.getflightInfo()
            this.props.form.validateFields((err, values) => {
                if (values.zjCategory_a === 'IDCard') {
                    var pattern = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                    let flag = pattern.test(values.zjNo_a)
                    if (!flag) {
                        message.warning('請正確輸入身份證格式');
                        return
                    }
                }
                for (const item of Object.values(values)) {
                    if (!item) {
                        message.warning('請填寫必填欄位');
                        return false;
                    }
                }
                console.log('this.props.flightCategory=====', this.props.flightCategory)
                let boo = this.props.flightCategory.values.detail.some(item => {
                    let num1 = parseInt(item.StartTime.split(':').join(''))
                    let num2 = parseInt(item.EndTime.split(':').join(''))
                    if (num2 > (num1 - 1) && num2 - num1 < 201) {
                        return true
                    } else {
                        return false
                    }
                })
                if (boo) {
                    message.destroy()
                    message.warning('時間區間前後相差 大於等於 2.5H')
                    return
                }
                setTimeout(() => {
                    dispatch(actionCreators.onebyone(values, this.props.pageData, this.props.flightCategory))
                }, 0)
                this.props.form.resetFields()
                dispatch(actionCreators.getTravelerRejest())
            })
        },
        resetAllState() {
            this.props.form.resetFields();
            dispatch(actionCreators.getTravelerRejest())
        },
        handleBlurOutName() {
            this.setState({ cardainfo: '' })
            let id = this.props.form.getFieldValue('empno_a');
            dispatch(actionCreators.getName(id))
        },
        handleSelectIsTW(e) {
            // debugger
            dispatch(actionCreators.handleSelectIsTW(e))
        },
        handleSelectIs(e) {
            dispatch(actionCreators.handleSelectIs(e))
        }

    }
}
//export default connect( mapStateToProps, mapDispatchToProps )( OneByOne )
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    Form.create()
)(OneByOne);

