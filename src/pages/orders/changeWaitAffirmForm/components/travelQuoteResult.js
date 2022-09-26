import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../../../../components/card';
import { actionCreators } from '../store'
import { MergeCellsTable } from '../../../../components/table/index'
import { Modal } from 'antd';
import LookChangeContent from '../components/lookChangeContent'

import axios from '../../../../axios/index';

import {Tag} from 'antd'
import { LOGIN } from '../../../../config/api';

class TravelQuoteResult extends Component {

    state = { visible: false }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    componentWillUnmount(){
        window.sessionStorage.removeItem('returnchange')
    }

    render() {
        let { data1,Amountdisplay, handleCheckDetail, showModal, hiddenModal, changeDetail, changePrice, returnPrice } = this.props;

        // console.log(data1);
        // // 退票
        // let arr1=[]
        // data1.map(item=>{
        //      if(item.IsReturn==="Y"){
        //          arr1.push(item)
        //      }
        // })

        //  // 改签票
        //  let arr2=[]
        //  data1.forEach(item=>{
        //     if(item.IsChange==="Y"){
        //         arr2.push(item)
        //     }
        // })

        // console.log(Amountdisplay,'改簽');
        // console.log(this.props);

        // let columns = [{
        //     title: '姓名',
        //     dataIndex: 'name',
        //     align: "center",
        // }, {
        //     title: '航程類別',
        //     dataIndex: 'category',
        //     align: "center",
        // }, {
        //     title: '行程',
        //     dataIndex: 'applyName',
        //     align: "center",
        //     children: [
        //         { title: '出發機場', dataIndex: 'fromAirport', align: "center", },
        //         { title: '到達機場', dataIndex: 'arriveAirport', align: "center", },
        //     ]
        // }, {
        //     title: '退票金額',
        //     dataIndex: 'money',
        //     align: "center",
        //     render: (text, record) => (<a
        //         href="javascript:;"
        //         onClick={() => {return handleCheckDetail(record.repUID)}}>
        //         查看
        // </a>)
        // }
        // ];
    //    9.6修改
    let arr=window.sessionStorage.getItem('returnchange')
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
              {title: arr,dataIndex: 'money',align:"center",render:text=>
                <Tag color='red'>
                    {`￥ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Tag>
              },
            ]
          }]
        const mergeItems = ['sex', 'name', 'category', ];
        // console.log(data1,'旅行社報價結果');
        // if(data1.length===0){
        //     columns = [{
        //         title: '姓名',
        //         dataIndex: 'name',
        //         align: "center",
        //     }, {
        //         title: '航程類別',
        //         dataIndex: 'category',
        //         align: "center",
        //     }, {
        //         title: '行程',
        //         dataIndex: 'applyName',
        //         align: "center",
        //         children: [
        //             { title: '出發機場', dataIndex: 'fromAirport', align: "center", },
        //             { title: '到達機場', dataIndex: 'arriveAirport', align: "center", },
        //         ]
        //     }, {
        //         title: '退票金額',
        //         dataIndex: 'check',
        //         align: "center",
        //     }
        //     ];
        //     data1=[
        //       {
        //         key: 1,
        //         name: <span >——</span>,
        //         category: <span >——</span>,
        //         fromAirport: <span >——</span>,
        //         arriveAirport:<span >——</span> ,
        //         check:<span >——</span> ,
        //       }]
        //   }
        return (
            <Card title="旅行社報價結果">
                <MergeCellsTable
                    data={data1}
                    columns={columns}
                    rowKey={data1.key}
                    mergeItems={mergeItems}
                />
                {/* <Modal  
                    title="旅行社報價結果"
                    visible={showModal}
                    width={1200}
                    onCancel={hiddenModal}
                    footer={null}
                >
                    <LookChangeContent
                        data={changeDetail}
                        changePrice={changePrice}
                        returnPrice={returnPrice} />
                </Modal> */}
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    const { showModal, changeDetail, changePrice, returnPrice } = state.ordersReducer.changeWaitAffirmFormReducer;
    return { showModal, changeDetail, changePrice, returnPrice }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleCheckDetail(uid) {
            dispatch(actionCreators.checkDetail(uid))
        },
        hiddenModal() {
            dispatch(actionCreators.hiddenModal())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TravelQuoteResult)