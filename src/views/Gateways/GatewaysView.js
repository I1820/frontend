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
            this.setState({
                markers: [props.marker]
            })
            console.log('map', this.props)
        },
        componentWillMount() {
            console.log('map', this.props)
            const refs = {}
            this.setState({
                bounds: null,
                center: this.props.marker,
                markers: [this.props.marker],
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
    >

        <Marker
            position={props.markers[0]}/>
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
                    width: `250px`,
                    height: `32px`,
                    marginTop: `10px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    textAlign: `left`,
                }}
            />
        </SearchBox>
        {props.markers.map((marker, index) =>
            <Marker key={index} position={marker.position}/>
        )}
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
        const me = this;
        if (splitedUrl[splitedUrl.length - 1]) {
            props.gateway.forEach((gateway) => {
                if (gateway._id === splitedUrl[splitedUrl.length - 1]) {
                    this.setState({
                        gateway
                    })
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
