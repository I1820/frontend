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


class DeviceProfile extends Component {

    constructor(props) {
        super(props);

        this.newDeviceProfile = this.newDeviceProfile.bind(this)
        this.state = {
            modal: false
        }
    }


    render() {
        return (
            <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست پروفایل اشیاء</CardTitle>
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
                        <Button onClick={this.newDeviceProfile} color="primary">ساخت پروفایل</Button>
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
                    <Button color="danger">حذف</Button>
                </td>
            </tr>
        )
    }

    newDeviceProfile() {
        window.location = '#/device-profile/new';
    }


}


export default DeviceProfile;
