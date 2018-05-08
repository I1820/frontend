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
    TabContent,
    TabPane,
    Nav,
    NavItem,
    Collapse,
    NavLink,
    UncontrolledTooltip, FormFeedback,
} from 'reactstrap';

import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import AceEditor from 'react-ace';

import 'brace/theme/monokai';
import 'brace/mode/python';
import 'brace/snippets/python';
import 'brace/ext/language_tools';
import {createThingProfileAction, getDeviceProfile} from '../../actions/AppActions';
import connect from 'react-redux/es/connect/connect';
import Spinner from '../Spinner/Spinner';
import classnames from 'classnames';
import {toastAlerts} from '../Shared/toast_alert';

class DeviceProfileNew extends Component {

    constructor(props) {
        super(props);
        this.advancedFields = this.advancedFields.bind(this);
        this.setForm = this.setForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            new: true,
            collapse: false,
            activeTab: 'general',
            form: {
                name: '',
                classBTimeout: 0,
                classCTimeout: 0,
                'factoryPresetFreqs[]': 0,
                macVersion: '1.0.0',
                maxDutyCycle: 0,
                maxEIRP: 0,
                pingSlotDR: 0,
                pingSlotFreq: 0,
                pingSlotPeriod: 0,
                regParamsRevision: 'A',
                rxDROffset1: 0,
                rxDataRate2: 0,
                rxDelay1: 0,
                rxFreq2: 0,
                supportsClassB: false,
                supportsClassC: false,
                supports32bitFCnt: 1,
                supportsJoin: 1,
            }
        }
    }

    advancedFields() {
        this.setState({collapse: !this.state.collapse});
    }


    componentDidMount() {
        const splitedUrl = window.location.href.split('/');
        if (splitedUrl[splitedUrl.length - 1] !== 'new') {
            this.setState({
                new: false
            })

            this.props.dispatch(getDeviceProfile(splitedUrl[splitedUrl.length - 1], (result, data) => {
                console.log(result, data)
                if (result)
                    this.setState({
                        form: {
                            ...data.parameters,
                            name: data.name,
                            supportsJoin: data.parameters.supportsJoin ? 1 : 0,
                            thing_profile_slug: data.thing_profile_slug
                        }
                    })
            }))
        }
    }


    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle
                            className="mb-0 font-weight-bold h6">{this.state.new ? 'ساخت پروفایل جدید' :
                            ` پروفایل شی شماره ${this.state.form.thing_profile_slug}`}</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <AvForm className={'english'}>

                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({active: this.state.activeTab === 'general'})}
                                        onClick={() => {
                                            this.toggleTab('general');
                                        }}>اطلاعات کلی</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({active: this.state.activeTab === 'activation'})}
                                        onClick={() => {
                                            this.toggleTab('activation');
                                        }}>فعال‌سازی</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({active: this.state.activeTab === 'classB'})}
                                        onClick={() => {
                                            this.toggleTab('classB');
                                        }}>کلاس B</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({active: this.state.activeTab === 'classC'})}
                                        onClick={() => {
                                            this.toggleTab('classC');
                                        }}>کلاس C</NavLink>
                                </NavItem>

                            </Nav>
                            <br/>

                            <TabContent activeTab={this.state.activeTab} className="border-0">

                                <TabPane tabId={'general'}>
                                    <AvGroup row>
                                        <Col sm={4}>
                                            <AvInput placeholder={'Name'} value={this.state.form.name}
                                                   readOnly={!this.state.new}
                                                   onChange={this.setForm}
                                                   name={'name'}
                                                   type="text"
                                                   required />
                                            <br/>
                                            <AvFeedback>الزامی است</AvFeedback>
                                        </Col>
                                        <Label id={'name-input'} sm={3}>Name:</Label>
                                        {/*{'Thing Profile name'}*/}
                                    </AvGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input readOnly={!this.state.new}
                                                   dir="ltr" value={this.state.form.macVersion} name={'macVersion'}
                                                   onChange={this.setForm} type="select">
                                                <option value={'1.0.0'}>1.0.0</option>
                                                <option value={'1.0.1'}>1.0.1</option>
                                                <option value={'1.0.2'}>1.0.2</option>
                                                <option value={'1.1.0'}>1.1.0</option>
                                            </Input>
                                        </Col>
                                        <Label id={'macVersion-input'} sm={3}>LoRaWAN MAC Version:</Label>
                                        {/*{'Version of the LoRaWAN supported by the End-Device.'}*/}
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input dir="ltr" name={'regParamsRevision'}
                                                   readOnly={!this.state.new}
                                                   value={this.state.form.regParamsRevision}
                                                   onChange={this.setForm} type="select">
                                                <option value={'A'}>A</option>
                                                <option value={'B'}>B</option>
                                            </Input>
                                        </Col>
                                        <Label id={'regParamsRevision-input'} sm={3}>LoRaWAN Regional Parameters
                                            revision:</Label>
                                        {/*{'Revision of the Regional Parameters document supported by the End-Device.'}*/}
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input dir="ltr" name={'maxEIRP'}
                                                   readOnly={!this.state.new}
                                                   value={this.state.form.maxEIRP}
                                                   onChange={this.setForm} placeholder={0} type="number"/>
                                        </Col>
                                        <Label id={'maxEIRP-input'} sm={3}>Max EIRP:</Label>
                                    </FormGroup>

                                </TabPane>

                                <TabPane tabId={'activation'}>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input type="select" dir="ltr" name="supportsJoin" id="select"
                                                   readOnly={!this.state.new}
                                                   value={this.state.form.supportsJoin}
                                                   onChange={this.setForm}>
                                                <option value={1}>OTAA</option>
                                                <option value={0}>ABP</option>
                                            </Input>
                                        </Col>
                                        <Label id={'supportsJoin-input'} sm={3}>Supports Join (OTAA):</Label>
                                        {/*{'End-Device supports Join (OTAA) or not (ABP).'}*/}
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input dir="ltr" name={'rxDelay1'}
                                                   readOnly={!this.state.new}
                                                   value={this.state.form.rxDelay1}
                                                   onChange={this.setForm} placeholder={0} type="number"/>
                                        </Col>
                                        <Label id={'rxDelay1-input'} sm={3}>RX1 Delay:</Label>
                                        {/*{'Class A RX1 delay (mandatory for ABP).'}*/}
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input dir="ltr" name={'rxDROffset1'}
                                                   readOnly={!this.state.new}
                                                   value={this.state.form.rxDROffset1}
                                                   onChange={this.setForm} placeholder={0} type="number"/>
                                        </Col>
                                        <Label id={'rxDROffset1-input'} sm={3}>RX1 Data Rate Offset:</Label>
                                        {/*{'RX1 data rate offset (mandatory for ABP).'}*/}
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input dir="ltr" name={'rxDataRate2'}
                                                   readOnly={!this.state.new}
                                                   value={this.state.form.rxDataRate2}
                                                   onChange={this.setForm} placeholder={0} type="number"/>
                                        </Col>
                                        <Label id={'rxDataRate2-input'} sm={3}>RX2 Data Rate:</Label>
                                        {/*{'RX2 data rate (mandatory for ABP).'}*/}
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input dir="ltr" name={'rxFreq2'}
                                                   readOnly={!this.state.new}
                                                   value={this.state.form.rxFreq2}
                                                   onChange={this.setForm} placeholder={0} type="number"/>
                                        </Col>
                                        <Label id={'rxFreq2-input'} sm={3}>RX2 Channel Frequency:</Label>
                                        {/*{'RX2 channel frequency (mandatory for ABP).'}*/}
                                    </FormGroup>

                                </TabPane>

                                <TabPane tabId={'classB'}>
                                    <FormGroup row>
                                        <Col sm={4} style={{display: 'flex', justifyContent: 'flex-end'}}>{
                                            this.state.new ? <input type="checkbox" name={'supportsClassB'}
                                                                    onChange={() => this.toggleCheckbox('supportsClassB')}/>
                                                : this.state.form.supportsClassB.toString()
                                        }
                                        </Col>
                                        <Label id={'supportsClassB-input'} sm={3}>Supports Class-B:</Label>
                                        {/*{'End-Device supports Class B.'}*/}
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input dir="ltr"
                                                   name={'classBTimeout'} placeholder={'3 Seconds'}
                                                   readOnly={!this.state.new}
                                                   value={this.state.form.classBTimeout}
                                                   onChange={this.setForm} type="number"/>
                                        </Col>
                                        <Label id={'classBTimeout-input'} sm={3}>Class-B Confirmed Downlink
                                            Timeout:</Label>
                                        {/*{'Class-B timeout (in seconds) for confirmed downlink transmissions.'}*/}
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input dir="ltr" name={'pingSlotPeriod'}
                                                   readOnly={!this.state.new}
                                                   value={this.state.form.pingSlotPeriod}
                                                   onChange={this.setForm} type="select">
                                                <option value={32}>Every 2 Seconds</option>
                                                <option value={64}>Every 4 Seconds</option>
                                                <option value={128}>Every 8 Seconds</option>
                                                <option value={256}>Every 16 Seconds</option>
                                                <option value={512}>Every 32 Seconds</option>
                                                <option value={1024}>Every 64 Seconds</option>
                                                <option value={4096}>Every 128 Seconds</option>
                                            </Input>
                                        </Col>
                                        <Label id={'pingSlotPeriod-input'} sm={3}>Class-B Ping-Slot Periodicity:</Label>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input dir="ltr" name={'pingSlotDR'}
                                                   readOnly={!this.state.new}
                                                   value={this.state.form.pingSlotDR}
                                                   placeholder={0} onChange={this.setForm} type="number"/>
                                        </Col>
                                        <Label id={'pingSlotDR-input'} sm={3}>Class-B Ping-Slot Data-Rate:</Label>
                                        {/*{'Class-B data-rate.'}*/}
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input dir="ltr" name={'pingSlotFreq'} placeholder={'2 Hz'}
                                                   readOnly={!this.state.new}
                                                   value={this.state.form.pingSlotFreq}
                                                   onChange={this.setForm} type="number"/>
                                        </Col>
                                        <Label sm={3}>Class-B Ping-Slot Frequency (Hz):</Label>
                                        {/*{'Class-B frequency (in Hz).'}*/}
                                    </FormGroup>
                                </TabPane>

                                <TabPane tabId={'classC'}>
                                    <FormGroup row>
                                        <Col style={{display: 'flex', justifyContent: 'flex-end'}} sm={4}>
                                            {this.state.new ? <Input dir="ltr" name={'supportsClassC'}
                                                                     onChange={() => this.toggleCheckbox('supportsClassC')}
                                                                     type="checkbox"/> :
                                                this.state.form.supportsClassC.toString()
                                            }
                                        </Col>
                                        <Label sm={3}>Supports Class-C:</Label>
                                        {/*{'End-Device supports Class C.'}*/}
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input dir="ltr" defaultValue={this.state.form.classCTimeout}
                                                   name={'classCTimeout'}
                                                   placeholder={0}
                                                   readOnly={!this.state.new}
                                                   value={this.state.form.classCTimeout}
                                                   onChange={this.setForm} type="number"/>
                                        </Col>
                                        <Label id={'classCTimeout-input'} sm={3}>Class-C Confirmed Downlink
                                            Timeout</Label>
                                        {/*{'Class-C timeout (in seconds) for confirmed downlink transmissions.'}*/}
                                    </FormGroup>
                                </TabPane>

                            </TabContent>


                            {/*<Collapse isOpen={this.state.collapse} className="mt-3">*/}


                            {/*<FormGroup row>*/}
                            {/*<Col sm={4}>*/}
                            {/*<Input dir="ltr" defaultValue={this.state.form['factoryPresetFreqs[]']}*/}
                            {/*name={'factoryPresetFreqs'}*/}
                            {/*onChange={this.setForm} type="text"/>*/}
                            {/*</Col>*/}
                            {/*<Label sm={3}> : factoryPresetFreqs‌ </Label>*/}
                            {/*</FormGroup>*/}


                            {/*<FormGroup row>*/}
                            {/*<Col sm={4}>*/}
                            {/*<Input dir="ltr" defaultValue={this.state.form.maxDutyCycle}*/}
                            {/*name={'maxDutyCycle'}*/}
                            {/*onChange={this.setForm} type="text"/>*/}
                            {/*</Col>*/}
                            {/*<Label sm={3}> : maxDutyCycle </Label>*/}
                            {/*</FormGroup>*/}


                            {/*<FormGroup row>*/}
                            {/*<Col sm={4}>*/}
                            {/*<Input dir="ltr" name={'rfRegion'} defaultValue={this.state.form.rfRegion}*/}
                            {/*onChange={this.setForm} type="text"/>*/}
                            {/*</Col>*/}
                            {/*<Label sm={3}> : rfRegion‌ </Label>*/}
                            {/*</FormGroup>*/}

                            {/*<FormGroup row>*/}
                            {/*<Col sm={4}>*/}
                            {/*<Input dir="ltr" name={'rxDROffset1'} defaultValue={this.state.form.rxDROffset1}*/}
                            {/*onChange={this.setForm} type="text"/>*/}
                            {/*</Col>*/}
                            {/*<Label sm={3}> : rxDROffset1‌ </Label>*/}
                            {/*</FormGroup>*/}

                            {/*<FormGroup row>*/}
                            {/*<Col sm={4}>*/}
                            {/*<Input dir="ltr" name={'rxDataRate2'} defaultValue={this.state.form.rxDataRate2}*/}
                            {/*type="text"/>*/}
                            {/*</Col>*/}
                            {/*<Label sm={3}> : rxDataRate2‌ </Label>*/}
                            {/*</FormGroup>*/}

                            {/*<FormGroup row>*/}
                            {/*<Col sm={4}>*/}
                            {/*<Input dir="ltr" name={'rxDelay1'} defaultValue={this.state.form.rxDelay1}*/}
                            {/*onChange={this.setForm} type="text"/>*/}
                            {/*</Col>*/}
                            {/*<Label sm={3}> : rxDelay1‌ </Label>*/}
                            {/*</FormGroup>*/}

                            {/*<FormGroup row>*/}
                            {/*<Col sm={4}>*/}
                            {/*<Input dir="ltr" name={'rxFreq2'} defaultValue={this.state.form.rxFreq2}*/}
                            {/*onChange={this.setForm} type="text"/>*/}
                            {/*</Col>*/}
                            {/*<Label sm={3}> : rxFreq2‌ </Label>*/}
                            {/*</FormGroup>*/}

                            {/*<FormGroup row>*/}
                            {/*<Col sm={4}>*/}
                            {/*<Input dir="ltr" name={'supports32bitFCnt'}*/}
                            {/*defaultValue={this.state.form.supports32bitFCnt} onChange={this.setForm}*/}
                            {/*type="text"/>*/}
                            {/*</Col>*/}
                            {/*<Label sm={3}> : supports32bitFCnt </Label>*/}
                            {/*</FormGroup>*/}


                            {/*<FormGroup row>*/}
                            {/*<Col sm={4}>*/}
                            {/*<Input dir="ltr" name={'supports32bitFCnt'}*/}
                            {/*defaultValue={this.state.form.supports32bitFCnt} onChange={this.setForm}*/}
                            {/*type="text"/>*/}
                            {/*</Col>*/}
                            {/*<Label sm={3}> : supports32bitFCnt‌ </Label>*/}
                            {/*</FormGroup>*/}

                            {/*</Collapse>*/}

                            {/*<Button outline color="success" size="sm" onClick={this.advancedFields}>*/}
                            {/*<i className="icon-check ml-2"></i>فیلدهای بیشتر*/}
                            {/*</Button>*/}
                        </AvForm>
                    </CardBody>
                    <CardFooter>
                        {
                            this.state.new ?
                                <Button onClick={this.submitForm} color="primary">ثبت اطلاعات</Button>
                                : <div/>
                        }
                    </CardFooter>
                </Card>

            </div>
        );
    }


    setForm(event) {
        this.setState({
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        });
    }

    checkValidation(event) {
        event.preventDefault();
        // switch (type) {
        //     case "required":
        //         if (required(value)){
        //             element.valid = false;
        //         }
        //         break;
        //     default:
        //         break;
        // }
        console.log(event.target.value);
        event.target.valid = false;
        event.target.children.visibility = true;
    }

    toggleCheckbox(name) {
        this.setState({
            form: {
                ...this.state.form,
                [name]: !this.state.form[name]
            }
        })
    }

    submitForm() {
        const form = this.state.form
        this.props.dispatch(createThingProfileAction(form, this.callBack))
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    callBack(status, response) {
        toastAlerts(status, response)
    }

}

function mapStateToProps(state) {
    return ({
        loading: state.homeReducer.currentlySending
    })
}


export default connect(mapStateToProps)(DeviceProfileNew);
