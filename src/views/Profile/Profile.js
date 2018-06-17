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

import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import classnames from 'classnames';
import { toast, ToastContainer } from 'react-toastify';
import { css } from 'glamor';
import { style } from 'react-toastify';
import { editProfile, getProfileAction, changePassword, impersonateUserAction } from '../../actions/AppActions';
import Phone from 'react-phone-number-input'
import Select2 from 'react-select2-wrapper';
import { toastAlerts } from '../Shared/toast_alert';

style({
  colorProgressDefault: 'white'
});


class Profile extends Component {

  constructor(props) {
    super(props);

    this.editUserProfile = this.editUserProfile.bind(this)
    this.changeUserPassword = this.changeUserPassword.bind(this)
    this.state = {
      city: this.props.userInfo.phone && this.props.userInfo.phone.split('-')[0] ?
        this.props.userInfo.phone.split('-')[0]
        : '021',
      name: this.props.userInfo.username,
      legal: this.props.userInfo.legal ? '1' : '0',
      phone: this.props.userInfo.phone && this.props.userInfo.phone.split('-')[1] ? this.props.userInfo.phone.split('-')[1] : '',
      address: this.props.userInfo.other_info ? this.props.userInfo.other_info.address : '',
      mobile: this.props.userInfo.mobile ? this.props.userInfo.mobile : '',
      legalInfo: this.props.userInfo.legal_info ? this.props.userInfo.legal_info : {},
      impersonated: !!this.props.userInfo.impersonated
    }
    console.log(this.props.userInfo)
  }


  componentWillMount() {
    this.props.dispatch(getProfileAction());
  }

  editUserProfile() {
    this.props.dispatch(editProfile({
      'legal': this.state.legal,
      'name': this.state.name,
      'mobile': this.state.mobile,
      'phone': this.state.city + '-' + this.state.phone,
      'other_info': JSON.stringify({
        'address': this.state.address,
      }),
      'legal_info': JSON.stringify(this.state.legalInfo)
    }, toastAlerts))
  }

  changeUserPassword() {
    this.props.dispatch(changePassword({
      'password': this.state.password,
      'new_password': this.state.new_password,
    }, toastAlerts))
  }

  render() {
    console.log(this.state)
    return (
      <div className={'row'}>
        <ToastContainer className="text-right"/>
        <Spinner display={this.props.loading}/>
        <div className="col-md-12 col-lg-7">
          <Card className="text-justify">
            <CardHeader>
              <CardTitle className="mb-0 font-weight-bold h6">ویرایش اطلاعات حساب کاربری</CardTitle>
            </CardHeader>
            <CardBody>
              <AvForm>
                <AvGroup row>
                  <Label sm={4}>نام و نام خانوادگی:</Label>
                  <Col sm={8}>
                    <AvInput
                      name="fullName"
                      type="text"
                      onChange={(event) => {
                        this.setState({
                          ...this.state,
                          name: event.target.value
                        })
                      }}
                      placeholder={'نام و نام خانوادگی'}
                      maxLength={100}
                      value={this.state.name}
                      required/>
                    <br/>
                    <AvFeedback>الزامی است</AvFeedback>
                  </Col>
                </AvGroup>

                <AvGroup row>
                  <Label sm={4}>تلفن ثابت:</Label>
                  <Col sm={5}>
                    <AvInput
                      name="phoneNumber"
                      dir="ltr"
                      onChange={(event) => {
                        this.setState({
                          ...this.state,
                          phone: event.target.value
                        })
                      }}
                      placeholder={'88888888'}
                      maxLength={13}
                      value={this.state.phone}/>
                    <br/>
                    <AvFeedback>الزامی است</AvFeedback>
                  </Col>
                  <Col sm={3}>
                    <Select2
                      onSelect={(e) => this.setState({city: parseInt(e.target.value)})}
                      data={this.getCodes()}
                      value={this.state.city}
                    />
                  </Col>
                </AvGroup>

                <AvGroup row>
                  <Label sm={4}>تلفن همراه:</Label>
                  <Col sm={8}>
                    {/*<Input type="text" dir="ltr" onChange={(event) => {*/}
                    {/*this.setState({*/}
                    {/*...this.state,*/}
                    {/*mobile: event.target.value*/}
                    {/*})*/}
                    {/*}}*/}
                    {/*placeholder={'۰۹۱۲۰۰۰۰۰۰۰'}*/}
                    {/*maxLength={12}*/}
                    {/*defaultValue={this.state.mobile}/>*/}
                    <Phone
                      displayInitialValueAsLocalNumber
                      // country="IR"
                      style={{direction: 'ltr'}}
                      smartCaret={false}
                      placeholder=""
                      value={this.state.mobile}
                      onChange={mobile => this.setState({mobile})}/>
                  </Col>
                </AvGroup>

                <FormGroup row>
                  <Label sm={4}>نشانی:</Label>
                  <Col sm={8}>
                    <Input type="textarea" rows="4" onChange={(event) => {
                      this.setState({
                        ...this.state,
                        address: event.target.value
                      })
                    }}
                           placeholder={'تهران - ...'}
                           maxLength={500}
                           value={this.state.address}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}> نوع کاربر:</Label>
                  <Col sm={8}>
                    <Input value={this.state.legal} onChange={(e) => {
                      this.setState({legal: e.target.value})
                    }}
                           type="select" name="type" id="select">
                      <option value={1}>حقوقی</option>
                      <option value={0}>حقیقی</option>
                    </Input>
                  </Col>
                </FormGroup>
              </AvForm>
              <AvForm style={{display: this.state.legal === '1' ? 'block' : 'none'}}>
                <AvGroup row>
                  <Label sm={4}>نام شرکت:‌ </Label>
                  <Col sm={8}>
                    <AvInput
                      name="fullName"
                      type="text" onChange={(event) => {
                      this.setState({
                        ...this.state,
                        legalInfo: {
                          ...this.state.legalInfo,
                          org_name: event.target.value
                        }
                      })
                    }}
                      placeholder={'نام شرکت'}
                      maxLength={100}
                      value={this.state.legalInfo.org_name}
                      required/>
                    <br/>
                    <AvFeedback>الزامی است</AvFeedback>
                  </Col>
                </AvGroup>
                <AvGroup row>
                  <Label sm={4}>نام و نام خانوادگی واسط شرکت:‌ </Label>
                  <Col sm={8}>
                    <AvInput
                      name="fullName"
                      type="text" onChange={(event) => {
                      this.setState({
                        ...this.state,
                        legalInfo: {
                          ...this.state.legalInfo,
                          org_interface_name: event.target.value
                        }
                      })
                    }}
                      placeholder={'نام و نام خانوادگی'}
                      maxLength={100}
                      value={this.state.legalInfo.org_interface_name}
                      required/>
                    <br/>
                    <AvFeedback>الزامی است</AvFeedback>
                  </Col>
                </AvGroup>
                <AvGroup row>
                  <Label sm={4}>تلفن همراه واسط شرکت:</Label>
                  <Col sm={8}>
                    <Phone
                      displayInitialValueAsLocalNumber
                      // country="IR"
                      style={{direction: 'ltr'}}
                      smartCaret={false}
                      placeholder=""
                      value={this.state.legalInfo.org_interface_mobile}
                      onChange={mobile => this.setState({
                        ...this.state,
                        legalInfo: {
                          ...this.state.legalInfo,
                          org_interface_mobile: mobile
                        }
                      })}/>
                  </Col>
                </AvGroup>
              </AvForm>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={this.editUserProfile}>ذخیره تغییرات</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="col-md-12 col-lg-5">
          <Card className="text-justify">
            <CardHeader>
              <CardTitle className="mb-0 font-weight-bold h6">تغییر رمزعبور</CardTitle>
            </CardHeader>
            <CardBody>
              <AvForm>
                <AvGroup row>
                  <Label sm={4}>رمز عبور فعلی:</Label>
                  <Col sm={8}>
                    <AvInput
                      name="oldPassword"
                      type="password" onChange={(event) => {
                      this.setState({
                        ...this.state,
                        password: event.target.value
                      })
                    }} placeholder={'رمز عبور فعلی'}
                      required/>
                    <br/>
                    <AvFeedback>الزامی است</AvFeedback>
                  </Col>
                </AvGroup>
                <AvGroup row>
                  <Label sm={4}>رمز عبور جدید:</Label>
                  <Col sm={8}>
                    <AvInput
                      name="newPassword" type="password" onChange={(event) => {
                      this.setState({
                        ...this.state,
                        new_password: event.target.value
                      })
                    }} placeholder={'رمز عبور جدید'}
                      required/>
                    <br/>
                    <AvFeedback>الزامی است</AvFeedback>
                  </Col>
                </AvGroup>

              </AvForm>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={this.changeUserPassword}>ذخیره تغییرات</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  getCodes() {
    return [{text: 'تهران', id: '021'}
      , {text: 'البرز', id: '026'}
      , {text: 'قم', id: '025'}
      , {text: 'مرکزی', id: '086'}
      , {text: 'زنجان', id: '024'}
      , {text: 'سمنان', id: '023'}
      , {text: 'همدان', id: '081'}
      , {text: 'قزوین', id: '028'}
      , {text: 'اصفهان', id: '031'}
      , {text: 'آذربایجان غربی', id: '044'}
      , {text: 'مازندران', id: '011'}
      , {text: 'کهگیلویه و بویراحمد', id: '074'}
      , {text: 'کرمانشاه', id: '083'}
      , {text: 'خراسان رضوی', id: '051'}
      , {text: 'اردبیل', id: '045'}
      , {text: 'گلستان', id: '017'}
      , {text: 'آذربایجان شرقی', id: '041'}
      , {text: 'سیستان و بلوچستان', id: '054'}
      , {text: 'کردستان', id: '087'}
      , {text: 'فارس', id: '071'}
      , {text: 'لرستان', id: '066'}
      , {text: 'کرمان', id: '034'}
      , {text: 'خراسان جنوبی', id: '056'}
      , {text: 'گیلان', id: '013'}
      , {text: 'بوشهر', id: '077'}
      , {text: 'هرمزگان', id: '076'}
      , {text: 'خوزستان', id: '061'}
      , {text: 'چهارمحال و بختیاری', id: '038'}
      , {text: 'خراسان شمالی', id: '058'}
      , {text: 'یزد', id: '035'}
      , {text: 'ایلام', id: '084'}]
  }

}

function mapStateToProps(state) {
  return {
    userInfo: state.userReducer,
    loading: state.homeReducer.currentlySending
  };
}

export default connect(mapStateToProps)(Profile);
