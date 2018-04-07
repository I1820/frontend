import React, { Component } from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {
  Badge,
  Row,
  Col,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  ButtonToolbar,
  ButtonGroup,
  ButtonDropdown,
  Label,
  Input,
  Table
} from 'reactstrap';

const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandWarning = '#f8cb00';
const brandDanger = '#f86c6b';


// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40]
    }
  ],
};

const cardChartOpts1 = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      gridLines: {
        color: 'transparent',
        zeroLineColor: 'transparent'
      },
      ticks: {
        fontSize: 2,
        fontColor: 'transparent',
      }

    }],
    yAxes: [{
      display: false,
      ticks: {
        display: false,
        min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
        max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
      }
    }],
  },
  elements: {
    line: {
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11]
    }
  ],
};

const cardChartOpts2 = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      gridLines: {
        color: 'transparent',
        zeroLineColor: 'transparent'
      },
      ticks: {
        fontSize: 2,
        fontColor: 'transparent',
      }

    }],
    yAxes: [{
      display: false,
      ticks: {
        display: false,
        min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
        max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
      }
    }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


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
  labels: ['M', 'T', 'W', 'T', 'F'],
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

        this.state = {
            card1: false,
            card2: false,
            card3: false,
        }
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
                    <Col xs="12" sm="6" lg="6">
                        <Card className="bg-white">
                            <CardBody className="pb-0">
                                <ButtonGroup className="float-left">
                                    <ButtonDropdown id='card1' isOpen={this.state.card1}
                                        toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                                        <DropdownToggle className="p-0" color="black">
                                            <i className="icon-settings mx-1"></i>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>حذف</DropdownItem>
                                            <DropdownItem>ویرایش</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </ButtonGroup>
                                <h4 className="mb-0 h6">عنوان ویدجت</h4>
                                <div className="chart-wrapper px-3 mt-5" style={{height:'70px'}}>
                                    <Line data={cardChartData2} options={cardChartOpts2} height={70}/>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="3" lg="3">
                        <Card className="bg-white">
                            <CardBody className="pb-0">
                                <ButtonGroup className="float-left">
                                    <ButtonDropdown id='card2' isOpen={this.state.card2}
                                        toggle={() => { this.setState({ card2: !this.state.card2 }); }}>
                                        <DropdownToggle className="p-0" color="black">
                                            <i className="icon-settings mx-1"></i>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>حذف</DropdownItem>
                                            <DropdownItem>ویرایش</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </ButtonGroup>
                                <h4 className="mb-0 h6">عنوان ویدجت</h4>
                                <div className="chart-wrapper px-3 mt-5" style={{height:'70px'}}>
                                    <Line data={cardChartData1} options={cardChartOpts1} height={70}/>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="3" lg="3">
                        <Card className="bg-white">
                            <CardBody className="pb-0">
                                <ButtonGroup className="float-left">
                                    <ButtonDropdown id='card3' isOpen={this.state.card3}
                                        toggle={() => { this.setState({ card3: !this.state.card3 }); }}>
                                        <DropdownToggle className="p-0" color="black">
                                            <i className="icon-settings mx-1"></i>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>حذف</DropdownItem>
                                            <DropdownItem>ویرایش</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </ButtonGroup>
                                <h4 className="mb-0 h6">عنوان ویدجت</h4>
                                <div className="chart-wrapper px-3 mt-5" style={{height:'70px'}}>
                                    <Line data={cardChartData1} options={cardChartOpts1} height={70}/>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                  <Col>
                    <Card>
                      <CardBody>
                        <Row>
                          <Col xs="12">
                            <h5>نمودار بصورت افقی</h5>
                            <span className="text-muted small">این نمودار بصورت تست است</span>
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
