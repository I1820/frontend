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
import Spinner from "../Spinner/Spinner";


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
        supportsJoin:1
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
            <Form>

              <FormGroup row>
                <Col sm={4}>
                  <Input onChange={this.setForm} name={"name"} type="text"/>
                </Col>
                <Label sm={3}> : Name </Label>
              </FormGroup>

              <FormGroup row>
                <Col sm={4}>
                  <Input type="select" dir="ltr" name="supportsJoin‌" id="select" onChange={this.setForm}>
                    <option value={1}>OTAA</option>
                    <option value={0}>ABP</option>
                  </Input>
                </Col>
                <Label sm={3}> : supportsJoin‌ </Label>
              </FormGroup>

              <Collapse isOpen={this.state.collapse} className="mt-3">

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" defaultValue={this.state.form.classBTimeout} name={"classBTimeout"}
                           onChange={this.setForm} type="text"/>
                  </Col>
                  <Label sm={3}> : classBTimeout‌ </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" defaultValue={this.state.form.classCTimeout} name={"classCTimeout"}
                           onChange={this.setForm} type="text"/>
                  </Col>
                  <Label sm={3}> : classCTimeout </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" defaultValue={this.state.form['factoryPresetFreqs[]']}
                           name={"factoryPresetFreqs"}
                           onChange={this.setForm} type="text"/>
                  </Col>
                  <Label sm={3}> : factoryPresetFreqs‌ </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" defaultValue={this.state.form.macVersion} name={"macVersion"}
                           onChange={this.setForm} type="text"/>
                  </Col>
                  <Label sm={3}> : macVersion‌ </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" defaultValue={this.state.form.maxDutyCycle} name={"maxDutyCycle"}
                           onChange={this.setForm} type="text"/>
                  </Col>
                  <Label sm={3}> : maxDutyCycle </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" name={"maxEIRP"} defaultValue={this.state.form.maxEIRP}
                           onChange={this.setForm} type="text"/>
                  </Col>
                  <Label sm={3}> : maxEIRP </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" name={"pingSlotDR"} defaultValue={this.state.form.pingSlotDR}
                           onChange={this.setForm} type="text"/>
                  </Col>
                  <Label sm={3}> : pingSlotDR‌ </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" name={"pingSlotFreq"} defaultValue={this.state.form.pingSlotFreq}
                           type="text"/>
                  </Col>
                  <Label sm={3}> : pingSlotFreq‌ </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" name={"pingSlotPeriod"} defaultValue={this.state.form.pingSlotPeriod}
                           onChange={this.setForm} type="text"/>
                  </Col>
                  <Label sm={3}> : pingSlotPeriod‌ </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" name={"regParamsRevision"}
                           defaultValue={this.state.form.regParamsRevision}
                           onChange={this.setForm} type="text"/>
                  </Col>
                  <Label sm={3}> : regParamsRevision‌ </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" name={"rfRegion"} defaultValue={this.state.form.rfRegion}
                           onChange={this.setForm} type="text"/>
                  </Col>
                  <Label sm={3}> : rfRegion‌ </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" name={"rxDROffset1"} defaultValue={this.state.form.rxDROffset1}
                           onChange={this.setForm} type="text"/>
                  </Col>
                  <Label sm={3}> : rxDROffset1‌ </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" name={"rxDataRate2"} defaultValue={this.state.form.rxDataRate2}
                           type="text"/>
                  </Col>
                  <Label sm={3}> : rxDataRate2‌ </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" name={"rxDelay1"} defaultValue={this.state.form.rxDelay1}
                           onChange={this.setForm} type="text"/>
                  </Col>
                  <Label sm={3}> : rxDelay1‌ </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" name={"rxFreq2"} defaultValue={this.state.form.rxFreq2}
                           onChange={this.setForm} type="text"/>
                  </Col>
                  <Label sm={3}> : rxFreq2‌ </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" name={"supports32bitFCnt"}
                           defaultValue={this.state.form.supports32bitFCnt} onChange={this.setForm}
                           type="text"/>
                  </Col>
                  <Label sm={3}> : supports32bitFCnt </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" name={"supportsClassB"} defaultValue={this.state.form.supportsClassB}
                           onChange={this.setForm} type="text"/>
                  </Col>
                  <Label sm={3}> : supportsClassB‌ </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" name={"supportsClassC"} defaultValue={this.state.form.supportsClassC}
                           onChange={this.setForm} type="text"/>
                  </Col>
                  <Label sm={3}> : supportsClassC </Label>
                </FormGroup>

                <FormGroup row>
                  <Col sm={4}>
                    <Input dir="ltr" name={"supports32bitFCnt"}
                           defaultValue={this.state.form.supports32bitFCnt} onChange={this.setForm}
                           type="text"/>
                  </Col>
                  <Label sm={3}> : supports32bitFCnt‌ </Label>
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
    console.log("dispatch")
    const form = this.state.form
    this.props.dispatch(createThingProfileAction(form, this.callBack))
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
