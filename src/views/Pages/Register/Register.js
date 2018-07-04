import React, {Component} from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

import {AvForm, AvField, AvGroup, AvInput, AvFeedback} from 'availity-reactstrap-validation';

import classnames from 'classnames';
import {connect} from 'react-redux';
import {register} from '../../../actions/AppActions';
import {toastAlerts} from '../../Shared/toast_alert';
import {css} from 'glamor';
import {ToastContainer} from 'react-toastify';
import {style} from 'react-toastify';

style({
  colorProgressDefault: 'white',
  fontFamily: 'Vazir',
});

class Register extends Component {

  constructor(props) {
    super(props);
    this.realRegister = this.realRegister.bind(this);
  }

  realRegister() {
    if (this.state.passwordRepeat === this.state.password) {
      this.props.dispatch(register({
        'legal': 0,
        'name': this.state.name,
        'email': this.state.email,
        'password': this.state.password,
      }, this.manageToastAlerts))
    } else
      toastAlerts(false, 'کلمه عبور و تکرار آن یکسان نیستند.')

  }


  manageToastAlerts(status) {
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
                  <AvForm>
                    <h1>ثبت نام</h1>
                    <p className="text-muted">پروفایل خود را بسازید</p>

                    <br/>
                    <div>
                      {/* حقیقی */}
                      <AvGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <AvInput
                          name="fullName"
                          type="text" placeholder="نام و نام خانوادگی"
                          onChange={event => this.setState({name: event.target.value})}
                          required/>
                        <br/>
                        <AvFeedback>الزامی است</AvFeedback>
                      </AvGroup>

                      <AvGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            @
                          </InputGroupText>
                        </InputGroupAddon>
                        <AvInput
                          name="email"
                          type="email" placeholder="پست الکترونیکی"
                          onChange={event => this.setState({email: event.target.value})}
                          required/>
                        <br/>
                        <AvFeedback>صحیح نیست</AvFeedback>
                      </AvGroup>

                      <AvGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <AvInput
                          name="password"
                          name="originalPassword" type="password" placeholder="کلمه عبور"
                          onChange={event => this.setState({password: event.target.value})}
                          required/>
                        <br/>
                        <AvFeedback>الزامی است</AvFeedback>
                      </AvGroup>

                      <AvGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <AvInput
                          name="passwordRepeat"
                          type="password" placeholder="تکرار کلمه عبور"
                          onChange={event => this.setState({passwordRepeat: event.target.value})}
                          validate={{match: {value: 'originalPassword'}}}/>
                        <br/>
                        <AvFeedback>مطابق با کلمه عبور نیست</AvFeedback>
                      </AvGroup>

                      <img
                        style={{display: this.props.currentlySending ? 'block' : 'none', margin: "auto"}}
                        src={'img/loading.gif'}/>

                      <Button
                        style={{display: !this.props.currentlySending ? 'block' : 'none'}}
                        color="success" onClick={this.realRegister} block>ثبت نام</Button>
                      <Button
                        style={{display: !this.props.currentlySending ? 'block' : 'none'}}
                        color="primary"
                        onClick={() => window.location = '#/login'}
                        block>بازگشت به لاگین</Button>

                    </div>
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer className="text-right"/>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {currentlySending: state.homeReducer.currentlySending === undefined ? false : state.homeReducer.currentlySending};
}

export default connect(mapStateToProps)(Register);
