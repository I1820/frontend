import React, { Component } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, FormGroup, Input, Label } from 'reactstrap'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation'

import { createGatewayAction } from '../../actions/AppActions'
import connect from 'react-redux/es/connect/connect'
import Spinner from '../Spinner/Spinner'

import { toastAlerts } from '../Shared/toast_alert'

const _ = require('lodash')
const { compose, withProps, lifecycle } = require('recompose')

class GatewaysNew extends Component {

  constructor (props) {
    super(props)

    this.changeForm = this.changeForm.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.onDragend = this.onDragend.bind(this)

    this.state = {
      lat: 35.7024852,
      long: 51.4023424,
      mac: '',
      online: true
    }
  }

  componentDidMount () {
  }

  render () {

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
                           onChange={event => this.setState({ name: event.target.value })}
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
                           name='macAddress'
                           onChange={event => this.setState({ mac: event.target.value })}
                           required/>
                  <AvFeedback>الزامی است</AvFeedback>
                </Col>
              </AvGroup>
              <FormGroup row>
                <Label sm={2}>توضیحات : </Label>
                <Col sm={5}>
                  <Input type="textarea"
                         style={{ resize: 'none' }}
                         placeholder="گذرگاه سقف"
                         maxLength="150"
                         onChange={event => this.setState({ description: event.target.value })}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}> عرض جغرافیایی:</Label>
                <Col sm={5}>
                  <Input dir="ltr" type="number"
                         value={this.state.lat ? this.state.lat : 0}
                         onChange={event => this.setState({ lat: event.target.value })}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>طول جغرافیایی:</Label>
                <Col sm={5}>
                  <Input dir="ltr" type="number"
                         value={this.state.long ? this.state.long : 0}
                         onChange={event => this.setState({ long: event.target.value })}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>ارتفاع:</Label>
                <Col sm={5}>
                  <Input type="number" dir="rtl"
                         placeholder="۱۰ متر"
                         onChange={event => this.setState({ altitude: event.target.value })}/>
                </Col>
              </FormGroup>
            </AvForm>
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={this.submitForm}>ثبت اطلاعات</Button>
          </CardFooter>
        </Card>
        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">محل قرارگیری گذرگاه</CardTitle>
          </CardHeader>
          <CardBody>
            <Map center={[this.state.lat, this.state.long]} zoom={15}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker draggable={true} onDragend={this.onDragend} position={[this.state.lat, this.state.long]}
                      icon={L.icon({
                        iconSize: [25, 41],
                        iconAnchor: [13, 41],
                        iconUrl: iconUrl,
                        shadowUrl: shadowUrl
                      })}>
                <Popup>Your Gateway</Popup>
              </Marker>
            </Map>
          </CardBody>
        </Card>
      </div>
    )
  }

  onDragend (event) {
    this.setState({
      lat: event.target._latlng.lat,
      long: event.target._latlng.lng
    })
  }

  changeForm (event) {
    let state = {}
    state[event.target.name] = event.target.value
    this.setState({
      form: {
        ...this.state.form,
        ...state
      }
    })
  }

  submitForm () {
    this.props.dispatch(createGatewayAction({
        name: this.state.name,
        mac: this.state.mac,
        description: this.state.description,
        latitude: this.state.lat,
        longitude: this.state.long,
        altitude: this.state.altitude
      },
      (status, result) => {
        if (status) {
          window.location = '#/gateways/list'
        } else {
          toastAlerts(status, result)
        }
      }
    ))
  }
}

function mapStateToProps (state) {
  return ({
    loading: state.homeReducer.currentlySending
  })
}

export default connect(mapStateToProps)(GatewaysNew);
