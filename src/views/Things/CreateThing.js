import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    Form,
    Badge,
    FormGroup,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Button,
    ButtonGroup,
    Label,
    Input,
    Table
} from 'reactstrap';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps"
import connect from "react-redux/es/connect/connect";
import {createThingAction, getThingProfileListAction} from "../../actions/AppActions";
import Spinner from "../Spinner/Spinner";

const _ = require("lodash");
const {compose, withProps, lifecycle} = require("recompose");
const {SearchBox} = require("react-google-maps/lib/components/places/SearchBox");

import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import { style } from "react-toastify";
style({
    colorProgressDefault: 'white'
});


class CreateThing extends Component {

    constructor(props) {
        super(props);

        this.changeForm = this.changeForm.bind(this)
        this.submitForm = this.submitForm.bind(this)

        this.state = {
            form: {
                lat:0,
                long:0
            },
            project: ""
        }
    }

    componentWillMount() {
        this.props.dispatch(getThingProfileListAction())
        const splitedUrl = window.location.href.split('/');
        this.setState({
            project:splitedUrl[5]
        })
    }

    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <ToastContainer className="text-right" />
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">اطلاعات شی</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={3}>نام شی : </Label>
                                <Col sm={5}>
                                    <Input name="name"  onChange={this.changeForm} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>توضیحات شی : </Label>
                                <Col sm={5}>
                                    <Input name="description" onChange={this.changeForm} type="textarea"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}> نوع اتصال :</Label>
                                <Col md="5">
                                    <Input type="select" name="type" onChange={this.changeForm} id="select">
                                        <option value="0"> انتخاب کنید</option>
                                        <option value="LAN">LAN</option>
                                        <option value="Lora">Lora</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}> پریود ارسال داده : </Label>
                                <Col sm={5}>
                                    <Input name="period" dir="ltr" onChange={this.changeForm} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}> devEUI : </Label>
                                <Col sm={5}>
                                    <Input name="devEUI" dir="ltr" onChange={this.changeForm} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} htmlFor="select">پروفایل شی :</Label>
                                <Col md="5">
                                    <Input type="select" name="thing_profile_slug" onChange={this.changeForm}
                                           id="select">
                                        <option value="0">انتخاب کنید</option>
                                        {this.renderProfiles()}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>مقدار Lat : </Label>
                                <Col sm={5}>
                                    <Input type="text" id="fld_lat" dir="ltr" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>مقدار Long : </Label>
                                <Col sm={5}>
                                    <Input dir="ltr" id="fld_lng" type="text" />
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.submitForm} color="primary">شی جدید</Button>
                    </CardFooter>
                </Card>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">محل قرارگیری شی</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <MapWithASearchBox/>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderProfiles() {
        return (this.props.profiles.map((profile, key) => {
            return (<option id={key} value={profile.thing_profile_slug}>{profile.thing_profile_slug}</option>)
        }))
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

    submitForm(){
        this.setState({
            form: {
                lat: document.getElementById('fld_lat').value,
                long: document.getElementById('fld_lng').value,
            }
        })
        this.props.dispatch(createThingAction(this.state.form,this.state.project,this.callback))
    }

    callback(status,message){
        if(!status)
        toast(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: css({
                background: '#fee2e1',
                color: '#813838',
            }),
            progressClassName: css({
                background: '#813838'
            })
        });
    }
}

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 35.7024852, lng: 51.4023424
        },
        marker: {
          lat: 35.7024852, lng: 51.4023424
        },
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
            center: nextCenter,
            markers: nextMarkers,
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
    center={props.center}
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
    <Marker position={props.marker} />
  </GoogleMap>
);

function mapStateToProps(state) {
    return {
        profiles: state.thingProfileReducer,
        loading: state.homeReducer.currentlySending
    }
}

export default connect(mapStateToProps)(CreateThing);
