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
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">اطلاعات شی</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={2}>نام شی : </Label>
                                <Col sm={5}>
                                    <Input name="name" onChange={this.changeForm} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>توضیحات شی : </Label>
                                <Col sm={5}>
                                    <Input name="description" onChange={this.changeForm} type="textarea"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}> نوع اتصال :</Label>
                                <Col md="5">
                                    <Input type="select" name="type" onChange={this.changeForm} id="select">
                                        <option value="0"> انتخاب کنید</option>
                                        <option value="LAN">LAN</option>
                                        <option value="Lora">Lora</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}> پریود ارسال داده : </Label>
                                <Col sm={5}>
                                    <Input name="period" onChange={this.changeForm} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}> devEUI : </Label>
                                <Col sm={5}>
                                    <Input name="devEUI" onChange={this.changeForm} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2} htmlFor="select">پروفایل شی :</Label>
                                <Col md="5">
                                    <Input type="select" name="thing_profile_slug" onChange={this.changeForm}
                                           id="select">
                                        <option value="0">انتخاب کنید</option>
                                        {this.renderProfiles()}
                                    </Input>
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
        this.props.dispatch(createThingAction(this.state.form,this.state.project,this.callBack))
    }

    callBack(){

    }
}

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

function mapStateToProps(state) {
    return {
        profiles: state.thingProfileReducer,
        loading: state.homeReducer.currentlySending
    }
}

export default connect(mapStateToProps)(CreateThing);
