import React, { Component } from 'react';
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
  TabContent,
  TabPane,
  Nav,
  NavLink,
  NavItem,
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
import classnames from 'classnames';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'
import connect from 'react-redux/es/connect/connect';
import { getSingleGatewayAction, updateGatewayAction } from '../../actions/AppActions';
import Spinner from '../Spinner/Spinner';
import GatewayLogger from '../../components/GatewayLogger';
import { toastAlerts } from '../Shared/toast_alert';


const _ = require('lodash');
const {compose, withProps, lifecycle} = require('recompose');
const {SearchBox} = require('react-google-maps/lib/components/places/SearchBox');


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
    this.toggleTab = this.toggleTab.bind(this)
    this.changeForm = this.changeForm.bind(this)
    this.submitForm = this.submitForm.bind(this)

    this.state = {
      gateway: {
        name: '',
        description: '',
        mac: '',
        altitude: ''
      },
      activeTab: 'info'
    }
  }

  componentWillReceiveProps(props) {
    const splitedUrl = window.location.href.split('/');
    if (splitedUrl[splitedUrl.length - 1]) {
      props.gateway.forEach((gateway) => {
        if (gateway._id === splitedUrl[splitedUrl.length - 1]) {
          this.setState({
            gateway
          });
          document.getElementById('fld_lat').value = gateway.loc.coordinates[0];
          document.getElementById('fld_lng').value = gateway.loc.coordinates[1];
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
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({active: this.state.activeTab === 'info'})}
              onClick={() => {
                this.toggleTab('info');
              }}>اطلاعات</NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({active: this.state.activeTab === 'liveFrame'})}
              onClick={() => {
                this.toggleTab('liveFrame');
              }}>لایو فریم</NavLink>
          </NavItem>

        </Nav>
        <br/>

        <TabContent activeTab={this.state.activeTab} className="border-0">
          <TabPane tabId={'info'}>
            <Card className="text-justify">
              <CardHeader>
                <CardTitle className="mb-0 font-weight-bold h6">نمایش Gateway</CardTitle>
              </CardHeader>

              <CardBody>
                <Form>
                  <FormGroup row>
                    <Label sm={2}>اسم:</Label>
                    <Col sm={5}>
                      <Input type="text"
                             placeholder="گذرگاه پژوهشکده"
                             maxLength="50"
                             name="name"
                             value={this.state.gateway.name}
                             onChange={this.changeForm}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>شناسه گذرگاه:</Label>
                    <Col sm={5}>
                      <Input type="text" dir="ltr"
                             placeholder="AA00CC11DD22EE33"
                             maxLength="16"
                             style={{letterSpacing: '1px'}}
                             value={
                               this.state.gateway.mac ?
                                 this.state.gateway.mac.match(/.{1,2}/g).reduce((ac, item) => ac + `${item}:`, '').slice(0, -1) : ''
                             }
                             readOnly={true}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>توضیحات:</Label>
                    <Col sm={5}>
                      <Input type="textarea"
                             style={{resize: 'none'}}
                             name="description"
                             placeholder="گذرگاه سقف"
                             value={this.state.gateway.description}
                             maxLength="150"
                             onChange={this.changeForm}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>عرض جغرافیایی:</Label>
                    <Col sm={5}>
                      <Input id="fld_lat" dir="ltr"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>طول جغرافیایی:</Label>
                    <Col sm={5}>
                      <Input dir="ltr" id="fld_lng"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>ارتفاع:</Label>
                    <Col sm={5}>
                      <Input type="number" dir="rtl"
                             placeholder="۱۰ متر"
                             name="altitude"
                             value={this.state.gateway.altitude}
                             onChange={this.changeForm}/>
                    </Col>
                  </FormGroup>

                  {this.renderMap()}

                </Form>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.submitForm}>ویرایش اطلاعات</Button>
              </CardFooter>
            </Card>
          </TabPane>
          <TabPane tabId={'liveFrame'}>
            <GatewayLogger gateway={this.state.gateway._id}/>
          </TabPane>

        </TabContent>


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

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  changeForm(event) {
    this.setState({
      gateway: {
        ...this.state.gateway,
        [event.target.name]: event.target.value
      }
    })
  }

  submitForm() {
    this.props.dispatch(updateGatewayAction({
      ...this.state.gateway,
      latitude: document.getElementById('fld_lat').value,
      longitude: document.getElementById('fld_lng').value,
    }, toastAlerts))
  }
}

function mapStateToProps(state) {
  return ({
    gateway: state.gatewayReducer,
    loading: state.homeReducer.currentlySending
  })
}

export default connect(mapStateToProps)(GatewaysView);
