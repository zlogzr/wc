import React from 'react'
import { Button, Modal, Icon, Input, Form,message} from 'antd'
import './Loginmodetrvel.less'

// 引入地址
import axios from '../../axios'

//  import {LOGIN_123} from '../../config/api.js'


class Loginmodetrvel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalAddInfoVisible: false, //新增信息Modal的显示属性
      flag: true,
      flag1: true,
      user: '',
      password: '',
      formData:''
    }
  }
  //弹出一个弹出框用于新增信息
  openModalAddInfo = () => {
    this.setState({ modalAddInfoVisible: true })
  }
  Loginmodead=() =>{
    this.openModalAddInfo(false)
  }
  // 用戶名
  headluser = (e) => {
   
    this.setState({
      user: e.target.value,
    })
    this.setState({
      flag: true
    })
  }
  // 用戶密碼
  headlpassword = (e) => {
    
    this.setState({
      password: e.target.value
    })
    this.setState({
      flag1: true
    })
  }
  // 點擊登錄
  useUsepass = () => {
   
    if (this.state.user === '') {
      this.setState({
        flag: false
      })
    }
    if (this.state.password === '') {
      this.setState({
        flag1: false
      })
    }
    if(this.state.user&&this.state.password){
      this.setState({
        formData:{
          Account:this.state.user,
        Password:this.state.password
        }
      })
      const formData = new FormData();
      formData.append('Account', new Buffer(this.state.user).toString('base64'));
   
      axios.post({url:"/Login/UserLogin",data: formData})
      .then(res => {
        
        if(res.code === 1){
          sessionStorage.setItem('user', res.data.Name);   //保存登陆者姓名
          sessionStorage.setItem('userId', res.data.User_id);   //保存登陆者工号
          sessionStorage.setItem('category',"staff" );   //保存登陆者類型
          sessionStorage.setItem('token',res.data.token );   //保存登陆者token
          // dispatch({type: actionTypes.LOGIN_SUCCESS});
          // window.history.push('/'); //成功之后跳转到首页
          // this.history.push('/');
          window.location.reload()
        }else{
          // dispatch({type: actionTypes.LOGIN_FAIL}); //去掉loading
          message.warning(res.message)
        }
      })
      .catch(err => {
        // dispatch({type: actionTypes.LOGIN_FAIL}); //去掉loading 
        message.warning('请求出错');
       
      })
    }
  }
  keyUpbtn = (e) => {
    if (e.keyCode === 13) {
        //调用方法
     
       this.useUsepass()
    }
  }
  render () {
    const iconStyle = { color: 'rgba(0,0,0,.25)' };
    const FormItem = Form.Item;
    return (
      <div>
        <Button  size='large' ghost='true' className='userbtnss' onClick={this.Loginmodead}>员工登錄</Button>
        {/*title:弹出框标题  visible:是否可见  onCancel:取消按钮，右上角X号事件*/}
        <Modal title="票務管理系統 - 员工登錄"
          visible={this.state.modalAddInfoVisible}
          // onOk={this.useUsepass}
          // okText="登錄"
          // cancelText='取消'
          
          onCancel={() => {
            this.setState({ modalAddInfoVisible: false })
          }}
          footer={[
            <Button className='userbtn' key="submit" type="primary"   onClick={this.useUsepass}>登錄</Button>,
            <Button className='passwordBtn' key="back" onClick={() => {
              this.setState({ modalAddInfoVisible: false })
            }}>
              取消
            </Button>
          ]}
        >
          <FormItem className="a">
            <Input autoFocus onChange={this.headluser} prefix={<Icon type="user" style={iconStyle} />} placeholder="賬號" autoComplete='off' />
            <p className='user'>{this.state.flag ? '' : '請輸入用戶名'}</p>
          </FormItem>
          <FormItem className="a">
            <Input onChange={this.headlpassword} prefix={<Icon type="lock" style={iconStyle} />} onPressEnter={this.keyUpbtn} type="passWord" placeholder="密碼" />
            <p className='users'>{this.state.flag1 ? '' : '請輸入密碼'}</p>
          </FormItem>
        </Modal>
      </div>
    )
  }

}

export default Loginmodetrvel;