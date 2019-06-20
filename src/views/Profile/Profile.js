import React, {Component} from 'react'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardImg,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    Row,
} from 'reactstrap'

import {connect} from 'react-redux'
import {
    changePassword,
    editProfile,
    getProfileAction,
    updateUser,
    uploadLegalDocAction,
    uploadPictureAction
} from '../../actions/AppActions'
import Select from 'react-select'
import {toastAlerts} from '../Shared/toast_alert'
import {baseFilesURL} from '../../api/index'

class Profile extends Component {

    constructor(props) {
        super(props);

        this.editUserProfile = this.editUserProfile.bind(this);
        this.changeUserPassword = this.changeUserPassword.bind(this);
        this.uploadPicture = this.uploadPicture.bind(this);
        this.uploadLegalDoc = this.uploadLegalDoc.bind(this);

        this.state = {
            city: this.props.userInfo.phone && this.props.userInfo.phone.split('-')[0] ?
                Profile.getCodes().filter((c) => c.value === this.props.userInfo.phone.split('-')[0])[0]
                : '021',
            name: this.props.userInfo.username,
            legal: this.props.userInfo.legal ? '1' : '0',
            phone: this.props.userInfo.phone && this.props.userInfo.phone.split('-')[1] ? this.props.userInfo.phone.split('-')[1] : '',
            address: this.props.userInfo.other_info ? this.props.userInfo.other_info.address : '',
            mobile: this.props.userInfo.mobile ? this.props.userInfo.mobile : '',
            legalInfo: this.props.userInfo.legal_info ? this.props.userInfo.legal_info : {},
            legal_doc: this.props.userInfo.legal_doc ? this.props.userInfo.legal_doc : '',
            picture: this.props.userInfo.picture ? this.props.userInfo.picture : '',
            impersonated: !!this.props.userInfo.impersonated
        }
    }

    componentWillMount() {
        this.props.dispatch(getProfileAction())
    }

    editUserProfile() {
        this.props.dispatch(editProfile({
            'legal': this.state.legal,
            'name': this.state.name,
            'mobile': this.state.mobile,
            'phone': this.state.city.value + '-' + this.state.phone,
            'other_info': JSON.stringify({
                'address': this.state.address,
            }),
            'legal_info': JSON.stringify(this.state.legalInfo)
        }, toastAlerts))
    }

    changeUserPassword() {
        if (this.state.new_password === undefined) {
            toastAlerts(false, 'رمز جدید را درست وارد کنید')
        }
        if (this.state.new_password !== this.state.re_new_password) {
            toastAlerts(false, 'رمز جدید با تکرار آن مطابقت ندارد')
        } else {
            this.props.dispatch(changePassword({
                'password': this.state.password,
                'new_password': this.state.new_password,
            }, toastAlerts))
        }
    }

    uploadLegalDoc(file) {
        if (!file) {
            toastAlerts(false, 'لطفا فایل را انتخاب کنید')
        } else {
            this.props.dispatch(uploadLegalDocAction(file, (status, data) => {
                if (status) {
                    toastAlerts(status, data.message);
                    this.setState({legal_doc: data.path})
                } else {
                    toastAlerts(status, data.message)
                }
            }))
        }
    }

    uploadPicture(file) {
        if (!file) {
            toastAlerts(false, 'لطفا عکس را انتخاب کنید')
        } else {
            this.props.dispatch(uploadPictureAction(file, (status, data) => {
                if (status) {
                    console.log(data);
                    toastAlerts(status, data.message);
                    this.setState({picture: baseFilesURL() + data.user.picture});
                    this.props.dispatch(updateUser({user: data.user}))
                } else {
                    toastAlerts(status, data.message)
                }
            }))
        }
    }

    render() {
        return (
            <Row>
                <Col md="12" lg="7">
                    <Card className="text-justify">
                        <CardHeader>
                            <CardTitle className="mb-0 font-weight-bold h6">ویرایش اطلاعات حساب کاربری</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label for="fullName">نام و نام خانوادگی:</Label>
                                    <Input
                                        name="fullName"
                                        id="fullName"
                                        type="text"
                                        onChange={(event) => {
                                            this.setState({
                                                ...this.state,
                                                name: event.target.value
                                            })
                                        }}
                                        placeholder={'نام و نام خانوادگی'}
                                        maxLength={100}
                                        defaultValue={this.state.name}
                                        required/>
                                </FormGroup>

                                <FormGroup>
                                    <Label>تلفن ثابت:</Label>
                                    <InputGroup style={{alignItems: 'baseline'}}>
                                        <Input
                                            name="phoneNumber"
                                            dir="ltr"
                                            type="text"
                                            onInput={event => {
                                                this.setState({phone: event.target.value.replace(/\D/, '')});
                                                event.target.value = event.target.value.replace(/\D/, '')
                                            }}
                                            placeholder={'88888888'}
                                            maxLength={8}
                                            defaultValue={this.state.phone}/>
                                        <InputGroupAddon addonType="prepend" style={{width: '100px', paddingRight: '10px'}}>
                                            <Select
                                                styles={{container: (provided) => ({...provided, width: '100%'})}}
                                                isSearchable={true}
                                                isRtl={true}
                                                onChange={(e) => this.setState({city: e})}
                                                options={Profile.getCodes()}
                                                value={this.state.city}
                                            />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup>
                                    <Label>تلفن همراه:</Label>
                                    <Input
                                        dir="ltr"
                                        placeholder="+989390909540"
                                        value={this.state.mobile}
                                        onChange={event => this.setState({mobile: event.target.value})}/>
                                </FormGroup>

                                <FormGroup>
                                    <Label>نشانی:</Label>
                                    <Input type="textarea" rows="4" onChange={(event) =>
                                        this.setState({address: event.target.value})
                                    }
                                           placeholder={'تهران - ...'}
                                           maxLength={500}
                                           value={this.state.address}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label> نوع کاربر:</Label>
                                    <Input value={this.state.legal} onChange={(e) => {
                                        this.setState({legal: e.target.value})
                                    }}
                                           type="select" name="type" id="select">
                                        <option value={1}>حقوقی</option>
                                        <option value={0}>حقیقی</option>
                                    </Input>
                                </FormGroup>
                            </Form>
                            <Form style={{display: this.state.legal === '1' ? 'block' : 'none'}}>
                                <FormGroup>
                                    <Label for="orgName">نام شرکت: </Label>
                                    <Input
                                        name="orgName"
                                        id="orgName"
                                        type="text" onChange={(event) =>
                                        this.setState({
                                            legalInfo: {
                                                ...this.state.legalInfo,
                                                org_name: event.target.value
                                            }
                                        })
                                    }
                                        placeholder={'نام شرکت'}
                                        maxLength={100}
                                        defaultValue={this.state.legalInfo.org_name}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="interfaceName" sm={4}>نام و نام خانوادگی واسط شرکت: </Label>
                                    <Input
                                        name="interfaceName"
                                        type="text" onChange={(event) =>
                                        this.setState({
                                            legalInfo: {
                                                ...this.state.legalInfo,
                                                org_interface_name: event.target.value
                                            }
                                        })
                                    }
                                        placeholder={'نام و نام خانوادگی'}
                                        maxLength={100}
                                        defaultValue={this.state.legalInfo.org_interface_name}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>مستندات حقوقی:</Label>
                                    {
                                        this.state.legal_doc ?
                                            <a target="_blank" rel="noopener noreferrer"
                                               href={baseFilesURL() + this.state.legal_doc}>دانلود</a>
                                            : <p>سندی بارگذاری نشده است</p>
                                    }
                                    <Input name="docs"
                                           type="file"
                                           onChange={(event) => {
                                               this.uploadLegalDoc(event.target.files[0])
                                           }}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>تلفن همراه واسط شرکت:</Label>
                                    <Input
                                        dir="ltr"
                                        placeholder="+989390909540"
                                        value={this.state.legalInfo.org_interface_mobile}
                                        onChange={event => this.setState({
                                            legalInfo: {
                                                ...this.state.legalInfo,
                                                org_interface_mobile: event.target.value
                                            }
                                        })}/>
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" onClick={this.editUserProfile}>ذخیره تغییرات</Button>
                        </CardFooter>
                    </Card>
                </Col>
                <Col md="12" lg="5">
                    <Card className="text-justify">
                        <CardHeader>
                            <CardTitle className="mb-0 font-weight-bold h6">تغییر رمز عبور</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label>رمز عبور فعلی:</Label>
                                    <Input
                                        name="oldPassword"
                                        type="password" onChange={(event) => {
                                        this.setState({
                                            ...this.state,
                                            password: event.target.value
                                        })
                                    }} placeholder={'رمز عبور فعلی'}
                                        required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>رمز عبور جدید:</Label>
                                    <Input
                                        name="newPassword" type="password" onChange={(event) => {
                                        this.setState({
                                            ...this.state,
                                            new_password: event.target.value
                                        })
                                    }} placeholder={'رمز عبور جدید'}
                                        required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>تکرار رمز عبور جدید:</Label>
                                    <Input
                                        name="renewPassword" type="password" onChange={(event) => {
                                        this.setState({
                                            ...this.state,
                                            re_new_password: event.target.value
                                        })
                                    }} placeholder={'تکرار رمز عبور جدید'}
                                        required/>
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" onClick={this.changeUserPassword}>ذخیره تغییرات</Button>
                        </CardFooter>
                    </Card>
                    <br/>
                    <Card className="text-justify">
                        <CardHeader>
                            <CardTitle className="mb-0 font-weight-bold h6">تصویر پروفایل</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <FormGroup>
                                <Label> (حداکثر 8Mb) ارسال عکس</Label>
                                <Input type="file"
                                       onChange={(event) => {
                                           this.uploadPicture(event.target.files[0])
                                       }}/>
                            </FormGroup>
                            <CardImg width="100%" src={this.state.picture} alt="بدون عکس پروفایل"/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }

    static getCodes() {
        return [{label: 'تهران', value: '021'}
            , {label: 'البرز', value: '026'}
            , {label: 'قم', value: '025'}
            , {label: 'مرکزی', value: '086'}
            , {label: 'زنجان', value: '024'}
            , {label: 'سمنان', value: '023'}
            , {label: 'همدان', value: '081'}
            , {label: 'قزوین', value: '028'}
            , {label: 'اصفهان', value: '031'}
            , {label: 'آذربایجان غربی', value: '044'}
            , {label: 'مازندران', value: '011'}
            , {label: 'کهگیلویه و بویراحمد', value: '074'}
            , {label: 'کرمانشاه', value: '083'}
            , {label: 'خراسان رضوی', value: '051'}
            , {label: 'اردبیل', value: '045'}
            , {label: 'گلستان', value: '017'}
            , {label: 'آذربایجان شرقی', value: '041'}
            , {label: 'سیستان و بلوچستان', value: '054'}
            , {label: 'کردستان', value: '087'}
            , {label: 'فارس', value: '071'}
            , {label: 'لرستان', value: '066'}
            , {label: 'کرمان', value: '034'}
            , {label: 'خراسان جنوبی', value: '056'}
            , {label: 'گیلان', value: '013'}
            , {label: 'بوشهر', value: '077'}
            , {label: 'هرمزگان', value: '076'}
            , {label: 'خوزستان', value: '061'}
            , {label: 'چهارمحال و بختیاری', value: '038'}
            , {label: 'خراسان شمالی', value: '058'}
            , {label: 'یزد', value: '035'}
            , {label: 'ایلام', value: '084'}]
    }

}

function mapStateToProps(state) {
    return {
        userInfo: state.userReducer,
    };
}

export default connect(mapStateToProps)(Profile);
