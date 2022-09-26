import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Popconfirm, Row, Col, Table, Tag, message } from "antd";
import { getText, formatDate } from "../../../../utils";
import { deleteDraft } from '../store/actionCreators';
import axios from "../../../../axios";
import './personinfo.less'

class PersonInfo extends Component {
  state = {
    arr: [],
    a: "",
    flag: ''
  }

  onExpand = (expanded, record) => {
    //  console.log(expanded, record);
    if (expanded) {
      axios.get({ url: "/apply/info_Person", data: { Personid: record.empno_a, User_id: window.sessionStorage.getItem('userId') } }).then(res => {
        if (res.code === 1){
          this.setState({
            arr: res.Data.CertInfo
          })
          this.setState({
            flag: 1
          })
        }else if (res.code === 0){
          this.setState({
            arr: res.message
          })
          this.setState({
            flag: 2
          })
        }
      }).catch(err => {

      })
    } else if (!expanded) {
      this.setState({ arr: '',flag: 0 })
    }
  }
  onExpandedRowsChange = (expandedRows) => {
    var a = [];

    if (expandedRows.length !== 0) {
      a.push(expandedRows[expandedRows.length - 1]);
    }

    if (expandedRows.length[0] === 0) {
      // this.setState({
      //   flag:false
      // })
    }
    this.setState({ a });
  }
  onRows = (e, a, b) => {
    // console.log(e,a,b);
    this.setState({
      a: ''
    })
  }
  /**
   * 顯示額外的數據
   */
  showExtraData = (record) => {
    if (this.state.flag == 1) {
      //console.log('额外显示数据' + JSON.stringify(this.state));
      this.state.flag = 0;
      return (this.state.arr && this.state.arr.map((v, i) => {

        return <div className="onbyonepersontitles" key={i}>
          <div className='Certificate-types' >
            <b>證件類型:</b>
            <span>{v.CertType}</span>
          </div>
          <div>
            <b>證件姓名:</b><span>{v.CertName}</span>
          </div>
          <div className='carodasdkname'>
            <b>證件號碼:</b><span>{v.CertNO}</span>
          </div>
          <div>
            <b>有效期:</b>{v.CertValidTime ? <span> {formatDate(v.CertValidTime)}</span> : <span>&nbsp; —— ——</span>}
          </div>
        </div>
      }))
    } else if(this.state.flag == 2){
      //alert("抱歉，助理只能訂購本部門同仁的機票，請點擊刪除!")
      message.warning('抱歉，助理只能訂購本部門同仁的機票，請點擊刪除!')
      this.setState({ arr: '', flag: 0 })
      return null
    }

    // return (
    //   <div className="extra-data">
    //     <Tag color="blue">證件類型:</Tag><span>{record.zjCategory_a}</span>
    //     <Tag color="blue">證件姓名:</Tag><span>{record.zjEnname_a}</span>
    //     <Tag color="blue">證件號:</Tag><span>{record.zjNo_a}</span>
    //     <Tag color="blue">證件有效期:</Tag><span>{record.zjDate_a}</span>
    //     {this.renderUnsure('cc_formid', record, '差旅單號')}
    //     {this.renderUnsure('gz_dept', record, '掛賬部門')}
    //     {this.renderUnsure('ftSequenId1', record, '返台述職單號')}
    //     {this.renderUnsure('ftSequenId', record, '返台述職類型')}
    //     {this.renderUnsure('familyGuanxi', record, '與本人關係')}
    //     {this.renderUnsure('familyName', record, '眷屬姓名')}
    //   </div>
    // )

  }

  /**
   * 如果存在則渲染
   */
  renderUnsure = (key, data, title) => {
    if (key in data) {
      let text = data[key];
      if (Array.isArray(data[key])) {
        const ftszitem = this.props.pageData.ftszItem
        text = this.showGoToTWItem(data[key], ftszitem);
      }
      return (
        <>
          <Tag color="blue">{title}:</Tag><span>{text}</span>
        </>
      )
    } else {
      return null
    }
  }
  /**
   * 顯示返台述職item文本
   */
  showGoToTWItem = (arr, data) => {
    let result = arr.map(v => getText(v, data, 'ViceName'));
    return result.join('，')
  }

  render() {
    let { familyData, deleteFamilyInfo } = this.props;
    // console.log(familyData);
    familyData.forEach((v, i) => {
      v.key = i
    })
    // console.log(familyData,'=-=');
    if (familyData.length === 0) {

      familyData = [
        {
          dept_a: "——",
          empno_a: "——",
          key: 0,
          nationality_a: "——",
          person_a: "——",
          phone_a: "——",
          sex_a: "——",
          zjCategory_a: "身份證",
          zjDate_a: "——",
          zjEnname_a: "——",
          zjNo_a: "——"
        }
      ]
    }
    const columns1 = [{ title: '乘機人工號', dataIndex: 'empno_a' },
    { title: '乘機人姓名', dataIndex: 'person_a' },
    { title: '乘機人性別', dataIndex: 'sex_a', },
    { title: '所屬部門', dataIndex: 'dept_a' },
    { title: '國籍', dataIndex: 'nationality_a' },
    { title: '手機號', dataIndex: 'phone_a' },
    {
      render: (text, record) => (
        <span>
          {/* <Divider type="vertical" /> */}
          <Popconfirm
            title="確定要刪除嗎?"
            onConfirm={() => deleteFamilyInfo(record)}
            onCancel={null}
            okText="是"
            cancelText="否">
            <a href="javascript:;">刪除</a>
          </Popconfirm>
        </span>
      ),
    }
    ]
    // console.log(familyData);

    return (
      <Row className="fill-form-assistant">
        <Col span="20" className='colzl' offset="1">
          <Table
            dataSource={familyData}
            expandedRowRender={this.showExtraData}

            columns={columns1}
            // rowKey='index'
            rowKey={familyData.empno_a}
            onExpand={this.onExpand}
            onExpandedRowsChange={this.onExpandedRowsChange}
            expandedRowKeys={this.state.a}
            onRowClick={this.onRows}
          />
          {/* <Table dataSource={familyData} columns={columns1} expandedRowRender={this.showExtraData} /> */}
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  const { familyData, category, formData, pageData } = state.fillFormReducer.fillFormAssistantReducer;
  return { familyData, category, formData, pageData }
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteFamilyInfo(record) {
      dispatch(deleteDraft(record));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonInfo)