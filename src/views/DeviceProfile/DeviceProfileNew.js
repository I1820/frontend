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
    Table,
    Collapse
} from 'reactstrap';

import AceEditor from 'react-ace';

import 'brace/theme/monokai';
import 'brace/mode/python';
import 'brace/snippets/python';
import 'brace/ext/language_tools';
import {createThingProfileAction} from "../../actions/AppActions";
import connect from "react-redux/es/connect/connect";


class DeviceProfileNew extends Component {

    constructor(props) {
        super(props);
        this.advancedFields = this.advancedFields.bind(this);
        this.setForm = this.setForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            collapse: false,
            form: {
                name: "",
                classBTimeout: 0,
                classCTimeout: 0,
                'factoryPresetFreqs[]': 0,
                macVersion: 'version - 1',
                maxDutyCycle: 0,
                maxEIRP: 0,
                pingSlotDR: 0,
                pingSlotFreq: 0,
                pingSlotPeriod: 0,
                regParamsRevision: 'reg - p - rev',
                rfRegion: 'rf - region',
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
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">ساخت پروفایل جدید</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>

                            <FormGroup row>
                                <Label sm={2}>اسم :‌ </Label>
                                <Col sm={4}>
                                    <Input onChange={this.setForm} name={"name"} type="text"/>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2}>supportsJoin :‌ </Label>
                                <Col sm={4}>
                                    <Input type="select" name="supportsJoin" id="select" onChange={this.setForm}>
                                        <option value="">نوع شی را انتخاب کنید</option>
                                        <option value="1">OTAA</option>
                                        <option value="0">ABP</option>
                                    </Input>
                                </Col>
                            </FormGroup>

                            <Collapse isOpen={this.state.collapse} className="mt-3">

                                <FormGroup row>
                                    <Label sm={2}>classBTimeout :‌ </Label>
                                    <Col sm={4}>
                                        <Input defaultValue={this.state.form.classBTimeout} name={"classBTimeout"}
                                               onChange={this.setForm} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>classCTimeout :‌ </Label>
                                    <Col sm={4}>
                                        <Input defaultValue={this.state.form.classCTimeout} name={"classCTimeout"}
                                               onChange={this.setForm} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>factoryPresetFreqs :‌ </Label>
                                    <Col sm={4}>
                                        <Input defaultValue={this.state.form['factoryPresetFreqs[]']}
                                               name={"factoryPresetFreqs"}
                                               onChange={this.setForm} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>macVersion :‌ </Label>
                                    <Col sm={4}>
                                        <Input defaultValue={this.state.form.macVersion} name={"macVersion"}
                                               onChange={this.setForm} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>maxDutyCycle :‌ </Label>
                                    <Col sm={4}>
                                        <Input defaultValue={this.state.form.maxDutyCycle} name={"maxDutyCycle"}
                                               onChange={this.setForm} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>maxEIRP :‌ </Label>
                                    <Col sm={4}>
                                        <Input name={"maxEIRP"} defaultValue={this.state.form.maxEIRP}
                                               onChange={this.setForm} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>pingSlotDR :‌ </Label>
                                    <Col sm={4}>
                                        <Input name={"pingSlotDR"} defaultValue={this.state.form.pingSlotDR}
                                               onChange={this.setForm} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>pingSlotFreq :‌ </Label>
                                    <Col sm={4}>
                                        <Input name={"pingSlotFreq"} defaultValue={this.state.form.pingSlotFreq}
                                               type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>pingSlotPeriod :‌ </Label>
                                    <Col sm={4}>
                                        <Input name={"pingSlotPeriod"} defaultValue={this.state.form.pingSlotPeriod}
                                               onChange={this.setForm} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>regParamsRevision :‌ </Label>
                                    <Col sm={4}>
                                        <Input name={"regParamsRevision"}
                                               defaultValue={this.state.form.regParamsRevision}
                                               onChange={this.setForm} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>rfRegion :‌ </Label>
                                    <Col sm={4}>
                                        <Input name={"rfRegion"} defaultValue={this.state.form.rfRegion}
                                               onChange={this.setForm} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>rxDROffset1 :‌ </Label>
                                    <Col sm={4}>
                                        <Input name={"rxDROffset1"} defaultValue={this.state.form.rxDROffset1}
                                               onChange={this.setForm} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>rxDataRate2 :‌ </Label>
                                    <Col sm={4}>
                                        <Input name={"rxDataRate2"} defaultValue={this.state.form.rxDataRate2}
                                               type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>rxDelay1 :‌ </Label>
                                    <Col sm={4}>
                                        <Input name={"rxDelay1"} defaultValue={this.state.form.rxDelay1}
                                               onChange={this.setForm} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>rxFreq2 :‌ </Label>
                                    <Col sm={4}>
                                        <Input name={"rxFreq2"} defaultValue={this.state.form.rxFreq2}
                                               onChange={this.setForm} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>supports32bitFCnt :‌ </Label>
                                    <Col sm={4}>
                                        <Input name={"supports32bitFCnt"}
                                               defaultValue={this.state.form.supports32bitFCnt} onChange={this.setForm}
                                               type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>supportsClassB :‌ </Label>
                                    <Col sm={4}>
                                        <Input name={"supportsClassB"} defaultValue={this.state.form.supportsClassB}
                                               onChange={this.setForm} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>supportsClassC :‌ </Label>
                                    <Col sm={4}>
                                        <Input name={"supportsClassC"} defaultValue={this.state.form.supportsClassC}
                                               onChange={this.setForm} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>supports32bitFCnt :‌ </Label>
                                    <Col sm={4}>
                                        <Input name={"supports32bitFCnt"}
                                               defaultValue={this.state.form.supports32bitFCnt} onChange={this.setForm}
                                               type="text"/>
                                    </Col>
                                </FormGroup>

                            </Collapse>

                            <Button outline color="success" size="sm" onClick={this.advancedFields}>
                                <i className="icon-check ml-2"></i>
                                فیلدهای بیشتر
                            </Button>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.submitForm} color="primary">ثبت اطلاعات</Button>
                    </CardFooter>
                </Card>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">ویرایشگر decoder</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <AceEditor
                                    mode="python"
                                    theme="monokai"
                                    className="col-md-12"
                                    name="UNIQUE_ID_OF_DIV"
                                    fontSize={14}
                                    showPrintMargin={true}
                                    showGutter={true}
                                    highlightActiveLine={true}
                                    editorProps={{$blockScrolling: true}}
                                    setOptions={{
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true,
                                        showLineNumbers: true,
                                        tabSize: 2,
                                    }}
                                />
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button  className="ml-1" color="primary" size="md">ارسال
                            decoder</Button>
                    </CardFooter>
                </Card>

            </div>
        );
    }


    setForm(event) {
        let newState = {}
        newState[event.target.name] = event.target.value
        this.setState({
            form: {
                ...this.state.form,
                ...newState
            }
        })
        console.log(this.state)
    }

    submitForm() {
        console.log("dispatch")
        const form = this.state.form
        this.props.dispatch(createThingProfileAction(form));
    }

}

function mapStateToProps(state) {
    return ({})
}


export default connect(mapStateToProps)(DeviceProfileNew);
