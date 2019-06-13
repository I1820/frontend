import React, {Component} from 'react'
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Label,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
} from 'reactstrap'

import {AvFeedback, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation'

import {connect} from 'react-redux'
import {
    activeUserAction,
    changePasswordAction,
    getUserAction,
    getUserTransactionsAction,
    impersonateUserAction
} from '../../actions/AppActions'
import ReactTable from 'react-table'
import {toastAlerts} from '../Shared/toast_alert'
import {toPersianNumbers} from '../Shared/persian'

class PackageList extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activateUserModal: false,
            resetPasswordModal: false,
            userInfo: {
                overview: {},
                name: '',
                email: '',
                other_info: {
                    address: '',
                },
                legal_info: {
                    org_interface_mobile: '',
                    org_interface_name: '',
                    org_name: '',
                },
                legal: true,
                mobile: '',
                active: true
            },
            transactions: [],
        }
    }

    componentDidMount() {
        this.setState({
            userId: this.props.match.params.user
        });
        this.props.dispatch(getUserAction(this.props.match.params.user));
        this.props.dispatch(getUserTransactionsAction(this.props.match.params.user, (transactions) => {
            this.setState({transactions})
        }))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== undefined && nextProps.user._id !== undefined) {
            if (nextProps.user._id === this.state.userId) {
                this.setState({
                    userInfo: nextProps.user
                })
            }
        }
    }

    render() {
        return (
            <div className="animated fadeIn text-justify">
                <Modal isOpen={this.state.activateUserModal} toggle={() => this.toggle('activate_user')}
                       className="text-right">
                    <ModalHeader>{`${this.state.userInfo.active ? 'غیرفعال سازی' : 'فعال سازی'} کاربر `}</ModalHeader>
                    <ModalBody>
                        <h3>{` آیا از  ${this.state.userInfo.active ? 'غیرفعال سازی' : 'فعال سازی'} مطمئن هستید؟  `}</h3>
                        <br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.props.dispatch(activeUserAction(this.state.userId, this.state.userInfo.active ? 0 : 1, toastAlerts));
                            this.toggle('activeProject')
                        }}>{this.state.userInfo.active ? 'غیرفعال سازی' : 'فعال سازی'}</Button>
                        <Button color="danger" onClick={() => this.toggle('activate_user')}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.resetPasswordModal} toggle={() => this.toggle('reset_password')} className="text-right">
                    <ModalHeader>{`تغییر گذرواژه ${this.state.userInfo.name}`}</ModalHeader>
                    <ModalBody>
                        <AvForm>
                            <AvGroup row>
                                <Label sm={3}>گذرواژه جدید:</Label>
                                <Col sm={9}>
                                    <AvInput type="password"
                                             name={'password'}
                                             onChange={event => this.setState({
                                                 password: event.target.value
                                             })}
                                             required/>
                                    <AvFeedback>الزامی است</AvFeedback>
                                </Col>
                            </AvGroup>
                        </AvForm>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.toggle();
                            this.props.dispatch(changePasswordAction(
                                this.state.userInfo._id,
                                this.state.password,
                                toastAlerts))
                        }}>ذخیره</Button>
                        <Button color="danger" onClick={() => this.toggle('reset_password')}>انصراف</Button>
                    </ModalFooter>
                </Modal>

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
                                            <Col
                                                md='3'><span>{this.state.userInfo.legal ? 'حقوقی' : 'حقیقی'}</span></Col>
                                            <Col md='3'><strong>وضعیت کاربر </strong></Col>
                                            <Col
                                                md='3'><span>{this.state.userInfo.active ? 'فعال' : 'غیرفعال'}</span></Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col md='3'><strong>{'تعداد پروژه‌ها'}</strong></Col>
                                            <Col
                                                md='3'><span>{toPersianNumbers(this.state.userInfo.overview.projects)}</span></Col>
                                            <Col md='3'><strong>{'تعداد نودها'}</strong></Col>
                                            <Col
                                                md='3'><span>{toPersianNumbers(this.state.userInfo.overview.things)}</span></Col>
                                        </Row>
                                    </ListGroupItem>
                                    {
                                        this.state.userInfo.legal &&
                                        <ListGroupItem>
                                            <Row>
                                                <Col md='3'><strong>نام شرکت</strong></Col>
                                                <Col md='3'><span>{this.state.userInfo.legal_info.org_name}</span></Col>
                                                <Col md='3'><strong>نام و نام خانوادگی واسط</strong></Col>
                                                <Col
                                                    md='3'><span>{this.state.userInfo.legal_info.org_interface_name}</span></Col>
                                            </Row>
                                        </ListGroupItem>
                                    }
                                    {
                                        this.state.userInfo.legal &&
                                        <ListGroupItem>
                                            <Row>
                                                <Col md='3'><strong>شماره همراه واسط</strong></Col>
                                                <Col
                                                    md='3'><span>{this.state.userInfo.legal_info.org_interface_mobile}</span></Col>
                                            </Row>
                                        </ListGroupItem>
                                    }
                                </ListGroup>
                            </CardBody>
                            <CardFooter>
                                <Button
                                    onClick={() => this.toggle('activate_user')}
                                    className="ml-1" color="warning"
                                    size="sm">{this.state.userInfo.active ? 'غیر فعال سازی کاربر' : 'فعال سازی کاربر'}</Button>

                                <Button
                                    onClick={() => this.props.dispatch(impersonateUserAction(this.state.userId, 1, toastAlerts))}
                                    className="ml-1" color="info"
                                    size="sm">حالت سوم شخص</Button>
                                <Button className="ml-1" color="danger"
                                        onClick={() => this.toggle('reset_password')}
                                        size="sm">{'تغییر گذرواژه'}
                                </Button>
                            </CardFooter>
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
                                    columns={PackageList.renderTransaction()}
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

    toggle(key) {
        switch (key) {
            case 'activate_user':
                this.setState({
                    activateUserModal: !this.state.activateUserModal
                });
                break;
            case 'reset_password':
                this.setState({
                    resetPasswordModal: !this.state.resetPasswordModal,
                });
                break;
            default:
                return
        }
    }

    static renderTransaction() {
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
        ]
    }
}

function mapStateToProps(state) {
    return {
        user: state.adminReducer.users
    }
}

export default connect(mapStateToProps)(PackageList);


