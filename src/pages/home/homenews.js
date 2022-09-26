import React, { Component } from 'react'

import {Button} from 'antd'

// 引入首页header
import Header from '../../commonPages/components/header'

import { baseURL } from '../../axios/baseURL'

import login from '../../assets/sys_imgs/logo.png'
import logo2 from '../../assets/sys_imgs/Plane2.png'
import logo from '../../assets/sys_imgs/Wsitron1.png';

import Fotter from '../../commonPages/components/footer'

import './homenews.less'

export default class homenews extends Component {
    state = {
        value: ''
    }

    componentDidMount() {

        this.setState({
            value: JSON.parse(sessionStorage.getItem("query"))
        })
    }

    componentWillUnmount() {
        sessionStorage.removeItem("query");
    }
    // 返回首页
    Barbacktohomepage=()=>{
        this.props.history.push({pathname:'/home'})
    }

    render() {
        const { value } = this.state
        //    let arr=value


        return (
            <div className='homenews-box' style={{ height: '100%' }}>
                <Header/>
                {/* 头 */}
                {/* <div className='headers-flex'>
                    <div className="header-top">
                        <img className="logo" onClick={this.Barbacktohomepage} title='返回首页' src={logo} alt="纬创资通" />
                        <div className="header-content"></div>
                        <img className="logo2" src={logo2} alt="辽宁战舰" />
                    </div>
                </div> */}
                {/* 中间线 */}
                {/* <div className='horizontal-bar'> <span onClick={this.Barbacktohomepage}>首頁</span> </div> */}
                {/* 内容区域 */}
                <div className='homenews'>
                    <h1> {value.Name}   </h1>
                    {/* <p className='Barbacktohomepage'><Button   type="primary">返回首页</Button></p> */}
                    <p className='updeloed'> {value.Address ?<a download="'+fileName+'" href={baseURL + `/maintain/OpenExcel?path=${value.Address}&name=${value.Address.split('\\').pop()}`  }><span className='updolueds'  > {value.Address.split('\\').pop()}  </span> </a> : ''}</p>
                    <div className='homenewsmain'>
                        {value.Value}
                    </div>

                    <button className='returnhomebtn' onClick={()=>{
                        window.history.go(-1)
                    }}>返回首頁</button>
                </div>
                {/* 底部 */}
                <footer className='homenewsfooter'> <a  className='fottermain' href='https://beian.miit.gov.cn/' target='_blank'>粤ICP备10004982号</a></footer>
            </div>
        )
    }
}
