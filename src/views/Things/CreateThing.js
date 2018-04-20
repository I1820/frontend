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
import {createThingAction, editThingAction, getThingAction, getThingProfileListAction} from "../../actions/AppActions";
import Spinner from "../Spinner/Spinner";

const _ = require("lodash");
const {compose, withProps, lifecycle} = require("recompose");
const {SearchBox} = require("react-google-maps/lib/components/places/SearchBox");

import {ToastContainer, toast} from 'react-toastify';
import {css} from 'glamor';
import {style} from "react-toastify";

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
                lat: 0,
                long: 0,
                devEUI: ""
            },
            project: "",
            thing: {
                name: "",
                description: "",
                interface: {
                    devEUI: "",
                    deviceProfileID: ""
                },
                period: "",
                loc: {
                    coordinates: [35.7024852, 51.4023424]
                }
            }
        }
    }

    componentWillMount() {
        this.props.dispatch(getThingProfileListAction())
        const splitedUrl = window.location.href.split('/');
        this.setState({
            project: splitedUrl[5],
        })
        if (splitedUrl[6] !== 'new') {
            this.setState({
                project: splitedUrl[5],
                thingId: splitedUrl[6],
            })

            this.props.dispatch(getThingAction(splitedUrl[5], splitedUrl[6]))
        }
    }

    componentWillReceiveProps(props) {
        const splitedUrl = window.location.href.split('/');
        const me = this;
        if (splitedUrl[splitedUrl.length - 1] !== 'new') {
            props.things.forEach((thing) => {
                if (thing._id === splitedUrl[splitedUrl.length - 1]) {
                    this.setState({
                        thing
                    })
                    const devEui = {
                        devEUI: thing.interface.devEUI,
                        thing_profile_slug: thing.interface.deviceProfileID
                    }
                    this.setState({
                        form: {
                            ...this.state.form,
                            ...devEui
                        }
                    })
                    console.log('find', this.state)
                }
            })
        }
    }

    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <ToastContainer className="text-right"/>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">اطلاعات شی</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={3}>نام شی : </Label>
                                <Col sm={5}>
                                    <Input name="name" value={this.state.thing.name}
                                           onChange={this.changeForm} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>توضیحات شی : </Label>
                                <Col sm={5}>
                                    <Input name="description" onChange={this.changeForm}
                                           value={this.state.thing.description}
                                           type="textarea"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}> نوع اتصال :</Label>
                                <Col md="5">
                                    <Input type="select" name="type"
                                           onChange={this.changeForm} id="select">
                                        <option value="0"> انتخاب کنید</option>
                                        <option value="LAN">LAN</option>
                                        <option value="Lora">Lora</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}> پریود ارسال داده : </Label>
                                <Col sm={5}>
                                    <Input value={this.state.thing.period} name="period" dir="ltr"
                                           onChange={this.changeForm} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}> devEUI : </Label>
                                <Col sm={5}>
                                    <Input readOnly={this.state.thing._id !== undefined}  value={this.state.form.devEUI} name="devEUI" dir="ltr"
                                           onChange={(e) => {
                                               const state = this.state.form
                                               state.devEUI = e.target.value
                                               this.setState({
                                                   form: state
                                               })
                                           }} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} htmlFor="select">پروفایل شی :</Label>
                                <Col md="5">
                                    <Input type="select" name="thing_profile_slug" onChange={(e) => {
                                        const state = this.state.form
                                        state.thing_profile_slug = e.target.value
                                        this.setState({
                                            form: state
                                        })
                                    }} id="select">
                                        <option value={this.state.form.thing_profile_slug} value="0">انتخاب
                                            کنید
                                        </option>
                                        {this.renderProfiles()}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>عرض جغرافیایی : </Label>
                                <Col sm={5}>
                                    <Input value={this.state.thing.loc.coordinates ?
                                        this.state.thing.loc.coordinates[0] : 0} type="text" id="fld_lat"
                                           dir="ltr"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>طول جغرافیایی : </Label>
                                <Col sm={5}>
                                    <Input value={this.state.thing.loc.coordinates ?
                                        this.state.thing.loc.coordinates[1] : 0} dir="ltr" id="fld_lng"
                                           type="text"/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.submitForm} color="primary">ثبت</Button>
                    </CardFooter>
                </Card>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">محل قرارگیری شی</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <MapWithASearchBox marker={{
                            lat: parseFloat(this.state.thing.loc.coordinates ? this.state.thing.loc.coordinates[0] : 0),
                            lng: parseFloat(this.state.thing.loc.coordinates ? this.state.thing.loc.coordinates[1] : 0)
                        }}/>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderProfiles() {
        return (this.props.profiles.map((profile, key) => {
            return (<option id={key} value={profile.thing_profile_slug}>{profile.name}</option>)
        }))
    }

    changeForm(event) {
        let state = {}
        state[event.target.name] = event.target.value
        this.setState({
            thing: {
                ...this.state.thing,
                ...state
            }
        })
    }

    submitForm() {
        const form = {
            name: this.state.thing.name,
            description: this.state.thing.description,
            period: this.state.thing.period,
            lat: document.getElementById('fld_lat').value,
            long: document.getElementById('fld_lng').value,
            devEUI: this.state.form.devEUI,
            thing_profile_slug: this.state.form.thing_profile_slug,
            type: this.state.thing.type
        }
        if (this.state.thing._id === undefined)
            this.props.dispatch(createThingAction(form, this.state.project, this.callback))
        else
            this.props.dispatch(editThingAction(this.state.project, this.state.thing._id, form, this.callback))
    }

    callback(status, message) {
        if (!status)
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
                marker: {
                    lat: 35.7024852,
                    lng: 51.4023424,
                },
                dragEnd: data => {
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
        <Marker draggable={true} onDragEnd={props.dragEnd} position={props.marker}/>
    </GoogleMap>
);

function mapStateToProps(state) {
    return {
        profiles: state.thingProfileReducer,
        loading: state.homeReducer.currentlySending,
        things: state.thingReducer
    }
}

export default connect(mapStateToProps)(CreateThing);
