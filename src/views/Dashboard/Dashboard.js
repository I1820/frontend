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
  Table,
  ButtonToolbar
} from 'reactstrap';
import {Bar, Line} from 'react-chartjs-2';

const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandWarning = '#f8cb00';
const brandDanger = '#f86c6b';

// convert Hex to RGBA
function convertHex(hex, opacity) {
  hex = hex.replace('#', '');
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
  return result;
}

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: convertHex(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3
    }
  ]
}

const mainChartOpts = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      gridLines: {
        drawOnChartArea: false,
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
        maxTicksLimit: 5,
        stepSize: Math.ceil(250 / 5),
        max: 250
      }
    }]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    }
  }
}

class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <div className="text-justify">
                <Row>
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
                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white bg-success">
                          <CardBody className="pb-0">
                            <h4 className="mb-0 h3 font-weight-bold">16</h4>
                            <p>گذرگاه ثبت شده است</p>
                          </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white bg-danger">
                          <CardBody className="pb-0">
                            <h4 className="mb-0 h3 font-weight-bold">1190</h4>
                            <p>داده دریافت شده است</p>
                          </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                  <Col>
                    <Card>
                      <CardBody>
                        <Row>
                          <Col sm="5">
                            <CardTitle className="mb-0">داده های دریافتی پروژه</CardTitle>
                          </Col>
                          <Col sm="7" className="d-none d-sm-inline-block">
                            <Input type="select" name="select" className="w-25 float-left">
                                <option>نام پروژه مورد نظر</option>
                                <option>نام پروژه مورد نظر</option>
                                <option>نام پروژه مورد نظر</option>
                                <option>نام پروژه مورد نظر</option>
                            </Input>
                          </Col>
                        </Row>
                        <div className="chart-wrapper" style={{height: 300 + 'px', marginTop: 40 + 'px'}}>
                          <Line data={mainChart} options={mainChartOpts} height={300}/>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
            </div>

        );

    }

}

export default Dashboard;
