import React, {Component} from 'react'
import {Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, FormGroup, Label,} from 'reactstrap'

import {AvFeedback, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation'

import AceEditor from 'react-ace'

import 'brace/theme/monokai'
import 'brace/mode/python'
import 'brace/snippets/python'
import 'brace/ext/language_tools'
import {
    createGlobalCodecTemplateAction,
    getGlobalCodecTemplateAction,
    updateGlobalCodecTemplateAction
} from '../../actions/AppActions'
import connect from 'react-redux/es/connect/connect'
import Spinner from '../Spinner/Spinner'
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
        this.setState({
            id: this.props.match.params.id
        });

        if (this.props.match.params.id) {

            this.props.dispatch(getGlobalCodecTemplateAction(this.props.match.params.id, (status, codec) => {
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
                <Spinner display={this.props.loading}/>
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
                                    onChange={(code) => this.state.code = code}
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
                    </CardFooter>
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
            this.props.dispatch(createGlobalCodecTemplateAction(
                {
                    name: this.state.name,
                    code: this.state.code
                },
                toastAlerts
            ))
        } else {
            this.props.dispatch(updateGlobalCodecTemplateAction(
                this.state.id,
                {
                    name: this.state.name,
                    code: this.state.code
                }, toastAlerts
            ))
        }
    }
}

function mapStateToProps(state) {
    return ({
        loading: state.homeReducer.currentlySending,
    })
}

export default connect(mapStateToProps)(AddTemplate);
