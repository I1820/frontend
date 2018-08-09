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
  Table, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import ReactTable from 'react-table'
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import { connect } from 'react-redux';
import Select2 from 'react-select2-wrapper';
import { toastAlerts } from '../Shared/toast_alert';

import {
  deleteDashboardWidgetChartAction, getDashboardAction, getUserThingsAction,
  setDashboardWidgetChartAction
} from '../../actions/AppActions';
import moment from 'moment-jalaali';
import _ from 'underscore';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'
import { toPersianNumbers } from '../Shared/helpers';
import Spinner from '../Spinner/Spinner';

const ReactHighcharts = require('react-highcharts');

const {compose, withProps, lifecycle} = require('recompose');

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this)
    this.refresh = this.refresh.bind(this)
    this.getThings = this.getThings.bind(this)
    this.renderCharts = this.renderCharts.bind(this)
    this.devEUI = ''
    this.state = {
      loading: false,
      first_loading: true,
      get_key: true,
      fetching: false,
      charts: {},
      modalToggle: {
        setWidgetChart: false,
        deleteWidgetChart: false,
      },
      things: [],
      aliases: [],
      selectedChart: 0,
      thing_num: 0,
      project_num: 0,
      modal: false,
      widget: {
        type: 'line',
        window: 1
      }
    }
  }

  toggle(modal) {
    this.setState({location: false, modalToggle: {...this.state.modalToggle, [modal]: !this.state.modalToggle[modal]}})
  }

  componentDidMount() {
    this.getThings()
    this.refresh()
    let interval = setInterval(this.refresh, 5000)
    this.setState({
      interval
    })
  }


  componentWillUnmount() {
    clearInterval(this.state.interval)
  }


  render() {
    return (

      <div>
        <Spinner display={this.state.loading || this.state.first_loading}/>
        <Modal isOpen={this.state.modalToggle.setWidgetChart}
               toggle={() => {
                 this.toggle('setWidgetChart');
                 this.setSate({
                   widget: {
                     type: 'line',
                     window: 1
                   }
                 })
               }}
               className="text-right">
          <ModalHeader>افزونه جدید</ModalHeader>
          <ModalBody>
            <AvForm>
              <AvGroup row>
                <Label sm={3}> عنوان : </Label>
                <Col sm={9}>
                  <AvInput name={'name'}
                           onChange={(event) => {
                             this.setState({
                               widget: {...this.state.widget, title: event.target.value}
                             })
                           }}
                           type="text"
                           required/>
                  <AvFeedback>الزامی است</AvFeedback>
                </Col>
              </AvGroup>
              <FormGroup row>
                <Label sm={3}> شی : </Label>
                <Col sm={9}>
                  <Select2
                    style={{width: '100%'}}
                    value={this.devEUI}
                    data={this.state.things.map((thing) => {
                      return {text: thing.name, id: thing.dev_eui}
                    })}
                    ref="tags"
                    onSelect={(event) => {
                      this.devEUI = event.target.value
                    }}
                    options={
                      {
                        placeholder: 'شی مورد نظر را انتخاب کنید',
                      }
                    }
                  />
                </Col>
              </FormGroup>
              <AvGroup style={{display: this.state.location ? 'none' : 'flex'}} row>
                <Label sm={3}> alias : </Label>
                <Col sm={9}>
                  <Input type="select" onChange={(event) => {
                    if (event.target.value !== 'ENTER_KEY') {
                      let aliasSelect = ''
                      this.state.aliases.forEach((alias) => {
                        if (Object.keys(alias)[0] === event.target.value) {
                          aliasSelect = alias[Object.keys(alias)[0]]
                        }
                      })
                      this.setState({
                        widget: {...this.state.widget, key: event.target.value, alias: aliasSelect},
                        get_key: false,

                      })
                    }
                    else {
                      this.setState({
                        widget: {...this.state.widget, key: '', alias: ''},
                        get_key: true,
                        alias: event.target.name
                      })
                    }
                  }}>{
                    <option value={'ENTER_KEY'}>ورود کلید</option>
                  }
                    {
                      this.state.aliases.map((alias, index) => {
                        return (
                          <option key="index" value={Object.keys(alias)[0]}>{alias[Object.keys(alias)[0]]}</option>)
                      })
                    }
                  </Input>
                </Col>
              </AvGroup>
              <AvGroup style={{display: this.state.location || !this.state.get_key ? 'none' : 'flex'}} row>
                <Label sm={3}> کلید : </Label>
                <Col sm={9}>
                  <AvInput name={'key'}
                           onChange={(event) => {
                             this.setState({
                               widget: {...this.state.widget, key: event.target.value}
                             })
                           }}
                           type="text"
                           required/>
                  <AvFeedback>الزامی است</AvFeedback>
                </Col>
              </AvGroup>
              <FormGroup style={{display: this.state.location ? 'none' : 'flex'}} row>
                <Label sm={3}> بازه زمانی:</Label>
                <Col sm={9}>
                  <Input type="select" onChange={(event) => {
                    this.setState({
                      widget: {...this.state.widget, window: event.target.value}
                    })
                  }}>
                    <option value={1}>یک ساعت اخیر</option>
                    <option value={5}>5 ساعت اخیر</option>
                    <option value={10}>10 ساعت اخیر</option>
                    <option value={24}>یک روز اخیر</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}> نوع افزونه:</Label>
                <Col sm={9}>
                  <Input type="select" onChange={(event) => {
                    console.log(event.target.value, event.target.value === 'map')
                    if (event.target.value === 'map')
                      this.setState({
                        location: true,
                        widget: {...this.state.widget, key: '_location', type: event.target.value}
                      })
                    else
                      this.setState({
                        location: false,
                        widget: {...this.state.widget, type: event.target.value}
                      })
                  }}>
                    <option value={'line'}>نمودار خطی</option>
                    <option value={'table'}>جدول</option>
                    <option value={'map'}>نقشه</option>
                  </Input>
                </Col>
              </FormGroup>
            </AvForm>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className="ml-1" onClick={() => {
              this.setState({loading: true})
              this.toggle('setWidgetChart')
              this.props.dispatch(setDashboardWidgetChartAction({
                ...this.state.widget,
                devEUI: this.devEUI
              }, null, (a, v) => {
                this.setState({loading: false})
                toastAlerts(a, v)
              }))
              this.setState({widget: {type: 'line', window: 1}});
              this.refresh()
            }}>ارسال</Button>
            <Button color="danger" onClick={() => this.toggle('setWidgetChart')}>انصراف</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalToggle.deleteWidgetChart} toggle={() => this.toggle('deleteWidgetChart')}
               className="text-right">
          <ModalHeader>حذف نمودار</ModalHeader>
          <ModalBody>
            <h4>آیا از حذف نمودار مطمئن هستید ؟</h4>
            <br/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className="ml-1" onClick={() => {
              this.props.dispatch(deleteDashboardWidgetChartAction(this.state.selectedChart, toastAlerts));
              this.toggle('deleteWidgetChart')
              this.refresh()
            }}>حذف</Button>
            <Button color="danger" onClick={() => this.toggle('deleteWidgetChart')}>انصراف</Button>
          </ModalFooter>
        </Modal>


        <div className="row">
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary text-center" style={{cursor: 'pointer'}}
                  onClick={() => window.location = '/#/projects'}>
              <CardBody className="pb-0">
                <h4 className="mb-0 h3 font-weight-bold">{toPersianNumbers(this.state.project_num)}</h4>
                <p>پروژه ثبت شده است</p>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info text-center" style={{cursor: 'pointer'}}
                  onClick={() => window.location = '/#/things'}>
              <CardBody className="pb-0">
                <h4 className="mb-0 h3 font-weight-bold">{toPersianNumbers(this.state.thing_num)}</h4>
                <p>شی ثبت شده است</p>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Button color="primary" className="ml-1" onClick={() => {
              this.toggle('setWidgetChart')
            }}>افزونه جدید</Button>
          </Col>
        </div>
        <div className="row">
          {
            this.renderCharts()
          }
        </div>
      </div>

    );

  }


  renderCharts() {

    return (
      Object.keys(this.state.charts).map((key) => {
        if (this.state.charts[key].data === undefined)
          return;

        if (this.state.charts[key].type === 'line') {
          let config = {
            plotOptions: {
              line: {
                animation: false
              }
            },
            chart: {
              style: {
                fontFamily: 'Tahoma'
              }
            },
            title: {
              text: ''
            },
            xAxis: {
              categories: []
            },
            yAxis: {
              title: {
                text: 'مقدار'
              }
            },
            series: [{
              data: []
            }],
            credits: {
              enabled: false
            },
          }

          config.series[0].data = []
          config.series[0].name = this.state.charts[key].alias
          config.series[0].label = this.state.charts[key].alias
          this.state.charts[key].data.reverse().map((d) => {
            config.xAxis.categories.push(moment(d.timestamp, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss'))
            config.series[0].data.push(d.value)
            config.series[0].name = this.state.charts[key].alias

          })
          this.state.charts[key].data.reverse()

          return (
            <div className="col-md-12 col-lg-6" key={key}>
              <Card className="text-justify">
                <CardHeader>
                  <CardTitle
                    className="mb-0 font-weight-bold h6">{this.state.charts[key].title}</CardTitle>
                </CardHeader>
                <CardBody>
                  {/*<Line data={mainChart} options={mainChartOpts} height={300}/>*/}
                  <ReactHighcharts config={config}/>
                </CardBody>
                <CardFooter>
                  <Button onClick={() => {
                    this.setState({selectedChart: key}, () => this.toggle('deleteWidgetChart'))
                  }} color="danger">حذف</Button>
                </CardFooter>
              </Card>
            </div>
          )
        }
        else if (this.state.charts[key].type === 'table') {
          return (
            <div className="col-md-12 col-lg-6" key={key}>
              <Card className="text-justify">
                <CardHeader>mpdmpfd
                  <CardTitle
                    className="mb-0 font-weight-bold h6">{this.state.charts[key].title}</CardTitle>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={this.state.charts[key].data.reverse()}
                    columns={this.reactTableColumns(this.state.charts[key].thing)}
                    pageSizeOptions={[5]}
                    nextText='بعدی'
                    previousText='قبلی'
                    filterable={true}
                    rowsText='ردیف'
                    pageText='صفحه'
                    ofText='از'
                    minRows='1'
                    noDataText='داده‌ای وجود ندارد'
                    resizable={false}
                    defaultPageSize={10}
                    className="-striped -highlight"
                  />
                </CardBody>
                <CardFooter>
                  <Button onClick={() => {
                    this.setState({selectedChart: key}, () => this.toggle('deleteWidgetChart'))
                  }} color="danger">حذف</Button>
                </CardFooter>
              </Card>
            </div>
          )
        }
        else {
          if (this.state.charts[key].data[0] && this.state.charts[key].data[0].value &&
            this.state.charts[key].data[0].value.coordinates)
            return (
              <div className="col-md-12 col-lg-6" key={key}>
                <Card className="text-justify">
                  <CardHeader>
                    <CardTitle
                      className="mb-0 font-weight-bold h6">{this.state.charts[key].title}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Map marker={{
                      lat: this.state.charts[key].data[0].value.coordinates[1],
                      lng: this.state.charts[key].data[0].value.coordinates[0]
                    }}/>
                  </CardBody>
                  <CardFooter>
                    <Button onClick={() => {
                      this.setState({selectedChart: key}, () => this.toggle('deleteWidgetChart'))
                    }} color="danger">حذف</Button>
                  </CardFooter>
                </Card>
              </div>)
        }
      })

    )
  }

  reactTableColumns(thing) {
    return [
      {
        Header: 'شی فرستنده',
        id: 'thing',
        accessor: row => thing.name
      },
      {
        id: 'timestamp',
        Header: 'زمان دریافت داده',
        accessor: row => moment(row.timestamp, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss')
      },
      {
        id: 'value',
        Header: 'داده دریافت شده',
        accessor: row => JSON.stringify(row.value)
      },
    ];
  }

  refresh() {
    if (this.state.fetching === true)
      return;
    this.setState({
      fetching: true,
    });
    this.props.dispatch(getDashboardAction((data) => {
      this.setState({
        charts: data.charts,
        project_num: data.project_num,
        thing_num: data.things_num,
        fetching: false,
        first_loading: false
      });
    }));
  }

  getThings() {
    this.props.dispatch(getUserThingsAction(1, (data) => {
      this.setState({
        aliases: data.aliases,
        things: data.things
      })
    }))
  }
}

function mapStateToProps(state) {
  return {};
}


const Map = compose(
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
  >
    <Marker position={props.marker}/>
  </GoogleMap>
);


export default connect(mapStateToProps)(Dashboard);
