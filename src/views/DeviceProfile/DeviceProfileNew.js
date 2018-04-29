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
    TabContent,
    TabPane,
    Nav,
    NavItem,
    Collapse,
    NavLink,
    UncontrolledTooltip,
} from 'reactstrap';

import AceEditor from 'react-ace';

import 'brace/theme/monokai';
import 'brace/mode/python';
import 'brace/snippets/python';
import 'brace/ext/language_tools';
import { createThingProfileAction } from '../../actions/AppActions';
import connect from 'react-redux/es/connect/connect';
import Spinner from '../Spinner/Spinner';
import classnames from 'classnames';


class DeviceProfileNew extends Component {

    constructor(props) {
        super(props);
        this.advancedFields = this.advancedFields.bind(this);
        this.setForm = this.setForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            collapse: false,
            activeTab: 'general',
            form: {
                name: '',
                classBTimeout: 0,
                classCTimeout: 0,
                'factoryPresetFreqs[]': 0,
                macVersion: 'version-1',
                maxDutyCycle: 0,
                maxEIRP: 0,
                pingSlotDR: 0,
                pingSlotFreq: 0,
                pingSlotPeriod: 0,
                regParamsRevision: 'reg-p-rev',
                rfRegion: 'rf-region',
                rxDROffset1: 0,
                rxDataRate2: 0,
                rxDelay1: 0,
                rxFreq2: 0,
                supportsClassB: 1,
                supportsClassC: 1,
                supports32bitFCnt: 1,
            }
        }
    }

    advancedFields() {
        this.setState({collapse: !this.state.collapse});
    }

    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">ساخت پروفایل جدید</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form className={'english'}>

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
                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input placeholder={'Name'} onChange={this.setForm} name={'name'}
                                                   type="text"/>
                                        </Col>
                                        <Label id={'name-input'} sm={3}>Name: </Label>
                                        {/*{'Thing Profile name'}*/}
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input dir="ltr" value={'1.0.0'} name={'macVersion'}
                                                   onChange={this.setForm} type="select">
                                                <option value={'1.0.0'}>1.0.0</option>
                                                <option value={'1.0.1'}>1.0.1</option>
                                                <option value={'1.0.2'}>1.0.2</option>
                                                <option value={'1.1.0'}>1.0.0</option>

                                            </Input>
                                        </Col>
                                        <Label id={'macVersion-input'} sm={3}>LoRaWAN MAC Version:</Label>
                                        {/*{'Version of the LoRaWAN supported by the End-Device.'}*/}
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input dir="ltr" name={'regParamsRevision'}
                                                   defaultValue={this.state.form.regParamsRevision}
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
                                                   onChange={this.setForm} placeholder={0} type="number"/>
                                        </Col>
                                        <Label id={'maxEIRP-input'} sm={3}>Max EIRP:</Label>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input type="select" dir="ltr" name="supportsJoin‌" id="select"
                                                   onChange={this.setForm}>
                                                <option value={1}>OTAA</option>
                                                <option value={0}>ABP</option>
                                            </Input>
                                        </Col>
                                        <Label id={'supportsJoin-input'} sm={3}>Supports Join (OTAA):</Label>
                                        {/*{'End-Device supports Join (OTAA) or not (ABP).'}*/}
                                    </FormGroup>
                                </TabPane>

                                <TabPane tabId={'classB'}>
                                    <FormGroup row>
                                        <Col sm={4} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                            <Input dir="ltr" name={'supportsClassB'}
                                                   onChange={this.setForm} type="checkbox"/>
                                        </Col>
                                        <Label id={'supportsClassB-input'} sm={3}>Supports Class-B:</Label>
                                        {/*{'End-Device supports Class B.'}*/}
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input dir="ltr"
                                                   name={'classBTimeout'} placeholder={'3 Seconds'}
                                                   onChange={this.setForm} type="number"/>
                                        </Col>
                                        <Label id={'classBTimeout-input'} sm={3}>Class-B Confirmed Downlink
                                            Timeout:</Label>
                                        {/*{'Class-B timeout (in seconds) for confirmed downlink transmissions.'}*/}
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input dir="ltr" name={'pingSlotPeriod'}
                                                   value={32}
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
                                                   placeholder={0} onChange={this.setForm} type="number"/>
                                        </Col>
                                        <Label id={'pingSlotDR-input'} sm={3}>Class-B Ping-Slot Data-Rate:</Label>
                                        {/*{'Class-B data-rate.'}*/}
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input dir="ltr" name={'pingSlotFreq'} placeholder={'2 Hz'}
                                                   type="number"/>
                                        </Col>
                                        <Label sm={3}>Class-B Ping-Slot Frequency (Hz):</Label>
                                        {/*{'Class-B frequency (in Hz).'}*/}
                                    </FormGroup>
                                </TabPane>

                                <TabPane tabId={'classC'}>
                                    <FormGroup row>
                                        <Col style={{display: 'flex', justifyContent: 'flex-end'}} sm={4}>
                                            <Input dir="ltr" name={'supportsClassC'}
                                                   onChange={this.setForm} type="checkbox"/>
                                        </Col>
                                        <Label sm={3}>Supports Class-C:</Label>
                                        {/*{'End-Device supports Class C.'}*/}
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={4}>
                                            <Input dir="ltr" defaultValue={this.state.form.classCTimeout}
                                                   name={'classCTimeout'}
                                                   placeholder={0}
                                                   onChange={this.setForm} type="number"/>
                                        </Col>
                                        <Label id={'classCTimeout-input'} sm={3}>Class-C Confirmed Downlink Timeout</Label>
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
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.submitForm} color="primary">ثبت اطلاعات</Button>
                    </CardFooter>
                </Card>

            </div>
        );
    }


    setForm(event) {
        let newState = this.state.form
        newState[event.target.name] = event.target.value
        this.setState({
            form: newState
        })
        console.log(this.state.form)
    }

    submitForm() {
        console.log('dispatch')
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

    callBack() {

    }

}

function mapStateToProps(state) {
    return ({
        loading: state.homeReducer.currentlySending
    })
}


export default connect(mapStateToProps)(DeviceProfileNew);
