import React, {Component} from 'react';
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
import Spinner from '../Spinner/Spinner';
import classnames from 'classnames';
import {ToastContainer, toast} from 'react-toastify';
import {css} from 'glamor';
import {style} from 'react-toastify';
import {editProfile, getProfileAction, changePassword} from '../../actions/AppActions';
import Phone from 'react-phone-number-input'
import Select2 from "react-select2-wrapper";

style({
  colorProgressDefault: 'white'
});


class Profile extends Component {

  constructor(props) {
    super(props);

    this.manageToastAlerts = this.manageToastAlerts.bind(this)
    this.editUserProfile = this.editUserProfile.bind(this)
    this.changeUserPassword = this.changeUserPassword.bind(this)
    this.state = {
      name: this.props.userInfo.username,
      phone: this.props.userInfo.phone ? this.props.userInfo.phone : '',
      address: this.props.userInfo.other_info ? this.props.userInfo.other_info.address : '',
      mobile: this.props.userInfo.mobile ? this.props.userInfo.mobile : '',
    }
    console.log(this.props.userInfo)
  }


  componentWillMount() {
    this.props.dispatch(getProfileAction());
  }

  editUserProfile() {
    this.props.dispatch(editProfile({
      'name': this.state.name,
      'mobile': this.state.mobile,
      'phone': this.state.phone,
      'other_info': JSON.stringify({
        'address': this.state.address,
      })
    }, this.manageToastAlerts))
  }

  changeUserPassword() {
    this.props.dispatch(changePassword({
      'password': this.state.password,
      'new_password': this.state.new_password,
    }, this.manageToastAlerts))
  }

  manageToastAlerts(status) {
    if (status === true) {
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
              <Form>
                <FormGroup row>
                  <Label sm={4}>نام و نام خانوادگی :‌ </Label>
                  <Col sm={8}>
                    <Input type="text" onChange={(event) => {
                      this.setState({
                        ...this.state,
                        name: event.target.value
                      })
                    }}
                           placeholder={'نام و نام خانوادگی'}
                           maxLength={100}
                           defaultValue={this.state.name}/>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm={4}>تلفن ثابت:</Label>
                  <Col sm={5  }>
                    <Input type="number" dir="ltr" onChange={(event) => {
                      this.setState({
                        ...this.state,
                        phone: event.target.value
                      })
                    }}
                           placeholder={'۰۲۱-۸۸۸۸۸۸۸۸'}
                           maxLength={13}
                           defaultValue={this.state.phone}/>
                  </Col>
                  <Col sm={1}>
                    <Select2
                      data={this.getCodes()}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
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
                      country="IR"
                      style={{direction: "ltr"}}
                      smartCaret={false}
                      placeholder=""
                      value={this.state.mobile}
                      onChange={mobile => this.setState({mobile})}/>
                  </Col>
                </FormGroup>

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
                           defaultValue={this.state.address}/>
                  </Col>
                </FormGroup>

              </Form>
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
              <Form>
                <FormGroup row>
                  <Label sm={4}>رمز عبور فعلی:</Label>
                  <Col sm={8}>
                    <Input type="password" onChange={(event) => {
                      this.setState({
                        ...this.state,
                        password: event.target.value
                      })
                    }} placeholder={'رمز عبور فعلی'}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>رمز عبور جدید:</Label>
                  <Col sm={8}>
                    <Input type="password" onChange={(event) => {
                      this.setState({
                        ...this.state,
                        new_password: event.target.value
                      })
                    }} placeholder={'رمز عبور جدید'}/>
                  </Col>
                </FormGroup>

              </Form>
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
    return [{text: "تهران", id: "۰۲۱"}
      , {text: "البرز", id: "۰۲۶"}
      , {text: "قم", id: "۰۲۵"}
      , {text: "مرکزی", id: "۰۸۶"}
      , {text: "زنجان", id: "۰۲۴"}
      , {text: "سمنان", id: "۰۲۳"}
      , {text: "همدان", id: "۰۸۱"}
      , {text: "قزوین", id: "۰۲۸"}
      , {text: "اصفهان", id: "۰۳۱"}
      , {text: "آذربایجان غربی", id: "۰۴۴"}
      , {text: "مازندران", id: "۰۱۱"}
      , {text: "کهگیلویه و بویراحمد", id: "۰۷۴"}
      , {text: "کرمانشاه", id: "۰۸۳"}
      , {text: "خراسان رضوی", id: "۰۵۱"}
      , {text: "اردبیل", id: "۰۴۵"}
      , {text: "گلستان", id: "۰۱۷"}
      , {text: "آذربایجان شرقی", id: "۰۴۱"}
      , {text: "سیستان و بلوچستان", id: "۰۵۴"}
      , {text: "کردستان", id: "۰۸۷"}
      , {text: "فارس", id: "۰۷۱"}
      , {text: "لرستان", id: "۰۶۶"}
      , {text: "کرمان", id: "۰۳۴"}
      , {text: "خراسان جنوبی", id: "۰۵۶"}
      , {text: "گیلان", id: "۰۱۳"}
      , {text: "بوشهر", id: "۰۷۷"}
      , {text: "هرمزگان", id: "۰۷۶"}
      , {text: "خوزستان", id: "۰۶۱"}
      , {text: "چهارمحال و بختیاری", id: "۰۳۸"}
      , {text: "خراسان شمالی", id: "۰۵۸"}
      , {text: "یزد", id: "۰۳۵"}
      , {text: "ایلام", id: "۰۸۴"}]
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.userReducer,
    loading: state.homeReducer.currentlySending
  };
}

export default connect(mapStateToProps)(Profile);
