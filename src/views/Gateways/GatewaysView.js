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
import connect from 'react-redux/es/connect/connect';
import { decryptFramePayloadAction, getSingleGatewayAction, updateGatewayAction } from '../../actions/AppActions';
import Spinner from '../Spinner/Spinner';
import GatewayLogger from '../../components/GatewayLogger';
import { toastAlerts } from '../Shared/toast_alert';

class GatewaysView extends Component {

  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this)
    this.changeForm = this.changeForm.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.decrypt = this.decrypt.bind(this)

    this.state = {
      gateway: {
        name: '',
        description: '',
        mac: '',
        altitude: ''
      },
      keys: {
        appSKey: '',
        nwkSKey: '',
        payload: ''

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

          <NavItem>
            <NavLink
              className={classnames({active: this.state.activeTab === 'decrypt'})}
              onClick={() => {
                this.toggleTab('decrypt');
              }}>رمزگشایی</NavLink>
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
                      <Input id="fld_lat" dir="ltr" type="number"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>طول جغرافیایی:</Label>
                    <Col sm={5}>
                      <Input dir="ltr" id="fld_lng" type="number"/>
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

          <TabPane tabId={'decrypt'}>
            <Card className="text-justify">
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Label sm={3}>Payload:</Label>
                    <Col sm={7}>
                      <Input defaultValue={this.state.keys.payload} name="payload"
                             onChange={(event) => {
                               this.setState({
                                 keys: {
                                   ...this.state.keys,
                                   [event.target.name]: event.target.value
                                 }
                               })
                             }}
                             required placeholder="==slkuser"
                             type="textarea"/>
                    </Col>
                    <Col sm={2}/>
                  </FormGroup>

                  <FormGroup row>
                    <Label sm={3}>Application Session Key:</Label>
                    <Col sm={7}>
                      <Input defaultValue={this.state.keys.appSKey} name="appSKey"
                             onChange={(event) => {
                               this.setState({
                                 keys: {
                                   ...this.state.keys,
                                   [event.target.name]: event.target.value
                                 }
                               })
                             }}
                             maxLength={32}
                             pattern="^[0-9A-Za-z]{32}$"
                             required
                             placeholder="44FF55GG66hh77jj00AA11BB22CC33DD"
                             type="text"/>
                    </Col>
                    <Col sm={2}/>
                  </FormGroup>

                  <FormGroup row>
                    <Label sm={3}>Network Session Key:</Label>
                    <Col sm={7}>
                      <Input defaultValue={this.state.keys.nwkSKey} name="nwkSKey"
                             onChange={(event) => {
                               this.setState({
                                 keys: {
                                   ...this.state.keys,
                                   [event.target.name]: event.target.value
                                 }
                               })
                             }}
                             maxLength={32}
                             pattern="^[0-9A-Za-z]{32}$"
                             required
                             placeholder="00AA11bb22CC33dd44FF55GG66HH77JJ"
                             type="text"/>
                    </Col>
                    <Col sm={2}></Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label sm={3}>نتیجه:</Label>
                    <Col sm={7}>
                      <Input value={this.state.keys.result} type="text"/>
                    </Col>
                    <Col sm={2}/>
                  </FormGroup>

                </Form>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.decrypt}>رمزگشایی</Button>
              </CardFooter>
            </Card>
          </TabPane>

        </TabContent>


      </div>
    );
  }

  renderMap() {
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

  decrypt() {

    if (!this.state.keys.appSKey.match(/^[0-9A-Fa-f]{32}$/g))
      toastAlerts(false, 'کلید AppSKey را درست وارد کنید.');
    else if (!this.state.keys.nwkSKey.match(/^[0-9A-Fa-f]{32}$/g))
      toastAlerts(false, 'کلید nwkSKey را درست وارد کنید.');

    else
      this.props.dispatch(decryptFramePayloadAction({
        phyPayload: this.state.keys.payload,
        netskey: this.state.keys.nwkSKey,
        appskey: this.state.keys.appSKey
      }, (status, result) => {
        if (status) {
          this.setState({
            keys: {
              ...this.state.keys,
              result: result,
            }
          });
          toastAlerts(status, 'با موفقیت انجام شد.');
        }
        else toastAlerts(status, result);
      }))
  }
}

function mapStateToProps(state) {
  return ({
    gateway: state.gatewayReducer,
    loading: state.homeReducer.currentlySending
  })
}

export default connect(mapStateToProps)(GatewaysView);
