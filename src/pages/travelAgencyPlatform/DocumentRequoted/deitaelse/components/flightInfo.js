import React from 'react';
import Card from "../../../../components/card";
import { MergeCellsTable } from "../../../../../components/table/index";

import {Tag} from 'antd'

export default ({ data=[] }) => {
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
        { title: '航班', dataIndex: 'flyno', align: "center", },
        { title: '艙等', dataIndex: 'classtype', align: "center", },
        {
          title: '金额',
          dataIndex: 'money',
          align:"center",
          render: (txet,record) =>{
            // console.log(record,'recordrecord');
    
          return  <Tag color="red">¥{txet}</Tag>}
        },
      ]
    },
    
    {
      title: '出票旅行社',
      dataIndex: 'travelname',
      align:"center",
    }, 
  
  ]

    const mergeItems = ['empno', 'name', 'category'];
    // console.log(data,'------');
    return(
      <Card title="機票信息" className="flight-info">
        <MergeCellsTable
          data={data}
          columns={columns}
          rowKey={data.key}
          mergeItems={mergeItems}
        />
      </Card>
    )
}
  