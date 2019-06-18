import React, {Component} from 'react'
import {Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, FormGroup, Label,} from 'reactstrap'

import {AvFeedback, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation'

import AceEditor from 'react-ace'

import 'brace/theme/monokai'
import 'brace/mode/python'
import 'brace/snippets/python'
import 'brace/ext/language_tools'
import {createScenario, getScenarioAction, lintCode, updateScenarioAction} from '../../actions/AppActions'
import connect from 'react-redux/es/connect/connect'
import {toastAlerts} from '../Shared/toast_alert'

class AddScenario extends Component {

    constructor(props) {
        super(props);

        this.sendScenario = this.sendScenario.bind(this);

        this.state = {
            code: '',
            name: '',
            lint: []
        }
    }

    componentWillMount() {
        const projectID = this.props.match.params.id;
        const scenarioID = this.props.match.params.sid;
        this.setState({
            project: projectID
        });

        if (scenarioID !== '') {
            this.setState({
                id: scenarioID
            });

            this.props.dispatch(getScenarioAction(projectID, scenarioID, (status, scenario) => {
                if (status) {
                    this.setState({
                        code: scenario.code,
                        name: scenario.name
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
                        <CardTitle className="mb-0 font-weight-bold h6">ویرایشگر سناریو</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <AvForm>
                            <AvGroup row>
                                <Label sm={2}>نام سناریو:</Label>
                                <Col sm={5}>
                                    <AvInput
                                        name="name"
                                        onChange={(event) => {
                                            this.setState({name: event.target.value})
                                        }}
                                        value={this.state.name}
                                        type="text"
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
                                    value={this.state.code}
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
                        </AvForm>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.sendScenario} className="ml-1" color="primary" size="md">ارسال
                            سناریو</Button>
                        <Button onClick={() => {
                            this.props.dispatch(lintCode(this.state.project, this.state.code, (status, lint) => {
                                if (status) {
                                    this.setState({lint})
                                }
                            }))
                        }} className="ml-1" color="warning" size="md">بررسی سناریو</Button>
                    </CardFooter>
                </Card>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">نتیجه بررسی سناریو</CardTitle>
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

    sendScenario() {
        if (this.state.id === undefined) {
            this.props.dispatch(createScenario(this.state.project, {
                name: this.state.name,
                code: this.state.code
            }, toastAlerts))
        } else {
            this.props.dispatch(updateScenarioAction(this.state.project, this.state.id, {
                name: this.state.name,
                code: this.state.code
            }, toastAlerts))
        }
    }
}

function mapStateToProps(state) {
    return ({
    })
}

export default connect(mapStateToProps)(AddScenario);
