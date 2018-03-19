import React, {Component} from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Button, FormGroup, Form, Label, Col, Input,
} from 'reactstrap';


import AceEditor from 'react-ace';

import 'brace/theme/monokai';
import 'brace/mode/python';
import 'brace/snippets/python';
import 'brace/ext/language_tools';
import {
    createCodecAction, getCodecAction, getCodecTemplateListAction} from "../../actions/AppActions";
import connect from "react-redux/es/connect/connect";
import Spinner from "../Spinner/Spinner";

class AddScenario extends Component {

    constructor(props) {
        super(props);

        this.sendCodec = this.sendCodec.bind(this)

        this.state = {
            codec: "",
            templates: []
        }
    }


    componentWillMount() {
        const splitedUrl = window.location.href.split('/');
        this.setState({
            project: splitedUrl[5],
            thing: splitedUrl[6]
        })
        this.props.dispatch(getCodecTemplateListAction(splitedUrl[5], (status, templates) => {
            this.props.dispatch(getCodecAction(splitedUrl[6], splitedUrl[5], (status, codec) => {
                if (status && codec !== null)
                    this.setState({
                        codec
                    })
            }))
            if (status)
                this.setState({
                    templates
                })
        }))

    }


    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">ویرایشگر codec</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={2}>قالب Decoder: </Label>
                                <Col sm={4}>
                                    <Input type="select" name="supportsJoin" id="select" onChange={(event) => {
                                        console.log(this.state.templates[event.target.value])
                                        if (event.target.value !== '') {
                                            this.setState({
                                                codec: this.state.templates[event.target.value].code
                                            })
                                        }
                                    }}>
                                        <option value="">قالب را انتخاب کنید</option>
                                        {this.renderTemplates()}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <AceEditor
                                    onChange={(code) => this.state.codec = code}
                                    mode="python"
                                    theme="monokai"
                                    className="col-md-12"
                                    name="UNIQUE_ID_OF_DIV"
                                    value={this.state.codec}
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
                        <Button onClick={this.sendCodec} className="ml-1" color="primary" size="md">ارسال
                            codec</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }


    renderTemplates() {
        return (this.state.templates.map((template, key) => {
            return (<option value={key}>{template.name}</option>)
        }))
    }

    sendCodec() {
        this.props.dispatch(createCodecAction(this.state.thing, this.state.project, this.state.codec, this.callback))
    }

    callback() {

    }
}

function mapStateToProps(state) {
    return ({
        loading: state.homeReducer.currentlySending,

    })
}

export default connect(mapStateToProps)(AddScenario);
