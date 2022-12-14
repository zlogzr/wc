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
            title: '??????',
            dataIndex: 'name',
            align: "center",
            render: renderContent,
        }, {
            title: '??????',
            dataIndex: 'empno',
            align: "center",
            render: renderContent,
        }, {
            title: '????????????',
            dataIndex: 'category',
            align: "center",
            render: renderContent,
        }, {
            title: '??????',
            dataIndex: 'applyName',
            align: "center",
            children: [
                { title: '????????????', dataIndex: 'fromAirport', align: "center", },
                { title: '????????????', dataIndex: 'arriveAirport', align: "center", },
                {
                    title: '????????????', dataIndex: 'flyDateTo', align: "center",
                    render: (text, record) => {
                        let value = text ? 'initialValue' : 'other';
                        // console.log('1111111',record.id)
                        return getFieldDecorator('flyDateTo' + record.id, {
                            [value]: moment(text, 'YYYY-MM-DD '),
                            rules: [{ required: true, message: '????????????????????????!' }],
                        })(
                            <DatePicker onChange={this.dateonChange}
                                format="YYYY-MM-DD"
                                // showTime={{ format: 'HH:mm' }}
                                className='Departuredate' size='small' />
                        )

                    }
                },
                {
                    title: '??????????????????', dataIndex: 'flyDateTogo', align: "center", render: (text, record) => (
                        <div>
                            {
                                getFieldDecorator('flyStartTime' + record.id, {
                                    rules: [{ required: false, message: '?????????????????????!' }],
                                })(
                                    <TimePicker size='small' onChange={this.flyStartTimeChange} minuteStep={30} format={format} />
                                )
                            }
                            ~
                            {
                                getFieldDecorator('flyEndTime' + record.id, {
                                    rules: [{ required: true, message: '???????????????????????????!' }],
                                })(
                                    <TimePicker onChange={this.flyEndTimeChange} size='small' minuteStep={30} format={format} />
                                )
                            }
                        </div>
                    )
                },
                // {
                //     title: '?????????', dataIndex: 'money', align: "center", render: (text, record) => (
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
