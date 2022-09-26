import React, { Component } from "react";
import { DatePicker, Table, Row, Col, Select } from "antd";
import './index.less'

const { Option } = Select

class Index extends Component {
	constructor() {
		super()
		this.state = {
			List: [], // 表格数据
			bjcs: '', // 報價廠商
			rq: '', // 日期
			jplx: '', // 機票類型
		}
	}
	async componentDidMount() {
		let List = [{
			xuhao: 1333,
			jpsqdh: 'T202108090001',
			cjr: '古力拉扎',
			gonghao: '200708721',
			xcrq: '2021-8-31 2021-09-30',
			xingcheng: '廣州-上海-廣州',
			hbh: 'HU7231 CZ5560',
			sqdtjrq: '2021/8/9 11:30:59'
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
		console.log('cprqChange====')
	}
	// 機票類型 變化
	jplxChange = () => {
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
				title: '機票申請單號',
				width: 120,
				dataIndex: 'jpsqdh',
				key: 'jpsqdh',
				align: 'center',
			},
			{
				title: '乘機人',
				width: 80,
				dataIndex: 'cjr',
				key: 'cjr',
				align: 'center',
			},
			{
				title: '工號',
				width: 90,
				dataIndex: 'gonghao',
				key: 'gonghao',
				align: 'center',
			},
			{
				title: '行程日期',
				width: 90,
				dataIndex: 'xcrq',
				key: 'xcrq',
				align: 'center',
			},
			{
				title: '行程',
				width: 130,
				dataIndex: 'xingcheng',
				key: 'xingcheng',
				align: 'center',
			},
			{
				title: '航班號',
				width: 90,
				dataIndex: 'hbh',
				key: 'hbh',
				align: 'center',
			},
			{
				title: '申請單提交日期',
				width: 140,
				dataIndex: 'sqdtjrq',
				key: 'sqdtjrq',
				align: 'center',
			},
			{
				title: '機票類型',
				width: 90,
				dataIndex: 'jplx',
				key: 'jplx',
				align: 'center',
			},
			{
				title: '程祥報價',
				width: 80,
				dataIndex: 'cxbj',
				key: 'cxbj',
				align: 'center',
			},
			{
				title: '美亞報價',
				width: 80,
				dataIndex: 'mybj',
				key: 'mybj',
				align: 'center',
			},
			{
				title: '雲通報價',
				width: 80,
				dataIndex: 'ytbj',
				key: 'ytbj',
				align: 'center',
			},
			{
				title: '中標廠商',
				width: 80,
				dataIndex: 'zbcs',
				key: 'zbcs',
				align: 'center',
			}
		]
		return (
			<div className="Ticketquotationrecordreport">
				<p className="Query-conditions">查詢條件</p>
				{/* 查詢掉件 */}
				<Row style={{ marginBottom: '10px' }}>
					<Col span={7}>
						<span style={{ marginRight: '10px' }}>報價廠商</span>
						<Select placeholder="請選擇報價廠商" style={{ width: '180px' }} onChange={this.csChange}>
							<Option value="meiya">美亞</Option>
							<Option value="chengxiang">程祥</Option>
							<Option value="yuntong">雲通</Option>
						</Select>
					</Col>
					<Col span={7}>
						<span style={{ marginRight: '10px' }}>日期</span>
						<DatePicker placeholder="請選擇日期" onChange={this.rqChange} />
					</Col>
					<Col span={7}>
						<span style={{ marginRight: '10px' }}>機票類型</span>
						<Select placeholder="請選擇機票類型" style={{ width: '160px' }} onChange={this.jplxChange}>
							<Option value="大陸">大陸</Option>
							<Option value="非大陸">非大陸</Option>
						</Select>
					</Col>
					<Col span={3}>
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
