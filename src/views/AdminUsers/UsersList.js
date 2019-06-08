import React, {Component} from 'react'
import {Badge, Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Input} from 'reactstrap'
import {Link} from 'react-router-dom'
import {DownloadUsersListExcelAction, getRolesAction, getUsersAction, setRoleAction} from '../../actions/AppActions'
import {connect} from 'react-redux'
import Spinner from '../Spinner/Spinner'
import ReactTable from 'react-table'
import {toastAlerts} from '../Shared/toast_alert'
import moment from 'moment-jalaali';

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.changeRole = this.changeRole.bind(this);
        this.downloadExcel = this.downloadExcel.bind(this);
        this.state = {
            usersInfo: [],
            modal: false,
            deleteModal: false,
            roles: [],
            items: [],
        }
    }

    componentWillMount() {
        this.props.dispatch(getUsersAction());
        this.props.dispatch(getRolesAction((status, roles) => {
            if (status) {
                this.setState({roles: roles})
            }
        }))
    }

    componentWillReceiveProps(props) {
        this.setState({items: props.usersList, usersInfo: props.usersList})
    }

    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست کاربران</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ReactTable
                            data={this.state.usersInfo}
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
                            defaultPageSize={10}
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
                Header: 'نام کاربر',
                accessor: 'name'
            },
            {
                Header: 'ایمیل',
                accessor: 'email'
            }, {
                Header: 'تعداد پروژه',
                accessor: 'project_num',
                maxWidth: 80,
                filterable: false,
            }, {
                Header: 'تعداد شی',
                accessor: 'node_num',
                maxWidth: 80,
                filterable: false,
            },
            {
                Header: 'نوع کاربر',
                id: 'legal',
                accessor: row => <Badge color={row.legal ? 'success' : 'danger'}>
                    {row.legal ? 'حقوقی' : 'حقیقی'}
                </Badge>,
                maxWidth: 100,
                filterable: false,
            }, {
                Header: 'تاریخ ثبت نام',
                id: 'created_at',
                accessor: row => moment(row.created_at, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss'),
                filterable: false,
            },
            {
                id: 'role',
                Header: 'دسترسی‌ها',
                filterable: false,
                maxWidth: 140,
                accessor: row => {
                    return (<div>
                        <Input type="select" name="type" value={row.role ? row.role._id : ''}
                               onChange={(e) => {
                                   let action = e.target.value;
                                   if (action === '') {
                                       this.props.dispatch(setRoleAction(row._id, '', this.changeRole))
                                   } else {
                                       this.props.dispatch(setRoleAction(row._id, action, this.changeRole))
                                   }

                               }} id="select">
                            <option value={''}>{'ادمین'}</option>
                            {this.state.roles.map(item =>
                                <option key={item._id} value={item._id}>{item.name}</option>
                            )}
                        </Input>
                    </div>)
                }
            },
            {
                id: 'rowTools',
                Header: 'امکانات',
                maxWidth: 80,
                filterable: false,
                accessor: row => <div>
                    <Link to={`/admin/users/${row._id}`}>
                        <Button className="ml-1" color="warning"
                                size="sm">مدیریت</Button>
                    </Link>
                </div>
            }
        ]
    }

    changeRole(status, message) {
        toastAlerts(status, message);
        this.props.dispatch(getUsersAction())
    }

    downloadExcel() {
        this.props.dispatch(DownloadUsersListExcelAction())
    }
}

function mapStateToProps(state) {
    return {
        loading: state.homeReducer.currentlySending,
        usersList: state.adminReducer.usersList
    };
}

export default connect(mapStateToProps)(UsersList);

