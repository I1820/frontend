import React, {Component} from 'react'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
} from 'reactstrap'
import {connect} from 'react-redux'
import {register} from '../../actions/AppActions'
import {toastAlerts} from '../Shared/toast_alert'
import {Link} from 'react-router-dom'

class Register extends Component {

    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.state = {
            name: '',
            email: '',
            password: '',
            passwordRepeat: '',
        }
    }

    register() {
        if (this.state.passwordRepeat === this.state.password) {
            this.props.dispatch(register({
                'name': this.state.name,
                'email': this.state.email,
                'password': this.state.password,
            }, Register.manageToastAlerts))
        } else {
            toastAlerts(false, 'کلمه عبور و تکرار آن یکسان نیستند.')
        }
    }

    static manageToastAlerts(status) {
        if (status === true) {
            toastAlerts(status, 'ثبت نام با موفقیت انجام شد و لینک فعال سازی برای شما ارسال شد')
        } else {
            toastAlerts(false, status)
        }
    }

    render() {
        return (
            <div className="app flex-row align-items-center mt-4">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-0 mx-sm-4">
                                <CardBody className="p-4 text-right">
                                    <h1>ثبت نام</h1>
                                    <p className="text-muted">پروفایل خود را بسازید</p>

                                    <Form>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                name="fullName"
                                                type="text" placeholder="نام و نام خانوادگی"
                                                onChange={event => this.setState({name: event.target.value})}
                                                required/>
                                        </InputGroup>

                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    @
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                name="email"
                                                type="email" placeholder="پست الکترونیکی"
                                                onChange={event => this.setState({email: event.target.value})}
                                                required/>
                                        </InputGroup>

                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                name="originalPassword" type="password" placeholder="کلمه عبور"
                                                onChange={event => this.setState({password: event.target.value})}
                                                required/>
                                        </InputGroup>

                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                name="passwordRepeat"
                                                type="password" placeholder="تکرار کلمه عبور"
                                                onChange={event => this.setState({passwordRepeat: event.target.value})}
                                                validate={{match: {value: 'originalPassword'}}}/>
                                        </InputGroup>
                                    </Form>
                                    <img
                                        style={{
                                            display: this.props.currentlySending ? 'block' : 'none',
                                            margin: 'auto'
                                        }}
                                        alt={'loading'}
                                        src={'img/loading.gif'}
                                    />

                                    <Button
                                        style={{display: !this.props.currentlySending ? 'block' : 'none'}}
                                        color="success" onClick={this.register} block>
                                        ثبت نام
                                    </Button>
                                </CardBody>
                                <CardFooter>
                                    <Link to={'/login'}>
                                        <Button
                                            style={{display: !this.props.currentlySending ? 'block' : 'none'}}
                                            color="primary"
                                            block>
                                            بازگشت
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {currentlySending: state.homeReducer.currentlySending}
}

export default connect(mapStateToProps)(Register);
