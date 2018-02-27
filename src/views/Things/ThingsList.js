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


class ThingsList extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست اشیاء</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table hover responsive className="table-outline">
                            <thead className="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>نام شی</th>
                                    <th>توضیحات</th>
                                    <th>آدرس فیزیکی</th>
                                    <th>پروژه های متصل</th>
                                    <th>امکانات</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>عنوان تست پروژه اینجا</td>
                                    <td>توضیحات تست اینجاست</td>
                                    <td>0000052</td>
                                    <td>پروژه تست</td>
                                    <td>
                                        <Button className="ml-1" color="warning" size="sm">ویرایش</Button>
                                        <Button className="ml-1" color="danger" size="sm">حذف</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>عنوان تست پروژه اینجا</td>
                                    <td>توضیحات تست اینجاست</td>
                                    <td>0000052</td>
                                    <td>پروژه تست</td>
                                    <td>
                                        <Button className="ml-1" color="warning" size="sm">ویرایش</Button>
                                        <Button className="ml-1" color="danger" size="sm">حذف</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td>عنوان تست پروژه اینجا</td>
                                    <td>توضیحات تست اینجاست</td>
                                    <td>0000052</td>
                                    <td>پروژه تست</td>
                                    <td>
                                        <Button className="ml-1" color="warning" size="sm">ویرایش</Button>
                                        <Button className="ml-1" color="danger" size="sm">حذف</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary">شی جدید</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

}

export default ThingsList;
