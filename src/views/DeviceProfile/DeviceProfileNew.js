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


class DeviceProfileNew extends Component {

    constructor(props) {
        super(props);
        this.advancedFields = this.advancedFields.bind(this);
        this.state = {
            collapse: false
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
                                    <Input type="text"/>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2}>supportsJoin :‌ </Label>
                                <Col sm={4}>
                                    <Input type="select" name="select" id="select">
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
                                        <Input name={"classBTimeout"} innerRef={ref => this.setRef(ref)} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>classCTimeout :‌ </Label>
                                    <Col sm={4}>
                                        <Input name={"classCTimeout"} innerRef={ref => this.setRef(ref)} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>factoryPresetFreqs :‌ </Label>
                                    <Col sm={4}>
                                        <Input  name={"factoryPresetFreqs"} innerRef={ref => this.setRef(ref)} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>macVersion :‌ </Label>
                                    <Col sm={4}>
                                        <Input name={"macVersion"} innerRef={ref => this.setRef(ref)} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>maxDutyCycle :‌ </Label>
                                    <Col sm={4}>
                                        <Input  name={"maxDutyCycle"} innerRef={ref => this.setRef(ref)} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>maxEIRP :‌ </Label>
                                    <Col sm={4}>
                                        <Input  name={"maxEIRP"} innerRef={ref => this.setRef(ref)} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>pingSlotDR :‌ </Label>
                                    <Col sm={4}>
                                        <Input  name={"pingSlotDR"} innerRef={ref => this.setRef(ref)} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>pingSlotFreq :‌ </Label>
                                    <Col sm={4}>
                                        <Input   name={"pingSlotFreq"} innerRef={ref => this.setRef(ref)}type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>pingSlotPeriod :‌ </Label>
                                    <Col sm={4}>
                                        <Input  name={"pingSlotPeriod"} innerRef={ref => this.setRef(ref)} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>regParamsRevision :‌ </Label>
                                    <Col sm={4}>
                                        <Input  name={"regParamsRevision"} innerRef={ref => this.setRef(ref)} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>rfRegion :‌ </Label>
                                    <Col sm={4}>
                                        <Input  name={"rfRegion"} innerRef={ref => this.setRef(ref)} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>rxDROffset1 :‌ </Label>
                                    <Col sm={4}>
                                        <Input  name={"rxDROffset1"} innerRef={ref => this.setRef(ref)} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>rxDataRate2 :‌ </Label>
                                    <Col sm={4}>
                                        <Input   name={"rxDataRate2"} innerRef={ref => this.setRef(ref)}type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>rxDelay1 :‌ </Label>
                                    <Col sm={4}>
                                        <Input  name={"rxDelay1"} innerRef={ref => this.setRef(ref)} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>rxFreq2 :‌ </Label>
                                    <Col sm={4}>
                                        <Input  name={"rxFreq2"} innerRef={ref => this.setRef(ref)} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>supports32bitFCnt :‌ </Label>
                                    <Col sm={4}>
                                        <Input  name={"supports32bitFCnt"} innerRef={ref => this.setRef(ref)} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>supportsClassB :‌ </Label>
                                    <Col sm={4}>
                                        <Input  name={"supportsClassB"} innerRef={ref => this.setRef(ref)} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>supportsClassC :‌ </Label>
                                    <Col sm={4}>
                                        <Input  name={"supportsClassC"} innerRef={ref => this.setRef(ref)} type="text"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2}>supports32bitFCnt :‌ </Label>
                                    <Col sm={4}>
                                        <Input  name={"supports32bitFCnt"} innerRef={ref => this.setRef(ref)} type="text"/>
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
                        <Button onClick={()=>console.log(this.state)} color="primary">ثبت اطلاعات</Button>
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
                        <Button className="ml-1" color="primary" size="md">ارسال decoder</Button>
                    </CardFooter>
                </Card>

            </div>
        );
    }


    setRef(ref) {
        if (ref !== null){
            let state = {

            }
            state[ref.name] = ref.value;
            this.setState({
                form:{
                    ...this.state.form,
                    ...state
                }
            })
        }
    }
}


export default DeviceProfileNew;
