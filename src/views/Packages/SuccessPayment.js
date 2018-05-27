import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Alert,
    Container,
    CardFooter,
    Button,

} from 'reactstrap';

import { connect } from 'react-redux';


class SuccessPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: 0,
            refId: 0,
        };

    }

    componentWillMount() {
        const paramsString = this.props.location.search;
        const params = new URLSearchParams(paramsString);
        const data = {
            price: params.get('price'),
            refId: params.get('authority')
        }
        this.setState(data)
    }


    render() {
        return (
            <div className="app-body">
                <main className="main">
                    <Container fluid>
                        <div className="animated fadeIn">
                            <Card className="text-justify">
                                <CardHeader>
                                    <CardTitle className="mb-0 font-weight-bold h6"> وضعیت پرداخت </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Alert color="success">
                                        <h4 className="alert-heading">
                                            <i className="fa fa-check-circle fa-lg mt-4"/><strong>{'پرداخت موفق!'}</strong>
                                        </h4>
                                        <p>
                                            <span>  بسته مورد‌نظر شما با شماره پیگیری {this.state.refId}{' خریداری شد.'}</span>
                                            <br/>
                                            <span>مبلغ پرداخت شده: {this.state.price}</span>
                                        </p>
                                    </Alert>
                                </CardBody>
                                <CardFooter>
                                    <Button color={'success'} onClick={() => window.location = '/'}>
                                        {'هدایت به داشبورد'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </Container>
                </main>
            </div>
        )
    }
}


export default SuccessPayment;


