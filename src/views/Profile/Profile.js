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
import Spinner from "../Spinner/Spinner";
import classnames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import { style } from "react-toastify";
import {editProfile, getProfileAction} from "../../actions/AppActions";
import Phone from 'react-phone-number-input'
import 'react-phone-number-input/rrui.css'
import 'react-phone-number-input/style.css'

style({
    colorProgressDefault: 'white'
});


class Profile extends Component {

    constructor(props) {
        super(props);

        this.manageToastAlerts = this.manageToastAlerts.bind(this)
        this.editUserProfile = this.editUserProfile.bind(this)

        this.state = {
            fetchUserInfo: {
                fullName: this.props.userInfo.username,
                phone: this.props.userInfo.other_info.phone,
                address: this.props.userInfo.other_info.address,
                mobile: this.props.userInfo.mobile,
            }
        }
    }


    componentWillMount() {
        this.props.dispatch(getProfileAction());
    }

    editUserProfile() {
        var pattern = new RegExp('^[0-9]{4,11}$');

        if( pattern.test(this.state.fetchUserInfo.phone) ) {
            if( pattern.test(this.state.fetchUserInfo.mobile) ) {
                this.props.dispatch(editProfile({
                    'name': this.state.fetchUserInfo.fullName,
                    'mobile': this.state.fetchUserInfo.mobile,
                    'other_info': JSON.stringify({
                        'phone': this.state.fetchUserInfo.phone,
                        'address': this.state.fetchUserInfo.address,
                    })
                }, this.manageToastAlerts))
            }
            else {
                this.manageToastAlerts('شماره موبایل فقط عدد و ۱۱ کاراکتر باشد')
            }
        }
        else {
            this.manageToastAlerts('تلفن ثابت فقط عدد و بین ۴ الی ۱۱ کاراکتر باشد')
        }
    }

    manageToastAlerts(status) {
        if(status === true) {
            window.location = '#/profile'

            toast('اطلاعات شما با موفقیت ویرایش شد', {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: css({
                    background: '#dbf2e3',
                    color: '#28623c'
                }),
                progressClassName: css({
                    background: '#28623c'
                })
            });
        } else {
            toast(status, {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: css({
                    background: '#fee2e1',
                    color: '#813838',
                }),
                progressClassName: css({
                    background: '#813838'
                })
            });
        }
    }

    render() {
        return(
            <div>
                <ToastContainer className="text-right" />
                <Spinner display={this.props.loading} />
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">ویرایش اطلاعات حساب کاربری</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>

                        <FormGroup row>
                            <Label sm={3}>نام :‌ </Label>
                            <Col sm={5}>
                                <Input type="text" onChange={(event) => {
                                    this.setState({
                                        fetchUserInfo: {
                                            ...this.state.firstName,
                                            fullName: event.target.value
                                        }
                                    })
                                }} value={this.state.fetchUserInfo.firstName}/>
                            </Col>
                        </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>نام خانوادگی :‌ </Label>
                                <Col sm={5}>
                                    <Input type="text" onChange={(event) => {
                                        this.setState({
                                            fetchUserInfo: {
                                                ...this.state.lastName,
                                                fullName: event.target.value
                                            }
                                        })
                                    }} value={this.state.fetchUserInfo.lastName}/>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>تلفن ثابت : </Label>
                                <Col sm={5}>
                                    <Input type="text" dir="ltr" onChange={(event) => {
                                        this.setState({
                                            fetchUserInfo: {
                                                ...this.state.phone,
                                                phone: event.target.value
                                            }
                                        })
                                    }} value={this.state.fetchUserInfo.phone}/>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>تلفن همراه : </Label>
                                <Col sm={5}>
                                    {/*<Input type="text" dir="ltr" onChange={(event) => {
                                        this.setState({
                                            fetchUserInfo: {
                                                ...this.state.mobile,
                                                mobile: event.target.value
                                            }
                                        })
                                    }} value={this.state.fetchUserInfo.mobile}/> */}
                                    <Phone placeholder="09121234567"
                                    style={{
                                        direction: 'ltr'
                                    }}
                                    value={ this.state.phone }
                                    onChange={ phone => this.setState({ phone }) } />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3}>نشانی :‌ </Label>
                                <Col sm={5}>
                                    <Input type="textarea" rows="4" maxLength="500" onChange={(event) => {
                                        this.setState({
                                            fetchUserInfo: {
                                                ...this.state.address,
                                                address: event.target.value
                                            }
                                        })
                                    }} value={this.state.fetchUserInfo.address}/>
                                </Col>
                            </FormGroup>

                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary" onClick={this.editUserProfile}>ذخیره تغییرات</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        userInfo: state.userReducer,
        loading:state.homeReducer.currentlySending
    };
}

export default connect(mapStateToProps)(Profile);
