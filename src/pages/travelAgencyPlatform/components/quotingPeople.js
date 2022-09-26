import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from "../../../components/card";
import { Select } from "antd";
import { actionCreators } from '../store';
import { formatDate } from "../../../utils";
import './indexmode.less'

const Option = Select.Option;
class QuotingPeople extends Component {
  render() {
    const { card, company, hobby, cadastral, handleSelectChange, selectCard, selectCompany, baseInfo,CertInfoall,Remarkss} = this.props;
    // console.log(this.props, 'this.props');
    const cardOptions = card.map(v => (<Option key={v.CertType} value={v.CertType}>{v.CertType}</Option>));
    const companyOptions = company.map(v => (<Option key={v.Airlineid} value={v.Airlineid}>{v.Airlinename}</Option>))
   
    let epeone=window.sessionStorage.getItem('empno')
  let a=  hobby.find(item=>{
      return item.Empno===epeone
    })
// console.log(a);
// console.log(baseInfo);
// console.log(CertInfoall);

// console.log(this.props,'dhahid');
//     console.log(card,'card');
//     console.log(hobby,'hobby');

//  9.30測試拿到親屬姓名
// let ApplyName=window.sessionStorage.getItem("ApplyName")
return (
  <Card title="個人資料" className="person">
    {
      // hobby.length &&

      <div>
        <div className="item persontitle">
          <div>
            <b>姓名:</b><span>
              {/* {hobby[0]?hobby[0].Chname:""} */}
              {a?a.Chname:""}
              
              </span>
          </div>
          <div>
            <b>性別:</b>
            <span>
              {/* {baseInfo[0].Sex ? baseInfo[0].Sex : 'N/A'} */}
              {baseInfo ? baseInfo.Sex : 'N/A'}
            </span>
          </div>
          <div>
            <b>國籍:</b><span>{a?a.Country:''}</span>
          </div>
          <div>
            <b>出生年月:</b>
            <span>
              {baseInfo.BirthDate ? baseInfo.BirthDate : 'N/A'}
              {/* {a ? a.BirthDate : 'N/A'} */}
               </span>
          </div>
        </div>
        <div className='item persontitle'>
          <div>
            <b>聯係方式:</b>
            <span>
              {baseInfo.Phone ? baseInfo.Phone : 'N/A'}
              {/* {a ? a.Phone : 'N/A'} */}
            </span>
          </div>
          <div>
            <b>座位喜好:</b><span>{a? a.SeatType : 'N/A'}</span>
          </div>
          <div>
            <b>飲食喜好:</b><span>{a? a.FoodType : 'N/A'}</span>
          </div>

          <div className='cadastral'> </div>
        </div>
      </div>
    }
    { CertInfoall.map((v,i)=>{
         return <div className="item persontitle" key={i}>
         <div className='Certificate-types' >
           <b>證件類型:</b>
           <span>{v.CertType}</span>
         </div>
         <div>
           <b>證件姓名:</b><span>{v.CertName}</span>
         </div>
         <div>
           <b>證件號碼:</b><span>{v.CertNO}</span>
         </div>
         <div>
           <b>有效期:</b><span>{v.CertValidTime?formatDate(v.CertValidTime):'—— ——'}</span>
         </div>

       </div>
    })}
    <div className="item persontitles">
      <div>
        <b>航空公司:</b>
        <Select
          size="small"
          className="select"
          onChange={(v) => handleSelectChange(v, 2)} >
          {companyOptions}
        </Select>
      </div>
      <div>
        <b>會員卡號:</b>
        <span>{selectCompany.CardNo}</span>
      </div>
    </div>
    <div className="item" style={{ marginTop: 10 }}><b>備註:</b>&nbsp; 
    <span>
     {a?a.Remark:""}
      </span>
      &nbsp; &nbsp;
      {Remarkss&& <span>{Remarkss}</span>}
      </div>
  </Card>
)}

  //   if (card.length > 0) {
  //     return (
  //       <Card title="個人資料" className="person">
  //         {
  //           // hobby.length &&

  //           <div>
  //             <div className="item persontitle">
  //               <div>
  //                 <b>姓名:</b><span>
  //                   {hobby[0]?hobby[0].Chname:""}
                    
  //                   </span>
  //               </div>
  //               <div>
  //                 <b>性別:</b>
  //                 <span>
  //                   {/* {baseInfo[0].Sex ? baseInfo[0].Sex : 'N/A'} */}
  //                   {baseInfo ? baseInfo.Sex : 'N/A'}
  //                 </span>
  //               </div>
  //               <div>
  //                 <b>國籍:</b><span>{hobby[0]?hobby[0].Country:''}</span>
  //               </div>
  //               <div>
  //                 <b>出生年月:</b>
  //                 <span>
  //                   {/* {baseInfo[0].BirthDate ? baseInfo[0].BirthDate : 'N/A'} */}
  //                   {baseInfo ? baseInfo.BirthDate : 'N/A'} </span>
  //               </div>
  //             </div>
  //             <div className='item persontitle'>
  //               <div>
  //                 <b>聯係方式:</b>
  //                 <span>
  //                   {/* {baseInfo[0].Phone ? baseInfo[0].Phone : 'N/A'} */}
  //                   {baseInfo ? baseInfo.Phone : 'N/A'}
  //                 </span>
  //               </div>
  //               <div>
  //                 <b>座位喜好:</b><span>{hobby[0]? hobby[0].SeatType : 'N/A'}</span>
  //               </div>
  //               <div>
  //                 <b>飲食喜好:</b><span>{hobby[0]? hobby[0].FoodType : 'N/A'}</span>
  //               </div>

  //               <div className='cadastral'> </div>
  //             </div>
  //           </div>
  //         }

  //         {CertInfoall.length && CertInfoall.map((v,i)=>{
  //              return <div className="item persontitle" key={i}>
  //              <div className='Certificate-types' >
  //                <b>證件類型:</b>
  //                <span>{v.CertType}</span>
  //              </div>
  //              <div>
  //                <b>證件姓名:</b><span>{v.CertName}</span>
  //              </div>
  //              <div>
  //                <b>證件號碼:</b><span>{v.CertNO}</span>
  //              </div>
  //              <div>
  //                <b>有效期:</b><span>{formatDate(v.CertValidTime)}</span>
  //              </div>
   
  //            </div>
  //         })}
  //         {/* <div className="item persontitle">
  //           <div>
  //             <b>證件類型:</b>
  //             <Select
  //               size="small"
  //               className="select"
  //               onChange={(v) => handleSelectChange(v, 1)}>
  //               {cardOptions}
  //             </Select>
  //           </div>
  //           <div>

  //             <b>證件姓名:</b><span>{selectCard.CertName}</span>
  //           </div>
  //           <div>

  //             <b>證件號碼:</b><span>{selectCard.CertNO}</span>
  //           </div>
  //           <div>

  //             <b>有效期:</b><span>{formatDate(selectCard.CertValidTime)}</span>
  //           </div>

  //         </div> */}

  //         <div className="item persontitles">
  //           <div>
  //             <b>航空公司:</b>
  //             <Select
  //               size="small"
  //               className="select"
  //               onChange={(v) => handleSelectChange(v, 2)} >
  //               {companyOptions}
  //             </Select>
  //           </div>
  //           <div>
  //             <b>會員卡號:</b>
  //             <span>{selectCompany.CardNo}</span>
  //           </div>
  //         </div>
  //         <div className="item" style={{ marginTop: 10 }}><b>備註:</b>&nbsp; 
  //         <span>
  //          {hobby[0]?hobby[0].Remark:""}
  //           </span>
  //           &nbsp; &nbsp;
  //           {Remarkss&& <span>{Remarkss}</span>}
  //           </div>
  //       </Card>
  //     )
  //   } 
    
  //   else {
  //     return null
  //   }

  // }
}

const mapStateToProps = (state) => {
  const { card, company, hobby, cadastral, selectCard, selectCompany, baseInfo ,CertInfoall,Remarkss} = state.travelAgencyPlatformReducer;
  return { card, company, hobby, cadastral, selectCard, selectCompany, baseInfo ,CertInfoall,Remarkss}
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleSelectChange(v, id) {
      dispatch(actionCreators.cardAndCompanyChange(v, id));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuotingPeople)