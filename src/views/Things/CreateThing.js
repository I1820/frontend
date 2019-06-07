import React, {Component} from 'react'
import {Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Form, FormGroup, Input, Label} from 'reactstrap'

import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

import connect from 'react-redux/es/connect/connect'
import {createThingAction, editThingAction, getThingAction, getThingProfileListAction} from '../../actions/AppActions'
import Spinner from '../Spinner/Spinner'

import Select2 from 'react-select2-wrapper'
import {toastAlerts} from '../Shared/toast_alert'

class CreateThing extends Component {

    constructor(props) {
        super(props);

        this.changeForm = this.changeForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.onDragend = this.onDragend.bind(this);
        this.thing_profile_slug = '';
        this.state = {
            zoom: 13,
            project: '',
            thing: {
                model: 'generic',
                lat: 35.7024852,
                long: 51.4023424,
                name: '',
                description: '',
                devEUI: '',
                thing_profile_slug: '',
                period: '',
                type: 'LAN',
            }
        }
    }

    componentWillMount() {
        this.props.dispatch(getThingProfileListAction());
        this.setState({
            project: this.props.match.params.project_id
        });
        if (this.props.match.params.thing_id) {
            this.setState({
                thingId: this.props.match.params.thing_id
            });
            this.props.dispatch(getThingAction(this.props.match.params.thing_id))
        }
    }

    componentWillReceiveProps(props) {
        if (this.props.match.params.thing_id !== undefined) {
            props.things.forEach((thing) => {
                if (thing._id === this.props.match.params.thing_id) {
                    if (thing.profile !== undefined && thing.profile !== null) {
                        this.thing_profile_slug = thing.profile.thing_profile_slug
                    } else {
                        this.thing_profile_slug = ''
                    }
                    this.setState({
                        thing: {
                            ...thing,
                            devEUI: thing.dev_eui,
                            lat: thing.loc.coordinates[1],
                            long: thing.loc.coordinates[0],
                            type: thing.type === 'lan' || thing.type === 'LAN' ? 'LAN' : 'lora'
                        },
                        thing_profile_slug: thing.profile !== undefined && thing.profile !== null ? thing.profile.thing_profile_slug : ''
                    }, () => console.log(this.state))
                }
            })
        }
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
                                <Label sm={3}>نام شی:</Label>
                                <Col sm={5}>
                                    <Input name="name" value={this.state.thing.name}
                                           placeholder={'شی خودکار'}
                                           maxLength={50}
                                           onChange={this.changeForm} type="text"
                                           required/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>توضیحات:</Label>
                                <Col sm={5}>
                                    <Input name="description" onChange={this.changeForm}
                                           placeholder={'شی طبقه سوم'}
                                           maxLength={150}
                                           value={this.state.thing.description}
                                           style={{resize: 'none'}}
                                           type="textarea"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>نحوه پارس کردن:</Label>
                                <Col md="5">
                                    <Input type="select" name="model"
                                           value={this.state.thing.model}
                                           onChange={this.changeForm} id="select">
                                        <option value="generic">Generic</option>
                                        <option value="aolab">Aolab</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}> نوع اتصال :</Label>
                                <Col md="5">
                                    <Input type="select" name="type"
                                           value={this.state.thing.type}
                                           onChange={this.changeForm} id="select">
                                        <option value="LAN">LAN</option>
                                        <option value="lora">LoRa</option>
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
                                    <Input readOnly={this.state.thing._id !== undefined}
                                           value={this.state.thing.devEUI}
                                           name="devEUI" dir="ltr"
                                           maxLength={16}
                                           pattern="^[0-9A-Fa-f]{16}$"
                                           required
                                           placeholder={'0011aa222B99FFaa'}
                                           onChange={this.changeForm} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{display: this.state.thing.type === 'lora' ? 'flex' : 'none'}}>
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
                                    <Input value={this.state.thing.lat ? this.state.thing.lat : 0}
                                           type="number"
                                           name="lat"
                                           dir="ltr"
                                           onChange={this.changeForm}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>طول جغرافیایی:</Label>
                                <Col sm={5}>
                                    <Input value={this.state.thing.long ? this.state.thing.long : 0}
                                           dir="ltr"
                                           name="long"
                                           onChange={this.changeForm}
                                           type="number"/>
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
                        <Map center={[this.state.thing.lat, this.state.thing.long]} zoom={this.state.zoom}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker draggable={true} onDragend={this.onDragend}
                                    position={[this.state.thing.lat, this.state.thing.long]} icon={L.icon({
                                iconSize: [25, 41],
                                iconAnchor: [13, 41],
                                iconUrl: iconUrl,
                                shadowUrl: shadowUrl
                            })}>
                                <Popup>Your Thing</Popup>
                            </Marker>
                        </Map>
                    </CardBody>
                </Card>
            </div>
        )
    }

    onDragend(event) {
        this.setState({
            thing: {
                ...this.state.thing,
                lat: event.target._latlng.lat,
                long: event.target._latlng.lng
            }
        })
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
            lat: this.state.thing.lat,
            long: this.state.thing.long,
            devEUI: this.state.thing.devEUI,
            thing_profile_slug: this.thing_profile_slug,
            type: this.state.thing.type,
            model: this.state.thing.model,
        };
        if (this.state.thing._id === undefined) {
            this.props.dispatch(createThingAction(data, this.state.project, toastAlerts))
        } else {
            this.props.dispatch(editThingAction(this.state.project, this.state.thing._id, data, toastAlerts))
        }
    }
}

function mapStateToProps(state) {
    return {
        profiles: state.thingProfileReducer,
        loading: state.homeReducer.currentlySending,
        things: state.thingReducer
    }
}

export default connect(mapStateToProps)(CreateThing);
