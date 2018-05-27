import React, {Component} from "react";
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
  Input

} from 'reactstrap'
import Data from './userData'
import {connect} from 'react-redux';
import Spinner from "../Spinner/Spinner";
import {activeUserAction, getUserAction, getUserTrancationsAction} from "../../actions/AppActions";
import ReactTable from 'react-table'

class PackageList extends Component {
  constructor(props) {
    super(props);
    this.renderProject = this.renderProject.bind(this)
    this.renderPackage = this.renderPackage.bind(this)
    this.renderThing = this.renderThing.bind(this)
    this.renderTransaction = this.renderTransaction.bind(this)
    this.state = {
      userInfo: {
        name: "",
        email: "",
        other_info: {
          address: "",
        },
        legal: true,
        mobile: "",
        active: true
      },
      transactions: []
    };
  }


  componentDidMount() {
    this.setState({
      userId: this.props.match.params.user
    })
    this.props.dispatch(getUserAction(this.props.match.params.user))
    this.props.dispatch(getUserTrancationsAction(this.props.match.params.user, (transactions) => {
      this.setState({transactions})
    }))
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== undefined && nextProps.user._id !== undefined)
      if (nextProps.user._id === this.state.userId)
        this.setState({
          userInfo: nextProps.user
        })
  }


  render() {
    let userInfo = this.state.userInfo;
    const userInfoArray = Object.values(userInfo);
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
                      <Col md='3'><strong>نام کاربر</strong></Col>
                      <Col md='3'><span> {this.state.userInfo.name}</span></Col>
                      <Col md='3'><strong> پست الکترونیکی</strong></Col>
                      <Col md='3'><span>{this.state.userInfo.email}</span></Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col md='3'><strong>تلفن ثابت </strong></Col>
                      <Col md='3'><span>{this.state.userInfo.phone}</span></Col>
                      <Col md='3'><strong>تلفن همراه </strong></Col>
                      <Col md='3'><span>{this.state.userInfo.mobile}</span></Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col md='3'><strong>نوع کاربری </strong></Col>
                      <Col md='3'><span>{this.state.userInfo.legal ? 'حقوقی' : 'حقیقی'}</span></Col>
                      <Col md='3'><strong>وضعیت کاربر </strong></Col>
                      <Col md='3'><span>{this.state.userInfo.active ? 'فعال' : 'غیرفعال'}</span></Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
              <CardFooter>
                <Button onClick={() => this.props.dispatch(activeUserAction(this.state.userId,
                  this.state.userInfo.active ? 0 : 1,
                  () => {

                  }))} className="ml-1" color="warning"
                        size="sm">{this.state.userInfo.active ? 'غیر فعال سازی کاربر' : 'فعال سازی کاربر'}</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>

          <Col xs="18" sm="9" md="6">
            <Card className="border-success">
              <CardHeader>
                <CardTitle className="mb-0 font-weight-bold h6"> تراکنش‌های کاربر</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={this.state.transactions}
                  columns={this.renderTransaction()}
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
            </Card>
          </Col>
          <Col xs="18" sm="9" md="6">
            <Card className="border-success">
              <CardHeader>
                <CardTitle className="mb-0 font-weight-bold h6"> پروژه‌های کاربر</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={[]}
                  columns={this.renderTransaction()}
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
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="18" sm="9" md="6">
            <Card className="border-success">
              <CardHeader>
                <CardTitle className="mb-0 font-weight-bold h6"> بسته‌های کاربر</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={[]}
                  columns={this.renderTransaction()}
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
            </Card>
          </Col>
          <Col xs="18" sm="9" md="6">
            <Card className="border-success">
              <CardHeader>
                <CardTitle className="mb-0 font-weight-bold h6"> اشیا کاربر</CardTitle> </CardHeader>
              <CardBody>
                <ReactTable
                  data={[]}
                  columns={this.renderTransaction()}
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
            </Card>
          </Col>
        </Row>

      </div>
    )
  }

  renderProject(el, key = 0) {

    return (
      <tr>
        <th>{key + 1}</th>
        <td>{el.projectName}</td>
        <td>{el.projectState === true ? <Badge color="success"> فعال</Badge> :
          <Badge color="danger"> غیر فعال</Badge>}</td>
      </tr>
    )
  }

  renderPackage(el, key = 0) {
    return (
      <tr>
        <th>{key + 1}</th>
        <td>{el.packName}</td>
        <td>{el.cost}</td>
        <td>{el.state === true ? <Badge color="success"> فعال</Badge> : <Badge color="danger"> غیر فعال</Badge>}</td>
        <td>

          <Label className="switch switch-text switch-pill switch-success">
            <Input type="checkbox" className="switch-input" defaultChecked/>
            <span className="switch-label" data-on="فعال" data-off=""></span>
            <span className="switch-handle"></span>
          </Label>

        </td>
      </tr>
    )
  }

  renderThing(el, key = 0) {
    return (
      <tr>
        <th>{key + 1}</th>
        <td>{el.thingName}</td>
        <td>{el.thingType}</td>

      </tr>
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
          {row.active === true ? 'موفق' : 'ناموفق'}
        </Badge>
      }
    ];
  }
}

function mapStateToProps(state) {
  return {
    loading: state.homeReducer.currentlySending,
    user: state.adminReducer.users
  };
}


export default connect(mapStateToProps)(PackageList);


