import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { connect } from 'react-redux';

class AdminLinks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      portainerUrl: '',
      prometheusUrl: '',
    }
  }

  componentDidMount() {
    this.setState({
      prometheusUrl: this.props.config.prometheus_url,
      portainerUrl: this.props.config.portainer_url
    })
  }

  render() {

    return (
      <div>
        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">لینک پنل‌های مدیریتی</CardTitle>
          </CardHeader>
          <CardBody>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col md='3'><strong>پنل Portainer</strong></Col>
                  <Col md='3'><a href={this.state.portainerUrl} target="_blank">لینک</a></Col>
                  <Col md='3'><strong>پنل Prometheus</strong></Col>
                  <Col md='3'><a href={this.state.prometheusUrl} target="_blank">لینک</a></Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      </div>
    )
  }


}

function mapStateToProps(state) {
  return {
    config: state.userReducer.config,
  };
}


export default connect(mapStateToProps)(AdminLinks);

