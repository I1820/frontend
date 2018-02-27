import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  ButtonGroup,
  Label,
  Input,
  Table
} from 'reactstrap';


class Profile extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">ویرایش اطلاعات حساب کاربری</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={2}>نام و نام خانوادگی :‌ </Label>
                                <Col sm={5}>
                                    <Input type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>پست الکترونیکی :‌ </Label>
                                <Col sm={5}>
                                    <Input type="email" dir="ltr" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>تلفن ثابت : </Label>
                                <Col sm={5}>
                                    <Input type="text" dir="ltr" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>تلفن همراه : </Label>
                                <Col sm={5}>
                                    <Input type="text" dir="ltr" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>نشانی :‌ </Label>
                                <Col sm={5}>
                                    <Input type="textarea" name="" rows="4" />
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary">ذخیره تغییرات</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

}

export default Profile;
