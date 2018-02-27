import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    Form,
    Badge,
    Modal,
    FormGroup,
    CardHeader,
    CardBody,
    CardFooter,
    ModalHeader,
    ModalBody,
    ModalFooter,
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

        this.toggle = this.toggle.bind(this)

        this.state = {
            modal: false
        }
    }


    render() {
        return (
            <div>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                        ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

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
                        <Button onClick={this.toggle} color="primary">پروژه جدید</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }


    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

}


export default ProjectsList;
