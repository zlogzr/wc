import React from "react";
// import Edit from "./edit";
import { List, Tag, DatePicker, TimePicker, Switch,Row, Select, Table, Input,} from "antd";
import moment from "moment";

// import './Oredrlist.less'

import './newtablelist.less'

const Item = List.Item;
const OrdersForBackChange = ({data, editData, ...props }) => {
    const { getFieldDecorator } = props.form;
    // const spanStyle = {
    //     paddingLeft: 5,
    //     paddingRight: 5
    // }
    const { category, detail } = editData;

    // console.log(this.props,'哈哈哈哈哈哈哈哈哈哈哈哈');
    const format='HH:mm'

    // console.log(editData,data,'第一次改签');
    const columns = [ {
        title: '姓名',
        dataIndex: 'name',
        align: "center",
      }, {
        title: '工號',
        dataIndex: 'empno',
        align: "center",
      }, {
        title: '航程類別',
        dataIndex: 'category',
        align: "center",
      }, {
        title: '行程',
        dataIndex: 'applyName',
        align: "center",
        children: [
          { title: '出發機場', dataIndex: 'fromAirport', align: "center", },
          { title: '到達機場', dataIndex: 'arriveAirport', align: "center", },
          { title: '起飛日期', dataIndex: 'flyDateTo', align: "center",
          render: (text, record) => {
            let value = text? 'initialValue' : 'other';
             return   getFieldDecorator('flyDateTo'+record.key, {
                [value]: moment(text, 'YYYY-MM-DD HH:mm'),
                    rules: [{ required: true, message: '起飞日期不能为空!' }],
                })(
                    <DatePicker className='Departuredate' size='small' />
                )
            
          }
          },
          { title: '起飛时间区间', dataIndex: 'flyDateTogo', align: "center", render: (text, record) => (
              <div>
                   {
                                getFieldDecorator('flyStartTime'+record.key , {
                                    rules: [{ required: false, message: 'Please select time!' }],
                                })(
                                    <TimePicker size='small' minuteStep={30} format={format}/>
                                )
                            }
                            ~
                            {
                                getFieldDecorator('flyEndTime'+record.key, {
                                    rules: [{ required: true, message: 'Please select time!' }],
                                })(
                                    <TimePicker size='small' minuteStep={30} format={format}/>
                                )
                            }
              </div>
          ) },
        //   { title: '交通车', dataIndex: 'money', align: "center", render: (text, record) => (
        //       <div>
        //     {getFieldDecorator('carNeed' , { initialValue: false })(
        //         <Switch className="card-need" size="small"/>
        //     )} 
        //     </div>
        //   )
        //   },
        ]
      }]
    return (
    <div>
    {/* <List className="BCT">
        {
            detail.map((v, k) => {//頁面樣式的寫入，還有時間格式的填寫
                return (
                    <Item key={k} className='itemshs'>
                       <Row>
                        <Tag color="green" style={{padding:'none'}}>乘機人</Tag><span style={spanStyle}>{v.name}</span>
                        <Tag color="green">行程類型</Tag><span style={spanStyle}>{v.category}</span>
                        <Tag color="green">出發機場</Tag><span style={spanStyle}>{v.fromAirport}</span>
                        <Tag color="green">到達機場</Tag><span style={spanStyle}>{v.arriveAirport}</span>
                        </Row>
                        <Row>
                        <div>
                        <Tag color="green">出發日期</Tag>
                        <span>
                            {
                                getFieldDecorator('flyDateTo' + k, {
                                    rules: [{ required: true, message: 'Please select date!' }],
                                })(
                                    <DatePicker className='Departuredate' size='small' />
                                )
                            }
                        </span>
                        <Tag color="green">起飛時間區間</Tag>
                        <span>
                            {
                                getFieldDecorator('flyStartTime' + k, {
                                    rules: [{ required: true, message: 'Please select time!' }],
                                })(
                                    <TimePicker size='small' minuteStep={30} format={format}/>
                                )
                            }
                            ~
                            {
                                getFieldDecorator('flyEndTime' + k, {
                                    rules: [{ required: true, message: 'Please select time!' }],
                                })(
                                    <TimePicker size='small' minuteStep={30} format={format}/>
                                )
                            }
                        </span>
                        <Tag color="green" className='Trafficvehicle' >交通車</Tag>
                        <span>
                            {getFieldDecorator('carNeed' + k, { initialValue: false })(
                                <Switch className="card-need" size="small"/>
                            )}
                        </span>
                        </div>
                        </Row>
                        
                    </Item>
                )
            })
        }
    </List> */}

    {/* //  9.8新增 */}
    <Table 
    columns={columns}
    dataSource={detail}
    rowKey={'key'}
    bordered
    // onRow={this.onRow}
    size="middle"
    pagination={false}
    scroll={{x:1100}}
     />

</div>

    )
}

export default OrdersForBackChange;