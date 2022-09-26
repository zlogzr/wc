import React from 'react';
import { Form, Radio, Input, Button } from "antd";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const signOption = ({ form, form:{getFieldDecorator}, signFormSubmitdqh, formId }) => {
    return(
      <Form className="sign-option">
        <FormItem label="確認意見">
          {
            getFieldDecorator('result',
            { initialValue:'Y', rules: [{ required: true, message: '請選擇簽核結果',}]})(
              <RadioGroup name="radiogroup">
                <Radio value={'Y'}>同意</Radio>
                <Radio value={'N'}>駁回</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <div className='boo' style={{textAlign:"center"}}>
          <Button
          className="submit-btn"
          onClick={() => signFormSubmitdqh(form, formId)}
          >送出</Button>
        </div>
      </Form>
    )
}

export default Form.create()( signOption );