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
  Form,
  FormGroup,
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
  //labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'],
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
    // {
    //   label: 'My Second dataset',
    //   backgroundColor: 'transparent',
    //   borderColor: brandSuccess,
    //   pointHoverBackgroundColor: '#fff',
    //   borderWidth: 2,
    //   data: data2
    // },
    // {
    //   label: 'My Third dataset',
    //   backgroundColor: 'transparent',
    //   borderColor: brandDanger,
    //   pointHoverBackgroundColor: '#fff',
    //   borderWidth: 1,
    //   borderDash: [8, 5],
    //   data: data3
    // }
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

class News extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>


            <Card className="text-justify">
                <CardHeader>
                    <CardTitle className="mb-0 font-weight-bold">نمونه پکیج</CardTitle>
                </CardHeader>
                <CardBody>

                    <Row>
                    
                        <Col xs="12" sm="6" md="4">
                            <Card>
                                <CardHeader>بسته طلایی</CardHeader>
                                <CardBody>
                                    <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. </p>
                                </CardBody>
                                <CardFooter>
                                    <Button color="primary">خرید بسته</Button>
                                </CardFooter>
                            </Card>
                        </Col>

                        <Col xs="12" sm="6" md="4">
                            <Card>
                                <CardHeader>بسته طلایی</CardHeader>
                                <CardBody>
                                    <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. </p>
                                </CardBody>
                                <CardFooter>
                                    <Button color="primary">خرید بسته</Button>
                                </CardFooter>
                            </Card>
                        </Col>

                        <Col xs="12" sm="6" md="4">
                            <Card>
                                <CardHeader>بسته طلایی</CardHeader>
                                <CardBody>
                                    <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. </p>
                                </CardBody>
                                <CardFooter>
                                    <Button color="primary">خرید بسته</Button>
                                </CardFooter>
                            </Card>
                        </Col>

                        <Col xs="12" sm="6" md="4">
                            <Card>
                                <CardHeader>بسته طلایی</CardHeader>
                                <CardBody>
                                    <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. </p>
                                </CardBody>
                                <CardFooter>
                                    <Button color="primary">خرید بسته</Button>
                                </CardFooter>
                            </Card>
                        </Col>

                    </Row>

                </CardBody>
            </Card>


                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold">نمونه چارت</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <div className="chart-wrapper" style={{height: 300 + 'px', marginTop: 40 + 'px', fontFamily: 'Tahoma'}}>
                          <Line data={mainChart} options={mainChartOpts} height={300}/>
                        </div>
                    </CardBody>
                </Card>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold">اخبار سایت</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table hover responsive className="table-outline">
                            <thead className="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>عنوان خبر</th>
                                    <th>موضوع</th>
                                    <th>تاریخ ارسال</th>
                                    <th>ابزار</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>عنوان خبر تست اینجاست</td>
                                    <td>اخبار سیاسی</td>
                                    <td>شنبه ۱۱ مرداد 1396</td>
                                    <td>
                                        <Button className="ml-1" color="success" size="sm">نمایش</Button>
                                        <Button className="ml-1" color="warning" size="sm">ویرایش</Button>
                                        <Button className="ml-1" color="danger" size="sm">حذف</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>عنوان خبر تست اینجاست</td>
                                    <td>اخبار سیاسی</td>
                                    <td>شنبه ۱۱ مرداد 1396</td>
                                    <td>
                                        <Button className="ml-1" color="success" size="sm">نمایش</Button>
                                        <Button className="ml-1" color="warning" size="sm">ویرایش</Button>
                                        <Button className="ml-1" color="danger" size="sm">حذف</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>عنوان خبر تست اینجاست</td>
                                    <td>اخبار سیاسی</td>
                                    <td>شنبه ۱۱ مرداد 1396</td>
                                    <td>
                                        <Button className="ml-1" color="success" size="sm">نمایش</Button>
                                        <Button className="ml-1" color="warning" size="sm">ویرایش</Button>
                                        <Button className="ml-1" color="danger" size="sm">حذف</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>عنوان خبر تست اینجاست</td>
                                    <td>اخبار سیاسی</td>
                                    <td>شنبه ۱۱ مرداد 1396</td>
                                    <td>
                                        <Button className="ml-1" color="success" size="sm">نمایش</Button>
                                        <Button className="ml-1" color="warning" size="sm">ویرایش</Button>
                                        <Button className="ml-1" color="danger" size="sm">حذف</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">5</th>
                                    <td>عنوان خبر تست اینجاست</td>
                                    <td>اخبار سیاسی</td>
                                    <td>شنبه ۱۱ مرداد 1396</td>
                                    <td>
                                        <Button className="ml-1" color="success" size="sm">نمایش</Button>
                                        <Button className="ml-1" color="warning" size="sm">ویرایش</Button>
                                        <Button className="ml-1" color="danger" size="sm">حذف</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <br />
                        <Button className="ml-2" color="primary">ارسال</Button>
                        <Button color="success">آرشیو</Button>
                    </CardBody>
                </Card>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold">ارسال خبر</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label for="" sm={2}>عنوان خبر</Label>
                                <Col sm={5}>
                                    <Input type="text" name="email" placeholder="" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="" sm={2}>موضوع خبر</Label>
                                <Col sm={5}>
                                    <Input type="select" name="select">
                                        <option>...</option>
                                        <option>موضوع خبر را انتخاب کنید</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="" sm={2}>تصویر خبر</Label>
                                <Col sm={5}>
                                    <Input type="file" name="file" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="" sm={2}>متن خبر</Label>
                                <Col sm={5}>
                                    <Input type="textarea" name="text" rows="6" id="exampleText" />
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary">ارسال</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

}

export default News;
