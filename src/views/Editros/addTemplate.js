import React, {Component} from 'react'
import {Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, FormGroup, Label,} from 'reactstrap'

import {AvFeedback, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation'

import AceEditor from 'react-ace'

import 'brace/theme/monokai'
import 'brace/mode/python'
import 'brace/snippets/python'
import 'brace/ext/language_tools'
import {
    createCodecTemplateAction,
    getCodecTemplateAction,
    lintCode,
    updateCodecTemplateAction
} from '../../actions/AppActions'
import connect from 'react-redux/es/connect/connect'
import {toastAlerts} from '../Shared/toast_alert'

class AddTemplate extends Component {

    constructor(props) {
        super(props);

        this.sendTemplate = this.sendTemplate.bind(this);

        this.state = {
            code: '',
            name: '',
            lint: []
        }
    }

    componentWillMount() {
        const projectID = this.props.match.params.id;
        const templateID = this.props.match.params.tid;

        this.setState({
            project: projectID
        });

        if (templateID) {
            this.setState({
                id: templateID
            });

            this.props.dispatch(getCodecTemplateAction(projectID, projectID, (status, codec) => {
                if (status) {
                    this.setState({
                        code: codec.code,
                        name: codec.name
                    })
                }
            }))
        }
    }

    render() {
        return (
            <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">ویرایشگر قالب codec</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <AvForm>
                            <AvGroup row>
                                <Label sm={1}>نام قالب:</Label>
                                <Col sm={5}>
                                    <AvInput
                                        name="name"
                                        value={this.state.name}
                                        onChange={(event) => {
                                            this.setState({name: event.target.value})
                                        }} type="text"
                                        required/>
                                    <br/>
                                    <AvFeedback>الزامی است</AvFeedback>
                                </Col>
                            </AvGroup>
                            <FormGroup row>
                                <AceEditor
                                    onChange={(code) => this.setState({code: code})}
                                    mode="python"
                                    theme="monokai"
                                    className="col-md-12"
                                    name="UNIQUE_ID_OF_DIV"
                                    fontSize={14}
                                    value={this.state.code}
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
                        </AvForm>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.sendTemplate} className="ml-1" color="primary" size="md">ارسال
                            قالب</Button>
                        <Button onClick={() => {
                            this.props.dispatch(lintCode(this.state.project, this.state.code, (status, lint) => {
                                if (status) {
                                    this.setState({lint})
                                }
                            }))
                        }} className="ml-1" color="warning" size="md">بررسی کدک</Button>
                    </CardFooter>
                </Card>
                <Card className="text-justify">
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
            return <p key={`log-${key}`} style={{fontFamily: 'sans-serif', color}}>
                line {lint.line}:{lint.column} - {lint.type}: {lint.message}!
            </p>
        })
    }

    sendTemplate() {

        if (this.state.id === undefined) {
            this.props.dispatch(createCodecTemplateAction(
                this.state.project, {
                    name: this.state.name,
                    code: this.state.code
                },
                toastAlerts
            ))
        } else {
            this.props.dispatch(updateCodecTemplateAction(
                this.state.id,
                this.state.project, {
                    name: this.state.name,
                    code: this.state.code
                }, toastAlerts
            ))
        }
    }
}

function mapStateToProps(state) {
    return ({
    })
}

export default connect(mapStateToProps)(AddTemplate);
