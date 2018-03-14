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
    Table
} from 'reactstrap';

import _ from 'underscore'

const ReactHighcharts = require('react-highcharts');
import moment from 'moment-jalaali'
import JSONPretty from 'react-json-pretty';
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
var data2 = [];
// var data3 = [];

for (var i = 0; i <= elements; i++) {
    data1.push(random(50, 500));
    // data2.push(random(80, 100));
    // data3.push(65);
}

for (var i = 0; i <= elements; i++) {
    data2.push(random(5000, 50000));
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
        {
            label: 'My Second dataset',
            backgroundColor: convertHex(brandWarning, 10),
            borderColor: brandWarning,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 3,
            data: data2
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
                max: 50000
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
        this.state = {
            config: {
                xAxis: {
                    categories: [],

                },
                series: [{
                    data: []
                }],
                yAxis: {
                    title: {
                        text: 'تعداد'
                    }
                },
            },
            data: [{
                "_id": {"$oid": "5a3f5acfa65dcdcecbdd4ea8"},
                "data": {"241": 30.0, "242": 27.34375, "243": 0.0, "244": 0.0, "245": 0.0},
                "timestamp": {"$date": "2017-12-24T07:44:15.989Z"},
                "thingid": "isrc-sensor"
            },
                {
                    "_id": {"$oid": "5a3f5ad2a65dcdcecbdd4eac"},
                    "data": {"1": 21.58685302734375, "2": 24.90667724609375},
                    "timestamp": {"$date": "2017-12-24T07:44:18.818Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5ae5a65dcdcecbdd4eb3"},
                    "data": {"241": 20.0, "242": 28.310543060302734, "243": 0.0, "244": 0.0, "245": 0.0},
                    "timestamp": {"$date": "2017-12-24T07:44:37.919Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5ae8a65dcdcecbdd4eb8"},
                    "data": {"1": 22221.62975311279297, "2": 24.70831298828125},
                    "timestamp": {"$date": "2017-12-24T07:44:40.928Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5b06a65dcdcecbdd4ebf"},
                    "data": {"1": 21.69409942626953, "2": 24.61676025390625},
                    "timestamp": {"$date": "2017-12-24T07:45:10.928Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5b22a65dcdcecbdd4ec6"},
                    "data": {"244": 0.0, "245": 0.0, "241": 20.0, "242": 29.470706939697266, "243": 0.0},
                    "timestamp": {"$date": "2017-12-24T07:45:38.833Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5b25a65dcdcecbdd4eca"},
                    "data": {"1": 21.715553283691406, "2": 24.2581787109375},
                    "timestamp": {"$date": "2017-12-24T07:45:41.738Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5b5fa65dcdcecbdd4ed4"},
                    "data": {"241": 19.0, "242": 29.954099655151367, "243": 0.0, "244": 0.0, "245": 0.0},
                    "timestamp": {"$date": "2017-12-24T07:46:39.641Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5b61a65dcdcecbdd4ed8"},
                    "data": {"242": 29.954099655151367, "243": 0.0, "244": 0.0, "245": 0.0, "241": 19.0},
                    "timestamp": {"$date": "2017-12-24T07:46:41.821Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5b62a65dcdcecbdd4edc"},
                    "data": {"1": 21.758453369140625, "2": 24.2581787109375},
                    "timestamp": {"$date": "2017-12-24T07:46:42.571Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5b9ca65dcdcecbdd4ee6"},
                    "data": {"243": 0.0, "244": 0.0, "245": 0.0, "241": 15.0, "242": 30.373043060302734},
                    "timestamp": {"$date": "2017-12-24T07:47:40.503Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5b9fa65dcdcecbdd4eea"},
                    "data": {"1": 21.715553283691406, "2": 24.09796142578125},
                    "timestamp": {"$date": "2017-12-24T07:47:43.411Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5bbda65dcdcecbdd4ef1"},
                    "data": {"2": 24.03692626953125, "1": 21.672653198242188},
                    "timestamp": {"$date": "2017-12-24T07:48:13.413Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5bd9a65dcdcecbdd4ef8"},
                    "data": {"244": 0.0, "245": 0.0, "241": 15.0, "242": 30.4697208404541, "243": 0.0},
                    "timestamp": {"$date": "2017-12-24T07:48:41.381Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5bdca65dcdcecbdd4efc"},
                    "data": {"1": 21.608299255371094, "2": 24.1971435546875},
                    "timestamp": {"$date": "2017-12-24T07:48:44.220Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5bfaa65dcdcecbdd4f03"},
                    "data": {"1": 21.565399169921875, "2": 24.35736083984375},
                    "timestamp": {"$date": "2017-12-24T07:49:14.235Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5c16a65dcdcecbdd4f0a"},
                    "data": {"241": 16.0, "242": 30.534177780151367, "243": 0.0, "244": 0.0, "245": 0.0},
                    "timestamp": {"$date": "2017-12-24T07:49:42.173Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5c19a65dcdcecbdd4f0e"},
                    "data": {"2": 24.70831298828125, "1": 21.54395294189453},
                    "timestamp": {"$date": "2017-12-24T07:49:45.242Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5c1aa65dcdcecbdd4f12"},
                    "data": {"2": 24.70831298828125, "1": 21.54395294189453},
                    "timestamp": {"$date": "2017-12-24T07:49:46.030Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5c37a65dcdcecbdd4f19"},
                    "data": {"1": 21.565399169921875, "2": 24.70831298828125},
                    "timestamp": {"$date": "2017-12-24T07:50:15.063Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5c38a65dcdcecbdd4f1d"},
                    "data": {"1": 21.565399169921875, "2": 24.70831298828125},
                    "timestamp": {"$date": "2017-12-24T07:50:16.327Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5c52a65dcdcecbdd4f24"},
                    "data": {"241": 16.0, "242": 30.4375, "243": 0.0, "244": 0.0, "245": 0.0},
                    "timestamp": {"$date": "2017-12-24T07:50:42.991Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5c55a65dcdcecbdd4f28"},
                    "data": {"1": 21.565399169921875, "2": 24.70831298828125},
                    "timestamp": {"$date": "2017-12-24T07:50:45.884Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5c73a65dcdcecbdd4f2f"},
                    "data": {"1": 21.522499084472656, "2": 24.70831298828125},
                    "timestamp": {"$date": "2017-12-24T07:51:15.963Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5c8fa65dcdcecbdd4f36"},
                    "data": {"245": 0.0, "241": 17.0, "242": 30.4375, "243": 0.0, "244": 0.0},
                    "timestamp": {"$date": "2017-12-24T07:51:43.818Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5cb0a65dcdcecbdd4f3d"},
                    "data": {"1": 21.501052856445312, "2": 24.90667724609375},
                    "timestamp": {"$date": "2017-12-24T07:52:16.754Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5ccca65dcdcecbdd4f44"},
                    "data": {"244": 0.0, "245": 0.0, "241": 16.0, "242": 30.373043060302734, "243": 0.0},
                    "timestamp": {"$date": "2017-12-24T07:52:44.641Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5ccfa65dcdcecbdd4f48"},
                    "data": {"2": 24.70831298828125, "1": 21.501052856445312},
                    "timestamp": {"$date": "2017-12-24T07:52:47.655Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5ceda65dcdcecbdd4f4f"},
                    "data": {"1": 21.479598999023438, "2": 24.548095703125},
                    "timestamp": {"$date": "2017-12-24T07:53:17.558Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5ceea65dcdcecbdd4f53"},
                    "data": {"1": 21.479598999023438, "2": 24.548095703125},
                    "timestamp": {"$date": "2017-12-24T07:53:18.163Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5d09a65dcdcecbdd4f5a"},
                    "data": {"241": 18.0, "242": 30.276371002197266, "243": 0.0, "244": 0.0, "245": 0.0},
                    "timestamp": {"$date": "2017-12-24T07:53:45.478Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5d0ca65dcdcecbdd4f5e"},
                    "data": {"1": 21.479598999023438, "2": 24.70831298828125},
                    "timestamp": {"$date": "2017-12-24T07:53:48.359Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5d49a65dcdcecbdd4f68"},
                    "data": {"1": 21.501052856445312, "2": 24.90667724609375},
                    "timestamp": {"$date": "2017-12-24T07:54:49.193Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5d67a65dcdcecbdd4f6f"},
                    "data": {"1": 21.479598999023438, "2": 24.70831298828125},
                    "timestamp": {"$date": "2017-12-24T07:55:19.205Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5d83a65dcdcecbdd4f76"},
                    "data": {"241": 19.0, "242": 30.3408203125, "243": 0.0, "244": 0.0, "245": 0.0},
                    "timestamp": {"$date": "2017-12-24T07:55:47.118Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5d86a65dcdcecbdd4f7a"},
                    "data": {"1": 21.43669891357422, "2": 24.548095703125},
                    "timestamp": {"$date": "2017-12-24T07:55:50.030Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5da4a65dcdcecbdd4f81"},
                    "data": {"2": 24.548095703125, "1": 21.393798828125},
                    "timestamp": {"$date": "2017-12-24T07:56:20.032Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5dbfa65dcdcecbdd4f88"},
                    "data": {"243": 0.0, "244": 0.0, "245": 0.0, "241": 19.0, "242": 30.534177780151367},
                    "timestamp": {"$date": "2017-12-24T07:56:47.991Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5dc2a65dcdcecbdd4f8c"},
                    "data": {"1": 21.35089874267578, "2": 24.548095703125},
                    "timestamp": {"$date": "2017-12-24T07:56:50.876Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5dffa65dcdcecbdd4f96"},
                    "data": {"1": 21.307998657226562, "2": 24.70831298828125},
                    "timestamp": {"$date": "2017-12-24T07:57:51.676Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5e1da65dcdcecbdd4f9d"},
                    "data": {"2": 24.70831298828125, "1": 21.286544799804688},
                    "timestamp": {"$date": "2017-12-24T07:58:21.700Z"},
                    "thingid": "isrc-sensor"
                }
                , {
                    "_id": {"$oid": "5a3f5e5aa65dcdcecbdd4fa7"},
                    "data": {"1": 21.307998657226562, "2": 24.90667724609375},
                    "timestamp": {"$date": "2017-12-24T07:59:22.532Z"},
                    "thingid": "isrc-sensor"
                }
            ]
        }
        this.draw = this.draw.bind(this)
    }


    componentWillMount() {
        this.draw()
    }


    draw() {
        const config = {
            xAxis: {
                categories: []
            },
            series: [{
                data: []
            }],
            title: {
                text: 'داده های دریافتی'
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


        let sensors = []
        this.state.data.map((d, i) => {
            _.allKeys(d.data).map((k, i2) => {
                if (_.find(sensors, {name: k}) === undefined) {
                    sensors.push({
                        name: k,
                        data:[]
                    })
                }
            })
        })

        this.state.data.map((d) => {

          config.xAxis.categories.push(moment(d.timestamp.$date, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss'))
            sensors.map((dataset, index) => {
                if (d.data[dataset.name] === undefined) {
                    dataset.data.push(dataset.data.length > 0 ? dataset.data[dataset.data.length - 1] : 0)
                } else {
                    dataset.data.push(d.data[dataset.name])
                }
            })
        })

        config.series = sensors

        this.setState({
            config
        })
    }


    render() {
        return (
            <div>
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
                                <th>RRSI</th>
                                <th>SNR</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.data.map((data,key)=>{
                                return(
                                    <tr>
                                        <th>{key+1}</th>
                                        <td className="english">{data.timestamp.$date}</td>
                                        <td style={{textAlign:'left'}}><JSONPretty id="json-pretty" json={data.data}/></td>
                                        <td>مقدار</td>
                                        <td>مقدار</td>
                                        <td>مقدار</td>
                                    </tr>

                                )
                            })}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        );
    }

}

export default ProjectsView;
