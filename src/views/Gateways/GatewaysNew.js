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

import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps'
import {createGatewayAction} from '../../actions/AppActions';
import connect from 'react-redux/es/connect/connect';
import Spinner from '../Spinner/Spinner';

import {style} from 'react-toastify';
import {toastAlerts} from '../Shared/toast_alert';


style({
  colorProgressDefault: 'white'
});

const _ = require('lodash');
const {compose, withProps, lifecycle} = require('recompose');
const {SearchBox} = require('react-google-maps/lib/components/places/SearchBox');

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{height: `100%`}}/>,
    containerElement: <div style={{height: `400px`}}/>,
    mapElement: <div style={{height: `100%`}}/>,
  }),
  lifecycle({
    componentWillReceiveProps(props) {
      if (props.marker !== undefined) {
        this.setState({
          marker: props.marker
        })
      }

    },
    componentWillMount() {
      const refs = {}
      const marker = this.props.marker !== undefined ? this.props.marker : {
        lat: 35.7024852, lng: 51.4023424
      }
      this.setState({
        bounds: null,
        center: marker,
        marker,
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onClick: data => {
          document.getElementById('fld_lat').value = data.latLng.lat()
          document.getElementById('fld_lng').value = data.latLng.lng()
          this.setState({
            center: {
              lat: data.latLng.lat(),
              lng: data.latLng.lng()
            },
            marker: {
              lat: data.latLng.lat(),
              lng: data.latLng.lng()
            },
          })
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
          this.setState({
            center: {
              lat: bounds.f.b,
              lng: bounds.b.b
            },
            marker: {
              lat: bounds.f.b,
              lng: bounds.b.b
            }
          });
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={12}
    center={props.marker}
    onBoundsChanged={props.onBoundsChanged}
    onClick={props.onClick}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `10px`,
          textAlign: 'left',
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    <Marker position={props.marker}/>
  </GoogleMap>
);


class GatewaysNew extends Component {

  constructor(props) {
    super(props);

    this.changeForm = this.changeForm.bind(this)
    this.submitForm = this.submitForm.bind(this)

    this.state = {
      mac: ''
    }
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
                  <Input id="fld_lat" dir="ltr"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>طول جغرافیایی:</Label>
                <Col sm={5}>
                  <Input dir="ltr" id="fld_lng"/>
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

              <MapWithASearchBox/>

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
