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
    this.activate = this.activate.bind(this);
    this.state = {
      adminPortals: [],
    }
  }

  componentWillMount() {
    this.props.dispatch(getAdminPaymentPortalsAction())
  }

  componentWillReceiveProps(props) {
    this.setState({adminPortals: [...props.adminPortals]}, () => console.log(this.state))
  }

  activate(id) {

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
                this.state.adminPortals.map((el, key) => this.renderItem(el, key))
              }
              </tbody>
            </Table>


          </CardBody>

        </Card>

      </div>
    );
  }

  renderItem(el, key = 0) {
    return (
      <tr>
        <th>{key + 1}</th>
        <td>
          <img className="portal-style" src={el.image}/>
        </td>
        <td>{el.name}</td>
        <td>{el.website}</td>
        <td>{el.active === true ? <Badge color="success"> فعال</Badge> : <Badge color="danger"> غیر فعال</Badge>}</td>

        <td>
          {el.active === false ? <Button outline color="danger" onClick={() => this.activate(el._id)}><i
              className="fa fa-edit"/>فعال‌سازی</Button> :
            <Button outline color="danger"><i className="fa fa-edit"/>غیر فعال سازی</Button>}
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
