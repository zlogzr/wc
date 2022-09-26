import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import FormInfo from '../components/formInfo'
import Card from '../../../components/card';
import { actionCreators } from '../store';
import { getUrlParam } from "../../../utils";
import { Tag, Button } from "antd";
import { MergeCellsTable } from "../../../components/table";
import BackChangeForm from "../components/backChangeForm";
import { baseURL } from "../../../axios/baseURL";

import Cordinfo from '../components/cardinfo'

import './index.less'
class WaitForTicketDetail extends Component {
  /**
   * 根據serialid在一組單據中獲取需要的單子
   */
  getData = (id, data) => {
    for (const v of data) {
      if (v.SerialID === id) {
        return v;
      }
    }
    return null;
  }

  handleTicketClose = () => {
    this.props.history.push('/travel-agency/ticket-out');
  }
  componentDidMount() {
    //獲取serialid
    const formid = getUrlParam(this.props.location.search, 'formId');
    //如果是p81f007則是退改簽，然後從對應的單據數組中取出對應單號的form信息
    let ticketList = /^P81F007/i.test(formid) ? this.props.ticketOutList2 : this.props.ticketOutList1;
    const formData = this.getData(formid, ticketList);
    //向後臺請求數據
    this.props.getTicketDetail(formData, this.props.history);
  }
  FileSy = () => {

    const { fileDown } = this.props
    var url = baseURL + `/maintain/OpenExcel?path=${fileDown.FilePath}&name=${fileDown.OFileName}`
    window.location.href = url
  }
  render() {
    const { TtfileDown, ticketListDetail, history, fileDown, isBackChangeTicketOut, ticketOutBackOrChange, backChangeForm, ticketNewListDetail, formInfo, cardinfo } = this.props;

    console.log(fileDown, 'fileDown=============')

    const columns = [
      // {title: '工號',dataIndex: 'empno',align:"center",}, 
      { title: '姓名', dataIndex: 'name', align: "center", },
      { title: '性別', dataIndex: 'gender', align: "center", },
      { title: '航程類別', dataIndex: 'category', align: "center", },
      {
        title: '行程', align: "center",
        children: [
          { title: '起飛時間', dataIndex: 'timeStart', align: "center", },
          { title: '出發機場', dataIndex: 'fromAirport', align: "center", },
          { title: '到達機場', dataIndex: 'arriveAirport', align: "center", },
          { title: '航班', dataIndex: 'flightNo', align: "center", },
          {
            title: `${ticketOutBackOrChange === 'back' ? '退票費' : '金額'}`,
            dataIndex: 'money',
            align: "center",
            render: text => <Tag color="red">{`￥ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Tag>
          },
        ]
      }]
    const changeTicketColumns = [
      // {title: '工號',dataIndex: 'empno',align:"center",}, 
      { title: '姓名', dataIndex: 'name', align: "center", },
      { title: '性別', dataIndex: 'gender', align: "center", },
      { title: '航程類別', dataIndex: 'category', align: "center", },
      {
        title: '行程', align: "center",
        children: [
          { title: '起飛時間', dataIndex: 'timeStart', align: "center", },
          { title: '出發機場', dataIndex: 'fromAirport', align: "center", },
          { title: '到達機場', dataIndex: 'arriveAirport', align: "center", },
          { title: '航班', dataIndex: 'flightNo', align: "center", },
          {
            title: `改簽費`,
            dataIndex: 'money',
            align: "center",
            render: text => <Tag color="red">{`￥ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Tag>
          },
        ]
      }]
    const mergeItems = ['empno', 'name', 'gender', 'category'];
    const title = isBackChangeTicketOut ? '原行程信息' : '出票明細';
    return (
      <div>
        {
          !isBackChangeTicketOut &&
          <FormInfo data={formInfo} />
        }
        {
          !isBackChangeTicketOut &&
          <Cordinfo CertInfo={cardinfo} />
        }

        {
          isBackChangeTicketOut &&
          <BackChangeForm data={formInfo} />
        }

        <Card title={title} className='card'>
          <Button className='retubtn' onClick={() => { window.history.go(-1) }} size="small" style={{ width: 70, height: 30 }}>返回</Button>

          <MergeCellsTable
            data={ticketListDetail}
            columns={columns}
            rowKey={ticketListDetail.key}
            mergeItems={mergeItems}
          />

          {
            ticketOutBackOrChange === 'change' &&
            <MergeCellsTable
              data={ticketNewListDetail}
              columns={changeTicketColumns}
              rowKey={ticketListDetail.key}
              mergeItems={mergeItems}
            />
          }
          {isBackChangeTicketOut ? (
            <div style={{ marginTop: 10 }}>
              {
                TtfileDown &&
                <div>
                  原行程單：
                  <a href={baseURL + `/maintain/OpenExcel?path=${TtfileDown.FilePath}&name=${TtfileDown.OFileName}`}>{TtfileDown.OFileName}</a>
                </div>
              }
            </div>
          ) : (
            <div style={{ marginTop: 10 }}>
              {
                fileDown &&
                <div>
                  行程單：
                  <a href={baseURL + `/maintain/OpenExcel?path=${fileDown.FilePath}&name=${fileDown.OFileName}`}>{fileDown.OFileName}</a>
                </div>
              }
            </div>
          )}
        </Card>
        {isBackChangeTicketOut && (
          <Card title='新行程信息' className='card'>
            <MergeCellsTable
              data={ticketNewListDetail}
              columns={columns}
              rowKey={ticketNewListDetail.key}
              mergeItems={mergeItems}
            />
            <div style={{ marginTop: 10 }}>
              {
                fileDown &&
                <div>
                  憑證：
                  <a href={baseURL + `/maintain/OpenExcel?path=${fileDown.FilePath}&name=${fileDown.OFileName}`}>{fileDown.OFileName}</a>
                </div>
              }
            </div>
          </Card>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { TtfileDown, ticketOutList1, ticketOutList2, ticketListDetail, fileDown, isBackChangeTicketOut, ticketOutBackOrChange, backChangeForm, formInfo, ticketNewListDetail, cardinfo } = state.travelAgencyPlatformReducer;
  return { TtfileDown, ticketOutList1, ticketOutList2, ticketListDetail, fileDown, isBackChangeTicketOut, ticketOutBackOrChange, backChangeForm, formInfo, ticketNewListDetail, cardinfo }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getTicketDetail(formData, history) {
      dispatch(actionCreators.getTicketDetail(formData, history))
    },
    uploadFile(file) {
      dispatch(actionCreators.uploadFile(file))
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WaitForTicketDetail))