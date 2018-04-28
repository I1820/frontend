import React, { Component } from 'react';
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
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'
import connect from 'react-redux/es/connect/connect';
import {
    createThingAction,
    editThingAction,
    getThingAction,
    getThingProfileListAction
} from '../../actions/AppActions';
import Spinner from '../Spinner/Spinner';

const _ = require('lodash');
const {compose, withProps, lifecycle} = require('recompose');
const {SearchBox} = require('react-google-maps/lib/components/places/SearchBox');

import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import { style } from 'react-toastify';
import Select2 from 'react-select2-wrapper';

style({
    colorProgressDefault: 'white'
});


class CreateThing extends Component {

    constructor(props) {
        super(props);

        this.changeForm = this.changeForm.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.thing_profile_slug = ''
        this.state = {
            project: '',
            thing: {
                lat: 35.7024852,
                long: 51.4023424,
                name: '',
                description: '',
                devEUI: '',
                thing_profile_slug: '',
                period: '',
                type: '',
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

            this.props.dispatch(getThingAction(splitedUrl[6]))
        }
    }

    componentWillReceiveProps(props) {
        const splitedUrl = window.location.href.split('/');
        if (splitedUrl[splitedUrl.length - 1] !== 'new') {
            props.things.forEach((thing) => {
                if (thing._id === splitedUrl[splitedUrl.length - 1]) {
                    this.setState({
                        thing: {
                            ...thing,
                            devEUI: thing.dev_eui,
                            lat: thing.loc.coordinates[0],
                            long: thing.loc.coordinates[1],
                        },
                        thing_profile_slug: thing.profile.thing_profile_slug
                    })
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
                                <Label sm={3}>نام شی:</Label>
                                <Col sm={5}>
                                    <Input name="name" value={this.state.thing.name}
                                           placeholder={'شی خودکار'}
                                           maxLength={50}
                                           onChange={this.changeForm} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>توضیحات:</Label>
                                <Col sm={5}>
                                    <Input name="description" onChange={this.changeForm}
                                           placeholder={'شی طبقه سوم'}
                                           maxLength={150}
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
                                        <option value="Lora">LoRa</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>پریود ارسال داده:</Label>
                                <Col sm={5}>
                                    <Input value={this.state.thing.period} name="period"
                                           placeholder={'۱۰ دقیقه'}
                                           onChange={this.changeForm} type="number"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>شناسه یکتا(devEUI):</Label>
                                <Col sm={5}>
                                    <Input readOnly={this.state.thing._id !== undefined} value={this.state.thing.devEUI}
                                           name="devEUI" dir="ltr"
                                           maxLength={16}
                                           placeholder={'0000000000000000'}
                                           onChange={this.changeForm} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} htmlFor="select">پروفایل شی:</Label>
                                <Col md="5">
                                    <Select2
                                        name="device_profile_slug"
                                        style={{width: '100%'}}
                                        data={this.props.profiles.map((profile) => {
                                            return {text: profile.name, id: profile.thing_profile_slug}
                                        })}
                                        refs="tags"
                                        value={this.state.thing_profile_slug}
                                        onSelect={(e) => this.thing_profile_slug = e.target.value}
                                        options={
                                            {
                                                placeholder: 'پروفایل شی مورد نظر را انتخاب کنید',
                                            }
                                        }
                                    />

                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>عرض جغرافیایی:</Label>
                                <Col sm={5}>
                                    <Input value={this.state.thing.lat ?
                                        this.state.thing.lat : 0} type="text" id="fld_lat"
                                           dir="ltr" readOnly={true}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>طول جغرافیایی:</Label>
                                <Col sm={5}>
                                    <Input value={this.state.thing.long ?
                                        this.state.thing.long : 0} dir="ltr" id="fld_lng"
                                           type="text" readOnly={true}/>
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
                            lat: parseFloat(this.state.thing.lat ? this.state.thing.lat : 0),
                            lng: parseFloat(this.state.thing.long ? this.state.thing.long : 0)
                        }}/>
                    </CardBody>
                </Card>
            </div>
        );
    }


    changeForm(event) {
        this.setState({
            thing: {
                ...this.state.thing,
                [event.target.name]: event.target.value
            }
        })
    }

    submitForm() {
        const data = {
            name: this.state.thing.name,
            description: this.state.thing.description,
            period: this.state.thing.period,
            lat: document.getElementById('fld_lat').value,
            long: document.getElementById('fld_lng').value,
            devEUI: this.state.thing.devEUI,
            thing_profile_slug: this.thing_profile_slug,
            type: this.state.thing.type
        }
        if (this.state.thing._id === undefined)
            this.props.dispatch(createThingAction(data, this.state.project, this.callback))
        else
            this.props.dispatch(editThingAction(this.state.thing._id, data, this.callback))
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
                placeholder=""
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

function mapStateToProps(state) {
    return {
        profiles: state.thingProfileReducer,
        loading: state.homeReducer.currentlySending,
        things: state.thingReducer
    }
}

export default connect(mapStateToProps)(CreateThing);
