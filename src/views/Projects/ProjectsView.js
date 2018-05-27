import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
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
    Table, PaginationItem, PaginationLink, Pagination
} from 'reactstrap';

import _ from 'underscore'

const ReactHighcharts = require('react-highcharts');
import moment from 'moment-jalaali'
import JSONPretty from 'react-json-pretty';
import {
    getCodecTemplateListAction, getProject,
    getThingsSampleDataAction, getThingsMainDataAction
} from '../../actions/AppActions';
import connect from 'react-redux/es/connect/connect';
import {DateTimeRangePicker, DateTimePicker} from 'react-advance-jalaali-datepicker';
import Select2 from 'react-select2-wrapper';
import Spinner from '../Spinner/Spinner';
import {css} from 'glamor';
import {toastAlerts} from '../Shared/toast_alert';
import ReactTable from 'react-table'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'Recharts'

class ProjectsView extends Component {

  constructor(props) {
    super(props);
    this.setThing = this.setThing.bind(this)
    this.renderPeriodPicker = this.renderPeriodPicker.bind(this)
    this.renderTimePicker = this.renderTimePicker.bind(this)
    this.getData = this.getData.bind(this)
    this.drawLineChart = this.drawLineChart.bind(this)
    this.renderChart = this.renderChart.bind(this)
    this.drawBarChart = this.drawBarChart.bind(this)
    this.state = {
      showLineChart: true,
      showBarChart: false,
      selectedThing: {ids: []},
      period: 5000,
      barchartData: [],
      project: {
        things: []
      },
      auto: false,
      config: {
        chart: {
          type: 'column',
          style: {
            fontFamily: 'Tahoma'
          }
        },
        title: {
          text: 'داده‌های دریافتی'
        },
        xAxis: {
          categories: [],
        },
        yAxis: {
          title: {
            text: 'تعداد'
          }
        },
        credits: {
          enabled: false
        },
      },
      data: [],
      keys: []
    }
  }


  componentWillMount() {
    this.loadProject()
  }

  componentWillReceiveProps(props) {
    const splitedUrl = window.location.href.split('/');
    if (splitedUrl[splitedUrl.length - 1]) {
      props.projects.forEach((project) => {
        if (project._id === splitedUrl[splitedUrl.length - 1]) {
          this.setState({
            project
          })
        }
      })
    }
  }

  loadProject() {
    const splitedUrl = window.location.href.split('/');
    if (splitedUrl[splitedUrl.length - 1]) {
      this.props.dispatch(getProject(splitedUrl[splitedUrl.length - 1], (status) => {
        if (status)
          this.props.dispatch(getCodecTemplateListAction(splitedUrl[splitedUrl.length - 1]))
      }))
    }
  }

  drawLineChart() {
    this.setState({showLineChart: true})
    const config = {
      chart: {
        style: {
          fontFamily: 'Tahoma'
        }
      },
      plotOptions: {
        line: {
          animation: false
        }
      },
      title: {
        text: 'داده‌های دریافتی'
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
      tooltip: {
        backgroundColor: 'lightgray',
        borderColor: '#7CB5EC',
        borderRadius: 10,
        borderWidth: 3,
        useHTML: true,
        formatter: function () {
          const res =
            '<div>' +
            '<div style="text-align: center;direction: rtl">' + this.x + '</div>' +
            '<div style="text-align: center">' + this.series.name +
            ': <span style="font-weight: bold; ">' + this.y + '</span></div>' +
            '</div>';
          return res;
        }
      },
    }

    let things = {}
    this.state.project.things.forEach((thing) => {
      things[thing.interface.devEUI] = thing.name
    })

    let sensors = []
    this.state.data.map((d, i) => {
      _.allKeys(d.data).map((k, i2) => {
        if (_.find(sensors, {name: `${things[d.thingid]}: ${k}`}) === undefined) {
          sensors.push({
            label: k,
            name: `${things[d.thingid]}: ${k}`,
            data: [],
            colorIndex: ((((k.split("").reduce(function (a, b) {
              a = ((a << 5) - a) + b.charCodeAt(0);
              return a & a
            }, 0)) % 10) + 10) % 10)
          })
        }
      })
    })

    this.state.data.map((d) => {

      config.xAxis.categories.push(moment(d.timestamp, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss'))
      sensors.map((dataset, index) => {
        if (d.data[dataset.label] === undefined) {
          dataset.data.push(dataset.data.length > 0 ? dataset.data[dataset.data.length - 1] : 0)
        } else {
          dataset.data.push(d.data[dataset.label])
        }
      })
    })

    config.series = sensors
    this.setState({
      config
    })
  }

  getThings() {
    let things = []
    this.state.project.things && this.state.project.things.forEach((thing) => {
        things.push({text: thing.name, id: thing._id})
      }
    )
    return things
  }

  setThing(things) {
    let selectedThing = {ids: []}
    for (let i = 0; i < things.target.selectedOptions.length; i++)
      selectedThing.ids.push(things.target.selectedOptions[i].value)
    this.setState({selectedThing})
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    this.clearInter()
  }

  render() {
    return (
      <div>
        <Spinner display={this.props.loading && !this.state.interval}/>
        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">دریافت داده</CardTitle>
          </CardHeader>
          <CardBody>
            <Form>
              <FormGroup row>
                <Label sm={2}>شی ارسال کننده:‌</Label>
                <Select2
                  style={{width: '30%'}}
                  multiple
                  data={this.getThings()}
                  ref="tags"
                  value={this.state.selectedThing.ids}
                  onSelect={
                    this.setThing
                  }
                  onUnselect={this.setThing}
                  options={
                    {
                      placeholder: 'شی مورد نظر را انتخاب کنید',
                    }
                  }
                />
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>زمان داده:‌</Label>
                <Col sm={4}>
                  <Input type="select" onChange={
                    (event) => {
                      this.clearInter()
                      this.setState({
                        auto: !(event.target.value === '0'),
                        window: event.target.value
                      })
                    }
                  } name="type" id="select">
                    <option value={0}> بازه زمانی</option>
                    <option value={60}>یک ساعت اخیر</option>
                    <option value={5 * 60}>پنج ساعت اخیر</option>
                    <option value={10 * 60}>ده ساعت اخیر</option>
                    <option value={24 * 60}>یک روز اخیر</option>
                    <option value={168 * 60}>یک هفته اخیر</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup style={{display: this.state.auto ? 'none' : 'block'}} row>
                <Col sm={6}>
                  {this.renderTimePicker()}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}> نوع نمودار :</Label>
                <Col sm={4}>
                  <Input type="select" name="type"
                         onChange={(event)=>{
                           if(event.target.value === "line")
                             this.setState({
                               showBarChart:false,
                               showLineChart:true
                             })
                           else   this.setState({
                             showBarChart:true,
                             showLineChart:false
                           })

                         }} id="select">
                    <option value="line">خطی</option>
                    <option value="bar">میله ای</option>
                  </Input>
                </Col>
              </FormGroup>
              <Button outline color="success" size="sm" onClick={() => {
                if (this.state.selectedThing.ids.length <= 0) {
                  toastAlerts(false, 'ابتدا شی مورد نظر را انتخاب نمایید')
                  return
                }
                this.clearInter()

                this.getData(() => {
                  if (this.state.auto)
                    this.setState({
                      interval: setInterval(() => {
                        this.getData()
                      }, this.state.period)
                    })
                })

              }
              }>دریافت اطلاعات</Button>
            </Form>
          </CardBody>
        </Card>
        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">نمودار داده ها</CardTitle>
          </CardHeader>
          <CardBody>
            {/*<Line data={mainChart} options={mainChartOpts} height={300}/>*/}
            {this.renderChart()}
          </CardBody>
        </Card>
        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">داده های جمع آوری شده</CardTitle>
          </CardHeader>
          <CardBody>
            <ReactTable
              data={[...this.state.data].reverse()}
              columns={this.reactTableColumns()}
              pageSizeOptions={[10, 15, 25, 50]}
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
        </Card>
      </div>
    );
  }

  renderChart() {
    if (this.state.showLineChart)
      return (<ReactHighcharts config={this.state.config}/>)
    else if (this.state.showBarChart)
      return (
        <BarChart width={1200} height={700} data={this.state.barchartData}
                 >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <Bar dataKey={101} fill="#8884d8"/>
          <Bar dataKey={100} fill="#ff0000"/>
        </BarChart>
      )
  }

  renderTimePicker() {
    return (!this.state.auto ? <DateTimeRangePicker placeholderStart="تاریخ و ساعت شروع"
                                                    placeholderEnd="تاریخ و ساعت پایان"
                                                    format="تاریخ: jYYYY/jMM/jDD ساعت: HH:mm"
                                                    onChangeStart={(e, b) => {
                                                      this.setState({
                                                        since: e
                                                      })
                                                    }}
                                                    onChangeEnd={(e, b) => {
                                                      this.setState({
                                                        until: e
                                                      })
                                                    }}
    /> : <DateTimePicker placeholder="انتخاب تاریخ و ساعت" format="تاریخ: jYYYY/jMM/jDD ساعت: HH:mm"
                         id="dateTimePicker"
                         onChange={(e, b) => {
                           this.setState({
                             since: e
                           })
                         }}
    />)
  }

  renderPeriodPicker() {
    if (this.state.auto)
      return (
        <Col>
          <Row>
            <Label syle={{marginRight: 20}}>پس از </Label>
            <Col sm={2}>
              <Input type="number" defaultValue={5} onChange={(e) => {
                let value = e.target.value
                this.setState({period: !isNaN(value) ? value * 1000 : 5000})
              }}/>
            </Col>
            <Label syle={{marginRight: 20}}>ثانیه </Label>
          </Row>
        </Col>
      )
  }

  reactTableColumns() {
    return [
      {
        id: 'time',
        Header: 'زمان دریافت داده',
        accessor: row => moment(row.timestamp, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss')
      },
      {
        Header: 'شی فرستنده',
        accessor: 'thingid'
      },
      {
        id: 'projectStatus',
        Header: 'داده دریافت شده',
        filterable: false,
        accessor: row => <div style={{textAlign: 'left', direction: 'ltr'}}><JSONPretty id="json-pretty"
                                                                                        json={row.data}/>
        </div>
      },
    ];
  }


  drawBarChart() {
    const keys = []
    const data = []
    this.state.data.map((row) => {
      Object.keys(row.data).map(key => {
        if (keys.indexOf(key) < 0)
          keys.push(key)
      })
      data.push({
        name: moment(row.timestamp, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss'),
        ...row.data
      })
    })

    this.setState({
      barchartData: data,
      keys
    })
    console.log(this.state)
    // this.setState({data:[
    //     {name: 'Page A', uv: 4000, pv: 0, amt: 2400},
    //     {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    //     {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    //     {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    //     {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    //     {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    //     {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    //   ],
    // showBarChart:true
    // })
  }


  getData(cb) {
    this.props.dispatch(getThingsMainDataAction(JSON.stringify(this.state.selectedThing),
      this.state.project._id,
      this.state.since,
      this.state.until,
      this.state.auto ? this.state.window : undefined,
      (status, data) => {
        this.setState({data: data.reverse()})
        if(this.state.showLineChart)
          this.drawLineChart()
        else if(this.state.showBarChart)
          this.drawBarChart()
        if (cb)
          cb()
      }));
  }

  clearInter() {
    clearInterval(this.state.interval);
    this.setState({
      interval: 0
    })
  }
}


function mapStateToPropes(state) {
  return {
    projects: state.projectReducer,
    loading: state.homeReducer.currentlySending
  }
}

export default connect(mapStateToPropes)(ProjectsView);
