import React, {Component} from 'react';
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
import {connect} from 'react-redux';

import {login} from '../../../actions/AppActions';

class Login extends Component {

    constructor(props) {
        super(props)

        this.submit = this.submit.bind(this)
        this.onRespond = this.onRespond.bind(this)
        this.renderAlert = this.renderAlert.bind(this)

        this.state = {
            email: "",
            password: "",
            showAlert: false,
            alert: "",
            showLoading: true
        }
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="5">
                            <CardGroup>
                                <Card className="p-4">
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
                                        <Row>
                                            <Col xs="6" className="text-right">
                                                <img style={{display: this.state.showLoading ? 'block' : 'none'}}
                                                src={'img/loading.gif'} />
                                            </Col>
                                            <Col xs="6">
                                                <Button onClick={this.submit} color="primary"
                                                        className="px-4 float-left">ورود</Button>
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

    mergeWithState(newState = {}) {
        this.setState({
            ...this.state,
            ...newState
        })
    }

    submit() {
        this.props.dispatch(login(this.state.email, this.state.password, "", this.onRespond))
        this.setState({
            showAlert:false,
            alert:""
        })
    }

    onRespond(errorMessage) {
        if (errorMessage)
            this.setState({
                alert:errorMessage,
                showAlert:true
            })
    }

    renderAlert() {
        if (this.state.showAlert) {
            return (
                <Alert color="danger">
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
