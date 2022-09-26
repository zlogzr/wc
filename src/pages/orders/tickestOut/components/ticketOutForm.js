import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../../../../components/card';
import {MergeCellsTable} from '../../../../components/table/index'

import {Tag} from 'antd'

class TicketOutForm extends Component {
    render(){

        const { ticketOutForm } = this.props;
        
        const columns = [{
          title: '姓名',
          dataIndex: 'name',
          align:"center",
          className: 'abc',
          
        }, {
          title: '性別',
          dataIndex: 'sex',
          align:"center",
          className: 'abc',
        }, {
          title: '航程類別',
          dataIndex: 'category',
          align:"center",
          className: 'abc',
        }, {
          title: '行程',
          dataIndex: 'applyName',
          align:"center",
          children: [
            {title: '起飛時間',dataIndex: 'flyDate',align:"center",},
            {title: '出發機場',dataIndex: 'fromAirport',align:"center",},
            {title: '到達機場',dataIndex: 'arriveAirport',align:"center",},
            {title: '航班',dataIndex: 'flight',align:"center",},
            {title: '金額',dataIndex: 'money',align:"center",render: text => <Tag color="red">{`￥ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Tag>},
          ]
          },
          {
            title: '備註',
            dataIndex: 'remark',
            align:"center",
            render:(text,record)=>{
              return <div style={{width:'100px', height:'20PX',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}} title={text}>{text}</div>
            }
          }, 
        ]
        return(
            <Card title="機票信息">
             <MergeCellsTable
          data={ticketOutForm}
          columns={columns}
          rowKey={ticketOutForm.key}
          mergeItems={['name', 'sex', 'category']}
        />
            </Card>
        )
    }
}
    
const mapStateToProps = ( state ) => {
  const{ticketOutForm} =state.ordersReducer.ticketsOutReducer;
    return{ticketOutForm}
}
const mapDispatchToProps = ( dispatch ) => {
    return{}
}
export default connect( mapStateToProps, mapDispatchToProps )( TicketOutForm )