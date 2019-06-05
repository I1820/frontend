import React, { Component } from 'react'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap'

import { connect } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import {
  DownloadAdminTransactionsExcelAction,
  getAllTransactionsAction,
  getTransactionsOverviewAction
} from '../../actions/AppActions'
import ReactTable from 'react-table'
import { Link } from 'react-router-dom'

class PackageList extends Component {
  constructor (props) {
    super(props)
    this.fetchInvoices = this.fetchInvoices.bind(this)
    this.state = {
      transactions: [],
      overview_num: {},
      overview_sum: {},
      offset: 0,
      limit: 10,

    }
  }

  componentDidMount () {
    this.props.dispatch(getTransactionsOverviewAction((overview) => {
      this.setState({ overview_sum: overview })
    }))
  }

  componentWillReceiveProps (nextProps) {

  }

  render () {
    return (

      <div className="animated fadeIn text-justify">
        <Spinner display={this.props.loading}/>
        <Row>
          <Col xs="36" sm="18" md="12">
            <Card className="border-success">
              <CardHeader>
                <CardTitle className="mb-0 font-weight-bold h6">اطلاعات حساب کاربری</CardTitle>
              </CardHeader>
              <CardBody>
                <ListGroup>
                  <ListGroupItem>
                    <Row>
                      <Col md='3'><strong>جمع کل تراکنش‌ها:</strong></Col>
                      <Col md='3'><span> {this.state.overview_sum.all_transactions_sum}</span></Col>
                      <Col md='3'><strong>جمع تراکنش‌های هفته اخیر:</strong></Col>
                      <Col md='3'><span>{this.state.overview_sum.last_week_transactions_sum}</span></Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="36" sm="18" md="12">
            <Card className="border-success">
              <CardHeader>
                <CardTitle className="mb-0 font-weight-bold h6"> تراکنش‌های کاربر</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={this.state.transactions}
                  pages={Math.ceil(this.state.overview_sum.all_transactions_num / this.state.limit)}
                  columns={PackageList.renderTransaction()}
                  pageSizeOptions={[10, 15, 20, 25]}
                  loading={this.state.loading}
                  nextText='بعدی'
                  previousText='قبلی'
                  filterable={false}
                  sortable={false}
                  rowsText='ردیف'
                  pageText='صفحه'
                  ofText='از'
                  minRows='3'
                  loadingText='در حال دریافت اطلاعات...'
                  noDataText='داده‌ای وجود ندارد'
                  resizable={false}
                  defaultPageSize={10}
                  className="-striped -highlight"
                  manual
                  onFetchData={this.fetchInvoices}
                />
              </CardBody>
              <CardFooter>
                <Button
                  onClick={() => this.props.dispatch(DownloadAdminTransactionsExcelAction(this.state.limit, this.state.offset))}
                  className="ml-1" color="success">خروجی اکسل</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>

      </div>
    )
  }

  fetchInvoices (state, instance) {
    this.props.dispatch(getAllTransactionsAction(state.pageSize, state.page * state.pageSize,
      (result) => {
        this.setState({
          transactions: result.invoices,
          offset: state.page * state.pageSize,
          limit: state.pageSize,
        })
      }))
  }

  static renderTransaction () {
    return [
      {
        Header: 'نام بسته',
        id: 'package',
        accessor: row => row.package.name
      },
      {
        Header: 'تاریخ تراکنش',
        id: 'data',
        accessor: row => row.updated_at
      },
      {
        Header: 'مبلغ تراکنش',
        id: 'amount',
        accessor: row => row.package.price
      }, {
        Header: 'کاربر',
        id: 'user',
        accessor: row => row.user &&
          <Link to={`/admin/users/info/${row.user_id}`}>
          <Button color={'info'}>{row.user.name}</Button>
          </Link>
      },
      {
        Header: 'وضعیت تراکنش',
        id: 'status',
        accessor: row => <Badge color={row.status === true ? 'success' : 'danger'}>
          {row.status === true ? 'موفق' : 'ناموفق'}
        </Badge>,
      }
    ]
  }
}

function mapStateToProps (state) {
  return {
    loading: state.homeReducer.currentlySending,
  }
}

export default connect(mapStateToProps)(PackageList)


