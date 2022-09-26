import React from 'react';
import Card from "../../../../components/card";
import { MergeCellsTable } from "../../../../components/table/index";
import {Tag} from 'antd'
export default  ({data1, data2}) => {



  const columns = [
  //   {
  //   title: '工號',
  //   dataIndex: 'empno',
  //   align:"center",
  // }, 
  {
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
      {title: '起飛時間',dataIndex: 'FlyTime',align:"center",},
      {title: '出發機場',dataIndex: 'fromAirport',align:"center",},
      {title: '到達機場',dataIndex: 'arriveAirport',align:"center",},
      { title: '航班', dataIndex: 'flyno', align: "center", },
      { title: '艙等', dataIndex: 'classtype', align: "center", },
      {
        title: '金额',
        dataIndex: 'money',
        align:"center",
        render: (txet,record) =>{
        
    
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
    return(
      <div>
        <Card title="原行程信息" className="sign-history">
          <MergeCellsTable
            rowKey={data1.key}
            columns={columns}
            data={data1}
            pagination={false}
            size="middle"
            mergeItems={mergeItems}
            bordered
          />
        </Card>
        <Card title="新行程信息" className="sign-history">
          <MergeCellsTable
            rowKey={data2.key}
            columns={columns}
            data={data2}
            pagination={false}
            mergeItems={mergeItems}
            size="middle"
            bordered
          />
        </Card>
      </div>
    )
}