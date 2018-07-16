import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
  Button,
  CardTitle,
  CardBody,
  Table,
  CardFooter,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
  Label,
  Input,
} from 'reactstrap'

import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import {
  activateProjectAction,
  activeUserAction, changePasswordAction, createProject, editProjectAction, getAllTransactionsAction,
  getTransactionsOverviewAction, getUserAction,
  getUserTransactionsAction,
  impersonateUserAction
} from '../../actions/AppActions';
import ReactTable from 'react-table'
import { toastAlerts } from '../Shared/toast_alert';
import Select2 from 'react-select2-wrapper';
import { toPersianNumbers } from '../Shared/helpers';

class PackageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      overview_num: {},
      overview_sum: {},
      transactions_offset: 0,

    };
  }


  componentDidMount() {
    this.props.dispatch(getAllTransactionsAction(0, (result) => {
      this.setState({
        transactions: result.invoices,
        overview_num: result.overview,
      })
    }))
    this.props.dispatch(getTransactionsOverviewAction((overview) => {
      this.setState({overview_sum: overview})
    }))
  }


  componentWillReceiveProps(nextProps) {

  }


  render() {
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
                  pages={Math.ceil(this.state.overview_sum.all_transactions_num / 10)}
                  columns={this.renderTransaction()}
                  pageSizeOptions={[10]}
                  loading={this.state.loading}
                  nextText='بعدی'
                  previousText='قبلی'
                  filterable={true}
                  rowsText='ردیف'
                  pageText='صفحه'
                  ofText='از'
                  minRows='1'
                  noDataText='داده‌ای وجود ندارد'
                  resizable={false}
                  defaultPageSize={10}
                  className="-striped -highlight"
                  manual
                  onFetchData={(state, instance) => {
                    if (!this.state.loading)
                      this.props.dispatch(getAllTransactionsAction(this.state.transactions_offset,
                        (result) => {
                          this.setState({
                            transactions: result.invoices,
                            transactions_offset: this.state.transactions_offset + 10
                          }, () => console.log(this.state))
                        }));

                  }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    )
  }


  renderTransaction() {
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
      },
      {
        Header: 'وضعیت تراکنش',
        id: 'status',
        accessor: row => <Badge color={row.status === true ? 'success' : 'danger'}>
          {row.status === true ? 'موفق' : 'ناموفق'}
        </Badge>,
        filterable: false
      }
    ];
  }
}

function mapStateToProps(state) {
  return {
    loading: state.homeReducer.currentlySending,
  };
}


export default connect(mapStateToProps)(PackageList);


