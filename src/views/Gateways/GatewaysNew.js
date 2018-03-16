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

import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps"
import {createGatewayAction} from "../../actions/AppActions";
import connect from "react-redux/es/connect/connect";
import Spinner from "../Spinner/Spinner";

import {ToastContainer, toast} from 'react-toastify';
import {css} from 'glamor';
import {style} from "react-toastify";


style({
    colorProgressDefault: 'white'
});

const _ = require("lodash");
const {compose, withProps, lifecycle} = require("recompose");
const {SearchBox} = require("react-google-maps/lib/components/places/SearchBox");

const MapWithASearchBox = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
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
        <Marker position={props.marker}/>
    </GoogleMap>
);


class GatewaysNew extends Component {

    constructor(props) {
        super(props);

        this.changeForm = this.changeForm.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.manageToastAlerts = this.manageToastAlerts.bind(this)

        this.state = {
            mac: ""
        }
    }

    manageToastAlerts(status,message) {

        if (status) {
            window.location = '#/gateways/list'


            toast('gateway جدید ساخته شد', {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: css({
                    background: '#dbf2e3',
                    color: '#28623c'
                }),
                progressClassName: css({
                    background: '#28623c'
                })
            });
        } else {
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

    render() {

        return (
            <div>
                <Spinner display={this.props.loading}/>
                <ToastContainer className="text-right"/>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">افزودن Gateway</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={2}>اسم : </Label>
                                <Col sm={5}>
                                    <Input type="text"
                                           onChange={event => this.setState({name: event.target.value})}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>آدرس Mac : </Label>
                                <Col sm={5}>
                                    <Input type="text" dir="ltr"
                                           value={this.formatMAC(this.state.mac)}
                                           onChange={event => this.setState({mac: event.target.value})}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>توضیحات : </Label>
                                <Col sm={5}>
                                    <Input type="textarea"
                                           onChange={event => this.setState({description: event.target.value})}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>مقدار Lat : </Label>
                                <Col sm={5}>
                                    <Input type="text" id="fld_lat" dir="ltr"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>مقدار Long : </Label>
                                <Col sm={5}>
                                    <Input dir="ltr" id="fld_lng" type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>مقدار Altitude : </Label>
                                <Col sm={5}>
                                    <Input type="text" dir="ltr"
                                           onChange={event => this.setState({altitude: event.target.value})}/>
                                </Col>
                            </FormGroup>

                            <MapWithASearchBox/>

                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary" onClick={this.submitForm}>ثبت اطلاعات</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    formatMAC(value) {
        return value
        if (value == undefined)
            value = ""
        const r = /([a-f0-9]{2})([a-f0-9]{2})/i
        let str = value.replace(/[^a-f0-9]/ig, "");

        while (r.test(str)) {
            str = str.replace(r, '$1' + ':' + '$2');
        }

        console.log(str.slice(0, 17))
        return str.slice(0, 17);
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
                mac: this.formatMAC(this.state.mac).replace(/:/g, ''),
                description: this.state.description,
                latitude: document.getElementById('fld_lng').value,
                longitude: document.getElementById('fld_lng').value,
                altitude: this.state.altitude
            },
            this.manageToastAlerts))
    }
}

function mapStateToProps(state) {
    return ({
        loading: state.homeReducer.currentlySending
    })
}

export default connect(mapStateToProps)(GatewaysNew);
