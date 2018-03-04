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


class GatewaysNew extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">افزودن Gateway</CardTitle>
                    </CardHeader>
                    <CardBody>
                    <Form>
                        <FormGroup row>
                            <Label sm={2}>اسم : </Label>
                            <Col sm={5}>
                                <Input type="text"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>آدرس : </Label>
                            <Col sm={5}>
                                <Input type="text"/>
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


export default GatewaysNew;
