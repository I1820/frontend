import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  Badge,
  CardHeader,
  CardBody,

  CardTitle,
  Button,
  Table,


} from 'reactstrap';

import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';

import Data from './portalData'
import { getAdminPaymentPortalsAction } from '../../actions/AppActions';

class PaymentPortalList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      adminPortals: [];
  }
  }

  componentWillMount() {
    this.props.dispatch(getAdminPaymentPortalsAction())
  }

  componentWillReceiveProps(props) {
    this.setState({adminPortals: props.adminPortals})
  }


  render() {
    return (
      <div>
        <Spinner display={this.props.loading}/>

        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">درگاه‌های پرداخت</CardTitle>
          </CardHeader>
          <CardBody>
            <Table hover responsive className="table-outline">
              <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>لوگو درگاه</th>
                <th>نام درگاه</th>
                <th>وب‌سایت</th>
                <th>وضعیت</th>
                <th> فعال‌سازی</th>

              </tr>
              </thead>
              <tbody>
              {
                // console.log(this.state)
                this.state.adminPortals.map((el, key) => this.renderItem(el, key))
              }
              </tbody>
            </Table>


          </CardBody>

        </Card>

      </div>
    );
  }

  static renderItem(el, key = 0) {
    return (
      <tr>
        <th>{key + 1}</th>
        <td>
          <img className="portal-style" src={el.image}/>
        </td>
        <td>{el.name}</td>
        <td>{'sss'}</td>
        <td>{el.active === true ? <Badge color="success"> فعال</Badge> : <Badge color="danger"> غیر فعال</Badge>}</td>

        <td>
          <Button outline color="success"><i className="fa fa-edit"/>فعال‌سازی</Button>
        </td>

      </tr>
    )
  }


}

function mapStateToProps(state) {
  return {
    loading: state.homeReducer.currentlySending,
    adminPortals: state.packageReducer.adminPortals
  };
}


export default connect(mapStateToProps)(PaymentPortalList);
