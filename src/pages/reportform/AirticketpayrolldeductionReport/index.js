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
			rq: '', // 日期
			jplb: '', // 機票類別
		}
	}
	async componentDidMount() {
		let List = [{
			xuhao: 1,
			changshang: '程祥',
			jplb: '出差',
			yuefen: '7',
		}, {
			xuhao: 2,
			changshang: '程祥',
			jplb: '返臺休假',
			yuefen: '8',
		}]
		await this.setState({
			List
		})
	}
	// 廠商 變化
	csChange = (value) => {
		console.log('csChange====', value)
	}
	// 日期 變化
	rqChange = () => {
		console.log('rqChange====')
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
				width: 60,
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
				title: '月份',
				width: 60,
				dataIndex: 'yuefen',
				key: 'yuefen',
				align: 'center',
			},
			{
				title: '扣款人工號',
				width: 130,
				dataIndex: 'kkrgh',
				key: 'kkrgh',
				align: 'center',
			},
			{
				title: '扣款人姓名',
				width: 120,
				dataIndex: 'kkrxm',
				key: 'kkrxm',
				align: 'center',
			},
			{
				title: '票號',
				width: 150,
				dataIndex: 'pioahao',
				key: 'pioahao',
				align: 'center',
			},
			{
				title: '行程1日期',
				width: 120,
				dataIndex: 'xcrq1',
				key: 'xcrq1',
				align: 'center',
			},
			{
				title: '航班號1',
				width: 100,
				dataIndex: 'hbh1',
				key: 'hbh1',
				align: 'center',
			},
			{
				title: '行程1',
				width: 100,
				dataIndex: 'xc1',
				key: 'xc1',
				align: 'center',
			},
			{
				title: <div>
					<div>自費金額</div>
					<div>（RMB）</div>
				</div>,
				width: 100,
				dataIndex: 'zfje',
				key: 'zfje',
				align: 'center',
			},
			{
				title: '備註',
				width: 100,
				dataIndex: 'beizhu',
				key: 'beizhu',
				align: 'center',
				ellipsis: true
			}
		]
		return (
			<div className="AirticketpayrolldeductionReport">
				<p className="Query-conditions">查詢條件</p>
				{/* 查詢掉件 */}
				<Row style={{ marginBottom: '10px' }}>
					<Col span={6}>
						<span style={{ marginRight: '10px' }}>廠商</span>
						<Select placeholder="請選擇廠商" style={{ width: '140px' }} onChange={this.csChange}>
							<Option value="meiya">美亞</Option>
							<Option value="chengxiang">程祥</Option>
							<Option value="yuntong">雲通</Option>
						</Select>
					</Col>
					<Col span={8}>
						<span style={{ marginRight: '10px' }}>日期</span>
						<DatePicker placeholder="請選擇日期" onChange={this.rqChange} />
					</Col>
					<Col span={8}>
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
						size="middle"
					/>
				</div>
			</div>
		);
	}
}
export default Index
