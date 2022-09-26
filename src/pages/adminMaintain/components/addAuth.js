import React from 'react';
import { Modal, Input, Form, Radio, DatePicker, InputNumber, message } from "antd";
import '../index.less';
  
const AddAuth = (props) => {


  /**
   * 要显示的表单元素
   */
  const renderItem = (v) => {
    switch (v['type'].toUpperCase()) {
      case 'INPUTPASSWORD':
        return <Input {...v.props} autoComplete='off' />
      case 'INPUT':
        return <Input type="small" {...v.props} autoComplete='off' />

      case 'RADIO':
        return (
          <Radio.Group>
            <Radio value="Y">Y</Radio>
            <Radio value="N">N</Radio>
          </Radio.Group>
        )
      case 'NUMBER':
        return (
          <InputNumber {...v.props} />
        )

      case 'DATEPICKER':
        return (
          <DatePicker type="small" />
        )

      case 'TEXTAREA':
        return (
          <Input.TextArea {...v.props} />
        )

      default:
        break;
    }
  }

  /**
   * 确定
   */
  const handleAddAuthOk = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        if (values.Password !== values.QrPassword) {
          message.destroy()
          message.warning('兩次密碼輸入不一致')
          return
        }
        props.addAuthOk(values)
      }
    })
  }



  /**
   * 布局
   */
  const formItemLayout = {
    labelCol: { span: '5' },
    wrapperCol: { span: '15' }
  }
  const { getFieldDecorator } = props.form
  let name = props.name;
  return (
    <Modal
      title="新增"
      visible={props.showModal}
      onOk={handleAddAuthOk}
      onCancel={props.hideModal}
      centered={true}
      bodyStyle={{ marginLeft: 10 }}
    >
      <Form className='formStyle'>
        {
          props.pageData.map((v, k) => {
            return (
              <Form.Item
                label={v.title}
                key={k}
                labelCol={{ span: 7, offset: 12 }}
                {...formItemLayout}>
                {
                  (v.id === 'ChName' || v.id === "TypeName") &&
                  getFieldDecorator(
                    v.id,
                    {
                      rules: [{ required: true, message: '必填' }],
                      initialValue: name
                    }
                  )(
                    renderItem(v)
                  )
                }
                {
                  (v.id !== 'ChName' && v.id !== "TypeName") &&
                  getFieldDecorator(
                    v.id,
                    {
                      rules: [{ required: true, message: '必填' }],

                    }
                  )(
                    renderItem(v)
                  )
                }
              </Form.Item>
            )
          })
        }
      </Form>
    </Modal>
  )
}

export default Form.create()(AddAuth)