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
    Table
} from 'reactstrap';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps"
import connect from "react-redux/es/connect/connect";
import {getSingleGatewayAction} from "../../actions/AppActions";
import Spinner from "../Spinner/Spinner";
import GatewayLogger from '../../components/GatewayLogger';


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


class GatewaysView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gateway: {},
        }
    }

    componentWillReceiveProps(props) {
        const splitedUrl = window.location.href.split('/');
        if (splitedUrl[splitedUrl.length - 1]) {
            props.gateway.forEach((gateway) => {
                if (gateway._id === splitedUrl[splitedUrl.length - 1]) {
                    this.setState({
                        gateway
                    })
                    console.log(gateway)
                }
            })
        }
    }

    componentWillMount() {
        const splitedUrl = window.location.href.split('/');
        if (splitedUrl[splitedUrl.length - 1]) {
            this.props.dispatch(getSingleGatewayAction(splitedUrl[splitedUrl.length - 1]))
        }
    }

    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <GatewayLogger gateway={this.state.gateway._id}/>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">نمایش Gateway</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={1}>اسم : </Label>
                                <Col sm={5}>
                                    <strong>{this.state.gateway.name}</strong>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={1}>آدرس : </Label>
                                <Col sm={5}>
                                    <strong>{this.state.gateway.mac}</strong>
                                </Col>
                            </FormGroup>

                            {this.renderMap()}

                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderMap() {
        if (this.state.gateway.loc !== undefined)
            return (<MapWithASearchBox
                marker={{
                    lat: parseFloat(this.state.gateway.loc.coordinates[0]),
                    lng: parseFloat(this.state.gateway.loc.coordinates[1]),
                }}/>)

    }
}

function mapStateToProps(state) {
    return ({
        gateway: state.gatewayReducer,
        loading:state.homeReducer.currentlySending
    })
}

export default connect(mapStateToProps)(GatewaysView);
