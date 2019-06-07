import React, {Component} from 'react'
import {Alert, Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Container,} from 'reactstrap'

class FailurePayment extends Component {
    constructor(props) {
        super(props)
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
                                    <Alert color="danger">
                                        <h4 className="alert-heading">
                                            <i className="fa fa-close fa-lg mt-4"/><strong>{'پرداخت ناموفق!'}</strong>
                                        </h4>
                                        <p>
                                            <span>متاسفانه پرداخت با مشکل رو به رو شد. </span>
                                            <br/>
                                            <span>در صورت کسر پول از حساب شما تا ۷۲ ساعت به آن باز میگردد.</span>
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

export default FailurePayment


