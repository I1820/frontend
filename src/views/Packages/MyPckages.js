import React, { Component } from 'react'
import { getUserPackagesAction } from '../../actions/AppActions'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Label,
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap'
import moment from 'moment'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'

class MyPackages extends Component {
  constructor (props) {
    super(props)
    this.renderPackage = this.renderPackage.bind(this)
    this.toggleTab = this.toggleTab.bind(this)
    this.state = {
      packages: [],
      my_package: {},
      activeTab: 'my_package',
    }
  }

  componentWillReceiveProps (props) {
    this.setState({
      packages: props.packages,
      my_package: {
        ...props.my_package,
        remaining_time: props.my_package.time - moment().diff(moment(parseInt(_.get(props.my_package, 'start_date.$date.$numberLong'))), 'days')
      }
    })
  }

  componentWillMount () {
    this.props.dispatch(getUserPackagesAction())
  }

  renderPackage (item) {
    return (
      <Col xs="12" sm="6" md="4" key={item._id}>
        <Card className="border-primary">
          <CardHeader>
            {item.name}
          </CardHeader>
          <CardBody>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col md='6'><strong> مبلغ قابل پرداخت</strong></Col>
                  <Col md='6'><span>{item.price} </span><span> ریال</span></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md='6'><strong>تعداد سنسور</strong></Col>
                  <Col md='6'><span>{item.node_num}</span></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md='6'><strong>تعداد پروژه</strong></Col>
                  <Col md='6'><span>{item.project_num}</span></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md='6'><strong>مهلت بسته</strong></Col>
                  <Col md='6'><span>{item.time}</span></Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
          <CardFooter>
            <Link to={`selectedPackage/${item._id}`}>
              <Button color="primary">
                <i className="icon-basket-loaded icons"/> خرید
              </Button>
            </Link>
          </CardFooter>

        </Card>
      </Col>
    )
  }

  toggleTab (tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render () {
    return (
      <div className="animated fadeIn">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={{ active: this.state.activeTab === 'my_package' }}
              onClick={() => {
                this.toggleTab('my_package')
              }}>بسته فعلی من</NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={{ active: this.state.activeTab === 'buy_package' }}
              onClick={() => {
                this.toggleTab('buy_package')
              }}>خرید بسته</NavLink>
          </NavItem>

        </Nav>
        <br/>
        <TabContent activeTab={this.state.activeTab} className="border-0">
          <TabPane tabId={'my_package'}>
            <Card className="text-justify">
              <CardHeader>
                <CardTitle className="mb-0 font-weight-bold h6">بسته‌ی فعال من</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Label sm={2} md={3}>نام بسته:</Label>
                    <Col sm={8}>
                      {this.state.my_package.name}
                      <Badge
                        color={this.state.my_package.remaining_time >= 0 ? 'success' : 'danger'}>
                        {this.state.my_package.remaining_time >= 0 ? 'فعال' : 'غیرفعال'}
                      </Badge>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2} md={3}>مدت زمان بسته:</Label>
                    <Col sm={8}>{this.state.my_package.time + ' روز'}</Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2} md={3}>روزهای باقیمانده:</Label>
                    <Col sm={8}>
                      {this.state.my_package.remaining_time > 0 ? this.state.my_package.remaining_time : 0}{' روز'}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2} md={3}>تعداد پروژه‌ها:</Label>
                    <Col sm={8}>{this.state.my_package.project_num}</Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2} md={3}>تعداد شی‌ها:</Label>
                    <Col sm={8}>{this.state.my_package.node_num}</Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </TabPane>
          <TabPane tabId={'buy_package'}>
            <Card className="text-justify">
              <CardHeader>
                <CardTitle className="mb-0 font-weight-bold h6">لیست بسته‌ها</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="animated fadeIn">
                  <Row>
                    {this.state.packages.map((item) => this.renderPackage(item))}
                  </Row>
                </div>
              </CardBody>
            </Card>
          </TabPane>
        </TabContent>

      </div>
    )
  }

}

function mapStateToProps (state) {
  return {
    loading: state.homeReducer.currentlySending,
    packages: state.packageReducer.userPackages,
    my_package: state.userReducer.package
  }
}

export default connect(mapStateToProps)(MyPackages)

