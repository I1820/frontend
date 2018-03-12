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

const _ = require("lodash");
const {compose, withProps, lifecycle} = require("recompose");
const {SearchBox} = require("react-google-maps/lib/components/places/SearchBox");
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';


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
                    lat: 41.9, lng: -87.624
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
        defaultZoom={15}
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
                    width: `240px`,
                    height: `32px`,
                    marginTop: `27px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }}
            />
        </SearchBox>
        {props.markers.map((marker, index) =>
            <Marker key={index} position={marker.position}/>
        )}
    </GoogleMap>
);


class GatewaysNew extends Component {

    constructor(props) {
        super(props);

        this.changeForm = this.changeForm.bind(this)
        this.submitForm = this.submitForm.bind(this)

        this.state = {
            form: {
                latitude: 0,
                longitude: 0,
                altitude: 0,
                ping:0
            }
        }
    }




    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <ToastContainer className="text-right" />
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">افزودن Gateway</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={2}>اسم : </Label>
                                <Col sm={5}>
                                    <Input name="name" onChange={this.changeForm} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>آدرس : </Label>
                                <Col sm={5}>
                                    <Input name="mac" onChange={this.changeForm} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>توضیحات : </Label>
                                <Col sm={5}>
                                    <Input name="description" onChange={this.changeForm} type="textarea"/>
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
        this.props.dispatch(createGatewayAction(this.state.form,this.callback))
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

function mapStateToProps(state) {
    return ({
        loading: state.homeReducer.currentlySending
    })
}

export default connect(mapStateToProps)(GatewaysNew);
