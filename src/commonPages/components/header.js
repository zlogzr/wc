import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import UserLogin from "./userLogin";
import logo from "../../assets/sys_imgs/Wsitron1.png";
// import logo2 from '../../assets/sys_imgs/aircraft.gif';
import Login from "../../pages/login/index";

import logo2 from "../../assets/sys_imgs/Plane2.png";

import "./header.less";
class Header extends Component {
  /**
   * 獲取菜單
   */
  getSubMenu = ({ path, childrenShow, children }) => {
    return (
      <ul
        className="header-submenu"
        onMouseEnter={(e) => this.props.handleSubNavMouseOver(e, path)}
      >
        {children.map((item, i) => {
          if (childrenShow) {
            return (
              !item.hide && (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="header-submenu-list"
                  activeClassName="nav-active"
                  onClick={() => this.props.handleNavClick(item.path, i)}
                >
                  <li>{item.title}</li>
                </NavLink>
              )
            );
          } else {
            return null;
          }
        })}
      </ul>
    );
  };

  render() {
    const {
      navConfig: navConfigStaff,
      navConfigCommon,
      handleSubNavMouseOver,
      handleSubNavMouseLeave,
      handleHeaderNavClick,
    } = this.props;
    const { navConfigs, navConfiguser } = this.props;

    let navConfig;
    //判斷是旅行社還是員工，渲染不同的導航
    const loginCategory = sessionStorage.getItem("category");
    const Admin = sessionStorage.getItem("Admin");
    // 0就不是助理
    const assistant = sessionStorage.getItem("assistant");
    if (loginCategory === "staff") {
      if (Admin === "N") {
        navConfig = navConfiguser; //普通用户
      } else if (Admin === "Y") {
        navConfig = navConfigStaff; //管理员航道
      }
      // 不是助理
      if (assistant === "0") {
        navConfig[1].children[1].hide = true;
      }
    } else if (loginCategory === "travel") {
      navConfig = navConfigs; //切換成旅行社
    } else {
      navConfig = navConfigCommon; //回到未渲染首頁
    }

    return (
      <div className="header">
        <div className="header-flex">
          <div className="header-top">
            <img className="logo" src={logo} alt="緯創资通" />
            <div className="header-content"></div>
            <img className="logo2" src={logo2} alt="緯創差旅" />
          </div>
        </div>
        <div className="header-nav">
          <div className="header-nav-content">
            <ul className="header-nav-lists">
              {navConfig.map((v) => {
                // debugger
                if (v.children) {
                  return (
                    <li
                      key={v.path}
                      onMouseOver={(e) => handleSubNavMouseOver(e, v.path)}
                      onMouseLeave={(e) => handleSubNavMouseLeave(e, v.path)}
                    >
                      <NavLink
                        activeClassName="nav-active"
                        to={v.path}
                        onClick={() => handleHeaderNavClick(v.path)}
                      >
                        {v.title}
                      </NavLink>
                      <div className="header-submenu-container">
                        {this.getSubMenu(v)}
                      </div>
                    </li>
                  );
                } else {
                  return (
                    <li key={v.path}>
                      <NavLink activeClassName="nav-active" to={v.path}>
                        {v.title}
                      </NavLink>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
          <UserLogin />
          <Login />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    navConfigTravel,
    navConfig,
    navConfigCommon,
    navConfigs,
    navConfiguser,
  } = state.commonPageReducer;
  return {
    navConfigTravel,
    navConfig,
    navConfigs,
    navConfigCommon,
    navConfiguser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleHeaderNavClick(path) {
      dispatch(actionCreators.headerNavClick(path));
    },
    handleSubNavMouseOver(e, path) {
      dispatch(actionCreators.subNavMouseOver(path));
    },
    handleSubNavMouseLeave(e, path) {
      dispatch(actionCreators.subNavMouseLeave(path));
    },
    handleNavClick(path, i) {
      dispatch(actionCreators.changeNav(path, i));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
