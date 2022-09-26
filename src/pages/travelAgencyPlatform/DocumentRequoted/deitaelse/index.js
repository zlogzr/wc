import React, { Component } from 'react'
import { Card, Button,Tag,message } from "antd";
// import { getUrlParam } from "../../../../utils/index";

import axios from '../../../../axios'


import { MergeCellsTable } from "../../../../components/table/index";

import './index.less'
export default class index extends Component {
  state={
    FlowDetail:'',    //头部信息
    FormDetail:'' ,  //类别等
    remark:'',   //备注
    TravelDetail:'',  //机票信息
  }

  componentDidMount() {
    // debugger
    // const formId = getUrlParam(this.urlParam, 'formId');
    this.getpagedata()
   
  }

  componentWillUnmount(){
    window.sessionStorage.removeItem('strids')
  }

   // 获取页面数据请求
   getpagedata = (formId) => {
    let data = sessionStorage.getItem("strids")
    axios.get({ url: 'MyForm/WaitReQuotePage', data: { SerialID: data,} })
      .then(data => {
        this.setState({FlowDetail:data.Data.FlowDetail})
        this.setState({FormDetail:data.Data.FormDetail})
        this.setState({remark:data.Data.remark})
        this.setState({TravelDetail:data.Data.TravelDetail})
        
      })
      .catch(err => {
        message.error("獲取頁面數據出錯")
      })
  }

  render() {
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      align:"center",
    }, {
      title: '航程類別',
      dataIndex: 'category',
      align:"center",
    }, {
      title: '行程',
      dataIndex: 'applyName',
      align:"center",
      children: [
        {title: '起飛時間',dataIndex: 'dateSection',align:"center",},
        {title: '出發機場',dataIndex: 'fromAirport',align:"center",},
        {title: '到達機場',dataIndex: 'arriveAirport',align:"center",},
        // { title: '航班', dataIndex: 'flyno', align: "center", },
        // { title: '艙等', dataIndex: 'classtype', align: "center", },
        // {
        //   title: '金额',
        //   dataIndex: 'money',
        //   align:"center",
        //   render: (txet,record) =>{
        //     // console.log(record,'recordrecord');
    
        //   return  <Tag color="red">¥{txet}</Tag>}
        // },
      ]
    },
    
    // {
    //   title: '出票旅行社',
    //   dataIndex: 'travelname',
    //   align:"center",
    // }, 
  
  ]
  const {FlowDetail,FormDetail,remark,TravelDetail}= this.state

  // * 格式化航程信息顯示
  // */

 
 
 //    debugger
 
     let flightArr = [];
     let k = 0;
     for (const v of TravelDetail) {
         let personInfo = {
             empno: v.Empno,
             name: v.Chname,
             category: v.TripType === 'oneWay'? '單程' : v.TripType === 'twoWay'? '往返' : '多程',
         }
         for (const ele of v.Detail) {
             let obj = {
                 key: k++,
                 ...personInfo,
                 dateSection: ele.Astart + ' ~ ' + ele.Aend,
                 fromAirport: ele.StartAirportName,
                 arriveAirport: ele.EndAirportName,
                 money:ele.Cost,  //9.17增加金额
                 flyno:ele.FlyNo,   //增加航班号
                 classtype:ele.ClassType,   //艙等
                 travelname:ele.TravelName,
             }
             flightArr.push(obj);
         }
     }
    
 

    return (
      <Card title='待重新報價單據明细' className='titleretubtn'>
        <Button className='retubtn' onClick={() => { window.history.go(-1) }} size="small" style={{ width: 70, height: 30 }}>返回</Button>
        <ul class="form-info formchangessh">
          <li><b>流水號</b> <span class="content">{FlowDetail.SequenceID}</span></li>
          <li><b>目前步驟</b> <span class="content">{FlowDetail.StepName}</span></li>
          <li><b>填單人</b> <span class="content">{FlowDetail.ApplyName}</span></li>
          <li><b>填單時間</b> <span class="content">{FlowDetail.ApplyDateTime}</span></li>
          <li><b>類別</b> <span class="content">{FormDetail.TravelTypeName}</span></li>
          <li><b>備註</b> <span class="content">{remark}</span></li>
          <li><b>附檔</b> <span class="content"><a href="&quot;undefined&quot;"></a></span></li>
          </ul>

          <Card title="機票信息" className="flight-info">
          <MergeCellsTable
          data={flightArr}
          columns={columns}
          // rowKey={data.key}
          // mergeItems={mergeItems}
         />
         </Card>

      </Card>
    )
  }
}
