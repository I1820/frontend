import React, {Component} from "react";
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
import {getUsersAction, SelectUser} from "../../actions/AppActions";
import {connect} from 'react-redux';
import Spinner from "../Spinner/Spinner";
import ReactTable from 'react-table'

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersInfo: [],
      modal: false,
      deleteModal: false,
      items: [],
    }
  }

  componentWillMount() {
    // let usersInfo = this.state.usersInfo;
    // let usersArray = Object.values(usersInfo);
    // this.setState({items: usersArray})
    this.props.dispatch(getUsersAction());
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
      },
      {
        Header: 'نوع کاربر',
        id: 'legal',
        accessor: row => <Badge color={row.legal ? 'success' : 'danger'}>
          {row.legal ? 'حقوقی' : 'حقیقی'}
        </Badge>,
        filterable: false,
      },
      // {
      //   id: 'projectStatus',
      //   Header: 'وضعیت',
      //   filterable: false,
      //   accessor: row => <Badge color={row.active === true ? 'success' : 'danger'}>
      //     {row.active === true ? 'فعال' : 'غیرفعال'}
      //   </Badge>
      // // },
      {
        id: 'rowTools',
        Header: 'امکانات',
        filterable: false,
        accessor: row => <div>
          <Button onClick={() => window.location=`#/admin/user/info/${row._id}`} className="ml-1" color="warning"
                  size="sm">مدیریت</Button>
        </div>
      }
    ];
  }


}

function mapStateToProps(state) {
  return {
    loading: state.homeReducer.currentlySending,
    usersList: state.adminReducer.usersList
  };
}


export default connect(mapStateToProps)(UsersList);

