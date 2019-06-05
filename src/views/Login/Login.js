import React, { Component } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap'

import { connect } from 'react-redux'
import { login, resetPasswordAction } from '../../actions/AppActions'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

class Login extends Component {

  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)
    this.onRespond = this.onRespond.bind(this)
    this.goToResetPassword = this.goToResetPassword.bind(this)
    this.reset = this.reset.bind(this)

    this.state = {
      email: '',
      password: '',
      reset: false
    }
  }

  render () {

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-0 p-sm-4">
                  <CardBody>
                    <h1 className="text-right">
                      ورود
                    </h1>
                    <p className="text-right text-muted">
                      به پلتفرم اینترنت اشیا امیرکبیر خوش آمدید
                    </p>
                    <Form>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            @
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="username"
                          onChange={event => {
                            this.mergeWithState({ email: event.target.value })
                          }}
                          type="text" placeholder="نام کاربری"
                          required/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="password"
                          type="password"
                          onChange={event => {
                            this.mergeWithState({ password: event.target.value })
                          }}
                          placeholder="کلمه عبور"
                          required/>
                      </InputGroup>

                      <FormGroup className="text-right">
                        <Label check>
                          <Input type="checkbox"
                                 onChange={event => {
                                   this.mergeWithState({ keep: event.target.value })
                                 }}/>
                          &emsp;
                          مرا به خاطرت نگه دار
                        </Label>
                      </FormGroup>

                      <Row>
                        <Col xs="12" className="text-right">
                          <img
                            style={{ display: this.props.currentlySending ? 'block' : 'none', margin: 'auto' }}
                            src={'img/loading.gif'}/>
                        </Col>
                      </Row>
                      <Row style={{ display: !this.props.currentlySending ? 'flex' : 'none', margin: 'auto' }}>
                        <Col xs="6">
                          <Button
                            block
                            onClick={() => this.submit()} color="primary"
                            className="px-4">ورود</Button>
                        </Col>
                        <Col xs="6">
                          <Button
                            block
                            onClick={() => this.reset()} color="link"
                            className="text-right px-0">فراموشی رمز عبور</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none">
                  <CardBody className="text-center">
                    <div>
                      <h2>ثبت نام</h2>
                      <p>
                        این پلتفرم برای اشیایی که مبنی بر پروتکل لورا عمل می‌کنند
                        یک رابط مدیریتی ساده فراهم می‌آورد.
                      </p>
                      <Link to="/register">
                        <Button
                          color="primary" active className="mt-3"
                        >
                          همین حالا ثبت‌نام کنید
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  goToResetPassword () {
    this.setState({ reset: true, email: '' })
  }

  mergeWithState (newState = {}) {
    this.setState({
      ...this.state,
      ...newState
    })
  }

  reset () {
    this.props.dispatch(resetPasswordAction({ email: this.state.email }, this.onRespond))
  }

  submit () {
    this.props.dispatch(login(this.state.email, this.state.password, this.state.keep, this.onRespond))
  }

  onRespond (errorMessage) {
    toast(errorMessage, { autoClose: 15000, type: toast.TYPE.ERROR })
  }
}

function mapStateToProps (state) {
  return {
    currentlySending: state.homeReducer.currentlySending === undefined ? false : state.homeReducer.currentlySending
  }
}

export default connect(mapStateToProps)(Login)
