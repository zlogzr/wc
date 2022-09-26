import React from 'react';
import Card from "../../../../components/card";
import { MergeCellsTable } from "../../../../components/table/index";

import { Tag } from 'antd'

export default ({ data1, data2 }) => {
  const columns = [
    //   {
    //   title: '工號',
    //   dataIndex: 'empno',
    //   align:"center",
    // }, 
    {
      title: '姓名',
      dataIndex: 'name',
      align: "center",
    }, {
      title: '航程類別',
      dataIndex: 'category',
      align: "center",
    }, {
      title: '行程',
      dataIndex: 'applyName',
      align: "center",
      children: [
        { title: '起飛時間', dataIndex: 'dateSection', align: "center", },
        { title: '出發機場', dataIndex: 'fromAirport', align: "center", },
        { title: '到達機場', dataIndex: 'arriveAirport', align: "center", },
        { title: '航班', dataIndex: 'flyno', align: "center", },
        { title: '艙等', dataIndex: 'classtype', align: "center", },
        {
          title: '金额',
          dataIndex: 'money',
          align: "center",
          render: (txet, record) => {

            return <Tag color="red">¥{txet}</Tag>
          }
        },
      ]
    },

    {
      title: '出票旅行社',
      dataIndex: 'travelname',
      align: "center",
    },
  ]

  // let didc=window.sessionStorage.getItem('Refundchange')
  let didc = '头部'

  const columnss = [{
    title: '姓名',
    dataIndex: 'name',
    align: "center",
    className: 'abc',

  }, {
    title: '性別',
    dataIndex: 'sex',
    align: "center",
    className: 'abc',
  }, {
    title: '航程類別',
    dataIndex: 'category',
    align: "center",
    className: 'abc',
  }, {
    title: '行程',
    dataIndex: 'applyName',
    align: "center",
    children: [
      { title: '起飛時間', dataIndex: 'flyDate', align: "center", },
      { title: '出發機場', dataIndex: 'fromAirport', align: "center", },
      { title: '到達機場', dataIndex: 'arriveAirport', align: "center", },
      { title: '航班', dataIndex: 'flight', align: "center", },
      { title: '金額', dataIndex: 'money', align: "center", render: text => <Tag color="red">{`￥ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Tag> },
    ]
  },
  {
    title: '備註',
    dataIndex: 'remark',
    align: "center",
    render: (text, record) => {
      return <div style={{ width: '100px', height: '20PX', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={text}>{text}</div>
    }
  },
  ]
  const mergeItems = ['empno', 'name', 'sex', 'category'];
  return (
    <div>
      {data1 !== null && (
        <Card title="原行程信息" className="sign-history">
          <MergeCellsTable
            // rowKey={data1.key}
            columns={columnss}
            data={data1}
            pagination={false}
            size="middle"
            mergeItems={mergeItems}
            bordered
          />
        </Card>
      )}
      {data2 !== null && (
        <Card title="新行程信息" className="sign-history">
          <MergeCellsTable
            // rowKey={data2.key}
            columns={columnss}
            data={data2}
            pagination={false}
            mergeItems={mergeItems}
            size="middle"
            bordered
          />
        </Card>
      )}
    </div>
  )
}