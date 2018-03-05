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


class GatewaysView extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">نمایش Gateway</CardTitle>
                    </CardHeader>
                    <CardBody>
                    <Form>
                        <FormGroup row>
                            <Label sm={2}>اسم : </Label>
                            <Col sm={5}>
                                <strong>اسم اینجاست</strong>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>آدرس : </Label>
                            <Col sm={5}>
                                <strong>آدرس اینجاست</strong>
                            </Col>
                        </FormGroup>
                    </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }

}


export default GatewaysView;
