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
  Table, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import {connect} from "react-redux";
import {activeThingAction, getDashboardAction, setDashboardAction} from "../../actions/AppActions";
import moment from "moment-jalaali";

const ReactHighcharts = require('react-highcharts');

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.renderCharts = this.renderCharts.bind(this)
    this.toggle = this.toggle.bind(this)
    this.state = {
      charts: {
        "2": {},
        "3": {}
      },
      modal: false,
      widget: {}
    }
  }

  toggle() {
    this.setState({modal: !this.state.modal})
  }

  componentDidMount() {
    this.props.dispatch(getDashboardAction((data) => {
      console.log(data)
      this.setState({
        charts: data.charts
      })
    }))

    let interval = setInterval(() => {
      if (!this.state.modal)
        this.props.dispatch(getDashboardAction((data) => {
          if (!this.state.modal)
            this.setState({
              charts: data.charts,
              modal: false
            })
        }))
    }, 5000)

    this.setState({
      interval
    })
  }


  componentWillUnmount() {
    clearInterval(this.state.interval)
  }


  render() {
    let widget = {}
    return (

      <div>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className="text-right">
          <ModalHeader>افزونه جدید</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label sm={3}> عنوان : </Label>
                <Col sm={9}>
                  <Input onChange={(event) => {
                      widget.title = event.target.value
                  }} type="text"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}> شی : </Label>
                <Col sm={9}>
                  <Input onChange={(event) => {
                    widget.devEUI = event.target.value
                  }} type="text"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}> کلید : </Label>
                <Col sm={9}>
                  <Input onChange={(event) => {
                    widget.key = event.target.value
                  }} type="text"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}> بازه زمانی : </Label>
                <Col sm={9}>
                  <Input onChange={(event) => {
                    widget.window = event.target.value
                  }} type="text"/>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className="ml-1" onClick={() => {
              this.toggle()
              this.props.dispatch(setDashboardAction(widget, Math.random()))
            }}>ارسال</Button>
            <Button color="danger" onClick={this.toggle}>انصراف</Button>
          </ModalFooter>
        </Modal>


        <div className="row">
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <h4 className="mb-0 h3 font-weight-bold">12</h4>
                <p>پروژه ثبت شده است</p>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <h4 className="mb-0 h3 font-weight-bold">8</h4>
                <p>شی ثبت شده است</p>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Button color="primary" className="ml-1" onClick={() => {
              this.toggle()
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
          return
        let config = {

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
        }

        config.series[0].data = []
        this.state.charts[key].data.map((d) => {
          config.xAxis.categories.push(moment(d.timestamp, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss'))
          config.series[0].data.push(d.value)
          config.series[0].name = key

        })


        return (
          <div className="col-md-12 col-lg-6"><Card className="text-justify">
            <CardHeader>
              <CardTitle className="mb-0 font-weight-bold h6">{this.state.charts[key].title}</CardTitle>
            </CardHeader>
            <CardBody>
              {/*<Line data={mainChart} options={mainChartOpts} height={300}/>*/}
              <ReactHighcharts config={config}/>
            </CardBody>
          </Card>
          </div>
        )
      })
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Dashboard);
