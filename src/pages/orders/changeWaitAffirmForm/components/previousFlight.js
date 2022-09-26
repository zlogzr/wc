import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Checkbox } from 'antd';
import Card from '../../../../components/card';
import {MergeCellsTable} from '../../../../components/table/index'

import { Tag, } from "antd";

export default ({ data=[] }) => {
  
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      align:"center",
    },{
      title: '航程類別',
      dataIndex: 'category',
      align:"center",
    }, {
      title: '行程',
      dataIndex: 'applyName',
      align:"center",
      children: [
        {title: '出發機場',dataIndex: 'fromAirport',align:"center",},
        {title: '到達機場',dataIndex: 'arriveAirport',align:"center",},
        {title: '航班',dataIndex: 'flightNo',align:"center",},
        {title: '起飛時間',dataIndex: 'dateSection',align:"center",},
        {title: '金額',dataIndex: 'money',align:"center", render: text => <Tag color="red">{`￥ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Tag>},
      ]
    }]

    const mergeItems = [ 'sex', 'name', 'category'];
    if(data.length===0){
      data=[
        {
          key: 1,
          name: <span >——</span>,
          category: <span >——</span>,
          applyName: <span >——</span>,
          fromAirport: <span >——</span>,
          flightNo:<span >——</span> ,
          dateSection:<span >——</span> ,
          money:<span >——</span> ,
        }]
    }
    return(
      <Card title="原行程" className="flight-info">
        <MergeCellsTable
          data={data}
          columns={columns}
          rowKey={data.key}
          mergeItems={mergeItems}
        />
      </Card>
    )
}