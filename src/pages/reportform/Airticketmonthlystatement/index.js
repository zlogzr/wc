import React, { Component } from "react";
import { DatePicker, Table, Row, Col, Select } from "antd";
import './index.less'

const { Option } = Select

class Index extends Component {
  constructor() {
    super()
    this.state = {
      List: [], // 表格数据
      changshang: '', // 廠商
      cprq: '', // 出票日期
      gonghao: '', // 工號
      jplb: '', // 機票類別
    }
  }
  async componentDidMount() {
    let List = [
      {
        xuhao: 1,
        changshang: '程祥',
        jplb: '出差',
        cprq: '2021-5-5',
      }, {
        xuhao: 2,
        changshang: '程祥',
        jplb: '返臺休假',
        cprq: '2021-5-5',
      },
      {
        xuhao: 1,
        changshang: '程祥',
        jplb: '出差',
        cprq: '2021-5-5',
      }, {
        xuhao: 2,
        changshang: '程祥',
        jplb: '返臺休假',
        cprq: '2021-5-5',
      },
      {
        xuhao: 1,
        changshang: '程祥',
        jplb: '出差',
        cprq: '2021-5-5',
      }, {
        xuhao: 2,
        changshang: '程祥',
        jplb: '返臺休假',
        cprq: '2021-5-5',
      },
      {
        xuhao: 1,
        changshang: '程祥',
        jplb: '出差',
        cprq: '2021-5-5',
      }, {
        xuhao: 2,
        changshang: '程祥',
        jplb: '返臺休假',
        cprq: '2021-5-5',
      },
      {
        xuhao: 1,
        changshang: '程祥',
        jplb: '出差',
        cprq: '2021-5-5',
      }, {
        xuhao: 2,
        changshang: '程祥',
        jplb: '返臺休假',
        cprq: '2021-5-5',
      },
      {
        xuhao: 1,
        changshang: '程祥',
        jplb: '出差',
        cprq: '2021-5-5',
      }, {
        xuhao: 2,
        changshang: '程祥',
        jplb: '返臺休假',
        cprq: '2021-5-5',
      },
    ]
    await this.setState({
      List
    })
  }
  // 廠商 變化
  csChange = (value) => {
    console.log('csChange====', value)
  }
  // 出票日期 變化
  cprqChange = () => {
    console.log('cprqChange====')
  }
  // 工號 變化
  ghChange = () => {
    console.log('ghChange====')
  }
  // 機票類別 變化
  jplbChange = () => {
    console.log('jplbChange====')
  }
  // 查詢
  cxClick = () => {
    console.log('查詢')
  }
  // 下載
  xzClick = () => {
    console.log('下載')
  }
  render() {
    const { List } = this.state
    // 表格配置
    const columns = [
      {
        title: '序號',
        width: 70,
        dataIndex: 'xuhao',
        key: 'xuhao',
        align: 'center',
      },
      {
        title: '廠商',
        width: 70,
        dataIndex: 'changshang',
        key: 'changshang',
        align: 'center',
      },
      {
        title: '機票類別',
        width: 100,
        dataIndex: 'jplb',
        key: 'jplb',
        align: 'center',
      },
      {
        title: '出票日期',
        width: 100,
        dataIndex: 'cprq',
        key: 'cprq',
        align: 'center',
      },
      {
        title: '票號',
        width: 140,
        dataIndex: 'pioahao',
        key: 'pioahao',
        align: 'center',
      },
      {
        title: '姓名',
        width: 90,
        dataIndex: 'xingming',
        key: 'xingming',
        align: 'center',
      },
      {
        title: '工號',
        width: 120,
        dataIndex: 'gonghao',
        key: 'gonghao',
        align: 'center',
      },
      {
        title: '人員類別',
        width: 140,
        dataIndex: 'rylb',
        key: 'rylb',
        align: 'center',
      },
      {
        title: '職稱',
        width: 100,
        dataIndex: 'zhicheng',
        key: 'zhicheng',
        align: 'center',
      },
      {
        title: '人所在部門',
        width: 140,
        dataIndex: 'rszbm',
        key: 'rszbm',
        align: 'center',
      },
      {
        title: '行程日期',
        width: 140,
        dataIndex: 'xcrq',
        key: 'xcrq',
        align: 'center',
      },
      {
        title: '航班',
        width: 150,
        dataIndex: 'hangban',
        key: 'hangban',
        align: 'center',
      },
      {
        title: '行程',
        width: 150,
        dataIndex: 'xingcheng',
        key: 'xingcheng',
        align: 'center',
      },
      {
        title: '退票費',
        width: 80,
        dataIndex: 'tpf',
        key: 'tpf',
        align: 'center',
      },
      {
        title: '改期費',
        width: 80,
        dataIndex: 'gqf',
        key: 'gqf',
        align: 'center',
      },
      {
        title: <div>
          <div>實應收款</div>
          <div>（RMB）</div>
        </div>,
        width: 140,
        dataIndex: 'sysk',
        key: 'sysk',
        align: 'center',
      }
    ]
    return (
      <div className="monthlystatement">
        <p className="Query-conditions">查詢條件</p>
        {/* 查詢掉件 */}
        <Row style={{ marginBottom: '10px' }}>
          <Col span={5}>
            <span style={{ marginRight: '10px' }}>廠商</span>
            <Select placeholder="請選擇廠商" style={{ width: '140px' }} onChange={this.csChange}>
              <Option value="meiya">美亞</Option>
              <Option value="chengxiang">程祥</Option>
              <Option value="yuntong">雲通</Option>
            </Select>
          </Col>
          <Col span={6}>
            <span style={{ marginRight: '10px' }}>出票日期</span>
            <DatePicker placeholder="請選擇出票日期" onChange={this.cprqChange} />
          </Col>
          <Col span={5}>
            <span style={{ marginRight: '10px' }}>工號</span>
            <Select placeholder="請選擇工號" style={{ width: '160px' }} onChange={this.ghChange}>
              <Option value="wh001">wh001</Option>
              <Option value="wh002">wh002</Option>
            </Select>
          </Col>
          <Col span={6}>
            <span style={{ marginRight: '10px' }}>機票類別</span>
            <Select placeholder="請選擇機票類別" style={{ width: '150px' }} onChange={this.jplbChange}>
              <Option value="chuchai">出差</Option>
              <Option value="ftxj">返臺休假</Option>
            </Select>
          </Col>
          <Col span={2}>
            <button style={{ float: 'right', width: '80px' }} onClick={this.cxClick}>查詢</button>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={24}>
            <button style={{ width: '80px' }} onClick={this.xzClick}>下載</button>
          </Col>
        </Row>
        {/* 表格 */}
        <div>
          <Table
            columns={columns}
            dataSource={List}
            bordered
            scroll={{ x: 1200 }}
            size="middle"
          />
        </div>
      </div>
    );
  }
}
export default Index
