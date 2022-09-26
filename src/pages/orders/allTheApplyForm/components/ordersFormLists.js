import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Tag } from "antd";
import { actionCreators } from "../store"

import './ordersignFormListData.less'

// 所有申请单渲染页面
class OrdersFormLists extends Component {
  state = {
    flag: false,
  }
  componentDidMount() {
    //通过id不同判断要请求的页面数据，是所有的單據还是簽核中單據的
    this.props.getPageData(this.props.id);
    // console.log(this.props.id,'this.props.getPageData(this.props.id);');
    // console.log(this.props,'this.props');

  }
  componentWillUnmount() {
    this.props = '';
  }





  render() {
    let { signFormListData } = this.props;
    // console.log(signFormListData);
    let ids = this.props.id
    // console.log(this.props.id);

    let signFormListData1 = [];
    let  signFormListDatalest=[]
    let  signFormListData11=[]
    // let  signFormListDatalests=[]

    let columns1 = [{
      title: '單號',
      dataIndex: 'formId',
      align: "center",
      render: (text, record) => (
        <Link
          to={{
            pathname: '/orders/details',
            search: `?formId=${text}&formName=${record.formName}&id=${this.props.id}&serialId=${record.serialId}`
          }}
        >
          {text}
        </Link>
      )
    }, {
      title: '表單名稱',
      dataIndex: 'formName',
      align: "center"
    }, {
      title: '機票日期',
      dataIndex: 'ticketDate',
      align: "center"
    },
    {
      title: '目的地',
      dataIndex: 'endAirportname',
      align: "center"
    },
    //  {
    //   title: '填單日期',
    //   dataIndex: 'fillDate',
    //   align:"center"
    // },
    {
      title: '乘機人',
      dataIndex: 'passengers',
      align: "center"
    }, {
      title: '目前狀態',
      dataIndex: 'status',
      align: "center",
      render: text => <Tag color="blue">{text}</Tag>
    }]

    let columns = [{
      title: '單號',
      dataIndex: 'formId',
      align: "center",
      render: (text, record) => (
        <Link
          to={{
            pathname: '/orders/details',
            search: `?formId=${text}&formName=${record.formName}&id=${this.props.id}&serialId=${record.serialId}`
          }}
        >
          {text}
        </Link>
      )
    }, {
      title: '表單名稱',
      dataIndex: 'formName',
      align: "center"
    }, {
      title: '填單日期',
      dataIndex: 'fillDate',
      align: "center"
    }, {
      title: '填單人',
      dataIndex: 'applyName',
      align: "center"
    }, {
      title: '目前狀態',
      dataIndex: 'status',
      align: "center",
      render: text => <Tag color="blue">{text}</Tag>
    }]
    const expandedRowRender = (e) => {
      // console.log(e);
      const columns = [
        { title: '機票日期', dataIndex: 'ticketDate', align: "center", },
        { title: '目的地', dataIndex: 'endAirportname', align: "center", },
      ];
      const data = [];
      // console.log(signFormListDatalest);
      signFormListDatalest.forEach(item=>{
        if(e.formId===item.formId){
          // console.log(111);
          data.push(item)
        }
      })
      return <Table colSpan={2} className='signFormListDatalest' style={{width:'103%' ,padding:'0 0 0 6px'}} columns={columns} dataSource={data} pagination={false} />;
    };

    if (ids === '1') {
      let arrs=[...signFormListData]
      signFormListDatalest=arrs.sort((a,b)=>{
        // debugger
        return a.formId.localeCompare(b.formId, 'zh')
      })
      // 處理上行數據
      let map = new Map()
      signFormListData1 = signFormListData.filter(item => {
        if (!map.get(item.formId)) {
          map.set(item.formId, item.formId)
          return item;
        }
      })

      signFormListData11=signFormListData1.sort((a,b)=>{
        // debugger
        // let t1 = new Date(Date.parse(a.fillDate.replace(/-/g,"/")))
        // let t2 = new Date(Date.parse(b.fillDate.replace(/-/g,"/")))
        // return t2.getTime()-t1.getTime()
        a = new Date(a.fillDate);
        b = new Date(b.fillDate);
        return b-a;
        
      })
      // console.log(signFormListData11);
    
    }
  

    if (ids === '2' && !signFormListData.length) {
      columns = [{
        title: '單號',
        dataIndex: 'formId',
        align: "center",
      }, {
        title: '表單名稱',
        dataIndex: 'formName',
        align: "center"
      }, {
        title: '填單日期',
        dataIndex: 'fillDate',
        align: "center"
      }, {
        title: '填單人',
        dataIndex: 'applyName',
        align: "center"
      }, {
        title: '目前狀態',
        dataIndex: 'status',
        align: "center",
      }]
      signFormListData = [
        {
          key: 1,
          formId: '——',
          formName: '——',
          fillDate: '——',
          applyName: '——',
          status: '——'
        }]
    }
    if (ids === '1') {
      if (!signFormListData.length) {
        columns1 = [{
          title: '單號',
          dataIndex: 'formId',
          align: "center",
        }, {
          title: '表單名稱',
          dataIndex: 'formName',
          align: "center"
        }, {
          title: '機票日期',
          dataIndex: 'ticketDate',
          align: "center"
        },
        {
          title: '目的地',
          dataIndex: 'endAirportname',
          align: "center"
        },
        {
          title: '實際乘機人',
          dataIndex: 'passengers',
          align: "center"
        }, {
          title: '目前狀態',
          dataIndex: 'status',
          align: "center",
          render: text => <Tag color="blue">{text}</Tag>
        }]
        signFormListData1 = [
          {
            key: 1,
            formId: '——',
            formName: '——',
            endAirportname: '——',
            dataIndex: '——',
            ticketDate:'——',
            passengers: '——',
            fillDate: '——',
            applyName: '——',
            status: '——'
          }]
      }

    }






    return (
      <Table
        columns={ids === '1' ? columns1 : columns}
        dataSource={ids === '1' ? signFormListData11 : signFormListData}
        expandedRowRender={ids === '1' ? expandedRowRender : ''}
        pagination={{ hideOnSinglePage: true }}
        bordered={true}
        rowKey={'index'}
        size="middle"
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { signFormListData } = state.ordersReducer.allTheApplyFormReducer;
  return {
    signFormListData
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPageData(id) {
      dispatch(actionCreators.getPageData(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrdersFormLists)