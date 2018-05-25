import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    ListGroup,
    ListGroupItem,
    Alert
} from 'reactstrap';
import { buyPackagesAction, forwardTo, getPackageAction } from '../../actions/AppActions'
import { toastAlerts } from '../Shared/toast_alert';


class SelectedPackage extends Component {

    constructor(props) {
        super(props);
        this.pay = this.pay.bind(this)
        this.state = {
            package: {},
            agree: false,
            discountCode: ''
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            package: props.package,
        })
    }

    componentWillMount() {
        this.props.dispatch(getPackageAction(this.props.match.params.id))
    }

    pay() {
        if (this.state.agree === false) {
            toastAlerts(false, 'لطفا قوانین را بپذیرید')
            return
        }
        this.props.dispatch(buyPackagesAction(this.props.match.params.id, this.state.discountCode, toastAlerts))
    }

    render() {
        return (
            <div>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">بسته منتخب </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Alert color="primary">
                            <h4 className="alert-heading">توجه</h4>
                            <p>{'لطفا پس از حصول اطمینان از انتخاب صحیح بسته، بر روی دکمه پرداخت کلیک کنید.'}</p>
                        </Alert>
                        <Card>
                            <CardHeader>
                                <CardTitle className="mb-0 font-weight-bold h6">
                                    <i className="fa fa-align-justify"/><strong> مشخصات خریدار </strong>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Row>
                                            <Col md='6'><strong>{'نام و نام‌خانوادگی'}</strong></Col>
                                            <Col md='6'><span>{this.props.data.username}</span></Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col md='6'><strong>ایمیل</strong></Col>
                                            <Col md='6'><span>{this.props.data.email}</span></Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col md='6'><strong> تلفن همراه</strong></Col>
                                            <Col md='6' style={{
                                                direction: 'ltr',
                                                textAlign: 'right'
                                            }}><span>{this.props.data.mobile}</span></Col>
                                        </Row>
                                    </ListGroupItem>

                                </ListGroup>
                            </CardBody>
                        </Card>


                        <Card>
                            <CardHeader>
                                <CardTitle className="mb-0 font-weight-bold h6">
                                    <i className="fa fa-align-justify"/><strong>مشخصات بسته:</strong>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Row>
                                            <Col md='6'><strong> نام بسته</strong></Col>
                                            <Col md='6'><span>{this.state.package.name}</span></Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col md='6'><strong> مبلغ قابل پرداخت</strong></Col>
                                            <Col md='6'><span>{this.state.package.price}</span><span>تومان</span></Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col md='6'><strong>تعداد سنسور</strong></Col>
                                            <Col md='6'><span>{this.state.package.node_num}</span></Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col md='6'><strong>تعداد پروژه</strong></Col>
                                            <Col md='6'><span>{this.state.package.project_num}</span></Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col md='6'><strong>زمان بسته</strong></Col>
                                            <Col md='6'><span>{this.state.package.time}</span></Col>
                                        </Row>
                                    </ListGroupItem>
                                </ListGroup>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="mb-0 font-weight-bold h6"> <i
                                    className="icon-basket-loaded icons"/>درگاه پرداخت</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col md="5">
                                        <Input className="pay-input-style back3" type="radio" id="radio3" name="radios"
                                               defaultChecked={true}
                                               value="زرین پال"/>
                                    </Col>
                                </Row>

                            </CardBody>
                        </Card>
                        <Alert color="dark">
                            <Col md="9">
                                <div>
                                    <FormGroup check inline style={{marginRight: '0'}}>
                                        <Input type="checkbox"
                                               name="inline-checkbox1" style={{marginLeft: '10px'}}
                                               onChange={() => this.setState({agree: !this.state.agree})}/>
                                        <Label className="form-check-label" check htmlFor="inline-checkbox"> <span> قوانین و مقررات را قبول می‌کنم.</span></Label>
                                    </FormGroup>
                                </div>
                                <br/>
                                <div>
                                    <Row>
                                        <Col md='4'><strong>کد تخفیف دارید؟</strong></Col>
                                        <Col md='6'>
                                            <Input type="text"
                                                   maxLength={15}
                                                   onChange={(e) => this.setState({discountCode: e.target.value})}/>
                                        </Col>
                                    </Row>
                                </div>
                                <div>
                                    <Button color="success" onClick={this.pay}>
                                        {'پرداخت از طریق درگاه'}
                                    </Button>{' '}
                                    <Button onClick={() => forwardTo('packages')} color="danger">انصراف</Button>{' '}
                                </div>
                            </Col>
                        </Alert>
                    </CardBody>
                </Card>
            </div>
        );
    }

}

function select(state) {
    return {
        data: state.userReducer,
        package: state.packageReducer.package
    };
}

export default connect(select)(SelectedPackage);
