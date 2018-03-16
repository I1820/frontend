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
import {connectThing, createScenario, getThingProfileListAction} from "../../actions/AppActions";
import connect from "react-redux/es/connect/connect";

class AddScenario extends Component {

    constructor(props) {
        super(props);

        this.sendScenario = this.sendScenario.bind(this)

        this.state = {
            code: ""
        }
    }


    componentWillMount() {
        const splitedUrl = window.location.href.split('/');
        this.setState({
            project: splitedUrl[5]
        })
    }


    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">ویرایشگر سناریو</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={2}>نام سناریو:</Label>
                                <Col sm={5}>
                                    <Input onChange={(event) => {
                                        this.setState({name: event.target.value})
                                    }} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <AceEditor
                                    onChange={(code) => this.state.code = code}
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
                        <Button onClick={this.sendScenario} className="ml-1" color="primary" size="md">ارسال
                            سناریو</Button>
                        <Button className="ml-1" color="warning" size="md">بررسی سناریو</Button>
                    </CardFooter>
                </Card>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">نتیجه بررسی سناریو</CardTitle>
                    </CardHeader>
                    <CardBody>
                    </CardBody>
                </Card>
            </div>
        );
    }


    sendScenario() {
        this.props.dispatch(createScenario(this.state.project, {
            name: this.state.name,
            code: this.state.code
        }))
    }
}

function mapStateToProps(state) {
    return ({
        loading: state.homeReducer.currentlySending,
    })
}

export default connect(mapStateToProps)(AddScenario);
