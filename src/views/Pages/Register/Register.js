import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';

class Register extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4 text-right">
                  <h1>ثبت نام</h1>
                  <p className="text-muted">پروفایل خود را بسازید</p>

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

                  <Button color="success" block>ثبت نام</Button>

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
