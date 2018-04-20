import React, {Component} from 'react';
import {Bar, Line} from 'react-chartjs-2';
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
import {getCodecTemplateListAction, getDataAction, getProject} from "../../actions/AppActions";
import connect from "react-redux/es/connect/connect";
import {DateTimeRangePicker, DateTimePicker} from "react-advance-jalaali-datepicker";
import Select2 from "react-select2-wrapper";
import {ToastContainer, toast} from 'react-toastify';
import Spinner from "../Spinner/Spinner";
import {css} from 'glamor';
import {style} from "react-toastify";


class ProjectsView extends Component {

  constructor(props) {
    super(props);
    this.setThing = this.setThing.bind(this)
    this.renderPeriodPicker = this.renderPeriodPicker.bind(this)
    this.renderPagination = this.renderPagination.bind(this)
    this.renderTimePicker = this.renderTimePicker.bind(this)
    this.state = {
      selectedThing: {ids: []},
      page: 0,
      period: 5000,
      project: {
        things: []
      },
      auto: false,
      config: {
        chart: {
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
      data: []
    }
    this.draw = this.draw.bind(this)
  }


  componentWillMount() {
    this.loadProject()
  }

  componentWillReceiveProps(props) {
    const splitedUrl = window.location.href.split('/');
    const me = this;
    if (splitedUrl[splitedUrl.length - 1]) {
      props.projects.forEach((project) => {

        if (project._id === splitedUrl[splitedUrl.length - 1]) {
          console.log('findddd', project)
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

  draw() {
    const config = {
      chart: {
        style: {
          fontFamily: 'Tahoma'
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
    console.log(things)

    let sensors = []
    this.state.data.map((d, i) => {
      _.allKeys(d.data).map((k, i2) => {
        if (_.find(sensors, {name: `${k}':'${things[d.thingid]}`}) === undefined) {
          sensors.push({
            label: k,
            name: `${k}':'${things[d.thingid]}`,
            data: []
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
    this.state.project.things.forEach((thing) => {
        things.push({text: thing.name, id: thing._id})
      }
    )
    return things
  }

  setThing(things) {
    let selectedThing = {ids: []}
    for (let i = 0; i < things.target.selectedOptions.length; i++)
      // console.log(things.target.selectedOptions[i].value)
      selectedThing.ids.push(things.target.selectedOptions[i].value)
    this.setState({selectedThing})
    console.log('set state', this.state)
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    // clearInterval(this.state.interval);
  }

  render() {
    return (
      <div>
        <Spinner display={this.props.loading && this.state.data.length == 0}/>
        <ToastContainer className="text-right"/>
        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">دریافت داده</CardTitle>
          </CardHeader>
          <CardBody>
            <Form>
              <FormGroup row>
                <Label sm={2}>شی ارسال کننده :‌ </Label>
                <Select2
                  style={{width: "30%"}}
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
                <Label sm={2}>زمان داده :‌ </Label>
                <Col sm={4}>
                  <Input type="select" onChange={
                    (event) => {
                      console.log(event.target.value,event.target.value == 0)
                      this.setState({auto: !(event.target.value == 0)})
                      this.setState({window:event.target.value})
                    }
                  } name="type" id="select">
                    <option value={0}> بازه زمانی</option>
                    <option value={1}>یک ساعت اخیر</option>
                    <option value={5}>5 ساعت اخیر</option>
                    <option value={10}>10 ساعت اخیر</option>
                    <option value={24}>یک روز اخیر</option>
                    <option value={168}>یک هفته اخیر</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup style={{display:this.state.auto?'none':'block'}} row>
                <Label sm={2}>بازه زمانی :‌ </Label>
                <Col sm={4}>
                  {this.renderTimePicker()}
                </Col>
              </FormGroup>
              <Button outline color="success" size="sm" onClick={() => {
                if (this.state.selectedThing.ids.length <= 0) {
                  toast("ابتدا شی مورد نظر را انتخاب نمایید", {
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
                else {
                  // this.setState({page: 0, data: []})
                  // clearInterval(this.state.interval)
                  // if (!this.state.auto)
                    this.props.dispatch(getDataAction(JSON.stringify(this.state.selectedThing), this.state.project._id, this.state.since,
                      this.state.until,this.state.window, (status, data) => {
                        if (status && data !== null && data !== undefined) {
                          this.setState({
                            data
                          })
                          this.draw()
                        }
                      }))
                  // else {
                  //   this.props.dispatch(getDataAction(JSON.stringify(this.state.selectedThing), this.state.project._id, this.state.since,
                  //     this.state.until, (status, data) => {
                  //       if (status && data !== null && data !== undefined) {
                  //         this.setState({
                  //           data
                  //         })
                  //         this.draw()
                  //       }
                  //     }))
                  //   this.setState({
                  //     interval: setInterval(() => {
                  //       this.props.dispatch(getDataAction(JSON.stringify(this.state.selectedThing), this.state.project._id, this.state.since,
                  //         this.state.until, (status, data) => {
                  //           if (status && data !== null && data !== undefined) {
                  //             this.setState({
                  //               data
                  //             })
                  //             this.draw()
                  //           }
                  //         }))
                  //     }, this.state.period)
                  //   })
                  // }
                }
              }}>
                دریافت اطلاعات
              </Button>
            </Form>
          </CardBody>
        </Card>
        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">نمودار داده ها</CardTitle>
          </CardHeader>
          <CardBody>
            {/*<Line data={mainChart} options={mainChartOpts} height={300}/>*/}
            <ReactHighcharts config={this.state.config}></ReactHighcharts>
          </CardBody>
        </Card>
        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">داده های جمع آوری شده</CardTitle>
          </CardHeader>
          <CardBody>
            <Table hover responsive className="table-outline">
              <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>زمان دریافت داده</th>
                <th>شی فرستنده</th>
                <th>داده دریافت شده</th>
                {/*<th>RRSI</th>*/}
                {/*<th>SNR</th>*/}
              </tr>
              </thead>
              <tbody>
              {this.state.data.slice(this.state.page * 10, (this.state.page + 1) * 10).map((data, key) => {
                return (
                  <tr>
                    <th>{this.state.page * 10 + key + 1}</th>
                    <td>{moment(data.timestamp, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss')}</td>
                    <td>{data.thingid}</td>
                    <td style={{textAlign: 'left', direction: 'ltr'}}><JSONPretty id="json-pretty"
                                                                                  json={data.data}/>
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </Table>
            <Pagination style={{justifyContent: 'center'}}>
              <PaginationItem disabled={this.state.page <= 0}>
                <PaginationLink previous
                                onClick={
                                  () => {
                                    this.setState({
                                      page: this.state.page - 1
                                    })
                                  }
                                }>قبل</PaginationLink></PaginationItem>
              {this.renderPagination()}
              <PaginationItem disabled={(this.state.page + 1) * 10 > this.state.data.length}>
                <PaginationLink next
                                onClick={
                                  () => {
                                    this.setState({
                                      page: this.state.page + 1
                                    })
                                  }}>بعد</PaginationLink></PaginationItem>
            </Pagination>
          </CardBody>
        </Card>
      </div>
    );
  }

  renderPagination() {

    let page = []
    let page_count = this.state.data.length / 10;
    if (this.state.page > 4)
      page.push(<PaginationItem active={false}>
        <PaginationLink>...</PaginationLink>
      </PaginationItem>)
    for (let i = 0; i < page_count; i++) {
      if (Math.abs(i - this.state.page) < 5)
        page.push(<PaginationItem active={i === this.state.page}>
          <PaginationLink onClick={() => {
            this.setState({
              page: i
            })
          }}>{i + 1}</PaginationLink>
        </PaginationItem>)
    }
    if (page_count - 5 > this.state.page)
      page.push(<PaginationItem active={false}>
        <PaginationLink>...</PaginationLink>
      </PaginationItem>)

    return page
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
    /> : <DateTimePicker placeholder="انتخاب تاریخ و ساعت" format="تاریخ: jYYYY/jMM/jDD ساعت: HH:mm" id="dateTimePicker"
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
}


function mapStateToPropes(state) {
  return {
    projects: state.projectReducer,
    loading: state.homeReducer.currentlySending
  }
}

export default connect(mapStateToPropes)(ProjectsView);
