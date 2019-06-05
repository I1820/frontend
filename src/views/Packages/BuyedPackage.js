import React, { Component } from 'react'
import Data from './packageData'
import { Badge, Card, CardBody, CardHeader, CardTitle, Col, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { connect } from 'react-redux'

class BuyedPackage extends Component {
  constructor (props) {
    super(props)
    this.renderPackage = this.renderPackage.bind(this)
    this.state = {
      packages: Data,
    }
  }

  renderPackage (key) {
    let details = this.state.packages[key]
    return (
      <Col xs="12" sm="6" md="4">
        <Card className="border-primary">
          <CardHeader>
            {details.packageName}
          </CardHeader>
          <CardBody>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col md='6'><strong> مبلغ قابل پرداخت</strong></Col>
                  <Col md='6'><span>{details.cost} </span><span> ریال</span></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md='6'><strong>تعداد سنسور</strong></Col>
                  <Col md='6'><span>{details.sensor}</span></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md='6'><strong>مهلت بسته</strong></Col>
                  <Col md='6'><span>{details.time}</span></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md='6'><strong> زمان خرید بسته</strong></Col>
                  <Col md='6'><span>{details.startTime}</span></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md='6'><strong> وضعیت بسته</strong></Col>
                  <Col md='6'>
                    {/* <span>{details.status === "Active" ? <Badge color="success"> {details.status}</Badge> : "Converted" ? <Badge color="danger"> {details.status}</Badge> : <Badge color="warning"> {details.status}</Badge>  }</span> */}
                    <span>{details.status === 'Active' ? <Badge color="success"> {details.status}</Badge> :
                      <Badge color="danger"> {details.status}</Badge>}</span>

                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </CardBody>

        </Card>
      </Col>
    )
  }

  render () {
    console.log(this.state.packages)
    return (

      <div className="animated fadeIn">
        <Row>
          <Col>

            <Card className="text-justify">
              <CardHeader>
                <CardTitle className="mb-0 font-weight-bold h6">لیست بسته‌ها</CardTitle>
              </CardHeader>
              <CardBody>

                <div className="animated fadeIn">

                  <Row>

                    {Object.keys(this.state.packages).map((key) => this.renderPackage(key))}


                  </Row>


                </div>

              </CardBody>

            </Card>
          </Col>
        </Row>

      </div>
    )
  }

}

function select (state) {

  return {}
}

export default connect(select)(BuyedPackage)

