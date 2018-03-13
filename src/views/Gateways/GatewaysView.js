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
import { getSingleGatewayAction } from "../../actions/AppActions";


const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const {SearchBox} = require("react-google-maps/lib/components/places/SearchBox");


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
                    lat: 35.6882326, lng: 51.3841292
                },
                markers: [],
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
            <Marker key={index} position={marker.position} />
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
            props.gateway.forEach((project) => {

                if (gateway._id === splitedUrl[splitedUrl.length - 1]) {
                    console.log('findddd', gateway)
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
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">نمایش Gateway</CardTitle>
                    </CardHeader>
                    <CardBody>
                    <Form>
                        <FormGroup row>
                            <Label sm={1}>اسم : </Label>
                            <Col sm={5}>
                                <strong>اسم اینجاست</strong>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={1}>آدرس : </Label>
                            <Col sm={5}>
                                <strong>آدرس اینجاست</strong>
                            </Col>
                        </FormGroup>

                        <MapWithASearchBox />

                    </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return ({
        gateWay: state.gatewayReducer
    })
}

export default connect(mapStateToProps)(GatewaysView);
