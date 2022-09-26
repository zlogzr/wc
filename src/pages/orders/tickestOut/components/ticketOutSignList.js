import React, { Component } from 'react';
import { LOGIN } from '../../../../config/api';

import { baseURL } from "../../../../axios/baseURL";

// 引入当前组件样式
import './tickoutsignlist.less'

class Name extends Component {

  render() {
    const { data = [], fileDown, status } = this.props;//從ticketOutSignList獲取的數據




    return (
      <ul className="form">
        <li><b>流水號：</b> <span className="content">{data.SequenceID}</span></li>
        <li><b>目前步驟：</b> <span className="content">{data.StepName}</span></li>
        <li><b>填單人：</b> <span className="content">{data.ApplyName}</span></li>
        <li><b>填單時間：</b> <span className="content">{data.ApplyDateTime}</span></li>
        <li><b>類別：</b> <span className="content">{data.TravelTypeName}</span></li>
        <li><b>備註：</b> <span className="content">{data.Remark}</span></li>
        <li><b>附檔：</b>{status !== '改簽完成' && (<span className="content" style={{ width: "60%" }}>{data.OFileName}
          {
            fileDown &&
            <a
              href={baseURL + '/maintain/OpenExcel?path=' + fileDown.FilePath + '&name=' + fileDown.OFileName}
            >
              {fileDown.OFileName}
            </a>
          }
        </span>)}</li>

        {/* <div style={{marginTop: 30}}>
              行程單: &nbsp;&nbsp;
             
             </div> */}
        {
          // data.map((v, k) => <li key={v.title}><b>{v.title}：</b> <span className="content">{v.content}</span></li>)  
        }
      </ul>
    )
  }
}

export default Name
