import React from 'react';
import { Form, Radio, Input, Button ,Modal} from "antd";
import { LOGIN } from '../../../../config/api';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const signOption = ({ form, form:{getFieldDecorator}, signFormSubmitdqh,handleCancel,handleCancels, formId ,modiovde,changes,modiovdes}) => {
  // console.log(modiovdes);
  // let a=false,
  // changes=(e)=>{
  //   let as=1
  //    console.log(e.target.value);
  //    if(e.target.value==='N'){
  //      a=true
  //      as=22
  //    }
  //    console.log(as);
  // }
  // console.log(a);
    return(
     <div className='dividiv'>
        <Form className="sign-option">
        <FormItem label="確認意見">
          {
            getFieldDecorator('result',
            { initialValue:'Y', rules: [{ required: true, message: '請選擇簽核結果',}]})(
              <RadioGroup name="radiogroup" onChange={()=>changes(form)}>
                <Radio value={'Y'}>同意</Radio>
                <Radio value={'N'}>重新報價</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <div className='boo' style={{textAlign:"center"}}>
          <Button
          className="submit-btn"
          onClick={modiovdes?() => signFormSubmitdqh(form, formId):() =>handleCancels()}
          >送出</Button>
        </div>
      </Form>

      <Modal
       className='Madovinfopino'
          title="機票及證件信息"
          visible={modiovde}
          onOk={() => signFormSubmitdqh(form, formId)}
          onCancel={()=>handleCancel()}
        >
          <p>請確認機票預訂姓名、證件信息是否與證件上信息一致!</p>
        </Modal>
     </div>
    )
}

export default Form.create()( signOption );