import React, { Component } from 'react'

import { List, Tag, DatePicker, TimePicker, Switch, Row, Select, Table, Input, Form } from "antd";
import moment from "moment";

// import './Oredrlist.less'

import './newtablelist.less'


class newtablelistone extends Component {
    state = {
        flyDateTo: '',
        flyStartTime: '',
        flyEndTime: "",
        carNeed: ''
    }

    dateonChange = (date, dateString) => {
        // console.log( dateString);
        this.setState({
            flyDateTo: dateString,
        })
    }
    flyStartTimeChange = (date, dateString) => {
        // console.log( dateString,'flyStartTimeChange');
        this.setState({
            flyStartTime: dateString,
        })
    }
    flyEndTimeChange = (date, dateString) => {
        // console.log( dateString);
        this.setState({
            flyEndTime: dateString,
        })
    }
    onChange = (checked) => {
        // console.log(checked);
        this.setState({
            carNeed: checked,
        })
        // console.log(this.state,'state');
    }


    render() {
        const { form, data, editData, arr } = this.props;
        const { getFieldDecorator } = form;
        const format = 'HH:mm'
        const { category, detail } = editData;
        console.log('detail==============', detail);
        const renderContent = (text, record, index) => {
            console.log('text, record, index===', text, record, index)
            console.log('detail===', detail)
            if (index < detail.length - 1 && record.name === detail[index + 1].name && record.empno === detail[index + 1].empno && record.category === detail[index + 1].category) {
                return {
                    children: <span>{text}</span>,
                    props: {
                        rowSpan: 2,
                    },
                }
            }
            if (index > 0 && record.name === detail[index - 1].name && record.empno === detail[index - 1].empno && record.category === detail[index - 1].category) {
                return {
                    children: <span>{text}</span>,
                    props: {
                        rowSpan: 0,
                    },
                }
            }
            return <span>{text}</span>
        }

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            align: "center",
            render: renderContent,
        }, {
            title: '工號',
            dataIndex: 'empno',
            align: "center",
            render: renderContent,
        }, {
            title: '航程類別',
            dataIndex: 'category',
            align: "center",
            render: renderContent,
        }, {
            title: '行程',
            dataIndex: 'applyName',
            align: "center",
            children: [
                { title: '出發機場', dataIndex: 'fromAirport', align: "center", },
                { title: '到達機場', dataIndex: 'arriveAirport', align: "center", },
                {
                    title: '起飛日期', dataIndex: 'flyDateTo', align: "center",
                    render: (text, record) => {
                        let value = text ? 'initialValue' : 'other';
                        // console.log('1111111',record.id)
                        return getFieldDecorator('flyDateTo' + record.id, {
                            [value]: moment(text, 'YYYY-MM-DD '),
                            rules: [{ required: true, message: '起飞日期不能为空!' }],
                        })(
                            <DatePicker onChange={this.dateonChange}
                                format="YYYY-MM-DD"
                                // showTime={{ format: 'HH:mm' }}
                                className='Departuredate' size='small' />
                        )

                    }
                },
                {
                    title: '起飛时间区间', dataIndex: 'flyDateTogo', align: "center", render: (text, record) => (
                        <div>
                            {
                                getFieldDecorator('flyStartTime' + record.id, {
                                    rules: [{ required: false, message: '請輸入起飛時間!' }],
                                })(
                                    <TimePicker size='small' onChange={this.flyStartTimeChange} minuteStep={30} format={format} />
                                )
                            }
                            ~
                            {
                                getFieldDecorator('flyEndTime' + record.id, {
                                    rules: [{ required: true, message: '請輸入起飛截止時間!' }],
                                })(
                                    <TimePicker onChange={this.flyEndTimeChange} size='small' minuteStep={30} format={format} />
                                )
                            }
                        </div>
                    )
                },
                // {
                //     title: '交通车', dataIndex: 'money', align: "center", render: (text, record) => (
                //         <div>
                //             {getFieldDecorator('carNeed'+record.key, { initialValue: false })(
                //                 <Switch onChange={this.onChange} className="card-need" size="small" />
                //             )}
                //         </div>
                //     )
                // },
            ]
        }]
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={detail}
                    rowKey={detail.key}
                    bordered
                    onRow={this.onRow}
                    size="middle"
                    pagination={false}
                // scroll={{ x: 1100 }}
                />
            </div>
        )
    }
}

export default Form.create()(newtablelistone);
