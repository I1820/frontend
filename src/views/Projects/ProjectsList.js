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


class ProjectsList extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست پروژه ها</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table hover responsive className="table-outline">
                            <thead className="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>نام پروژه</th>
                                    <th>توضیحات</th>
                                    <th>وضعیت</th>
                                    <th>صاحب پروژه</th>
                                    <th>امکانات</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>عنوان تست پروژه اینجا</td>
                                    <td>توضیحات تست اینجاست</td>
                                    <td><Badge color="success">فعال</Badge></td>
                                    <td>احمد احمدی</td>
                                    <td>
                                        <Button className="ml-1" color="success" size="sm">نمایش</Button>
                                        <Button className="ml-1" color="warning" size="sm">ویرایش</Button>
                                        <Button className="ml-1" color="danger" size="sm">حذف</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>عنوان تست پروژه اینجا</td>
                                    <td>توضیحات تست اینجاست</td>
                                    <td><Badge color="danger">غیر فعال</Badge></td>
                                    <td>احمد احمدی</td>
                                    <td>
                                        <Button className="ml-1" color="success" size="sm">نمایش</Button>
                                        <Button className="ml-1" color="warning" size="sm">ویرایش</Button>
                                        <Button className="ml-1" color="danger" size="sm">حذف</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td>عنوان تست پروژه اینجا</td>
                                    <td>توضیحات تست اینجاست</td>
                                    <td><Badge color="success">فعال</Badge></td>
                                    <td>احمد احمدی</td>
                                    <td>
                                        <Button className="ml-1" color="success" size="sm">نمایش</Button>
                                        <Button className="ml-1" color="warning" size="sm">ویرایش</Button>
                                        <Button className="ml-1" color="danger" size="sm">حذف</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary">پروژه جدید</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

}

export default ProjectsList;
