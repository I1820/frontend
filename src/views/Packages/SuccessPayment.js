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
                
                        <Alert color="success">
                        <h4 className="alert-heading"> <i className="fa fa-check-circle fa-lg mt-4"></i><strong>     پرداخت موفق!</strong> </h4>
                        <p> {this.props.data.username}<span>  بسته مورد‌نظر شما با شماره پیگیری {this.state.authority}  خریداری شد.</span></p>
                        {/* <hr />
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


