import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Badge,
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


class ThingsExcel extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">آپلود فایل Excel</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <p>برای ساخت دسته ای شی مانند فایل اکسل نمونه را در سامانه بارگذاری نمایید</p>
                            <br />
                            <FormGroup row>
                                <Col sm={12}>
                                    <Input type="file" />
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary">آپلود</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

}

export default ThingsExcel;
