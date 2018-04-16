import React, { Component } from 'react';
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
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Label
} from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { register } from "../../../actions/AppActions";
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import { style } from "react-toastify";

style({
    colorProgressDefault: 'white',
    fontFamily: 'Vazir',
});

class Register extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.realRegister = this.realRegister.bind(this);
        this.legalRegister = this.legalRegister.bind(this);
        this.goTologinPage = this.goTologinPage.bind(this);
        this.registerAllUser = this.registerAllUser.bind(this);

        this.state = {
            activeTab: '1',
        };
    }

    registerAllUser() {
        if( this.state.regPasswrod == this.state.regRepeatPassword ) {
            this.props.dispatch(register({
                'legal': this.state.regUserType,
                'email': this.state.regEmail,
                'password': this.state.regPasswrod,
            }, this.manageToastAlerts))
        } else {
            this.manageToastAlerts('رمز عبور با تکرار برابر نیست')
        }
    }

    realRegister() {
        if( this.state.realPassword == this.state.realPasswordRepeat ) {
            this.props.dispatch(register({
                'legal': 0,
                'name': this.state.realFirstName + ' ' + this.state.realLastName,
                'email': this.state.realEmail,
                'mobile': this.state.realMobile,
                'password': this.state.realPassword,
                'other_info': JSON.stringify({
                    'phone': this.state.realTel,
                    'address': this.state.realAddress,
                })
            }, this.manageToastAlerts))
        } else {
            this.manageToastAlerts('رمز عبور با تکرار برابر نیست')
        }
    }

    legalRegister() {
        if( this.state.legalPasswordRepeat == this.state.legalPassword ) {
            this.props.dispatch(register({
                'legal': 1,
                'email': this.state.legalEmail,
                'password': this.state.legalPassword,
                'mobile': this.state.legalMobile,
                'org_interface_name': this.state.legalFirstName,
                'org_interface_last_name': this.state.legalLastName,
                'org_interface_phone': this.state.legalPhone,
                'org_interface_mobile': this.state.legalMobile,
                'type': this.state.legalOrgType,
                'org_name': this.state.legalOrgName,
                'reg_number': this.state.legalOrgRegName,
                'ec_code': this.state.legalEcCode,
            }, this.manageToastAlerts))
        } else {
            this.manageToastAlerts('رمز عبور با تکرار برابر نیست')
        }
    }

    manageToastAlerts(status) {
        if(status === true) {
            toast('ثبت نام با موفقیت انجام شد', {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: css({
                    background: '#dbf2e3',
                    color: '#28623c'
                }),
                progressClassName: css({
                    background: '#28623c'
                })
            });
        } else {
            toast(status, {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: css({
                    background: '#fee2e1',
                    color: '#813838',
                }),
                progressClassName: css({
                    background: '#813838'
                })
            });
        }
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    goTologinPage() {
        window.location = '#/login'
    }

  render() {
    return (
      <div className="app flex-row align-items-center mt-4">
        <ToastContainer className="text-right" />
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-0 mx-sm-4">
                <CardBody className="p-4 text-right">
                  <h1>ثبت نام</h1>
                  <p className="text-muted">پروفایل خود را بسازید</p>

                  <br />

                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        @
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                    style={{
                        direction: 'ltr'
                    }}
                     type="text" placeholder="پست الکترونیکی"
                    onChange={event => this.setState({regEmail: event.target.value})} />
                  </InputGroup>

                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user-following"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="select"
                    onChange={event => this.setState({regUserType: event.target.value})} >
                        <option value="0">حقیقی</option>
                        <option value="1">حقوقی</option>
                    </Input>
                  </InputGroup>

                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                    style={{
                        direction: 'ltr'
                    }}
                    type="password" placeholder="کلمه عبور"
                    onChange={event => this.setState({regPasswrod: event.target.value})} />
                  </InputGroup>

                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                    style={{
                        direction: 'ltr'
                    }}
                    type="password" placeholder="تکرار کلمه عبور"
                    onChange={event => this.setState({regRepeatPassword: event.target.value})} />
                  </InputGroup>

                  <br />

                  <Button color="success" onClick={this.registerAllUser} block>ثبت نام</Button>
                  <Button color="primary" onClick={this.goTologinPage} block>بازگشت به لاگین</Button>



              {/*

                <Nav tabs>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}>
                            حقیقی
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}>
                            حقوقی
                        </NavLink>
                    </NavItem>
                </Nav>

                <br />

                <TabContent activeTab={this.state.activeTab} className="border-0">

                    <TabPane tabId="1">

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="نام"
                          onChange={event => this.setState({realFirstName: event.target.value})} />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="icon-user"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="نام خانوادگی"
                          onChange={event => this.setState({realLastName: event.target.value})} />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-phone"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="تلفن ثابت"
                          onChange={event => this.setState({realTel: event.target.value})} />
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-screen-smartphone"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="تلفن همراه"
                          onChange={event => this.setState({realMobile: event.target.value})} />
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-location-pin"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="آدرس"
                          onChange={event => this.setState({realAddress: event.target.value})} />
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              @
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="پست الکترونیکی"
                          onChange={event => this.setState({realEmail: event.target.value})} />
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" placeholder="کلمه عبور"
                          onChange={event => this.setState({realPassword: event.target.value})} />
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" placeholder="تکرار کلمه عبور"
                          onChange={event => this.setState({realPasswordRepeat: event.target.value})} />
                        </InputGroup>

                        <Button color="success" onClick={this.realRegister} block>ثبت نام</Button>
                        <Button color="primary" onClick={this.goTologinPage} block>بازگشت به لاگین</Button>

                    </TabPane>




                    <TabPane tabId="2">

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="نام رابط"
                          onChange={event => this.setState({legalFirstName: event.target.value})} />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="icon-user"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="نام خانوادگی رابط"
                          onChange={event => this.setState({legalLastName: event.target.value})} />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-phone"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="تلفن رابط"
                          onChange={event => this.setState({legalPhone: event.target.value})} />
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-screen-smartphone"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="موبایل شخصی"
                          onChange={event => this.setState({legalMobile: event.target.value})} />
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              @
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="email" placeholder="ایمیل رابط"
                          onChange={event => this.setState({legalEmail: event.target.value})} />
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-home"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="اسم مجموعه"
                          onChange={event => this.setState({legalOrgName: event.target.value})} />
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-folder-alt"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                            <Input type="select" onChange={event => this.setState({legalOrgType: event.target.value})}>
                                <option value="0">انتخاب نوع مجموعه</option>
                                <option value="سازمانی">سازمانی</option>
                                <option value="شرکت">شرکت</option>
                                <option value="نظامی">نظامی</option>
                                <option value="NGO">NGO</option>
                            </Input>
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-layers"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="شماره ثبت"
                          onChange={event => this.setState({legalOrgRegName: event.target.value})} />
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-notebook"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="کد اقتصادی"
                          onChange={event => this.setState({legalEcCode: event.target.value})} />
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" placeholder="کلمه عبور"
                          onChange={event => this.setState({legalPassword: event.target.value})} />
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" placeholder="تکرار کلمه عبور"
                          onChange={event => this.setState({legalPasswordRepeat: event.target.value})} />
                        </InputGroup>

                        <Button color="success" onClick={this.legalRegister} block>ثبت نام</Button>
                        <Button color="primary" onClick={this.loginPage} block>بازگشت به لاگین</Button>

                    </TabPane>

                </TabContent>

                */}

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Register);
