import React, {Component} from "react";
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
  CardTitle,
  CardBody,
  Alert
} from "reactstrap";

import { connect } from 'react-redux';


class SuccessPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      authority: 10000,
    };
   
  }



  render() {
    return (
      <div className="animated fadeIn">
        <Card className="text-justify">
            <CardHeader>
                 <CardTitle className="mb-0 font-weight-bold h6"> وضعیت پرداخت </CardTitle>
            </CardHeader>
            <CardBody>
                
                        <Alert color="danger">
                        <h4 className="alert-heading"> <i className="fa fa-close fa-lg mt-4"></i><strong>     پرداخت نا‌موفق!</strong> </h4>
                        <p> {this.props.data.username} <span>متاسفانه پرداخت با مشکل رو به رو شد. </span></p>                        {/* <hr />
                        <p className="mb-0">
                            Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
                        </p> */}
                        </Alert>
                  

            </CardBody>
        </Card>
      </div>

    )
  }
}

function select(state) {
  return {
    data: state.userReducer
  };
}


export default connect(select)(SuccessPayment);


