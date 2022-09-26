import React, { Component } from "react";
import { DatePicker, Table, Row, Col, Select } from "antd";
import './index.less'

const { Option } = Select

class Index extends Component {
	constructor() {
		super()
		this.state = {
			List: [], // 表格数据
			gsb: '', // 公司別
			nianfen: '', // 年份
			sqrbm: '', // 申請人部門
			gzbm: '', // 掛賬部門
			changbie: '', // 廠別
		}
	}
	async componentDidMount() {
		let List = [{
			xuhao: 1333,
			sqr: '張三散散',
			gonghao: '790,000',
			jplb: 'Homeleave機票',
			sqrbm: 'MZUXXX',
			xc1: '北京-上海',
			xcrq: '2021/3/1',
			jpfy: '10,000'
		}, {
			xuhao: 1,
			sqr: '李四',
			gonghao: 'wh002',
			jplb: '返臺休假',
			xc1: '重慶-石家莊',
		}]
		await this.setState({
			List
		})
	}
	// 公司別 變化
	gsbChange = (value) => {
		console.log('csChange====', value)
	}
	// 年份 變化
	nfChange = () => {
		console.log('cprqChange====')
	}
	// 申請人部門 變化
	sqrbmChange = () => {
		console.log('jplbChange====')
	}
	// 掛賬部門 變化
	gzbmChange = () => {
		console.log('jplbChange====')
	}
	// 廠別 變化
	cbChange = () => {
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
				title: '申請人',
				width: 80,
				dataIndex: 'sqr',
				key: 'sqr',
				align: 'center',
			},
			{
				title: '工號',
				width: 70,
				dataIndex: 'gonghao',
				key: 'gonghao',
				align: 'center',
			},
			{
				title: '申請人部門',
				width: 90,
				dataIndex: 'sqrbm',
				key: 'sqrbm',
				align: 'center',
			},
			{
				title: '掛賬部門',
				width: 90,
				dataIndex: 'gzbm',
				key: 'gzbm',
				align: 'center',
			},
			{
				title: '機票類別',
				width: 140,
				dataIndex: 'jplb',
				key: 'jplb',
				align: 'center',
			},
			{
				title: '行程日期',
				width: 105,
				dataIndex: 'xcrq',
				key: 'xcrq',
				align: 'center',
			},
			{
				title: '航班1',
				width: 100,
				dataIndex: 'hb1',
				key: 'hb1',
				align: 'center',
			},
			{
				title: '行程1',
				width: 115,
				dataIndex: 'xc1',
				key: 'xc1',
				align: 'center',
			},
			{
				title: '機票費用',
				width: 90,
				dataIndex: 'jpfy',
				key: 'jpfy',
				align: 'center',
			},
			{
				title: '公司別',
				width: 85,
				dataIndex: 'gsb',
				key: 'gsb',
				align: 'center',
			},
			{
				title: '廠別',
				width: 85,
				dataIndex: 'changbie',
				key: 'changbie',
				align: 'center',
			},
			{
				title: '備註',
				width: 90,
				dataIndex: 'beizhu',
				key: 'beizhu',
				align: 'center',
				ellipsis: true
			}
		]
		return (
			<div className="Airticketcostanalysisreport">
				<p className="Query-conditions">查詢條件</p>
				{/* 查詢掉件 */}
				<Row style={{ marginBottom: '10px' }}>
					<Col span={4}>
						<span style={{ marginRight: '10px' }}>公司別</span>
						<Select placeholder="請選擇公司別" style={{ width: '110px' }} onChange={this.gsbChange}>
							<Option value="130">130</Option>
							<Option value="131">131</Option>
							<Option value="13A">13A</Option>
						</Select>
					</Col>
					<Col span={5}>
						<span style={{ marginRight: '10px' }}>年份</span>
						<DatePicker placeholder="請選擇日期" onChange={this.rqChange} />
					</Col>
					<Col span={6}>
						<span style={{ marginRight: '10px' }}>申請人部門</span>
						<Select placeholder="請選擇申請人部門" style={{ width: '160px' }} onChange={this.sqrbmChange}>
							<Option value="部門1">部門1</Option>
							<Option value="部門2">部門2</Option>
						</Select>
					</Col>
					<Col span={5}>
						<span style={{ marginRight: '10px' }}>掛賬部門</span>
						<Select placeholder="請選擇掛賬部門" style={{ width: '160px' }} onChange={this.gzbmChange}>
							<Option value="部門1">部門1</Option>
							<Option value="部門2">部門2</Option>
						</Select>
					</Col>
					<Col span={4}>
						<span style={{ marginRight: '10px' }}>廠別</span>
						<Select placeholder="請選擇廠別" style={{ width: '140px' }} onChange={this.cbChange}>
							<Option value="部門1">部門1</Option>
							<Option value="部門2">部門2</Option>
						</Select>
					</Col>
				</Row>
				<Row style={{ marginBottom: '10px' }}>
					<Col span={24}>
						<button style={{ width: '80px', marginRight: '10px' }} onClick={this.cxClick}>查詢</button>
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
