import React from 'react';

import { formatDate } from "../../../../utils";
import Card from "../../../../components/card";
// import {Tag} from 'antd'
import './cardinfo.less'

export default ({ CertInfo=[] }) => {
//    console.log(CertInfo);
    return(
        <Card title="证件信息" className="flight-info itemflahshsgffa">
       {CertInfo&&CertInfo.map((v, i) => {
          return <div className='itemflahshsgffapepole' key={i}>
                   <div className='itemflahshsgffapepoletitle'>
                    <div> <b>姓名:</b>
                          <span>{v.Chname}</span>
                    </div>
                    <div> <b>國籍:</b>
                          <span>{v.Country}</span>
                    </div>
                    <div> <b>聯繫方式:</b>
                          <span>{v.Phone}</span>
                    </div>
                    <div className='ertificate-birtheay'> <b>出生日期:</b>
                          <span>{v.BirthDate}</span>
                    </div>
                   </div>
                   {
                       v.Card.map((item,index)=>{
                        return <div className="onbyonepersontitless" key={index}>
                           <div className='Certificate-types' >
                               <b>證件類型:</b>
                               <span>{item.CertType}</span>
                           </div>
                           <div>
                               <b>證件姓名:</b><span>{item.CertName}</span>
                           </div>
                           <div>
                               <b>證件號碼:</b><span>{item.CertNO}</span>
                           </div>
                           <div className='ertificate-card'>
                               <b>有效期:</b>{item.CertValidTime ?
                               <span> {formatDate(item.CertValidTime)} </span>
                               : <span>&nbsp; —— ——</span>}
                           </div>

                       </div>
                       })
                   }
                </div>
        })}
      </Card>
    )
    }
