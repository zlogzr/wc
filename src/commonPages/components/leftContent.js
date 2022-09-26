import React, { useEffect  } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from "react-router-dom";
import { Icon } from "antd";
import {actionCreators} from "../store";

const LeftContent = props => {
  
  //获取需要显示的导航数据
  const getNavData = ( navConfigs ) => {
    if(navConfigs){
      for (let item of navConfigs) {
        if(item.children && props.location.pathname.indexOf(item.path) !== -1){
          return item;
        }
      }
    }
    return null
  }

  //获取标题
   const getTitle = () => {
  let nommll=sessionStorage.getItem("category")
  if(nommll==="staff"){let navData = getNavData(props.navConfig);
    if(navData){
          return <div className="title">
                  <Icon type={navData.icon} theme="twoTone" />
                  <span>{navData.title}</span>
                 </div>
        }
  }else 
  if(nommll==="travel"){let navData = getNavData(props.navConfigs);
    if(navData){
          return <div className="title">
                  <Icon type={navData.icon} theme="twoTone" />
                  <span>{navData.title}</span>
                 </div>
        }
  }    return null;
  }
  // const getTitle = () => {
  //   const navData = getNavData(props.navConfig);
  //   if(navData){
  //     return <div className="title">
  //             <Icon type={navData.icon} theme="twoTone" />
  //             <span>{navData.title}</span>
  //            </div>
  //   } 
  //   return null;
  // }

  //获取左边导航
  const getLeftNav = () => {
  let nommll=sessionStorage.getItem("category")
  if(nommll==="staff"){
    let navData = getNavData(props.navConfig);
    if(navData){
          return navData.children.map(({ path, title, active }, i) => (
            <NavLink
               key={path}
               onClick={() => props.handleNavClick(path, i)}
               to={path}
               className={active? 'leftnav-active' : ''}
               >
            <li >
            <Icon type="right-circle" theme="twoTone" />
               <span className="titleNav">{title}</span>
            </li>
            </NavLink>
          ))
        }
  }
  if(nommll==="travel"){
    let navData = getNavData(props.navConfigs);
    if(navData){
          return navData.children.map(({ path, title, active }, i) => (
            <NavLink
               key={path}
               onClick={() => props.handleNavClick(path, i)}
               to={path}
               className={active? 'leftnav-active' : ''}
               >
            <li >
            <Icon type="right-circle" theme="twoTone" />
               <span className="titleNav">{title}</span>
            </li>
            </NavLink>
          ))
        }
  }
  return null;
  }


  // const getLeftNav = () => {
  //   const navData = getNavData(props.navConfig);
  //   if(navData){
  //     return navData.children.map(({ path, title, active }, i) => (
  //       <NavLink
  //          key={path}
  //          onClick={() => props.handleNavClick(path, i)}
  //          to={path}
  //          className={active? 'leftnav-active' : ''}
  //          >
  //       <li >
  //       <Icon type="right-circle" theme="twoTone" />
  //          <span className="titleNav">{title}</span>
  //       </li>
  //       </NavLink>
  //     ))
  //   }
  //   return null;
  // }

  // 左側菜單欄頭部渲染
  useEffect(() => {
    let nommll=sessionStorage.getItem("category")
    if(nommll==="staff"){
      const navData = getNavData(props.navConfigs);
      props.activeNavStyleOnload(navData, props.location.pathname);
    }else
    if(nommll==="travel"){ const navData = getNavData(props.navConfigs);
      props.activeNavStyleOnload(navData, props.location.pathname);}
  }, [props.location.pathname])
  
    return(
        <div className="left-content">
          <div>
            { getTitle() }
          </div>
          <ul className="left-nav">
            { getLeftNav()}
          </ul>
        </div>
    ) 
}
 

// 村志傳到LeftContent
const mapStateToProps = ( state ) => {
 
  let flag=(sessionStorage.getItem('category') === 'staff'?true:false)
  let { navConfigs, navConfigTravel,navConfig } = state.commonPageReducer;
    
  
  // if(sessionStorage.getItem('category') === 'staff'){
  //   // return { navConfigs: navConfigTravel }
  //   return navConfigs
  // }
  //  else if(sessionStorage.getItem('category') === 'travel'){
  //   // return { navConfig: navConfigTravel }
  //   return navConfig
  // }
 
  if(flag){
      if(sessionStorage.getItem('category') === 'travel'){
    return { navConfig: navConfigTravel }
  }
  return  { navConfig }
  } else {
     if(sessionStorage.getItem('category') === 'staff'){
       flag=false
    return { navConfigs: navConfigTravel }
    }
    return  { navConfigs }
  }

}

const mapDispatchToProp2 = ( dispatch ) => {
  return {
    handleNavClick(path, i){
      dispatch(actionCreators.changeNav(path, i));
    },
    activeNavStyleOnload(navData, thisNav){
      dispatch(actionCreators.activeNavStyle(navData, thisNav));
    }
  }
  
}
export default withRouter(connect( mapStateToProps, mapDispatchToProp2)( LeftContent));