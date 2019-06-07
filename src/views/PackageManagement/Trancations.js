import React, {Component} from 'react'
import {Badge, Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col} from 'reactstrap'
import {DownloadUserTransactionsExcelAction, getUserTransactions} from '../../actions/AppActions'
import {connect} from 'react-redux'
import Spinner from '../Spinner/Spinner'
import ReactTable from 'react-table'
import moment from 'moment-jalaali'
import {toPersianNumbers} from '../Shared/helpers'

class UserTransactions extends Component {
    constructor(props) {
        super(props);
        this.downloadExcel = this.downloadExcel.bind(this);
        this.state = {
            transactions: [],
            total: 0
        }
    }

    componentWillMount() {
        this.props.dispatch(getUserTransactions())
    }

    componentWillReceiveProps(props) {
        let total = 0;
        props.transactions.forEach((transaction) => {
            if (transaction.status) {
                total += transaction.price
            }
        });

        this.setState({transactions: props.transactions, total});
        console.log(this.state)
    }

    render() {

        return (

            <div>
                <Col xs="12" sm="6" lg="3">
                    <Card className="text-white bg-primary text-center" style={{cursor: 'pointer'}}>
                        <CardBody className="pb-0">
                            <h4 className="mb-0 h3 font-weight-bold">{toPersianNumbers(this.state.total)}</h4>
                            <p>مجموع تراکنش های موفق</p>
                        </CardBody>
                    </Card>
                </Col>
                <Spinner display={this.props.loading}/>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست تراکنش ها</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ReactTable
                            data={this.state.transactions}
                            columns={this.reactTableColumns()}
                            pageSizeOptions={[5, 10, 25]}
                            nextText='بعدی'
                            previousText='قبلی'
                            filterable={true}
                            rowsText='ردیف'
                            pageText='صفحه'
                            ofText='از'
                            minRows='1'
                            noDataText='داده ای وجود ندارد'
                            resizable={false}
                            defaultPageSize={5}
                            className="-striped -highlight"
                        />
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.downloadExcel} className="ml-1" color="success">خروجی اکسل</Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    reactTableColumns() {
        return [
            {
                Header: 'تاریخ تراکنش',
                id: 'created_at',
                accessor: row => moment(row.created_at, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss jYYYY/jM/jD')
            },
            {
                Header: 'نام بسته',
                id: 'package_type',
                accessor: row => row.package.name
            },
            {
                Header: 'تعداد اشیا',
                id: 'thing_num',
                accessor: row => row.package.node_num
            }, {
                Header: 'تعداد پروژه',
                id: 'project_num',
                accessor: row => row.package.project_num
            }, {
                Header: 'مدت بسته',
                id: 'package_time',
                accessor: row => row.package.time
            }, {
                Header: 'مبلغ',
                id: 'price',
                accessor: row => row.package.price
            },
            {
                Header: 'درگاه پرداخت',
                accessor: 'gate',
            },
            {
                Header: 'وضعیت تراکنش',
                id: 'status',
                accessor: row => <Badge color={row.status ? 'success' : 'danger'}>
                    {row.status ? 'موفق' : 'نا موفق'}
                </Badge>,
                filterable: false,
            },
        ]
    }

    downloadExcel() {
        this.props.dispatch(DownloadUserTransactionsExcelAction())
    }

}

function mapStateToProps(state) {
    return {
        loading: state.homeReducer.currentlySending,
        transactions: state.userReducer.transactions
    }
}

export default connect(mapStateToProps)(UserTransactions);

