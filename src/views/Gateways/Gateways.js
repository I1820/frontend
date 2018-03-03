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

        this.toggle = this.toggle.bind(this)
        this.showProject = this.showProject.bind(this)

        this.state = {
            modal: false
        }
    }


    render() {
        return (
            <div>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className="text-right">
                    <ModalHeader>ساخت Gateway</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={3}>اسم : </Label>
                                <Col sm={9}>
                                    <Input type="text" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>آدرس : </Label>
                                <Col sm={9}>
                                    <Input type="text" />
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={this.toggle}>ذخیره</Button>
                        <Button color="danger" onClick={this.toggle}>انصراف</Button>
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
                                <th>اسم</th>
                                <th>آدرس</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderItem()}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.toggle} color="primary">ساخت جدید</Button>
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
            </tr>
        )
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    showProject() {
        window.location = "#/projects/view"
    }

    manageProject() {
        window.location = "#/projects/manage"
    }
}


export default Gateways;
