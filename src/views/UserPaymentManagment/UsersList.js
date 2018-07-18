import React, { Component } from 'react';
// import {selectUser} from '../../actions/AppActions'
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
  Table,
  FormText
} from 'reactstrap';
import { getUsersAction, getRolesAction, setRoleAction } from '../../actions/AppActions';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import ReactTable from 'react-table'
import { toastAlerts } from '../Shared/toast_alert';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.changeRole = this.changeRole.bind(this)
    this.state = {
      usersInfo: [],
      modal: false,
      deleteModal: false,
      roles: [],
      items: [],
    }
  }

  componentWillMount() {
    // let usersInfo = this.state.usersInfo;
    // let usersArray = Object.values(usersInfo);
    // this.setState({items: usersArray})
    this.props.dispatch(getUsersAction());
    this.props.dispatch(getRolesAction((status, roles) => {
      if (status)
        this.setState({roles: roles})
    }));
  }

  componentWillReceiveProps(props) {
    this.setState({items: props.usersList, usersInfo: props.usersList})
  }

  render() {

    let usersInfo = this.state.items;
    const usersArray = Object.values(usersInfo);

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
        accessor: row => <div style={{textAlign: 'right', direction: 'ltr'}}>{row.created_at}</div>,
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
                     let action = e.target.value
                     if (action === '')
                       this.props.dispatch(setRoleAction(row._id, '', this.changeRole))
                     else
                       this.props.dispatch(setRoleAction(row._id, action, this.changeRole))

                   }} id="select">
              <option value={''}>{'ادمین'}</option>
              {this.state.roles.map(item =>
                <option key={item._id} value={item._id}>{item.name}</option>
              )}
            </Input>
          </div>);
        }
      },
      {
        id: 'rowTools',
        Header: 'امکانات',
        maxWidth: 80,
        filterable: false,
        accessor: row => <div>
          <Button onClick={() => window.location = `#/admin/user/info/${row._id}`} className="ml-1" color="warning"
                  size="sm">مدیریت</Button>
        </div>
      }
    ];
  }

  changeRole(status, message) {
    toastAlerts(status, message);
    this.props.dispatch(getUsersAction())
  }
}

function mapStateToProps(state) {
  return {
    loading: state.homeReducer.currentlySending,
    usersList: state.adminReducer.usersList
  };
}


export default connect(mapStateToProps)(UsersList);

