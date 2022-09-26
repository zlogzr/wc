import React from 'react';
import { withRouter } from "react-router-dom";
import { Menu, Dropdown, Icon, Avatar } from "antd";
// 引入弹框登录
import Loginmodeuser from './Loginmodeuser';
import Loginmodetrvel from './Loginmodetrvel';
// all
import Logininfo from './Logininfo'

const UserLogin = props => {
  /**
   * 退出登录
   */
  const loginOut = () => {
    sessionStorage.setItem('Index','1');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('category');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('site');
    sessionStorage.removeItem('Admin');
    props.history.push('/');
  }
  /**
   * 旅行社或用戶登陸
   */
  const handleLoginClick = e => {
    props.history.push('/login?category=staff');
  }
  const travelLoginClick = e => {
    props.history.push('/login?category=travel');
  }
  // const handleLoginClick = e => {
  //   if(e.key === 'item_0'){
  //     props.history.push('/login?category=travel');
  //   }else{
  //     props.history.push('/login?category=staff');
  //   }
  // }


  const menu1 = (
    <Menu>
      {/* <Menu.Item onClick={handleLoginClick}>
        <span>
          員工登陸
        </span>
      </Menu.Item>
      <Menu.Item onClick={travelLoginClick}>
        <span>
          旅行社登陸
        </span>
      </Menu.Item> */}
      
      <Menu.Item >
          <Logininfo/>
      </Menu.Item>
    </Menu>
  )
  const menu2 = (
    <Menu>
      <Menu.Item onClick={loginOut}>
        <span >
          <Icon type="logout" />&nbsp;
          退出登錄
        </span>
      </Menu.Item>
    </Menu>
  )
  const user = sessionStorage.getItem('user');


  if(!user){
    return (

    //   <Dropdown overlay={menu1} className="user-login1">
    //   <div>
    //     登錄
    //     {/* <Icon type="down" className="icon" /> */}
    //   </div>
    // </Dropdown>
    

        <div  className="user-login1">
          <Logininfo/>
        </div>
    )
  }else{
    return(
        <Dropdown overlay={menu2} className="user-login2" >
          <div>
          <Avatar className="avatar" size="small" icon="user" />
            &nbsp;
            <span className="name">
              {user}
              <Icon type="down" className="icon" />
            </span>
          </div>
        </Dropdown>
    )
  }
}


export default withRouter(UserLogin)