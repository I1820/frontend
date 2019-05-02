import React, {Component} from 'react';
import {
  Col,
  Card,
  Form,
  FormGroup,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  Label,
  Input
} from 'reactstrap';


import {AvForm, AvField, AvGroup, AvInput, AvFeedback} from 'availity-reactstrap-validation';

import {createGatewayAction} from '../../actions/AppActions';
import connect from 'react-redux/es/connect/connect';
import Spinner from '../Spinner/Spinner';

import {toastAlerts} from '../Shared/toast_alert';

const _ = require('lodash');
const {compose, withProps, lifecycle} = require('recompose');

class GatewaysNew extends Component {

  constructor(props) {
    super(props);

    this.changeForm = this.changeForm.bind(this)
    this.submitForm = this.submitForm.bind(this)

    this.state = {
      mac: '',
      online:true
    }
  }


  componentDidMount() {
  }

  render() {

    return (
      <div>
        <Spinner display={this.props.loading}/>
        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">افزودن Gateway</CardTitle>
          </CardHeader>
          <CardBody>
            <AvForm>
              <AvGroup row>
                <Label sm={2}>اسم :</Label>
                <Col sm={5}>
                  <AvInput type="text"
                           placeholder="گذرگاه پژوهشکده"
                           maxLength="50"
                           name={'name'}
                           onChange={event => this.setState({name: event.target.value})}
                           required/>
                  <br/>
                  <AvFeedback>الزامی است</AvFeedback>
                </Col>
              </AvGroup>
              <AvGroup row>
                <Label sm={2}>شناسه گذرگاه</Label>
                <Col sm={5}>
                  <AvInput type="text" dir="ltr"
                           placeholder="AA00CC11DD22EE33"
                           maxLength="16"
                           name={'macAddress'}
                           onChange={event => this.setState({mac: event.target.value})}
                           required/>
                  <AvFeedback>الزامی است</AvFeedback>
                </Col>
              </AvGroup>
              <FormGroup row>
                <Label sm={2}>توضیحات : </Label>
                <Col sm={5}>
                  <Input type="textarea"
                         style={{resize: 'none'}}
                         placeholder="گذرگاه سقف"
                         maxLength="150"
                         onChange={event => this.setState({description: event.target.value})}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}> عرض جغرافیایی:</Label>
                <Col sm={5}>
                  <Input id="fld_lat" dir="ltr" type="number"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>طول جغرافیایی:</Label>
                <Col sm={5}>
                  <Input dir="ltr" id="fld_lng" type="number"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>ارتفاع:</Label>
                <Col sm={5}>
                  <Input type="number" dir="rtl"
                         placeholder="۱۰ متر"
                         onChange={event => this.setState({altitude: event.target.value})}/>
                </Col>
              </FormGroup>
            </AvForm>
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={this.submitForm}>ثبت اطلاعات</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }


  changeForm(event) {
    let state = {}
    state[event.target.name] = event.target.value
    this.setState({
      form: {
        ...this.state.form,
        ...state
      }
    })
  }

  submitForm() {
    this.props.dispatch(createGatewayAction({
        name: this.state.name,
        mac: this.state.mac,
        description: this.state.description,
        latitude: document.getElementById('fld_lat').value,
        longitude: document.getElementById('fld_lng').value,
        altitude: this.state.altitude
      },
      (status, result) => {
        if (status)
          window.location = '#/gateways/list'
        else
          toastAlerts(status, result);
      }
    ))
  }
}

function mapStateToProps(state) {
  return ({
    loading: state.homeReducer.currentlySending
  })
}

export default connect(mapStateToProps)(GatewaysNew);
