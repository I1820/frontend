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


class ProjectsNew extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">افزودن پروژه جدید</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={2}>نام پروژه : </Label>
                                <Col sm={5}>
                                    <Input type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>توضیحات :‌ </Label>
                                <Col sm={5}>
                                    <Input type="textarea" name="" rows="2" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>سناریو ساز :‌ </Label>
                                <Col sm={5}>
                                    <Input type="textarea" name="" rows="10" />
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary">ثبت اطلاعات</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

}

export default ProjectsNew;
