import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    CardGroup,
    Card,
    CardBody,
    Button,
    Input,
    Alert,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../../actions/AppActions';
import ReCAPTCHA from 'react-google-recaptcha';

class Login extends Component {

    constructor(props) {
        super(props)

        this.submit = this.submit.bind(this)
        this.onRespond = this.onRespond.bind(this)
        this.renderAlert = this.renderAlert.bind(this)
        this.goToRegisterPage = this.goToRegisterPage.bind(this)

        this.state = {
            email: '',
            password: '',
            showAlert: false,
            alert: '',
        }
    }


    render() {

        window.recaptchaOptions = {
            lang: 'fa'
        }

        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="5">
                            <CardGroup>
                                <Card className="p-0 p-sm-4">
                                    <CardBody>
                                        <div className="text-right">
                                            <h1>ورود</h1>
                                            <p className="text-muted">وارد حساب کاربری خود شوید</p>
                                        </div>
                                        {this.renderAlert()}
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                onChange={event => {
                                                    this.mergeWithState({email: event.target.value})
                                                }}
                                                type="text" placeholder="نام کاربری"/>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password"
                                                   onChange={event => {
                                                       this.mergeWithState({password: event.target.value})
                                                   }}
                                                   placeholder="کلمه عبور"/>
                                        </InputGroup>

                                        <div className="form-group">
                                            <div className="form-check" style={{textAlign: 'right', direction: 'rtl'}}>
                                                <input className="form-check-input" type="checkbox"
                                                       onChange={event => {
                                                           this.mergeWithState({keep: event.target.value})
                                                       }}/>
                                                <label className="form-check-label" style={{marginRight: '20px'}}>
                                                    {'مرا به خاطرت نگه دار'}
                                                </label>
                                            </div>
                                        </div>

                                        <InputGroup className="mb-4">
                                            <ReCAPTCHA
                                                className="g-recaptcha mb-4"
                                                size="normal"
                                                ref="recaptcha"
                                                sitekey="6LdYh0EUAAAAALOCVNd4y7f5q8oPFwg0nmCO0zM4"
                                                onChange={(response) => this.setState({recaptcha: response})}/>
                                        </InputGroup>
                                        <Row>
                                            <Col xs="2" className="text-right">
                                                <img style={{display: this.props.currentlySending ? 'block' : 'none'}}
                                                     src={'img/loading.gif'}/>
                                            </Col>
                                            <Col xs="10">
                                                <Button onClick={this.goToRegisterPage} color="success"
                                                        className="px-4 float-left">ثبت نام</Button>
                                                <Button onClick={this.submit} color="primary"
                                                        className="px-4 ml-1 float-left">ورود</Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    goToRegisterPage() {
        window.location = '#/register'
    }

    mergeWithState(newState = {}) {
        this.setState({
            ...this.state,
            ...newState
        })
    }

    submit() {
        let recaptcha = this.state.recaptcha
        this.setState({
            showAlert: false,
            recaptcha: undefined
        })
        this.refs.recaptcha.reset()
        this.props.dispatch(login(this.state.email, this.state.password, recaptcha, this.onRespond))

    }

    onRespond(errorMessage) {

        this.setState({
            alert: errorMessage,
            showAlert: true
        })
    }

    renderAlert() {
        if (this.state.showAlert) {
            return (
                <Alert color="danger" className="text-right">
                    {this.state.alert}
                </Alert>
            )
        }
    }

}

function mapStateToProps(state) {
    return {
        currentlySending: state.homeReducer.currentlySending === undefined ? false : state.homeReducer.currentlySending
    };
}

export default connect(mapStateToProps)(Login);
