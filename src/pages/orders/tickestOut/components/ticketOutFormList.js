import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import TicketOutSignList from '../components/ticketOutSignList'
import TicketOutForm from '../components/ticketOutForm';
import { actionCreators } from '../store'
import { baseURL } from "../../../../axios/baseURL";
import Ticketreturnchangefrom from '../components/ticketreturnchangefrom'



import "../index.less"

class TicketOutFormList extends Component {
    componentWillUnmount() {
        this.props.showListPage()
    }
    render() {
        const { ticketOutSignList, ticketOutForm, oldTravelDetail, status, fileDown } = this.props;

        return (
            <div className="orders">
                <TicketOutSignList data={ticketOutSignList} fileDown={fileDown} status={status} />

                {status !== '退票完成' && status !== '改簽完成' &&
                    <TicketOutForm data1={ticketOutForm} />
                }

                {status === '改簽完成' &&
                    <Ticketreturnchangefrom data1={oldTravelDetail} data2={null} />
                }

                {status !== '退票完成' &&
                    <Link
                        to='/orders/5/backChangeTicket'
                    >
                        退票/改簽申請
                    </Link>
                }

                {
                    status !== '已出票' && status !== '改簽完成' && <Ticketreturnchangefrom data1={oldTravelDetail} data2={ticketOutForm} />
                }

                {status === '改簽完成' &&
                    <div style={{ marginTop: '10px' }}>
                        <Ticketreturnchangefrom data1={null} data2={ticketOutForm} />
                        <span className="content" style={{ width: "60%" }}>
                            {ticketOutSignList.OFileName}
                            {
                                fileDown &&
                                <div>
                                    <span style={{ marginRight: '10px' }}>憑證:</span>
                                    <a
                                        href={baseURL + '/maintain/OpenExcel?path=' + fileDown.FilePath + '&name=' + fileDown.OFileName}
                                    >
                                        {fileDown.OFileName}
                                    </a>
                                </div>
                            }
                        </span>
                    </div>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { ticketOutSignList, ticketOutForm, oldTravelDetail, status, fileDown } = state.ordersReducer.ticketsOutReducer;
    return { ticketOutSignList, ticketOutForm, oldTravelDetail, status, fileDown }
}
const mapDispatchToProps = (dispatch) => {
    return {
        showListPage() {
            dispatch(actionCreators.goBackClick())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TicketOutFormList)