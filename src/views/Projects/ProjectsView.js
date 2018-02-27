import React, { Component } from 'react';
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
  Table
} from 'reactstrap';



const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandWarning = '#f8cb00';
const brandDanger = '#f86c6b';

// Main Chart

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
// var data2 = [];
// var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 500));
  // data2.push(random(80, 100));
  // data3.push(65);
}

const mainChart = {
  labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهار شنبه'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: convertHex(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1
    },
  ]
}

const mainChartOpts = {
  maintainAspectRatio: false,
  fontFamily: 'Tahoma',
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
    ticks: {
          fontFamily: 'Vazir',
      },
      gridLines: {
        drawOnChartArea: false,
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
        maxTicksLimit: 5,
        stepSize: Math.ceil(500 / 5),
        max: 500
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



class ProjectsView extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
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
                                    <th>RRSI</th>
                                    <th>SNR</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>مقدار</td>
                                    <td>مقدار</td>
                                    <td>مقدار</td>
                                    <td>مقدار</td>
                                    <td>مقدار</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>مقدار</td>
                                    <td>مقدار</td>
                                    <td>مقدار</td>
                                    <td>مقدار</td>
                                    <td>مقدار</td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td>مقدار</td>
                                    <td>مقدار</td>
                                    <td>مقدار</td>
                                    <td>مقدار</td>
                                    <td>مقدار</td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">نمودار داده ها</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <div className="chart-wrapper" style={{height: 300 + 'px', marginTop: 40 + 'px'}}>
                            <Line data={mainChart} options={mainChartOpts} height={300}/>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }

}

export default ProjectsView;
