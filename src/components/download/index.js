/**
 * @desc:这是一个文件下载组件
 * @param:参数说明
 *    api_url:接口地址
 *    icon: 下载图片设置
 *    text: 下载文本设置
 *    downFileBtnClass: 按钮样式设置
 */
 import React, {PureComponent} from 'react';
 import PropTypes from 'prop-types';
 import {Button, Icon} from 'antd';
 import User from '/utils/user';
 import times from '_TOOLS_/times';
 import styles from './index.less';
 
 const downFileBtn = styles.downFileBtn;
 
 class FileDown extends PureComponent {
   constructor(props) {
     super(props);
     this.state = {
       loadingStatus: true,
       buttonDisabled: false
     }
   }
 
   //文件下载操作
   handleDownFile = (event, api_url) => {
     event.preventDefault();
     event.stopPropagation();
     //开启loading 按钮置灰
     this.setState({
       loadingStatus: false,
       buttonDisabled: true,
     });
     fetch(api_url, {
       method: 'get',
       credentials: 'include',
       headers: new Headers({
         'Content-Type': 'application/json',
         'X-Auth-Token': User.getToken(),
       }),
     }).then((response) => {
       response.blob().then(blob => {
         //关闭loading 按钮恢复正常
         this.setState({
           loadingStatus: true,
           buttonDisabled: false,
         });
         let blobUrl = window.URL.createObjectURL(blob);
         const filename = times.formatNowDate() + '.zip';
         const aElement = document.createElement('a');
         document.body.appendChild(aElement);
         aElement.style.display = 'none';
         aElement.href = blobUrl;
         aElement.download = filename;
         aElement.click();
         document.body.removeChild(aElement);
       });
     }).catch((error) => {
       //关闭loading 按钮恢复正常
       this.setState({
         loadingStatus: false,
         buttonDisabled: false,
       });
      //  console.log('文件下载失败',  error);  
     });
   };
 
   render() {
     const {api_url, text, icon, downFileBtnClass} = this.props;
     const {loadingStatus, buttonDisabled} = this.state;
     return (
       <Button
         type="primary"
         className={downFileBtnClass}
         onClick={(event) => this.handleDownFile(event, api_url)}
         disabled={buttonDisabled}
       >
         <Icon type={loadingStatus ? icon : 'loading'}/>
         {loadingStatus ? text : '下载中...'}
       </Button>
     );
   }
 }
 
 //定义属性 类型以及是否必填项
 FileDown.proTypes = {
   api_url: PropTypes.isRequired
 };
 //定义属性的默认值
 FileDown.defaultProps = {
   text: '文件下载',
   icon: 'download',
   downFileBtnClass: downFileBtn,
 };
 export default FileDown;
 