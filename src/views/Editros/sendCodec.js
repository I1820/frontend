import React, {Component} from 'react'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap'

import {toastAlerts} from '../Shared/toast_alert'

import AceEditor from 'react-ace'

import 'brace/theme/monokai'
import 'brace/mode/python'
import 'brace/snippets/python'
import 'brace/ext/language_tools'
import {
    getCodecTemplateListAction,
    getThingCodecAction,
    lintCode,
    sendCodecAction,
    testCodec
} from '../../actions/AppActions'
import connect from 'react-redux/es/connect/connect'
import Select from 'react-select'

class SendCodec extends Component {

    constructor(props) {
        super(props);

        this.sendCodec = this.sendCodec.bind(this);

        this.state = {
            modal: false,
            global: false,
            template: null,
            codec: '',
            templates: {
                codecs: [],
                globals: [],
            },
            testType: 0,
            testValue: '',
            lint: [],
            testResult: ''
        }
    }

    componentWillMount() {
        const projectID = this.props.match.params.id;
        const thingID = this.props.match.params.tid;
        this.setState({
            project: projectID,
            thing: thingID
        });
        this.props.dispatch(getCodecTemplateListAction(projectID, (status, templates) => {
            if (status) {
                this.setState({
                    templates
                })
            }
            this.props.dispatch(getThingCodecAction(thingID, (status, result) => {
                if (status && result !== null) {
                    if (result.codec_id) {
                        // global codec with private code
                        this.setState({
                            template: {
                                id: result.codec_id,
                                name: this.state.templates.globals.filter((template) => template._id === result.codec_id).map(template => template.name)[0],
                            },
                            codec: '"private global codec ;)"',
                            global: true
                        })
                    } else {
                        this.setState({
                            codec: result.codec
                        })
                    }
                }
            }));
        }))
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={() => this.setState({modal: !this.state.modal})}
                       className="text-right">
                    <ModalHeader>آزمایش کدک</ModalHeader>
                    <ModalBody>
                        <FormGroup style={{display: 'flex'}} row>
                            <Label sm={5}>مقدار آزمایش (در مبنای ۶۴):</Label>
                            <Col sm={7}>
                                <Input maxLength="150" type="textarea" name=""
                                       onChange={(e) => {
                                           this.setState({testValue: e.target.value})
                                       }}
                                       rows="2"/>
                            </Col>
                        </FormGroup>
                        <FormGroup style={{display: 'flex'}} row>
                            <Label sm={5}>نوع آزمایش:</Label>
                            <Col sm={7}>
                                <Input type="select" name="type"
                                       onChange={(e) => {
                                           this.setState({testType: e.target.value})
                                       }} id="select">
                                    <option value="0">کدگذاری</option>
                                    <option value="1">کدگشایی</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup style={{display: 'flex'}} row>
                            <Label sm={5}>نتیجه آزمایشی:</Label>
                            <Col sm={7}>
                                <Input value={this.state.testResult} maxLength="150" type="textarea" readOnly name=""
                                       rows="2"/>
                            </Col>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {
                            this.setState({testResult: ''});
                            this.props.dispatch(testCodec(this.state.thing, {data: this.state.testValue}, this.state.testType, (testResult) => {
                                this.setState({testResult})
                            }))
                        }} className="ml-1">ارسال
                        </Button>
                        <Button color="danger" onClick={() => this.setState({modal: !this.state.modal})}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">ویرایشگر Codec</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={2}>قالب Decoder: </Label>
                                <Col sm={8}>
                                    <Select
                                        options={this.renderTemplates()}
                                        value={this.state.template ? {value: this.state.template.id, label: this.state.template.name} : null}
                                        onChange={(template) => {
                                            this.state.templates.codecs.forEach((codec) => {
                                                if (codec._id === template.value) {
                                                    this.setState({
                                                        codec: codec.code,
                                                        global: false,
                                                        template: {
                                                            id: template.value,
                                                            name: template.label,
                                                        }
                                                    })
                                                }
                                            })

                                            this.state.templates.globals.forEach((global) => {
                                                if (global._id === template.value) {
                                                    this.setState({
                                                        codec: '"private global codec ;)"',
                                                        global: true,
                                                        template: {
                                                            id: template.value,
                                                            name: template.label,
                                                        }
                                                    })
                                                }
                                            })
                                        }}
                                        placeholder='قالب مورد نظر را انتخاب کنید'
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Button color={'info'} onClick={() => {
                                        this.setState({
                                            global: false,
                                            template: null
                                        })
                                    }}>{'به صورت دستی'}</Button>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <AceEditor
                                    onChange={(code) => this.setState({codec: code})}
                                    mode="python"
                                    theme="monokai"
                                    readOnly={this.state.global}
                                    className="col-md-12"
                                    name="codec-editor"
                                    value={this.state.codec}
                                    fontSize={14}
                                    showPrintMargin={false}
                                    showGutter={true}
                                    highlightActiveLine={false}
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
                        <Button onClick={this.sendCodec} className="ml-1" color="primary" size="md">بارگذاری کدک
                        </Button>
                        <Button
                            onClick={() => {
                                this.props.dispatch(lintCode(this.state.project, this.state.codec, (status, lint) => {
                                    status && this.setState({lint})
                                }))
                            }}
                            className="ml-1"
                            style={{display: this.state.global === false ? 'inline-block' : 'none'}}
                            color="secondary" size="md">بررسی کدک
                        </Button>
                        <Button
                            onClick={() => {
                                this.setState({modal: true})
                            }}
                            className="ml-1"
                            color="warning" size="md">آزمایش کدک
                        </Button>
                    </CardFooter>
                </Card>
                <Card style={{display: this.state.global === false ? 'flex' : 'none'}} className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">نتیجه بررسی کدک</CardTitle>
                    </CardHeader>
                    <CardBody style={{background: '#2F3129', textAlign: 'left', direction: 'ltr'}}>
                        {
                            this.renderLog()
                        }
                    </CardBody>
                </Card>
            </div>
        )
    }

    renderLog() {
        return this.state.lint.map((lint, key) => {
            let color = 'black';
            if (lint.type === 'error') {
                color = 'red'
            } else if (lint.type === 'warning') {
                color = 'orange'
            } else if (lint.type === 'convention') {
                color = 'cadetblue'
            }
            return <p id={`log-${key}`}
                      style={{fontFamily: 'sans-serif', color}}>{key + 1}- {lint.type}: {lint.message}!
                lint:{lint.line} column:{lint.column}</p>
        })
    }

    renderTemplates() {
        let options = [
            {
                options: [],
                label: 'قالب شخصی'
            }, {
                options: [],
                label: 'قالب عمومی'
            }
        ];
        options[0].options = this.state.templates && this.state.templates.codecs && this.state.templates.codecs.map((template) => ({ label: template.name, value: template._id }));
        options[1].options = this.state.templates && this.state.templates.globals && this.state.templates.globals.map((template) => ({ label: template.name, value: template._id }));
        return options
    }

    sendCodec() {
        if (this.state.global) {
            this.props.dispatch(sendCodecAction(this.state.thing, this.state.project, undefined, this.state.template.id, toastAlerts))
        } else {
            this.props.dispatch(sendCodecAction(this.state.thing, this.state.project, this.state.codec, undefined, toastAlerts))
        }
    }
}

function mapStateToProps(state) {
    return ({

    })
}

export default connect(mapStateToProps)(SendCodec);
