import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    Form,
    Badge,
    Modal,
    FormGroup,
    CardHeader,
    CardBody,
    CardFooter,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CardTitle,
    Button,
    ButtonGroup,
    Label,
    Input,
    Table
} from 'reactstrap';
import Data from './transactionData'
import {connect} from 'react-redux';

import ReactTable from 'react-table'
import 'react-table/react-table.css'

class Transactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactionsInfo : Data,
        }
    }

    componentWillMount() {

    }


    render() {

        const columns = [
            {
                Header: 'نام بسته',
                accessor: 'packageName'
            },
            {
                Header: 'تاریخ',
                accessor: '_date'
            },
            {
                Header: 'هزینه',
                accessor: 'cost'
            },
            {
                id: 'status',
                Header: 'وضعیت',
                filterable: false,
                accessor: d => <Badge color={d.status === true ? 'success' : 'danger'}>
                    {d.status === true ? 'موفق' : 'نا موفق'}
                </Badge>
            },
        ]

        let transactionsInfo = this.state.transactionsInfo;
        const transactionsArray = Object.values(transactionsInfo);
        return (
            <div>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست تراکنش‌ها</CardTitle>
                    </CardHeader>
                    <CardBody>

                    <ReactTable
                        data={transactionsArray}
                        columns={columns}
                        pageSizeOptions={[5, 10, 25, 50, 100]}
                        nextText='بعدی'
                        previousText='قبلی'
                        filterable={true}
                        rowsText='ردیف'
                        pageText='صفحه'
                        ofText='از'
                        minRows='1'
                        noDataText= 'داده ای وجود ندارد'
                        resizable={false}
                        defaultPageSize='5'
                    />

                    </CardBody>
                </Card>

                {/*
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست تراکنش‌ها</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table hover responsive className="table-outline">
                            <thead className="thead-light">
                            <tr>
                                <th>#</th>
                                <th>نام بسته</th>
                                <th>تاریخ</th>
                                <th>هزینه</th>
                                <th>وضعیت</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                 transactionsArray.map((el, key) => this.renderItem(el, key))

                            }
                            </tbody>
                        </Table>
                    </CardBody>

                </Card>
                */}

            </div>
        );
    }

    renderItem(el, key = 0) {
        return (
            <tr >
                <th>{key + 1}</th>
                <td>{el.packageName}</td>
                <td>{el._date}</td>
                <td>{el.cost} <span> تومان</span></td>
                <td>{el.status === true ? <Badge color="success"> موفق</Badge> :  <Badge color="danger"> نا‌موفق</Badge> }</td>

            </tr>
        )
    }


}

function mapStateToProps(state) {
    return {

    };
}


export default connect(mapStateToProps)(Transactions);
