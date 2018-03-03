import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText
, TabContent, TabPane, Nav, NavItem, NavLink, Label} from 'reactstrap';
import classnames from 'classnames';

class Register extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
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

                  <br />

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

                <br /><br />

                <TabContent activeTab={this.state.activeTab} className="border-0">

                    <TabPane tabId="1">
                        {/* حقیقی */}
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="نام"/>
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="icon-user"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="نام خانوادگی"/>
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-phone"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="تلفن ثابت"/>
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-screen-smartphone"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="موبایل"/>
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-location-pin"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="آدرس"/>
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              @
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="email" placeholder="ایمیل"/>
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" placeholder="کلمه عبور"/>
                        </InputGroup>
                    </TabPane>

                    <TabPane tabId="2">
                        {/* حقوقی */}
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="نام رابط"/>
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText><i className="icon-user"></i></InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="نام خانوادگی رابط"/>
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-phone"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="تلفن رابط"/>
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-screen-smartphone"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="موبایل شخصی"/>
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              @
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="email" placeholder="ایمیل رابط"/>
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-home"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="اسم مجموعه"/>
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-folder-alt"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                            <Input type="select">
                                <option value="0">انتخاب نوع مجموعه</option>
                                <option>سازمانی</option>
                                <option>شرکت</option>
                                <option>نظامی</option>
                                <option>NGO</option>
                            </Input>
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-layers"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="شماره ثبت"/>
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-notebook"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="کد اقتصادی"/>
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" placeholder="کلمه عبور"/>
                        </InputGroup>
                    </TabPane>


                </TabContent>



                  <Button color="success" block>ثبت نام</Button>
                  <Button color="primary" block>بازگشت به لاگین</Button>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
