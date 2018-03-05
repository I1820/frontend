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


class Gateways extends Component {

    constructor(props) {
        super(props);
        this.newGateway = this.newGateway.bind(this);
        this.viewGateway = this.viewGateway.bind(this);
    }


    render() {
        return (
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
                                <th>اسم</th>
                                <th>آدرس</th>
                                <th>امکانات</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderItem()}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.newGateway} color="primary">ساخت جدید</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }


    renderItem() {
        return(
            <tr>
                <th>1</th>
                <td>اسم اینجاست</td>
                <td>توضیحات تست اینجاست</td>
                <td>
                    <Button color="success" onClick={this.viewGateway} className="ml-1">نمایش</Button>
                    <Button color="danger">حذف</Button>
                </td>
            </tr>
        )
    }

    newGateway() {
        window.location = "#/gateways/new"
    }

    viewGateway() {
        window.location = "#/gateways/view"
    }

}


export default Gateways;
