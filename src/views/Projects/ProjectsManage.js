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
    ListGroup,
    ListGroupItem,
    Button,
    ButtonGroup,
    Label,
    Input,
    Table
} from 'reactstrap';


class ProjectsManage extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">تغییر اطلاعات پروژه</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={2}>نام پروژه : </Label>
                                <Col sm={5}>
                                    <Input type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>توضیحات :‌ </Label>
                                <Col sm={5}>
                                    <Input type="textarea" name="" rows="2"/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary">ثبت اطلاعات</Button>
                    </CardFooter>
                </Card>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">اشیا متصل شده به پروژه</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table hover responsive className="table-outline">
                            <thead className="thead-light">
                            <tr>
                                <th>#</th>
                                <th>نام شی</th>
                                <th>آدرس</th>
                                <th>نوع</th>
                                <th>امکانات</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderThingItem()}
                            {this.renderThingItem()}
                            {this.renderThingItem()}
                            {this.renderThingItem()}
                            {this.renderThingItem()}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <Button className="ml-1" color="primary">افزودن شی</Button>
                        <Button className="ml-1" color="success">افزودن دسته ای شی</Button>
                    </CardFooter>
                </Card>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">انتخاب سناریو پروژه</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ListGroup>
                            {this.renderScenarioItem()}
                            {this.renderScenarioItem()}
                            {this.renderScenarioItem()}
                            {this.renderScenarioItem()}
                        </ListGroup>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary">افزودن سناریو</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }


    renderScenarioItem() {
        return (
            <ListGroupItem className="justify-content-between">
                Cras justo odio
                <Button className="ml-1 float-left" color="warning" size="sm">ویرایش</Button>
                <Button className="ml-1 float-left" color="success" size="sm">نمایش</Button>
            </ListGroupItem>
        )
    }

    renderThingItem() {
        return (
            <tr>
                <th>1</th>
                <td>عنوان شی اینجاست</td>
                <td>آدرس شی اینجاست</td>
                <td>ATTO</td>
                <td>
                    <Button className="ml-1" color="success" size="sm">فعال سازی</Button>
                    <Button className="ml-1" color="warning" size="sm">ویرایش</Button>
                    <Button className="ml-1" color="danger" size="sm">حذف</Button>
                </td>
            </tr>
        )
    }
}

export default ProjectsManage;
