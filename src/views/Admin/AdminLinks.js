import React, { Component } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row, } from 'reactstrap'
import { connect } from 'react-redux'

class AdminLinks extends Component {

  constructor (props) {
    super(props)
    this.state = {
      portainerUrl: '',
      prometheusUrl: '',
    }
  }

  componentDidMount () {
    if (this.props.config) {
      this.setState({
        prometheusUrl: this.props.config.prometheus_url,
        portainerUrl: this.props.config.portainer_url,
      })
    }
  }

  render () {
    return (
      <div>
        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">لینک پنل‌های مدیریتی</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <Button color="link"
                        disabled={this.state.portainerUrl == '' || this.state.portainerUrl == null ? true : false}
                        onClick={() => window.open(this.state.portainerUrl, '_blank')}>Portainer</Button>
              </Col>
              <Col>
                <Button color="link"
                        disabled={this.state.prometheusUrl == '' || this.state.prometheusUrl == null ? true : false}
                        onClick={() => window.open(this.state.prometheusUrl, '_blank')}>Prometheus</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    config: state.userReducer.config,
  }
}

export default connect(mapStateToProps)(AdminLinks)

