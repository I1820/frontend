import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button, FormGroup, Form, Label, Col, Input,
} from 'reactstrap';

import { toastAlerts } from '../Shared/toast_alert';


import AceEditor from 'react-ace';

import 'brace/theme/monokai';
import 'brace/mode/python';
import 'brace/snippets/python';
import 'brace/ext/language_tools';
import {
  getThingCodecAction, getCodecTemplateListAction, lintCode, sendCodecAction
} from '../../actions/AppActions';
import connect from 'react-redux/es/connect/connect';
import Spinner from '../Spinner/Spinner';
import Select2 from 'react-select2-wrapper';

class SendCodec extends Component {

  constructor(props) {
    super(props);

    this.sendCodec = this.sendCodec.bind(this)

    this.state = {
      global: false,
      codec: '',
      templates: [],
      lint: []
    }
  }


  componentWillMount() {
    const splitedUrl = window.location.href.split('/');
    this.setState({
      project: splitedUrl[5],
      thing: splitedUrl[6]
    })
    this.props.dispatch(getCodecTemplateListAction(splitedUrl[5], (status, templates) => {
      this.props.dispatch(getThingCodecAction(splitedUrl[6], (status, result) => {
        if (status && result !== null)
          this.setState({
            codec: result.codec
          })
        if (result.codec_id)
          this.setState({
            templateId: result.codec_id,
            global: true
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
                  {/*<Input type="select" name="supportsJoin" id="select" onChange={(event) => {*/}
                  {/*if (event.target.value !== '') {*/}
                  {/*}*/}
                  {/*}}>*/}
                  {/*<option value="">قالب را انتخاب کنید</option>*/}
                  {/*{this.renderTemplates()}*/}
                  {/*</Input>*/}
                  <Select2
                    style={{width: '70%'}}
                    data={this.renderTemplates()}
                    ref="tags"
                    value={this.state.templateId}
                    onSelect={(template) => {
                      let templateId = template.target.selectedOptions[0].value;

                      if (_.find(this.state.templates.codecs, {_id: templateId}))
                        this.setState({
                          codec: _.find(this.state.templates.codecs, {_id: templateId}).code,
                          global: false,
                          templateId
                        })
                      else if (_.find(this.state.templates.globals, {_id: templateId}))
                        this.setState({
                          global: true,
                          templateId
                        })

                    }}
                    // onUnselect={this.setThing}
                    options={
                      {
                        placeholder: 'قالب مورد نظر را انتخاب کنید',
                      }
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup style={{display: this.state.global === false ? 'flex' : 'none'}} row>
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
            <Button
              onClick={() => {
                this.props.dispatch(lintCode(this.state.project, this.state.codec, (status, lint) => {
                    status && this.setState({lint})
                }))
              }}
              className="ml-1"
              style={{display: this.state.global === false ? 'inline-block' : 'none'}}
              color="warning" size="md">بررسی کدک</Button>
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
    );
  }


  renderLog() {
    return this.state.lint.map((lint, key) => {
      let color = 'black'
      if (lint.type === 'error')
        color = 'red'
      else if (lint.type === 'warning')
        color = 'orange'
      else if (lint.type === 'convention')
        color = 'cadetblue'
      return <p id={`log-${key}`}
                style={{fontFamily: 'sans-serif', color}}>{key + 1}- {lint.type}: {lint.message}!
        lint:{lint.line} column:{lint.column}</p>
    })
  }


  renderTemplates() {

    let templates = [{children: [], text: 'قالب شخصی'}, {children: [], text: 'قالب عمومی'}]
    this.state.templates && this.state.templates.codecs && this.state.templates.codecs.forEach((template) => {
        templates[0].children.push({text: template.name, id: template._id, global: false})
      }
    )
    this.state.templates && this.state.templates.globals && this.state.templates.globals.forEach((template) => {
        templates[1].children.push({text: template.name, id: template._id, global: true})
      }
    )
    console.log(templates)
    console.log(this.state.templates)
    return templates
  }


  sendCodec() {
    if (this.state.global)
      this.props.dispatch(sendCodecAction(this.state.thing, this.state.project, undefined, this.state.templateId, toastAlerts))
    else
      this.props.dispatch(sendCodecAction(this.state.thing, this.state.project, this.state.codec, undefined, toastAlerts))
  }
}

function mapStateToProps(state) {
  return ({
    loading: state.homeReducer.currentlySending,

  })
}

export default connect(mapStateToProps)(SendCodec);
