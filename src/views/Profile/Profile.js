import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
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
import {connect} from 'react-redux';


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeUserInfo: this.props.userInfo
        }
    }

    render() {
        return(
            <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">ویرایش اطلاعات حساب کاربری</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={2}>نام و نام خانوادگی :‌ </Label>
                                <Col sm={5}>
                                    <Input type="text" value
                                    value={this.state.activeUserInfo.username}
                                    onChange={event => this.setState({userFullName: event.target.value})} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2}>تلفن ثابت : </Label>
                                <Col sm={5}>
                                    <Input type="text"
                                    onChange={event => this.setState({userTel: event.target.value})} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2}>تلفن همراه : </Label>
                                <Col sm={5}>
                                    <Input type="text"
                                    onChange={event => this.setState({userMobile: event.target.value})} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2}>نشانی :‌ </Label>
                                <Col sm={5}>
                                    <Input type="textarea" rows="4"
                                    onChange={event => this.setState({realAddress: event.target.value})} />
                                </Col>
                            </FormGroup>

                            {/*<FormGroup row>
                                <Label sm={2}>نوع مجموعه :‌ </Label>
                                <Col sm={5}>
                                    <Input type="select"
                                    onChange={event => this.setState({userOrgType: event.target.value})}>
                                        <option>سازمانی</option>
                                        <option>شرکت</option>
                                        <option>نظامی</option>
                                        <option>NGO</option>
                                    </Input>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2}>اسم مجموعه :‌ </Label>
                                <Col sm={5}>
                                    <Input type="text"
                                    onChange={event => this.setState({userOrgName: event.target.value})} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2}>شماره ثبت :‌ </Label>
                                <Col sm={5}>
                                    <Input type="text"
                                    onChange={event => this.setState({userOrgRegName: event.target.value})} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2}>کد اقتصادی :‌ </Label>
                                <Col sm={5}>
                                    <Input type="text"
                                    onChange={event => this.setState({userEcCode: event.target.value})} />
                                </Col>
                            </FormGroup>*/}

                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary">ذخیره تغییرات</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        userInfo: state.userReducer,
    };
}

export default connect(mapStateToProps)(Profile);
