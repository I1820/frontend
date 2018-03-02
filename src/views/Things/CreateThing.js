import React, {Component} from 'react';
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


class CreateThing extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">اطلاعات شی</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={2}>نام شی : </Label>
                                <Col sm={5}>
                                    <Input type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>توضیحات شی : </Label>
                                <Col sm={5}>
                                    <Input type="textarea"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}> نوع اتصال :</Label>
                                <Col md="5">
                                    <Input type="select" name="select" id="select">
                                        <option value="0">Please select</option>
                                        <option value="1">Option #1</option>
                                        <option value="2">Option #2</option>
                                        <option value="3">Option #3</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}> پریود ارسال داده : </Label>
                                <Col sm={5}>
                                    <Input type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2} htmlFor="select">پروفایل شی :</Label>
                                <Col md="5">
                                    <Input type="select" name="select" id="select">
                                        <option value="0">Please select</option>
                                        <option value="1">Option #1</option>
                                        <option value="2">Option #2</option>
                                        <option value="3">Option #3</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary">شی جدید</Button>
                    </CardFooter>
                </Card>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">محل قرارگیری شی</CardTitle>
                    </CardHeader>
                    <CardBody>
                    </CardBody>
                </Card>
            </div>
        );
    }

}

export default CreateThing;
